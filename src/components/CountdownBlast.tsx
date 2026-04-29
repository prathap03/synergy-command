'use client'

import { useState, useEffect } from 'react'

interface Props {
  onDone?: () => void
}

export default function CountdownBlast({ onDone }: Props) {
  const [count, setCount] = useState<number | string>(3)
  const [visible, setVisible] = useState(false)

  const fire = () => {
    setVisible(true)
    setCount(3)
    let n = 3
    const tick = setInterval(() => {
      n--
      if (n === 0) {
        setCount('SHOUT! 🗣️')
        setTimeout(() => {
          setVisible(false)
          if (onDone) onDone()
        }, 1200)
        clearInterval(tick)
      } else {
        setCount(n)
      }
    }, 900)
  }

  if (!visible) {
    return (
      <button
        onClick={fire}
        className="w-full py-5 rounded-2xl text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl transition-all active:scale-95 min-h-[64px]"
      >
        3–2–1–SHOUT! 🗣️
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center animate-bounce-in">
        <div className="text-[120px] font-black leading-none" style={{ textShadow: '0 0 60px #a855f7' }}>
          {count}
        </div>
        <p className="text-white/60 text-xl mt-4">Everyone shout NOW!</p>
      </div>
    </div>
  )
}
