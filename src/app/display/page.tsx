'use client'

export const dynamic = 'force-dynamic'

import { useTeams } from '@/lib/useTeams'
import { useScores } from '@/lib/useScores'
import { useEventState } from '@/lib/useEventState'
import Leaderboard from '@/components/Leaderboard'
import ActiveTeamBanner from '@/components/ActiveTeamBanner'

export default function DisplayPage() {
  const { teams } = useTeams()
  const { teamScores } = useScores(teams)
  const { state } = useEventState()

  const activeTeam = teams.find((t) => t.id === state?.active_team_id) ?? null
  const ondeckTeam = teams.find((t) => t.id === state?.ondeck_team_id) ?? null

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <ActiveTeamBanner
        activeTeam={activeTeam}
        ondeckTeam={ondeckTeam}
        phase={state?.current_phase ?? 0}
        level={state?.phase1_active_level ?? 1}
      />

      <div className="flex-1 flex flex-col gap-4 p-4 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">🏆 Live Scores</h1>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            LIVE
          </div>
        </div>

        <Leaderboard teamScores={teamScores} />
      </div>

      <div className="text-center py-4 text-white/20 text-xs">
        Synergy Command • Powered by the funk of AR Rahman
      </div>
    </div>
  )
}
