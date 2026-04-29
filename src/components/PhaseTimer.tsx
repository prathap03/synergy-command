'use client'

import { useTimer, formatTime } from '@/lib/useTimer'

interface Props {
  durationSec: number
  label?: string
  autoStart?: boolean
  fullscreen?: boolean
  onDone?: () => void
}

export default function PhaseTimer({ durationSec, label, autoStart = false, fullscreen = false, onDone }: Props) {
  const { remaining, running, start, pause, reset, pct, done } = useTimer(durationSec)

  const color = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#ef4444'

  if (done && onDone) onDone()

  if (fullscreen) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        {label && <p className="text-white/60 text-lg font-medium">{label}</p>}
        <div
          className={`text-8xl font-black tabular-nums transition-colors ${done ? 'animate-pulse' : ''}`}
          style={{ color }}
        >
          {formatTime(remaining)}
        </div>
        <div className="flex gap-3 mt-2">
          {!running ? (
            <button onClick={start} className="btn-primary px-8 py-3 text-xl">▶ Start</button>
          ) : (
            <button onClick={pause} className="btn-secondary px-8 py-3 text-xl">⏸ Pause</button>
          )}
          <button onClick={() => reset()} className="btn-ghost px-6 py-3 text-xl">↺ Reset</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
      {label && <span className="text-white/50 text-xs">{label}</span>}
      <span
        className={`font-mono font-bold tabular-nums text-lg transition-colors ${done ? 'animate-pulse' : ''}`}
        style={{ color }}
      >
        {formatTime(remaining)}
      </span>
      {!running ? (
        <button onClick={start} className="text-white/70 hover:text-white text-sm min-w-[32px] min-h-[32px]">▶</button>
      ) : (
        <button onClick={pause} className="text-white/70 hover:text-white text-sm min-w-[32px] min-h-[32px]">⏸</button>
      )}
      <button onClick={() => reset()} className="text-white/40 hover:text-white/70 text-sm min-w-[32px] min-h-[32px]">↺</button>
    </div>
  )
}
