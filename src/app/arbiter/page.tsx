'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'

export default function ArbiterLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const role = login(password)
    if (role) {
      router.push('/arbiter/home')
    } else {
      setError('Wrong password, da! Try again 🙅')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="text-6xl mb-3">🎮</div>
          <h1 className="text-3xl font-black text-white">Synergy Command</h1>
          <p className="text-white/40 mt-1">Arbiter Access</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="password"
            placeholder="Enter arbiter password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            className="input-field text-center text-xl tracking-widest"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" className="btn-primary py-4 text-xl font-black min-h-[60px]">
            🚀 Enter the Arena
          </button>
        </form>

        <a href="/display" className="text-white/30 text-sm hover:text-white/50 underline">
          View participant display instead →
        </a>
      </div>
    </div>
  )
}
