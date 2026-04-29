'use client'

import { useEffect, useRef } from 'react'
import type { TeamScore } from '@/lib/types'

const MEDALS = ['🥇', '🥈', '🥉', '4️⃣']

interface Props {
  teamScores: TeamScore[]
  compact?: boolean
}

export default function Leaderboard({ teamScores, compact = false }: Props) {
  const prevOrder = useRef<string[]>([])

  useEffect(() => {
    prevOrder.current = teamScores.map((ts) => ts.team.id)
  }, [teamScores])

  return (
    <div className="flex flex-col gap-2 w-full">
      {teamScores.map((ts, i) => (
        <div
          key={ts.team.id}
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
            compact ? '' : 'shadow-lg'
          }`}
          style={{ backgroundColor: ts.team.color + '22', borderLeft: `4px solid ${ts.team.color}` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{MEDALS[i]}</span>
            <div>
              <p className={`font-bold text-white ${compact ? 'text-base' : 'text-xl'}`}>{ts.team.name}</p>
              {!compact && (
                <p className="text-white/50 text-xs">{ts.team.members.join(', ')}</p>
              )}
            </div>
          </div>
          <div
            className={`font-black text-right tabular-nums ${compact ? 'text-2xl' : 'text-4xl'}`}
            style={{ color: ts.team.color }}
          >
            {ts.total}
            <span className="text-xs font-normal text-white/40 ml-1">pts</span>
          </div>
        </div>
      ))}
    </div>
  )
}
