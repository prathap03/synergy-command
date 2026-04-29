'use client'

import { useState, useEffect, useCallback } from 'react'

export interface TimerSettings {
  phase1_secs: number
  ball_pyramid_secs: number
  cup_dribble_secs: number
  cone_hole_secs: number
  cup_straw_secs: number
  phase3_secs: number
  time_bonus_max: number
}

export const DEFAULT_SETTINGS: TimerSettings = {
  phase1_secs: 15 * 60,
  ball_pyramid_secs: 8 * 60,
  cup_dribble_secs: 8 * 60,
  cone_hole_secs: 8 * 60,
  cup_straw_secs: 60,
  phase3_secs: 5 * 60,
  time_bonus_max: 20,
}

const KEY = 'synergy_timer_settings'

export function useSettings() {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
    } catch {}
  }, [])

  const updateSettings = useCallback((updates: Partial<TimerSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const resetSettings = useCallback(() => {
    localStorage.removeItem(KEY)
    setSettings(DEFAULT_SETTINGS)
  }, [])

  return { settings, updateSettings, resetSettings }
}
