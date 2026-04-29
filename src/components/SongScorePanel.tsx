'use client'

import { useState } from 'react'
import type { Team } from '@/lib/types'
import TeamChip from './TeamChip'

interface Props {
  teams: Team[]
  phase: number
  onScore: (teamId: string, points: number, reason: string) => void
}

const SCORE_ACTIONS = [
  { label: '✅ Song', points: 10, reason: 'Correct Song Guess', color: 'bg-green-500/20 border-green-500/40 text-green-400' },
  { label: '🎬 Movie', points: 5, reason: 'Movie Title Bonus', color: 'bg-blue-500/20 border-blue-500/40 text-blue-400' },
  { label: '🎤 Director/Singer', points: 5, reason: 'Director/Singer Bonus', color: 'bg-purple-500/20 border-purple-500/40 text-purple-400' },
  { label: '🙋 Audience Bonus', points: 5, reason: 'Audience Bonus', color: 'bg-amber-500/20 border-amber-500/40 text-amber-400' },
]

export default function SongScorePanel({ teams, phase, onScore }: Props) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [spoilTeam, setSpoilTeam] = useState<string | null>(null)
  const [awarded, setAwarded] = useState<string[]>([])

  const award = (points: number, reason: string) => {
    if (!selectedTeam) return
    onScore(selectedTeam, points, reason)
    setAwarded((prev) => [...prev, reason])
  }

  return (
    <div className="w-full rounded-3xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4">
      <p className="text-white/50 text-sm font-medium text-center">Award points to...</p>

      {/* Team selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {teams.map((t) => (
          <TeamChip
            key={t.id}
            team={t}
            selected={selectedTeam === t.id}
            onClick={() => setSelectedTeam(selectedTeam === t.id ? null : t.id)}
            size="md"
          />
        ))}
      </div>

      {/* Score buttons */}
      <div className="grid grid-cols-2 gap-2">
        {SCORE_ACTIONS.map((a) => {
          const done = awarded.includes(a.reason)
          return (
            <button
              key={a.reason}
              onClick={() => award(a.points, a.reason)}
              disabled={!selectedTeam || done}
              className={`py-4 rounded-2xl border font-bold text-lg min-h-[64px] transition-all active:scale-95 disabled:opacity-40 ${a.color} ${done ? 'opacity-40 line-through' : ''}`}
            >
              {a.label}
              <span className="block text-xs font-normal opacity-70">+{a.points} pts</span>
            </button>
          )
        })}
      </div>

      {/* Spoil penalty — separate team */}
      <div className="border-t border-white/10 pt-3">
        <p className="text-white/40 text-xs mb-2 text-center">Spoiling Penalty (pick offending team)</p>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {teams.map((t) => (
            <TeamChip
              key={t.id}
              team={t}
              selected={spoilTeam === t.id}
              onClick={() => setSpoilTeam(spoilTeam === t.id ? null : t.id)}
              size="sm"
            />
          ))}
        </div>
        <button
          onClick={() => { if (spoilTeam) { onScore(spoilTeam, -5, 'Spoiling Penalty'); setSpoilTeam(null) } }}
          disabled={!spoilTeam}
          className="w-full py-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold min-h-[52px] disabled:opacity-40 transition-all active:scale-95"
        >
          ⚡ Apply −5 Spoil Penalty
        </button>
      </div>
    </div>
  )
}
