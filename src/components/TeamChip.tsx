'use client'

import type { Team } from '@/lib/types'

interface Props {
  team: Team
  selected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export default function TeamChip({ team, selected, onClick, size = 'md' }: Props) {
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-5 py-3 text-lg font-bold' }
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 font-semibold transition-all min-h-[48px] ${sizes[size]} ${
        selected
          ? 'text-white shadow-lg scale-105'
          : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'
      }`}
      style={selected ? { backgroundColor: team.color, borderColor: team.color } : { borderColor: team.color + '60' }}
    >
      {team.name}
    </button>
  )
}
