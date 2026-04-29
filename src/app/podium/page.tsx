'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTeams } from '@/lib/useTeams'
import { useScores } from '@/lib/useScores'
import { useEventState } from '@/lib/useEventState'
import type { TeamScore } from '@/lib/types'

const MEDALS = ['🥇', '🥈', '🥉', '🏅']
const PODIUM_HEIGHTS = ['h-40', 'h-28', 'h-20', 'h-14']
const PODIUM_ANIM = ['delay-0', 'delay-100', 'delay-200', 'delay-300']

export default function PodiumPage() {
  const { teams } = useTeams()
  const { teamScores, getWeightedScores } = useScores(teams)
  const { state } = useEventState()
  const [revealed, setRevealed] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const isWeighted = state?.weighted_finish ?? false
  const completedPct = state ? Math.round((state.completed_segments / 7) * 100) : 100
  const finalScores: TeamScore[] = isWeighted ? getWeightedScores(state?.completed_segments ?? 7) : teamScores

  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true)
      setTimeout(() => setConfetti(true), 500)
    }, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center overflow-hidden">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center">
          <div className="text-6xl animate-confetti-fall mt-10">🎊🎉🏆🎊🎉🏆🎊</div>
        </div>
      )}

      <div className="w-full max-w-sm flex flex-col items-center gap-6 px-4 py-8">
        <div className="text-center">
          {isWeighted && (
            <div className="mb-2 px-4 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-semibold inline-block">
              ⚡ Weighted Finish — {completedPct}% completed
            </div>
          )}
          <h1 className="text-4xl font-black text-white mt-2">🏆 Champions!</h1>
        </div>

        {/* Podium visual */}
        <div className="flex items-end gap-3 w-full justify-center mt-4">
          {[finalScores[1], finalScores[0], finalScores[2]].filter(Boolean).map((ts, idx) => {
            const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3
            const heights = ['h-28', 'h-40', 'h-20']
            return (
              <div key={ts.team.id} className={`flex flex-col items-center ${revealed ? 'animate-slide-up' : 'opacity-0'}`}>
                <span className="text-3xl mb-1">{MEDALS[rank - 1]}</span>
                <p className="text-white font-bold text-sm text-center max-w-[80px] leading-tight">{ts.team.name}</p>
                <p className="font-black text-2xl tabular-nums mb-2" style={{ color: ts.team.color }}>{ts.total}</p>
                <div
                  className={`${heights[idx]} w-20 rounded-t-xl flex items-end justify-center pb-2`}
                  style={{ backgroundColor: ts.team.color + '44', border: `2px solid ${ts.team.color}60` }}
                >
                  <span className="text-white/60 font-bold text-sm">#{rank}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Full ranking */}
        <div className="w-full flex flex-col gap-2 mt-2">
          {finalScores.map((ts, i) => (
            <div
              key={ts.team.id}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl ${revealed ? 'animate-slide-up' : 'opacity-0'}`}
              style={{
                backgroundColor: ts.team.color + '22',
                borderLeft: `4px solid ${ts.team.color}`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{MEDALS[i]}</span>
                <span className="font-bold text-white text-lg">{ts.team.name}</span>
              </div>
              <span className="font-black text-3xl tabular-nums" style={{ color: ts.team.color }}>
                {ts.total}
              </span>
            </div>
          ))}
        </div>

        <Link href="/arbiter/home" className="text-white/30 text-sm underline mt-4">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
