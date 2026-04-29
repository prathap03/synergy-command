'use client'

import { useEffect, useState } from 'react'
import type { Team } from '@/lib/types'

interface Props {
  activeTeam: Team | null
  ondeckTeam: Team | null
  phase: number
  level: number
}

const PHASE_LABELS: Record<number, string> = {
  0: 'Setup',
  1: 'Phase I — Guess the Song',
  2: 'Phase II — Kinetic Challenges',
  3: 'Phase III — Shout the Thought',
}

const LEVEL_LABELS: Record<number, string> = {
  1: '🎵 Round 1: Nostalgia',
  2: '🔥 Round 2: Modern Kuthu',
  3: '🤪 Round 3: Absurd Literalism',
}

export default function ActiveTeamBanner({ activeTeam, ondeckTeam, phase, level }: Props) {
  const [showAlert, setShowAlert] = useState(false)
  const [prevActiveId, setPrevActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (activeTeam && activeTeam.id !== prevActiveId) {
      setShowAlert(true)
      setPrevActiveId(activeTeam.id)
      const t = setTimeout(() => setShowAlert(false), 10000)
      return () => clearTimeout(t)
    }
  }, [activeTeam?.id])

  return (
    <>
      {showAlert && activeTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-8">
            <p className="text-white/60 text-xl mb-2">NOW PLAYING</p>
            <div
              className="text-6xl font-black text-white py-4 px-8 rounded-3xl mb-4"
              style={{ backgroundColor: activeTeam.color }}
            >
              {activeTeam.name}
            </div>
            {ondeckTeam && (
              <p className="text-white/50 text-lg">Up next: {ondeckTeam.name}</p>
            )}
            <button
              onClick={() => setShowAlert(false)}
              className="mt-6 text-white/30 text-sm underline"
            >
              dismiss
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col gap-1 px-4 py-3 bg-black/30 border-b border-white/10">
        <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{PHASE_LABELS[phase] || ''}{phase === 1 ? ` — ${LEVEL_LABELS[level]}` : ''}</p>
        <div className="flex items-center gap-3 flex-wrap">
          {activeTeam ? (
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">NOW PLAYING</span>
              <span
                className="px-3 py-1 rounded-full text-white font-bold text-sm"
                style={{ backgroundColor: activeTeam.color }}
              >
                🎯 {activeTeam.name}
              </span>
            </div>
          ) : (
            <span className="text-white/30 text-sm">No active team</span>
          )}
          {ondeckTeam && (
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">ON DECK</span>
              <span
                className="px-3 py-1 rounded-full font-bold text-sm border"
                style={{ color: ondeckTeam.color, borderColor: ondeckTeam.color + '60' }}
              >
                ⏭ {ondeckTeam.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
