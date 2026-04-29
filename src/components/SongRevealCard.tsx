'use client'

import { useState } from 'react'
import type { Song } from '@/lib/types'

interface Props {
  song: Song
  onMarkUsed: () => void
  onDismiss: () => void
}

export default function SongRevealCard({ song, onMarkUsed, onDismiss }: Props) {
  const [hintVisible, setHintVisible] = useState(false)
  const [used, setUsed] = useState(false)

  const handleMarkUsed = () => {
    setUsed(true)
    onMarkUsed()
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
      {/* Song name — shown to active participant only */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-center">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
          🎯 Active participant — translate this song!
        </p>
        <p className="text-4xl font-black text-white leading-tight">{song.answer}</p>
        <div className="flex flex-col items-center gap-1 mt-3">
          {song.movie && (
            <p className="text-white/55 text-sm">🎬 <span className="text-white/75">{song.movie}</span></p>
          )}
          {song.director_singer && (
            <p className="text-white/55 text-sm">🎤 <span className="text-white/75">{song.director_singer}</span></p>
          )}
        </div>
      </div>

      {/* Hint toggle — English clue for participant reference */}
      <div className="bg-white/5 border-x border-white/10">
        <button
          onClick={() => setHintVisible(!hintVisible)}
          className="w-full py-3 text-white/40 hover:text-white/60 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span>{hintVisible ? '🙈 Hide' : '💡 Show'} lyrics hint</span>
          <span className="text-white/20 text-xs">(for participant only)</span>
        </button>
        {hintVisible && (
          <div className="px-6 pb-4 text-center">
            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">English translation</p>
            <p className="text-white/80 text-lg italic">"{song.clue}"</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 px-5 py-4 bg-white/5 border border-white/10 rounded-b-3xl">
        {!used ? (
          <button
            onClick={handleMarkUsed}
            className="w-full py-3 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-400 font-bold text-lg min-h-[56px] active:scale-95 transition-all"
          >
            ✅ Done — Mark as Used
          </button>
        ) : (
          <div className="w-full py-3 rounded-2xl bg-white/5 text-white/40 font-medium text-center">
            ✅ Marked as used
          </div>
        )}
        <button
          onClick={onDismiss}
          className="w-full py-2 rounded-xl text-white/30 hover:text-white/50 font-medium text-sm transition-colors"
        >
          ✕ Dismiss
        </button>
      </div>
    </div>
  )
}
