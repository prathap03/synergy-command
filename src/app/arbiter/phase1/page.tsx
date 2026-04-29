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
import { useTimer, formatTime } from '@/lib/useTimer'
import LevelTabs from '@/components/LevelTabs'
import RandomizerButton from '@/components/RandomizerButton'
import SongRevealCard from '@/components/SongRevealCard'
import SongScorePanel from '@/components/SongScorePanel'
import PenaltyBar from '@/components/PenaltyBar'
import BottomNav from '@/components/BottomNav'
import TeamChip from '@/components/TeamChip'
import type { Song } from '@/lib/types'

export default function Phase1Page() {
  const { role, checked } = useAuth()
  const router = useRouter()
  const { teams } = useTeams()
  const { addScore } = useScores(teams)
  const { songs, markUsed, getUnusedByLevel } = useSongs()
  const { state, setLevel } = useEventState()
  const { settings } = useSettings()
  const timer = useTimer(settings.phase1_secs)
  const [level, setLocalLevel] = useState<1 | 2 | 3>(1)
  const [picked, setPicked] = useState<Song | null>(null)

  useEffect(() => { if (checked && !role) router.replace('/arbiter') }, [role, checked])
  useEffect(() => { if (state?.phase1_active_level) setLocalLevel(state.phase1_active_level as 1 | 2 | 3) }, [state?.phase1_active_level])

  if (!checked || !role) return null

  const handleLevelChange = (l: 1 | 2 | 3) => { setLocalLevel(l); setLevel(l) }

  const timerColor = timer.pct > 0.5 ? '#22c55e' : timer.pct > 0.25 ? '#f59e0b' : '#ef4444'

  const counts = { 1: getUnusedByLevel(1).length, 2: getUnusedByLevel(2).length, 3: getUnusedByLevel(3).length }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-white/10 px-4 py-2">
        <h1 className="text-base font-black text-white">🎵 Guess the Song</h1>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Timer + controls — inline with content */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Phase I Timer</p>
            <span className="text-white/30 text-xs">{formatTime(settings.phase1_secs)} total</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`font-mono font-black text-5xl tabular-nums flex-1 ${timer.done ? 'animate-pulse' : ''}`}
              style={{ color: timerColor }}
            >
              {formatTime(timer.remaining)}
            </span>
            <div className="flex flex-col gap-2">
              {!timer.running ? (
                <button onClick={timer.start} className="min-w-[56px] min-h-[48px] rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-lg">▶</button>
              ) : (
                <button onClick={timer.pause} className="min-w-[56px] min-h-[48px] rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold text-lg">⏸</button>
              )}
              <button onClick={() => timer.reset(settings.phase1_secs)} className="min-w-[56px] min-h-[48px] rounded-xl bg-white/10 text-white/40 font-bold text-lg">↺</button>
            </div>
          </div>
          {/* Time progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${timer.pct * 100}%`, backgroundColor: timerColor }} />
          </div>
          {timer.done && <p className="text-red-400 font-bold text-center animate-pulse">⏰ Time's up!</p>}
        </div>

        <LevelTabs active={level} onChange={handleLevelChange} counts={counts} />

        {picked ? (
          <>
            <SongRevealCard song={picked} onMarkUsed={() => markUsed(picked.id)} onDismiss={() => setPicked(null)} />
            <SongScorePanel teams={teams} phase={1} onScore={(id, pts, reason) => addScore(id, pts, reason, 1)} />
          </>
        ) : (
          <RandomizerButton songs={songs} level={level} onPicked={setPicked} />
        )}
      </div>

      <PenaltyBar teams={teams} onPenalty={(id, pts, reason) => addScore(id, pts, reason, 1)} />
      <BottomNav />
    </div>
  )
}
