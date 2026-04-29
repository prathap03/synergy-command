'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { useTeams } from '@/lib/useTeams'
import { useScores } from '@/lib/useScores'
import { useSettings } from '@/lib/useSettings'
import { useTimer, useStopwatch, formatTime } from '@/lib/useTimer'
import PenaltyBar from '@/components/PenaltyBar'
import BottomNav from '@/components/BottomNav'
import type { Team } from '@/lib/types'

// ── Inline timer widget ──────────────────────────────────────────────────────
function InlineTimer({ durationSec, label }: { durationSec: number; label: string }) {
  const timer = useTimer(durationSec)
  const pct = timer.pct
  const color = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#ef4444'

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-white/50 text-xs uppercase tracking-wider font-medium">{label} Timer</p>
        <span className="text-white/30 text-xs">{formatTime(durationSec)} total</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-mono font-black text-5xl tabular-nums flex-1 ${timer.done ? 'animate-pulse' : ''}`} style={{ color }}>
          {formatTime(timer.remaining)}
        </span>
        <div className="flex gap-2">
          {!timer.running
            ? <button onClick={timer.start} className="min-w-[52px] min-h-[48px] rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-xl">▶</button>
            : <button onClick={timer.pause} className="min-w-[52px] min-h-[48px] rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold text-xl">⏸</button>}
          <button onClick={() => timer.reset(durationSec)} className="min-w-[52px] min-h-[48px] rounded-xl bg-white/10 text-white/40 font-bold text-xl">↺</button>
        </div>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct * 100}%`, backgroundColor: color }} />
      </div>
      {timer.done && <p className="text-red-400 font-bold text-center text-sm animate-pulse">⏰ Time's up!</p>}
    </div>
  )
}

// ── Time bonus helper ────────────────────────────────────────────────────────
function TimeBonusPanel({ teams, remaining, total, maxBonus, onScore }:
  { teams: Team[], remaining: number, total: number, maxBonus: number, onScore: (id: string, pts: number, reason: string) => void }) {
  const bonus = Math.max(0, Math.round((remaining / total) * maxBonus))
  if (bonus === 0) return null
  return (
    <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 flex flex-col gap-2">
      <p className="text-amber-400 font-bold text-sm">⚡ Time Bonus available: +{bonus} pts</p>
      <p className="text-white/40 text-xs">{formatTime(remaining)} remaining → {Math.round((remaining/total)*100)}% of time left</p>
      <div className="flex flex-wrap gap-2">
        {teams.map((t) => (
          <button key={t.id} onClick={() => onScore(t.id, bonus, `Time Bonus +${bonus}`)}
            className="flex-1 min-h-[48px] rounded-xl font-bold text-white text-sm active:scale-90 transition-all"
            style={{ backgroundColor: t.color + '33', border: `1px solid ${t.color}60` }}>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Member stopwatch row (self-contained so hook isn't called in a loop) ──────
function MemberStopwatchRow({ name, color, onDone }: { name: string; color: string; onDone: (ms: number) => void }) {
  const sw = useStopwatch()
  const [locked, setLocked] = useState(false)
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'fail'>('idle')

  const handleStop = (result: 'done' | 'fail') => {
    sw.stop()
    setLocked(true)
    setStatus(result)
    onDone(result === 'done' ? sw.elapsed : -1)
  }

  const reset = () => { sw.reset(); setLocked(false); setStatus('idle') }

  const statusColor = status === 'done' ? '#22c55e' : status === 'fail' ? '#ef4444' : color

  return (
    <div className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{name}</p>
        <p className="font-mono text-base font-bold tabular-nums" style={{ color: statusColor }}>
          {sw.formatted}
          {status === 'done' && <span className="text-green-400 text-xs ml-2">✅ cleared</span>}
          {status === 'fail' && <span className="text-red-400 text-xs ml-2">❌ dropped</span>}
        </p>
      </div>
      <div className="flex gap-1.5 flex-shrink-0">
        {status === 'idle' && !sw.running && (
          <button onClick={sw.start}
            className="min-w-[44px] min-h-[44px] rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold active:scale-90 transition-all">
            ▶
          </button>
        )}
        {sw.running && (
          <>
            <button onClick={() => handleStop('done')}
              className="min-h-[44px] px-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 font-bold text-sm active:scale-90 transition-all">
              ✅
            </button>
            <button onClick={() => handleStop('fail')}
              className="min-h-[44px] px-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-sm active:scale-90 transition-all">
              ❌
            </button>
          </>
        )}
        {locked && (
          <button onClick={reset}
            className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 text-white/40 font-bold active:scale-90 transition-all">
            ↺
          </button>
        )}
      </div>
    </div>
  )
}

// ── Ball Pyramid ──────────────────────────────────────────────────────────────
function BallPyramidTeamCard({ team, onScore }: { team: Team; onScore: (pts: number, reason: string) => void }) {
  const [results, setResults] = useState<Record<string, number>>({})
  const [scored, setScored] = useState(false)

  const succeeded = Object.values(results).filter(ms => ms >= 0).length
  const total = team.members.length

  const handleMemberDone = (name: string, ms: number) => {
    setResults(prev => ({ ...prev, [name]: ms }))
  }

  const awardScore = () => {
    const pts = succeeded * 10
    onScore(pts, `Ball Pyramid — ${succeeded}/${total} members cleared`)
    setScored(true)
  }

  return (
    <div className="rounded-2xl border p-4 flex flex-col gap-2"
      style={{ borderColor: team.color + '50', backgroundColor: team.color + '0d' }}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-white">{team.name}</span>
        <span className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{ backgroundColor: team.color + '33', color: team.color }}>
          {succeeded}/{total} cleared
        </span>
      </div>

      <div className="flex flex-col">
        {team.members.map((member) => (
          <MemberStopwatchRow
            key={member}
            name={member}
            color={team.color}
            onDone={(ms) => handleMemberDone(member, ms)}
          />
        ))}
      </div>

      {!scored ? (
        <button
          onClick={awardScore}
          disabled={Object.keys(results).length === 0}
          className="mt-1 w-full min-h-[48px] rounded-xl font-black text-base active:scale-95 transition-all disabled:opacity-30"
          style={{ backgroundColor: team.color + '33', border: `1px solid ${team.color}60`, color: '#fff' }}
        >
          Award +{succeeded * 10} pts ({succeeded} × 10)
        </button>
      ) : (
        <div className="mt-1 w-full py-2 rounded-xl bg-green-500/10 text-green-400 font-bold text-sm text-center">
          ✅ +{succeeded * 10} pts awarded
        </div>
      )}
    </div>
  )
}

function BallPyramid({ teams, durationSec, maxBonus, onScore }:
  { teams: Team[], durationSec: number, maxBonus: number, onScore: (id: string, pts: number, reason: string) => void }) {
  const timer = useTimer(durationSec)

  return (
    <div className="flex flex-col gap-4">
      <InlineTimer durationSec={durationSec} label="Ball Pyramid" />

      <p className="text-white/40 text-xs px-1">
        Tap ▶ when a member starts removing their cup. Tap ✅ if they succeed, ❌ if the ball drops. Score is awarded after all members finish.
      </p>

      {teams.map((t) => (
        <BallPyramidTeamCard
          key={t.id}
          team={t}
          onScore={(pts, reason) => onScore(t.id, pts, reason)}
        />
      ))}

      <TimeBonusPanel teams={teams} remaining={timer.remaining} total={durationSec} maxBonus={maxBonus} onScore={onScore} />
    </div>
  )
}

// ── Cup Dribble ───────────────────────────────────────────────────────────────
function CupDribble({ teams, durationSec, onScore }:
  { teams: Team[], durationSec: number, onScore: (id: string, pts: number, reason: string) => void }) {
  const [times, setTimes] = useState<Record<string, number>>({})
  const [ranked, setRanked] = useState(false)

  // Per-team stopwatches
  const stopwatches = teams.map(() => useStopwatch())

  const calcRankings = () => {
    const recorded = Object.entries(times).filter(([, t]) => t > 0)
    if (!recorded.length) return
    const sorted = [...recorded].sort((a, b) => a[1] - b[1])
    const pts = [40, 30, 20, 10]
    sorted.forEach(([id], i) => onScore(id, pts[i] ?? 10, `Cup Dribble — ${['1st','2nd','3rd','4th'][i] ?? `${i+1}th`} place`))
    setRanked(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <InlineTimer durationSec={durationSec} label="Cup Dribble" />

      <div className="flex flex-col gap-2">
        <p className="text-white/50 text-xs">Each member fans a cup to the line and back. Record each team's total relay time.</p>
        {teams.map((t, i) => {
          const sw = stopwatches[i]
          return (
            <div key={t.id} className="rounded-xl border p-3 flex flex-col gap-2"
              style={{ borderColor: t.color + '40', backgroundColor: t.color + '0d' }}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{t.name}</span>
                <span className="font-mono font-bold text-xl tabular-nums" style={{ color: t.color }}>{sw.formatted}</span>
              </div>
              <div className="flex gap-2">
                {!sw.running
                  ? <button onClick={sw.start} disabled={sw.elapsed > 0}
                      className="flex-1 min-h-[48px] rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 font-bold disabled:opacity-40 active:scale-90 transition-all">▶ Start</button>
                  : <button onClick={() => { sw.stop(); setTimes(p => ({ ...p, [t.id]: sw.elapsed })) }}
                      className="flex-1 min-h-[48px] rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold active:scale-90 transition-all">⏹ Stop</button>}
                <button onClick={sw.reset} className="min-w-[48px] min-h-[48px] rounded-xl bg-white/10 text-white/40 font-bold active:scale-90 transition-all">↺</button>
              </div>
            </div>
          )
        })}
      </div>

      {!ranked ? (
        <button onClick={calcRankings} disabled={Object.keys(times).length < teams.length}
          className="btn-primary py-4 font-black text-lg min-h-[60px] disabled:opacity-40">
          🏆 Calculate Rankings & Award Points
        </button>
      ) : <p className="text-green-400 text-center font-semibold">✅ Points awarded!</p>}
    </div>
  )
}

// ── Cone in Hole ──────────────────────────────────────────────────────────────
function ConeInHole({ teams, durationSec, maxBonus, onScore }:
  { teams: Team[], durationSec: number, maxBonus: number, onScore: (id: string, pts: number, reason: string) => void }) {
  const timer = useTimer(durationSec)

  return (
    <div className="flex flex-col gap-4">
      <InlineTimer durationSec={durationSec} label="Cone in Hole" />

      {/* Scoring key */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-green-400">
          <div className="text-2xl">✅</div>
          <div className="font-bold text-base">+15</div>
          <div className="text-white/40 mt-0.5">Success</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-white/40">
          <div className="text-2xl">❌</div>
          <div className="font-bold text-base">0</div>
          <div className="mt-0.5">Miss</div>
        </div>
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-400">
          <div className="text-2xl">🚨</div>
          <div className="font-bold text-base">−10</div>
          <div className="text-white/40 mt-0.5">Touch foul</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {teams.map((t) => (
          <div key={t.id} className="rounded-xl border p-3 flex flex-col gap-2"
            style={{ borderColor: t.color + '40', backgroundColor: t.color + '0d' }}>
            <span className="font-semibold text-white">{t.name}</span>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => onScore(t.id, 15, 'Cone in Hole — Success')}
                className="min-h-[52px] rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 font-black text-base active:scale-90 transition-all">✅ +15</button>
              <button onClick={() => onScore(t.id, 0, 'Cone in Hole — Miss')}
                className="min-h-[52px] rounded-xl bg-white/10 border border-white/15 text-white/50 font-black text-base active:scale-90 transition-all">❌ 0</button>
              <button onClick={() => onScore(t.id, -10, 'Cone in Hole — Physical Touch')}
                className="min-h-[52px] rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-black text-base active:scale-90 transition-all">🚨 −10</button>
            </div>
          </div>
        ))}
      </div>

      <TimeBonusPanel teams={teams} remaining={timer.remaining} total={durationSec} maxBonus={maxBonus} onScore={onScore} />
    </div>
  )
}

// ── Cup Straw ─────────────────────────────────────────────────────────────────
function CupStraw({ teams, durationSec, onScore }:
  { teams: Team[], durationSec: number, onScore: (id: string, pts: number, reason: string) => void }) {
  const timer = useTimer(durationSec)
  const [counts, setCounts] = useState<Record<string, string>>({})
  const [awarded, setAwarded] = useState(false)
  const color = timer.pct > 0.5 ? '#22c55e' : timer.pct > 0.25 ? '#f59e0b' : '#ef4444'

  const awardAll = () => {
    Object.entries(counts).forEach(([id, val]) => {
      const n = parseInt(val) || 0
      if (n > 0) onScore(id, n * 5, `Cup Straw Balance — ${n} straws`)
    })
    setAwarded(true)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Big 60s countdown — center stage */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col items-center gap-3">
        <p className="text-white/50 text-xs uppercase tracking-wider font-medium">60-Second Countdown</p>
        <span className={`font-mono font-black text-8xl tabular-nums ${timer.done ? 'animate-pulse' : ''}`} style={{ color }}>
          {formatTime(timer.remaining)}
        </span>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${timer.pct * 100}%`, backgroundColor: color }} />
        </div>
        <div className="flex gap-3 w-full">
          {!timer.running
            ? <button onClick={timer.start} className="flex-1 min-h-[56px] rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-black text-xl active:scale-95 transition-all">▶ Start</button>
            : <button onClick={timer.pause} className="flex-1 min-h-[56px] rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-black text-xl active:scale-95 transition-all">⏸ Pause</button>}
          <button onClick={() => timer.reset(durationSec)} className="min-w-[60px] min-h-[56px] rounded-xl bg-white/10 text-white/40 font-bold text-xl active:scale-95 transition-all">↺</button>
        </div>
        {timer.done && (
          <div className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-black text-xl text-center animate-pulse">
            🛑 FREEZE!
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-white/50 text-xs">Structure must stand 5s post-buzzer. Each straw = 5 pts.</p>
        {teams.map((t) => (
          <div key={t.id} className="rounded-xl border p-3 flex items-center justify-between gap-3"
            style={{ borderColor: t.color + '40', backgroundColor: t.color + '0d' }}>
            <span className="font-semibold text-white">{t.name}</span>
            <div className="flex items-center gap-2">
              <input type="number" min={0} max={99} placeholder="0"
                value={counts[t.id] ?? ''}
                onChange={(e) => setCounts(p => ({ ...p, [t.id]: e.target.value }))}
                className="w-16 text-center input-field py-3 text-xl font-bold" />
              <span className="text-white/40 text-sm w-16">= {(parseInt(counts[t.id] || '0') * 5)} pts</span>
            </div>
          </div>
        ))}
      </div>

      {!awarded
        ? <button onClick={awardAll} className="btn-primary py-4 font-black text-lg min-h-[60px]">✅ Award All Straw Scores</button>
        : <p className="text-green-400 text-center font-semibold py-2">✅ Scores awarded!</p>}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const CHALLENGES = [
  { id: 'ball',    emoji: '🏆', label: 'Ball Pyramid' },
  { id: 'dribble', emoji: '🏃', label: 'Cup Dribble' },
  { id: 'cone',    emoji: '🎯', label: 'Cone in Hole' },
  { id: 'straw',   emoji: '🥤', label: 'Cup Straw' },
]

export default function Phase2Page() {
  const { role, checked } = useAuth()
  const router = useRouter()
  const { teams } = useTeams()
  const { addScore } = useScores(teams)
  const { settings } = useSettings()
  const [active, setActive] = useState('ball')

  useEffect(() => { if (checked && !role) router.replace('/arbiter') }, [role, checked])
  if (!checked || !role) return null

  const onScore = (id: string, pts: number, reason: string) => addScore(id, pts, reason, 2)

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-white/10 px-4 py-2">
        <h1 className="text-base font-black text-white">💪 Kinetic Challenges</h1>
      </div>

      {/* Challenge tabs */}
      <div className="flex gap-2 px-4 pt-3 pb-0 overflow-x-auto no-scrollbar">
        {CHALLENGES.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border-2 font-semibold min-w-[80px] transition-all ${
              active === c.id ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/40'}`}>
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-xs mt-1">{c.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="p-4">
        {active === 'ball'    && <BallPyramid   teams={teams} durationSec={settings.ball_pyramid_secs} maxBonus={settings.time_bonus_max} onScore={onScore} />}
        {active === 'dribble' && <CupDribble    teams={teams} durationSec={settings.cup_dribble_secs} onScore={onScore} />}
        {active === 'cone'    && <ConeInHole    teams={teams} durationSec={settings.cone_hole_secs}    maxBonus={settings.time_bonus_max} onScore={onScore} />}
        {active === 'straw'   && <CupStraw      teams={teams} durationSec={settings.cup_straw_secs}    onScore={onScore} />}
      </div>

      <PenaltyBar teams={teams} onPenalty={(id, pts, reason) => onScore(id, pts, reason)} />
      <BottomNav />
    </div>
  )
}
