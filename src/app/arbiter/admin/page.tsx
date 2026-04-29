'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { useTeams } from '@/lib/useTeams'
import { useScores } from '@/lib/useScores'
import { useSongs } from '@/lib/useSongs'
import { useEventState } from '@/lib/useEventState'
import { useSettings } from '@/lib/useSettings'
import QRCodeDisplay from '@/components/QRCodeDisplay'
import TeamEditor from '@/components/TeamEditor'
import SongForm from '@/components/SongForm'
import SongList from '@/components/SongList'
import LevelTabs from '@/components/LevelTabs'
import BottomNav from '@/components/BottomNav'
import { DEFAULT_SONGS } from '@/lib/defaultData'
import { supabase } from '@/lib/supabase'

function ConfirmButton({ label, confirmLabel, onConfirm, className }: {
  label: string; confirmLabel: string; onConfirm: () => void; className?: string
}) {
  const [confirming, setConfirming] = useState(false)
  if (confirming) return (
    <div className="flex flex-col gap-2">
      <p className="text-red-300 text-sm text-center font-semibold">Are you sure?</p>
      <div className="flex gap-2">
        <button onClick={() => { setConfirming(false); onConfirm() }}
          className="flex-1 py-3 rounded-xl bg-red-600 text-white font-black min-h-[52px] active:scale-95">
          {confirmLabel}
        </button>
        <button onClick={() => setConfirming(false)}
          className="flex-1 py-3 rounded-xl bg-white/10 text-white/50 font-medium min-h-[52px]">
          Cancel
        </button>
      </div>
    </div>
  )
  return <button onClick={() => setConfirming(true)} className={className}>{label}</button>
}

const SEGMENTS = [
  'Phase I — Round 1: Nostalgia',
  'Phase I — Round 2: Kuthu',
  'Phase I — Round 3: Absurd',
  'Phase II — Ball Pyramid',
  'Phase II — Cup Dribble',
  'Phase II — Cone in Hole',
  'Phase II — Cup Straw',
]

export default function AdminPage() {
  const { role, checked } = useAuth()
  const router = useRouter()
  const { teams, updateTeam } = useTeams()
  const { resetScores } = useScores(teams)
  const { songs, addSong, updateSong, deleteSong, resetUsed } = useSongs()
  const { state, markSegmentComplete, endEvent } = useEventState()
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1)
  const [activeLang, setActiveLang] = useState<'tamil' | 'hindi'>('tamil')
  const { settings, updateSettings, resetSettings } = useSettings()
  const [tab, setTab] = useState<'setup' | 'songs' | 'timers' | 'danger'>('setup')

  useEffect(() => { if (checked && !role) router.replace('/arbiter') }, [role, checked])
  if (!checked || !role) return null

  const completedSegments = state?.completed_segments ?? 0

  const restoreDefaults = async () => {
    if (!confirm('This will add all default songs. Continue?')) return
    for (const s of DEFAULT_SONGS) {
      await addSong(s as any)
    }
  }

  const handleEndEvent = async () => {
    await endEvent(completedSegments)
    router.push('/podium')
  }

  const handleFullReset = async () => {
    // Clear Supabase
    await resetScores()
    await resetUsed()
    await supabase.from('event_state').update({
      current_phase: 0,
      phase1_active_level: 1,
      weighted_finish: false,
      ended_at: null,
      completed_segments: 0,
      active_team_id: null,
      ondeck_team_id: null,
      timer_paused: true,
      timer_remaining_ms: 3600000,
    }).neq('id', '00000000-0000-0000-0000-000000000000')

    // Clear all timer + stopwatch localStorage keys
    const keysToRemove = Object.keys(localStorage).filter(k =>
      k.startsWith('sc_timer_') || k.startsWith('sc_sw_')
    )
    keysToRemove.forEach(k => localStorage.removeItem(k))

    // Reload to flush all component state
    window.location.href = '/arbiter/home'
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-white/10 px-4 py-3">
        <h1 className="text-lg font-black text-white">⚙️ Admin</h1>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
        {(['setup', 'timers', 'songs', 'danger'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-shrink-0 flex-1 py-3 text-sm font-semibold transition-colors whitespace-nowrap px-2 ${tab === t ? 'text-white border-b-2 border-white' : 'text-white/40'}`}
          >
            {t === 'setup' ? '🎯 Setup' : t === 'timers' ? '⏱ Timers' : t === 'songs' ? '🎵 Songs' : '🚨 Danger'}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* SETUP TAB */}
        {tab === 'setup' && (
          <>
            <QRCodeDisplay />

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-3">Teams</p>
              <div className="flex flex-col gap-3">
                {teams.map((t) => (
                  <TeamEditor key={t.id} team={t} onUpdate={updateTeam} />
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-3">Completed Segments ({completedSegments}/7)</p>
              <div className="flex flex-col gap-2">
                {SEGMENTS.map((seg, i) => (
                  <label key={seg} className="flex items-center gap-3 cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={i < completedSegments}
                      onChange={(e) => markSegmentComplete(e.target.checked ? i + 1 : i)}
                      className="w-5 h-5 accent-purple-500"
                    />
                    <span className={`text-sm ${i < completedSegments ? 'text-white/60 line-through' : 'text-white'}`}>{seg}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TIMERS TAB */}
        {tab === 'timers' && (
          <div className="flex flex-col gap-4">
            <p className="text-white/40 text-xs">Changes apply immediately. Timers already running are not affected.</p>

            {[
              { key: 'phase1_secs',       label: '🎵 Phase I — Guess the Song',    unit: 'min' },
              { key: 'ball_pyramid_secs', label: '🏆 Ball Pyramid',                unit: 'min' },
              { key: 'cup_dribble_secs',  label: '🏃 Cup Dribble Relay',           unit: 'min' },
              { key: 'cone_hole_secs',    label: '🎯 Cone in Hole',                unit: 'min' },
              { key: 'cup_straw_secs',    label: '🥤 Cup Straw Balance',           unit: 'sec' },
              { key: 'phase3_secs',       label: '🧠 Phase III — Shout the Thought', unit: 'min' },
            ].map(({ key, label, unit }) => {
              const current = settings[key as keyof typeof settings] as number
              const displayVal = unit === 'min' ? Math.round(current / 60) : current
              return (
                <div key={key} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{label}</p>
                    <p className="text-white/40 text-xs mt-0.5">in {unit === 'min' ? 'minutes' : 'seconds'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateSettings({ [key]: unit === 'min' ? Math.max(60, current - 60) : Math.max(10, current - 10) } as any)}
                      className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 text-white font-black text-lg active:scale-90 transition-all">−</button>
                    <span className="text-white font-black text-xl w-10 text-center tabular-nums">{displayVal}</span>
                    <button
                      onClick={() => updateSettings({ [key]: unit === 'min' ? current + 60 : current + 10 } as any)}
                      className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 text-white font-black text-lg active:scale-90 transition-all">+</button>
                  </div>
                </div>
              )
            })}

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-white font-medium text-sm">⚡ Max Time Bonus</p>
                <p className="text-white/40 text-xs mt-0.5">Extra pts awarded for finishing fast</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateSettings({ time_bonus_max: Math.max(0, settings.time_bonus_max - 5) })}
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 text-white font-black text-lg active:scale-90 transition-all">−</button>
                <span className="text-white font-black text-xl w-10 text-center tabular-nums">{settings.time_bonus_max}</span>
                <button onClick={() => updateSettings({ time_bonus_max: settings.time_bonus_max + 5 })}
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 text-white font-black text-lg active:scale-90 transition-all">+</button>
              </div>
            </div>

            <button onClick={resetSettings} className="danger-btn-secondary">↺ Reset Timers to Defaults</button>
          </div>
        )}

        {/* SONGS TAB */}
        {tab === 'songs' && (
          <>
            {/* Language pills */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveLang('tamil')}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all min-h-[48px] ${
                  activeLang === 'tamil' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
                🎵 Tamil
                <span className="ml-1 text-xs opacity-70">({songs.filter(s => s.language === 'tamil').length})</span>
              </button>
              <button
                onClick={() => setActiveLang('hindi')}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all min-h-[48px] ${
                  activeLang === 'hindi' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
                🎬 Hindi
                <span className="ml-1 text-xs opacity-70">({songs.filter(s => s.language === 'hindi').length})</span>
              </button>
            </div>
            <LevelTabs active={activeLevel} onChange={setActiveLevel} />
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/50 text-xs mb-3 font-medium">Add New Song</p>
              <SongForm onSave={(s) => addSong(s as any)} />
            </div>
            <SongList
              songs={songs.filter(s => s.language === activeLang)}
              level={activeLevel}
              onDelete={deleteSong}
              onUpdate={updateSong}
            />
          </>
        )}

        {/* DANGER TAB */}
        {tab === 'danger' && (
          <div className="flex flex-col gap-3">

            {/* Full reset — most prominent */}
            <div className="rounded-2xl bg-red-950/50 border-2 border-red-500/50 p-4 flex flex-col gap-3">
              <div>
                <p className="text-red-400 font-black text-lg">🔁 Full Reset</p>
                <p className="text-white/40 text-xs mt-1">
                  Clears all scores, all timers, all button states, resets used songs and event phase. Takes you back to the start screen.
                </p>
              </div>
              <ConfirmButton
                label="RESET EVERYTHING"
                confirmLabel="Yes, reset everything!"
                onConfirm={handleFullReset}
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xl min-h-[60px] transition-colors"
              />
            </div>

            <div className="border-t border-white/10 pt-3 flex flex-col gap-3">
              <p className="text-white/30 text-xs uppercase tracking-wider">Individual resets</p>
              <button onClick={() => resetUsed()} className="danger-btn-secondary">
                🔄 Reset Used Songs only
              </button>
              <button onClick={restoreDefaults} className="danger-btn-secondary">
                📦 Restore Default Songs
              </button>
              <button onClick={() => { if (confirm('Reset ALL scores? This cannot be undone!')) resetScores() }} className="danger-btn-secondary">
                🗑 Reset Scores only
              </button>
            </div>

            <div className="mt-2 bg-red-950/40 rounded-2xl p-4 border border-red-500/30">
              <p className="text-red-400 font-bold mb-1">⚠️ End Event Early</p>
              <p className="text-white/40 text-xs mb-3">
                {completedSegments}/7 segments completed. Scores will be weighted proportionally.
              </p>
              <ConfirmButton
                label="🚨 END EVENT NOW"
                confirmLabel="Yes, reveal the podium!"
                onConfirm={handleEndEvent}
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xl min-h-[60px] transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
