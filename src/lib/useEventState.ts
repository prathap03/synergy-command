'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { EventState } from './types'

export function useEventState() {
  const [state, setState] = useState<EventState | null>(null)

  useEffect(() => {
    supabase.from('event_state').select('*').single().then(({ data }) => {
      if (data) setState(data)
    })

    const channel = supabase
      .channel('event-state-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_state' }, (payload) => {
        setState(payload.new as EventState)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const update = useCallback(async (updates: Partial<EventState>) => {
    if (!state?.id) return
    await supabase.from('event_state').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', state.id)
  }, [state?.id])

  const setActiveTeam = useCallback((teamId: string | null) => update({ active_team_id: teamId }), [update])
  const setOndeckTeam = useCallback((teamId: string | null) => update({ ondeck_team_id: teamId }), [update])
  const setPhase = useCallback((phase: number) => update({ current_phase: phase }), [update])
  const setLevel = useCallback((level: number) => update({ phase1_active_level: level }), [update])

  const endEvent = useCallback(async (completedSegments: number) => {
    await update({
      weighted_finish: completedSegments < 7,
      ended_at: new Date().toISOString(),
      completed_segments: completedSegments,
    })
  }, [update])

  const markSegmentComplete = useCallback((n: number) => update({ completed_segments: n }), [update])

  return { state, update, setActiveTeam, setOndeckTeam, setPhase, setLevel, endEvent, markSegmentComplete }
}
