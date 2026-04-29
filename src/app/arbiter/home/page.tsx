'use client'

export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { useTeams } from '@/lib/useTeams'
import { useScores } from '@/lib/useScores'
import { useEventState } from '@/lib/useEventState'
import Leaderboard from '@/components/Leaderboard'
import GlobalTimer from '@/components/GlobalTimer'
import TeamChip from '@/components/TeamChip'
import PenaltyBar from '@/components/PenaltyBar'
import QRCodeDisplay from '@/components/QRCodeDisplay'
import BottomNav from '@/components/BottomNav'

export default function ArbiterHome() {
  const { role, checked } = useAuth()
  const router = useRouter()
  const { teams } = useTeams()
  const { teamScores, addScore } = useScores(teams)
  const { state, setActiveTeam, setOndeckTeam, setPhase } = useEventState()

  useEffect(() => {
    if (checked && !role) router.replace('/arbiter')
  }, [role, checked])

  if (!checked || !role) return null

  const activeTeam = teams.find((t) => t.id === state?.active_team_id)
  const ondeckTeam = teams.find((t) => t.id === state?.ondeck_team_id)

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-white">🎮 Synergy Command</h1>
          <GlobalTimer />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* QR Code (setup phase) */}
        {(!state?.current_phase || state.current_phase === 0) && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/60 text-sm font-medium">📱 Share with participants</p>
            <QRCodeDisplay />
          </div>
        )}

        {/* Phase navigation */}
        <div className="flex flex-col gap-2">
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Jump to Phase</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { phase: 1, href: '/arbiter/phase1', label: 'Phase I', emoji: '🎵', sub: 'Guess the Song' },
              { phase: 2, href: '/arbiter/phase2', label: 'Phase II', emoji: '💪', sub: 'Kinetic Games' },
              { phase: 3, href: '/arbiter/phase3', label: 'Phase III', emoji: '🧠', sub: 'Shout the Thought' },
            ].map((p) => (
              <Link
                key={p.phase}
                href={p.href}
                onClick={() => setPhase(p.phase)}
                className={`flex flex-col items-center py-4 rounded-2xl border-2 font-semibold transition-all min-h-[80px] ${
                  state?.current_phase === p.phase
                    ? 'border-white/40 bg-white/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                <span className="text-3xl">{p.emoji}</span>
                <span className="text-sm font-bold mt-1">{p.label}</span>
                <span className="text-[10px] text-white/40">{p.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Active / On-Deck Team selectors */}
        <div className="flex flex-col gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
          <div>
            <p className="text-white/50 text-xs mb-2">🎯 Active Team (now playing)</p>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => (
                <TeamChip
                  key={t.id}
                  team={t}
                  selected={state?.active_team_id === t.id}
                  onClick={() => setActiveTeam(state?.active_team_id === t.id ? null : t.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-2">⏭ On-Deck Team</p>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => (
                <TeamChip
                  key={t.id}
                  team={t}
                  selected={state?.ondeck_team_id === t.id}
                  onClick={() => setOndeckTeam(state?.ondeck_team_id === t.id ? null : t.id)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live leaderboard */}
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-2">🏆 Current Standings</p>
          <Leaderboard teamScores={teamScores} compact />
        </div>
      </div>

      <PenaltyBar teams={teams} onPenalty={(id, pts, reason) => addScore(id, pts, reason, state?.current_phase ?? 1)} />
      <BottomNav />
    </div>
  )
}
