'use client'

import { useState } from 'react'
import type { Team } from '@/lib/types'

interface Props {
  teams: Team[]
  onPenalty: (teamId: string, points: number, reason: string) => void
}

export default function PenaltyBar({ teams, onPenalty }: Props) {
  const [open, setOpen] = useState<'-5' | '-10' | null>(null)

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-gray-900 border border-white/20 rounded-2xl p-3 shadow-2xl flex flex-col gap-2 mb-1">
          <p className="text-white/60 text-xs px-1">{open} — pick team:</p>
          {teams.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                const reason = open === '-5' ? 'Spoiling Penalty' : 'Foul Penalty'
                onPenalty(t.id, parseInt(open), reason)
                setOpen(null)
              }}
              className="min-h-[44px] px-4 rounded-xl font-semibold text-white text-left transition-colors hover:opacity-80"
              style={{ backgroundColor: t.color + '33', borderLeft: `3px solid ${t.color}` }}
            >
              {t.name}
            </button>
          ))}
          <button onClick={() => setOpen(null)} className="text-white/30 text-xs text-center pt-1">cancel</button>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => setOpen(open === '-5' ? null : '-5')}
          className={`min-w-[56px] min-h-[56px] rounded-full font-black text-sm shadow-lg transition-all ${open === '-5' ? 'bg-orange-500 text-white scale-110' : 'bg-orange-500/20 text-orange-400 border border-orange-500/40'}`}
        >
          −5<br /><span className="text-[9px] font-normal">Spoil</span>
        </button>
        <button
          onClick={() => setOpen(open === '-10' ? null : '-10')}
          className={`min-w-[56px] min-h-[56px] rounded-full font-black text-sm shadow-lg transition-all ${open === '-10' ? 'bg-red-500 text-white scale-110' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}
        >
          −10<br /><span className="text-[9px] font-normal">Foul</span>
        </button>
      </div>
    </div>
  )
}
