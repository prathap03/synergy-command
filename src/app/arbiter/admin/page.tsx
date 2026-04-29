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
import SongForm from '@/components/SongForm'
import SongList from '@/components/SongList'
import LevelTabs from '@/components/LevelTabs'
import BottomNav from '@/components/BottomNav'
import { DEFAULT_SONGS } from '@/lib/defaultData'
import { supabase } from '@/lib/supabase'

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
  const [editingTeam, setEditingTeam] = useState<string | null>(null)
  const [teamName, setTeamName] = useState('')
  const [showEnd, setShowEnd] = useState(false)
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
              <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-3">Team Names</p>
              <div className="flex flex-col gap-2">
                {teams.map((t) => (
                  <div key={t.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                    {editingTeam === t.id ? (
                      <>
                        <input
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="input-field flex-1 py-2"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') { updateTeam(t.id, { name: teamName }); setEditingTeam(null) }
                            if (e.key === 'Escape') setEditingTeam(null)
                          }}
                        />
                        <button onClick={() => { updateTeam(t.id, { name: teamName }); setEditingTeam(null) }} className="btn-primary px-3 py-2 text-sm min-h-[40px]">✓</button>
                      </>
                    ) : (
                      <>
                        <span className="text-white flex-1 font-medium">{t.name}</span>
                        <button onClick={() => { setEditingTeam(t.id); setTeamName(t.name) }} className="btn-ghost px-3 py-2 text-sm min-h-[40px]">✏️</button>
                      </>
                    )}
                  </div>
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
            <LevelTabs active={activeLevel} onChange={setActiveLevel} />
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/50 text-xs mb-3 font-medium">Add New Song</p>
              <SongForm onSave={(s) => addSong(s as any)} />
            </div>
            <SongList songs={songs} level={activeLevel} onDelete={deleteSong} onUpdate={updateSong} />
          </>
        )}

        {/* DANGER TAB */}
        {tab === 'danger' && (
          <div className="flex flex-col gap-3">
            <button onClick={() => resetUsed()} className="danger-btn-secondary">
              🔄 Reset Used Songs (re-pool all songs)
            </button>
            <button onClick={restoreDefaults} className="danger-btn-secondary">
              📦 Restore Default Songs
            </button>
            <button onClick={() => { if (confirm('Reset ALL scores? This cannot be undone!')) resetScores() }} className="danger-btn-secondary">
              🗑 Reset All Scores
            </button>

            <div className="mt-2 bg-red-950/40 rounded-2xl p-4 border border-red-500/30">
              <p className="text-red-400 font-bold mb-1">⚠️ End Event Early</p>
              <p className="text-white/40 text-xs mb-3">
                {completedSegments}/7 segments completed. Scores will be weighted proportionally.
              </p>
              {!showEnd ? (
                <button onClick={() => setShowEnd(true)} className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xl min-h-[60px] transition-colors">
                  🚨 END EVENT NOW
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-red-300 text-sm text-center font-semibold">Are you sure? This reveals the podium!</p>
                  <button onClick={handleEndEvent} className="w-full py-3 rounded-xl bg-red-600 text-white font-black min-h-[52px]">Yes, End It!</button>
                  <button onClick={() => setShowEnd(false)} className="w-full py-3 rounded-xl bg-white/10 text-white/50 font-medium min-h-[52px]">Cancel</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
