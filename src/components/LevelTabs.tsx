'use client'

const LEVELS = [
  { id: 1, label: 'Nostalgia Hits', emoji: '🎵', color: 'from-amber-600 to-yellow-500', border: 'border-amber-500' },
  { id: 2, label: 'Modern Kuthu', emoji: '🔥', color: 'from-purple-600 to-pink-500', border: 'border-purple-500' },
  { id: 3, label: 'Absurd Literalism', emoji: '🤪', color: 'from-green-600 to-emerald-400', border: 'border-green-500' },
]

interface Props {
  active: 1 | 2 | 3
  onChange: (level: 1 | 2 | 3) => void
  counts?: Record<number, number>
}

export default function LevelTabs({ active, onChange, counts = {} }: Props) {
  return (
    <div className="flex gap-2 w-full">
      {LEVELS.map((l) => (
        <button
          key={l.id}
          onClick={() => onChange(l.id as 1 | 2 | 3)}
          className={`flex-1 flex flex-col items-center py-3 rounded-2xl border-2 font-semibold transition-all min-h-[72px] ${
            active === l.id
              ? `bg-gradient-to-br ${l.color} ${l.border} text-white shadow-lg scale-[1.02]`
              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
          }`}
        >
          <span className="text-2xl">{l.emoji}</span>
          <span className="text-xs mt-0.5 font-medium">{l.label}</span>
          {counts[l.id] !== undefined && (
            <span className={`text-[10px] mt-0.5 ${active === l.id ? 'text-white/70' : 'text-white/30'}`}>
              {counts[l.id]} left
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
