'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { Song } from './types'

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('songs').select('*').order('created_at').then(({ data }) => {
      if (data) setSongs(data)
      setLoading(false)
    })

    const channel = supabase
      .channel('songs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'songs' }, () => {
        supabase.from('songs').select('*').order('created_at').then(({ data }) => {
          if (data) setSongs(data)
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const addSong = useCallback(async (song: Omit<Song, 'id' | 'created_at' | 'used'>) => {
    await supabase.from('songs').insert({ ...song, used: false })
  }, [])

  const updateSong = useCallback(async (id: string, updates: Partial<Song>) => {
    await supabase.from('songs').update(updates).eq('id', id)
  }, [])

  const deleteSong = useCallback(async (id: string) => {
    await supabase.from('songs').delete().eq('id', id)
  }, [])

  const markUsed = useCallback(async (id: string) => {
    await supabase.from('songs').update({ used: true }).eq('id', id)
  }, [])

  const resetUsed = useCallback(async () => {
    await supabase.from('songs').update({ used: false }).neq('id', '00000000-0000-0000-0000-000000000000')
  }, [])

  const getByLevel = useCallback((level: 1 | 2 | 3) =>
    songs.filter((s) => s.level === level), [songs])

  const getUnusedByLevel = useCallback((level: 1 | 2 | 3) =>
    songs.filter((s) => s.level === level && !s.used), [songs])

  return { songs, loading, addSong, updateSong, deleteSong, markUsed, resetUsed, getByLevel, getUnusedByLevel }
}
