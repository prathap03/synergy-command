'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { Team } from './types'

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('teams').select('*').order('created_at').then(({ data }) => {
      if (data) setTeams(data)
      setLoading(false)
    })

    const channel = supabase
      .channel('teams-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, () => {
        supabase.from('teams').select('*').order('created_at').then(({ data }) => {
          if (data) setTeams(data)
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const updateTeam = useCallback(async (id: string, updates: Partial<Team>) => {
    await supabase.from('teams').update(updates).eq('id', id)
  }, [])

  return { teams, loading, updateTeam }
}
