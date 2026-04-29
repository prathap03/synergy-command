'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/arbiter/home', label: '🏠', title: 'Home' },
  { href: '/arbiter/phase1', label: '🎵', title: 'Songs' },
  { href: '/arbiter/phase2', label: '💪', title: 'Kinetic' },
  { href: '/arbiter/phase3', label: '🧠', title: 'Shout' },
  { href: '/arbiter/admin', label: '⚙️', title: 'Admin' },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-gray-950/95 backdrop-blur border-t border-white/10 flex">
      {NAV.map((n) => {
        const active = path.startsWith(n.href)
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] gap-0.5 transition-colors ${
              active ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span className="text-xl">{n.label}</span>
            <span className={`text-[10px] font-medium ${active ? 'text-white/80' : 'text-white/30'}`}>{n.title}</span>
            {active && <div className="absolute top-0 w-8 h-0.5 bg-white rounded-full" />}
          </Link>
        )
      })}
    </nav>
  )
}
