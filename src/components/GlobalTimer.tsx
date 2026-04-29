'use client'

import { useTimer, formatTime } from '@/lib/useTimer'

export default function GlobalTimer() {
  const { remaining, running, start, pause, reset, pct } = useTimer(60 * 60)
  const color = pct > 0.25 ? (pct > 0.5 ? '#22c55e' : '#f59e0b') : '#ef4444'

  return (
    <div className="flex items-center gap-2 bg-black/30 rounded-2xl px-4 py-2 border border-white/10">
      <span className="text-white/50 text-xs font-medium">EVENT</span>
      <span
        className={`font-mono font-black text-2xl tabular-nums transition-colors ${remaining < 60 ? 'animate-pulse' : ''}`}
        style={{ color }}
      >
        {formatTime(remaining)}
      </span>
      {!running ? (
        <button onClick={start} className="min-w-[40px] min-h-[40px] rounded-full bg-green-500/20 hover:bg-green-500/40 text-green-400 flex items-center justify-center text-lg transition-colors">▶</button>
      ) : (
        <button onClick={pause} className="min-w-[40px] min-h-[40px] rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 flex items-center justify-center text-lg transition-colors">⏸</button>
      )}
      <button onClick={() => reset()} className="min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 text-white/50 flex items-center justify-center text-lg transition-colors">↺</button>
    </div>
  )
}
