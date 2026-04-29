'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { ScoreEntry, Team, TeamScore } from './types'

export function useScores(teams: Team[]) {
  const [entries, setEntries] = useState<ScoreEntry[]>([])

  useEffect(() => {
    supabase.from('scores').select('*').order('created_at').then(({ data }) => {
      if (data) setEntries(data)
    })

    const channel = supabase
      .channel('scores-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'scores' }, (payload) => {
        setEntries((prev) => [...prev, payload.new as ScoreEntry])
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'scores' }, () => {
        supabase.from('scores').select('*').order('created_at').then(({ data }) => {
          if (data) setEntries(data)
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const addScore = useCallback(async (teamId: string, points: number, reason: string, phase: number) => {
    await supabase.from('scores').insert({ team_id: teamId, points, reason, phase })
  }, [])

  const resetScores = useCallback(async () => {
    await supabase.from('scores').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    setEntries([])
  }, [])

  const teamScores: TeamScore[] = teams
    .map((team) => ({
      team,
      total: entries.filter((e) => e.team_id === team.id).reduce((sum, e) => sum + e.points, 0),
      rank: 0,
    }))
    .sort((a, b) => b.total - a.total)
    .map((ts, i) => ({ ...ts, rank: i + 1 }))

  const getWeightedScores = (completedSegments: number): TeamScore[] => {
    const ratio = completedSegments / 7
    return teamScores
      .map((ts) => ({ ...ts, total: ratio > 0 ? Math.round(ts.total / ratio) : ts.total }))
      .sort((a, b) => b.total - a.total)
      .map((ts, i) => ({ ...ts, rank: i + 1 }))
  }

  return { entries, teamScores, addScore, resetScores, getWeightedScores }
}
