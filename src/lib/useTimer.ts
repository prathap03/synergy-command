'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Persistent countdown timer ────────────────────────────────────────────────
// Stores endAt timestamp in localStorage so the timer survives page transitions.
// key must be unique per timer instance (e.g. 'phase1', 'ball_pyramid').

interface TimerStore {
  endAt: number | null   // epoch ms when timer reaches 0 (null = paused)
  remaining: number      // seconds remaining when paused
}

export function useTimer(initialSec: number, key?: string) {
  const storageKey = key ? `sc_timer_${key}` : null

  const load = (): TimerStore => {
    if (!storageKey || typeof window === 'undefined') return { endAt: null, remaining: initialSec }
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) return JSON.parse(raw)
    } catch {}
    return { endAt: null, remaining: initialSec }
  }

  const save = useCallback((s: TimerStore) => {
    if (!storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(s))
  }, [storageKey])

  const [endAt, setEndAt] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(initialSec)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Restore from localStorage on mount
  useEffect(() => {
    const stored = load()
    if (stored.endAt && stored.endAt > Date.now()) {
      const rem = Math.ceil((stored.endAt - Date.now()) / 1000)
      setEndAt(stored.endAt)
      setRemaining(rem)
      setRunning(true)
    } else if (stored.endAt && stored.endAt <= Date.now()) {
      // Timer finished while away
      setRemaining(0)
      setRunning(false)
      save({ endAt: null, remaining: 0 })
    } else {
      setRemaining(stored.remaining ?? initialSec)
    }
  }, []) // eslint-disable-line

  // Tick loop
  useEffect(() => {
    if (!running || !endAt) return
    intervalRef.current = setInterval(() => {
      const rem = Math.max(0, Math.ceil((endAt - Date.now()) / 1000))
      setRemaining(rem)
      if (rem === 0) {
        setRunning(false)
        save({ endAt: null, remaining: 0 })
      }
    }, 500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, endAt])

  const start = useCallback(() => {
    setRemaining((rem) => {
      const newEndAt = Date.now() + rem * 1000
      setEndAt(newEndAt)
      setRunning(true)
      save({ endAt: newEndAt, remaining: rem })
      return rem
    })
  }, [save])

  const pause = useCallback(() => {
    setRemaining((rem) => {
      setRunning(false)
      setEndAt(null)
      save({ endAt: null, remaining: rem })
      return rem
    })
  }, [save])

  const reset = useCallback((secs?: number) => {
    const r = secs ?? initialSec
    setRunning(false)
    setEndAt(null)
    setRemaining(r)
    if (storageKey) localStorage.removeItem(storageKey)
  }, [initialSec, storageKey])

  const pct = remaining / (initialSec || 1)

  return { remaining, running, start, pause, reset, pct, done: remaining === 0 && !running }
}

// ── Persistent stopwatch (counts up) ─────────────────────────────────────────
interface StopwatchStore {
  startAt: number | null  // epoch ms when started (null = stopped)
  base: number            // ms already elapsed before current run
}

export function useStopwatch(key?: string) {
  const storageKey = key ? `sc_sw_${key}` : null

  const load = (): StopwatchStore => {
    if (!storageKey || typeof window === 'undefined') return { startAt: null, base: 0 }
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) return JSON.parse(raw)
    } catch {}
    return { startAt: null, base: 0 }
  }

  const save = useCallback((s: StopwatchStore) => {
    if (!storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(s))
  }, [storageKey])

  const [startAt, setStartAt] = useState<number | null>(null)
  const [base, setBase] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const stored = load()
    if (stored.startAt) {
      const current = stored.base + (Date.now() - stored.startAt)
      setStartAt(stored.startAt)
      setBase(stored.base)
      setElapsed(current)
      setRunning(true)
    } else {
      setBase(stored.base)
      setElapsed(stored.base)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!running || !startAt) return
    intervalRef.current = setInterval(() => {
      setElapsed(base + (Date.now() - startAt))
    }, 100)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, startAt, base])

  const start = useCallback(() => {
    const now = Date.now()
    setStartAt(now)
    setRunning(true)
    save({ startAt: now, base })
  }, [base, save])

  const stop = useCallback(() => {
    setBase((b) => {
      const newBase = startAt ? b + (Date.now() - startAt) : b
      setStartAt(null)
      setRunning(false)
      save({ startAt: null, base: newBase })
      return newBase
    })
  }, [startAt, save])

  const reset = useCallback(() => {
    setStartAt(null)
    setBase(0)
    setElapsed(0)
    setRunning(false)
    if (storageKey) localStorage.removeItem(storageKey)
  }, [storageKey])

  const formatted = (() => {
    const ms = elapsed % 1000
    const s = Math.floor(elapsed / 1000) % 60
    const m = Math.floor(elapsed / 60000)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${Math.floor(ms / 100)}`
  })()

  return { elapsed, running, formatted, start, stop, reset }
}

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
