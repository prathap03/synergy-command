'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { useTeams } from '@/lib/useTeams'
import { useScores } from '@/lib/useScores'
import PhaseTimer from '@/components/PhaseTimer'
import CountdownBlast from '@/components/CountdownBlast'
import PenaltyBar from '@/components/PenaltyBar'
import BottomNav from '@/components/BottomNav'
import { PHASE_TIMERS } from '@/lib/types'
import { PHASE3_CATEGORIES } from '@/lib/defaultData'

export default function Phase3Page() {
  const { role, checked } = useAuth()
  const router = useRouter()
  const { teams } = useTeams()
  const { addScore } = useScores(teams)
  const [round, setRound] = useState(1)
  const [category, setCategory] = useState('')
  const [matched, setMatched] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => { if (checked && !role) router.replace('/arbiter') }, [role, checked])
  if (!checked || !role) return null

  const handleMatch = (teamId: string) => {
    onScore(teamId, 20, `Shout the Thought — Round ${round} MATCH!`)
    setMatched((p) => [...p, teamId])
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
  }

  const onScore = (id: string, pts: number, reason: string) => addScore(id, pts, reason, 3)

  const nextRound = () => {
    if (round < 3) { setRound((r) => r + 1); setCategory(''); setMatched([]) }
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-[80px] animate-bounce">🎊</div>
        </div>
      )}

      <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-white">🧠 Shout the Thought</h1>
            <p className="text-white/40 text-xs">Round {round} of 3</p>
          </div>
          <PhaseTimer durationSec={PHASE_TIMERS.phase3} label="Phase III" />
        </div>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              className={`flex-1 h-1 rounded-full ${r <= round ? 'bg-purple-500' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Category input */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <p className="text-white/50 text-xs mb-2">Category for Round {round}</p>
          <input
            placeholder="Type category or pick below..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field text-xl font-bold mb-3"
          />
          <div className="flex flex-wrap gap-2">
            {PHASE3_CATEGORIES.slice(0, 6).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-3 py-2 rounded-xl bg-white/10 text-white/60 text-xs hover:bg-white/20 transition-colors min-h-[40px]"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Category display */}
        {category && (
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-5 text-center border border-purple-500/30">
            <p className="text-white/50 text-sm mb-1">Category</p>
            <p className="text-3xl font-black text-white">{category}</p>
          </div>
        )}

        {/* Countdown blast */}
        <CountdownBlast />

        {/* Team score buttons */}
        <div className="flex flex-col gap-3">
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Award Points</p>
          {teams.map((t) => {
            const isMatched = matched.includes(t.id)
            return (
              <div
                key={t.id}
                className="rounded-2xl border p-4 flex items-center justify-between"
                style={{ borderColor: t.color + '40', backgroundColor: t.color + '11' }}
              >
                <span className="font-bold text-white text-lg">{t.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMatch(t.id)}
                    disabled={isMatched}
                    className="min-w-[80px] min-h-[52px] rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 font-black text-lg disabled:opacity-40 active:scale-90 transition-all"
                  >
                    {isMatched ? '✅' : '+20 🎊'}
                  </button>
                  <button
                    onClick={() => onScore(t.id, 0, `Shout the Thought — Round ${round} No Match`)}
                    className="min-w-[64px] min-h-[52px] rounded-xl bg-white/10 text-white/40 font-bold text-lg active:scale-90 transition-all"
                  >
                    😬 0
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {round < 3 ? (
          <button onClick={nextRound} className="btn-secondary py-4 font-black text-lg min-h-[60px]">
            Next Round ➡️ ({round}/3)
          </button>
        ) : (
          <a
            href="/podium"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black text-xl text-center block min-h-[60px] flex items-center justify-center active:scale-95 transition-all"
          >
            🏆 Reveal Champion!
          </a>
        )}
      </div>

      <PenaltyBar teams={teams} onPenalty={(id, pts, reason) => onScore(id, pts, reason)} />
      <BottomNav />
    </div>
  )
}
