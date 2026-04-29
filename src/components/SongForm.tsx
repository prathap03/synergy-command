'use client'

import { useState } from 'react'
import type { Song } from '@/lib/types'

interface Props {
  initial?: Partial<Song>
  onSave: (song: Omit<Song, 'id' | 'created_at' | 'used'>) => void
  onCancel?: () => void
}

export default function SongForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    clue: initial?.clue ?? '',
    answer: initial?.answer ?? '',
    movie: initial?.movie ?? '',
    director_singer: initial?.director_singer ?? '',
    level: initial?.level ?? 1,
    language: initial?.language ?? 'tamil',
  })

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.clue || !form.answer) return
    onSave({ ...form, level: Number(form.level) as 1 | 2 | 3 })
    if (!initial) setForm({ clue: '', answer: '', movie: '', director_singer: '', level: 1, language: form.language })
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <textarea
        placeholder="English translation (clue) *"
        value={form.clue}
        onChange={(e) => set('clue', e.target.value)}
        className="input-field resize-none h-20"
        required
      />
      <input
        placeholder="Tamil song name (answer) *"
        value={form.answer}
        onChange={(e) => set('answer', e.target.value)}
        className="input-field"
        required
      />
      <input
        placeholder="Movie / Album"
        value={form.movie}
        onChange={(e) => set('movie', e.target.value)}
        className="input-field"
      />
      <input
        placeholder="Music Director / Singer"
        value={form.director_singer}
        onChange={(e) => set('director_singer', e.target.value)}
        className="input-field"
      />
      <div className="flex gap-2">
        <button type="button" onClick={() => set('language', 'tamil')}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all min-h-[48px] ${form.language === 'tamil' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
          🎵 Tamil
        </button>
        <button type="button" onClick={() => set('language', 'hindi')}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all min-h-[48px] ${form.language === 'hindi' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
          🎬 Hindi
        </button>
      </div>
      <select
        value={form.level}
        onChange={(e) => set('level', Number(e.target.value))}
        className="input-field"
      >
        <option value={1}>Round 1 — Classic / Nostalgia</option>
        <option value={2}>Round 2 — Modern Hits</option>
        <option value={3}>Round 3 — Absurd / Quirky</option>
      </select>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 btn-primary py-3 font-bold min-h-[52px]">
          {initial ? '💾 Save Changes' : '➕ Add Song'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-ghost px-5 min-h-[52px]">Cancel</button>
        )}
      </div>
    </form>
  )
}
