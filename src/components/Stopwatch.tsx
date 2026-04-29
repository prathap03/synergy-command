'use client'

import { useStopwatch } from '@/lib/useTimer'
import type { Team } from '@/lib/types'

interface Props {
  team: Team
  onRecord?: (elapsed: number) => void
}

export default function Stopwatch({ team, onRecord }: Props) {
  const { elapsed, running, formatted, start, stop, reset } = useStopwatch()

  const handleStop = () => {
    stop()
    if (onRecord) onRecord(elapsed)
  }

  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3 border"
      style={{ borderColor: team.color + '60', backgroundColor: team.color + '11' }}
    >
      <span className="font-semibold text-white">{team.name}</span>
      <span className="font-mono text-xl font-bold tabular-nums" style={{ color: team.color }}>
        {formatted}
      </span>
      <div className="flex gap-2">
        {!running ? (
          <button
            onClick={start}
            disabled={elapsed > 0}
            className="min-w-[44px] min-h-[44px] rounded-lg bg-green-500/20 hover:bg-green-500/40 text-green-400 font-bold disabled:opacity-40 transition-colors"
          >
            ▶
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="min-w-[44px] min-h-[44px] rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 font-bold transition-colors"
          >
            ⏹
          </button>
        )}
        <button
          onClick={reset}
          className="min-w-[44px] min-h-[44px] rounded-lg bg-white/10 hover:bg-white/20 text-white/50 transition-colors"
        >
          ↺
        </button>
      </div>
    </div>
  )
}
