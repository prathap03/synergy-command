'use client'

import { useState, useEffect } from 'react'
import type { ArbiterRole } from './types'

export function useAuth() {
  const [role, setRole] = useState<ArbiterRole>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('arbiter_role') as ArbiterRole
    setRole(stored)
    setChecked(true)
  }, [])

  const login = (password: string): ArbiterRole => {
    if (password === process.env.NEXT_PUBLIC_ARBITER1_PASSWORD) {
      sessionStorage.setItem('arbiter_role', 'arbiter1')
      setRole('arbiter1')
      return 'arbiter1'
    }
    if (password === process.env.NEXT_PUBLIC_ARBITER2_PASSWORD) {
      sessionStorage.setItem('arbiter_role', 'arbiter2')
      setRole('arbiter2')
      return 'arbiter2'
    }
    return null
  }

  const logout = () => {
    sessionStorage.removeItem('arbiter_role')
    setRole(null)
  }

  return { role, checked, login, logout }
}
