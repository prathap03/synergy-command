'use client'

import { useState } from 'react'
import type { Song } from '@/lib/types'
import SongForm from './SongForm'

interface Props {
  songs: Song[]
  level: 1 | 2 | 3
  onDelete: (id: string) => void
  onUpdate: (id: string, s: Partial<Song>) => void
}

export default function SongList({ songs, level, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState<string | null>(null)
  const filtered = songs.filter((s) => s.level === level)

  if (filtered.length === 0) {
    return <p className="text-white/30 text-center py-8">No songs yet. Add one above!</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((s) => (
        <div
          key={s.id}
          className={`rounded-2xl border p-4 transition-all ${s.used ? 'opacity-40 border-white/10' : 'border-white/15 bg-white/5'}`}
        >
          {editing === s.id ? (
            <SongForm
              initial={s}
              onSave={(updates) => { onUpdate(s.id, updates); setEditing(null) }}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <>
              <p className="text-white font-semibold text-base">{s.clue}</p>
              <p className="text-white/50 text-sm mt-1">→ {s.answer}</p>
              {s.movie && <p className="text-white/30 text-xs mt-0.5">🎬 {s.movie} · 🎤 {s.director_singer}</p>}
              {s.used && <span className="text-xs text-white/30">✅ Used</span>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => setEditing(s.id)} className="btn-ghost text-sm px-3 py-2 min-h-[40px]">✏️ Edit</button>
                <button onClick={() => onDelete(s.id)} className="text-red-400/60 hover:text-red-400 text-sm px-3 py-2 min-h-[40px] rounded-xl transition-colors">🗑 Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
