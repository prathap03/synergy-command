'use client'

import { useState, useEffect } from 'react'
import type { Song } from '@/lib/types'
import { SPINNER_MESSAGES } from '@/lib/types'

interface Props {
  songs: Song[]
  level: 1 | 2 | 3
  onPicked: (song: Song) => void
  disabled?: boolean
}

export default function RandomizerButton({ songs, level, onPicked, disabled }: Props) {
  const [spinning, setSpinning] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const available = songs.filter((s) => s.level === level && !s.used)

  const spin = () => {
    if (spinning || available.length === 0) return
    setSpinning(true)

    let tick = 0
    const interval = setInterval(() => {
      setDisplayText(SPINNER_MESSAGES[tick % SPINNER_MESSAGES.length])
      tick++
    }, 180)

    setTimeout(() => {
      clearInterval(interval)
      const picked = available[Math.floor(Math.random() * available.length)]
      setSpinning(false)
      setDisplayText('')
      onPicked(picked)
    }, 1600)
  }

  if (available.length === 0) {
    return (
      <div className="w-full py-6 rounded-2xl bg-white/5 border border-white/10 text-center">
        <p className="text-4xl mb-2">😵</p>
        <p className="text-white/50 font-semibold">No songs left in this level, da!</p>
        <p className="text-white/30 text-sm mt-1">Add more in Admin or reset used songs.</p>
      </div>
    )
  }

  return (
    <button
      onClick={spin}
      disabled={spinning || disabled}
      className={`w-full py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl min-h-[96px] relative overflow-hidden ${
        spinning
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-wait'
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white active:scale-95'
      } disabled:opacity-60`}
    >
      {spinning ? (
        <span className="animate-pulse text-base font-semibold px-4">{displayText}</span>
      ) : (
        <span>🎲 PICK A SONG <span className="text-white/60 text-lg">({available.length} left)</span></span>
      )}
    </button>
  )
}
