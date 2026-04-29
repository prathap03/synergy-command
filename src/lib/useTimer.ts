'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) { setRunning(false); return 0 }
          return r - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, remaining])

  const start = useCallback(() => setRunning(true), [])
  const pause = useCallback(() => setRunning(false), [])
  const reset = useCallback((secs?: number) => {
    setRunning(false)
    setRemaining(secs ?? initialSeconds)
  }, [initialSeconds])

  const pct = remaining / initialSeconds

  return { remaining, running, start, pause, reset, pct, done: remaining === 0 }
}

export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 100), 100)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const start = useCallback(() => setRunning(true), [])
  const stop = useCallback(() => setRunning(false), [])
  const reset = useCallback(() => { setRunning(false); setElapsed(0) }, [])

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
