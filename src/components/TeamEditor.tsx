'use client'

import { useState } from 'react'
import type { Team } from '@/lib/types'

interface Props {
  team: Team
  onUpdate: (id: string, updates: Partial<Team>) => void
}

export default function TeamEditor({ team, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [name, setName] = useState(team.name)
  const [members, setMembers] = useState<string[]>([...team.members])
  const [dirty, setDirty] = useState(false)

  const setMember = (i: number, val: string) => {
    const next = [...members]
    next[i] = val
    setMembers(next)
    setDirty(true)
  }

  const addMember = () => {
    setMembers(prev => [...prev, ''])
    setDirty(true)
  }

  const removeMember = (i: number) => {
    setMembers(prev => prev.filter((_, idx) => idx !== i))
    setDirty(true)
  }

  const save = () => {
    onUpdate(team.id, { name, members: members.filter(m => m.trim()) })
    setDirty(false)
    setExpanded(false)
  }

  const cancel = () => {
    setName(team.name)
    setMembers([...team.members])
    setDirty(false)
    setExpanded(false)
  }

  return (
    <div className="rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: team.color + '50', backgroundColor: team.color + '0a' }}>

      {/* Header row */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">{team.name}</p>
          <p className="text-white/40 text-xs truncate">{team.members.join(', ')}</p>
        </div>
        <span className="text-white/40 text-sm">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Expanded editor */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-white/10">
          {/* Team name */}
          <div className="mt-3">
            <p className="text-white/50 text-xs mb-1">Team name</p>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setDirty(true) }}
              className="input-field"
              placeholder="Team name"
            />
          </div>

          {/* Members */}
          <div>
            <p className="text-white/50 text-xs mb-2">Members</p>
            <div className="flex flex-col gap-2">
              {members.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/30 text-xs w-4 text-right flex-shrink-0">{i + 1}</span>
                  <input
                    value={m}
                    onChange={e => setMember(i, e.target.value)}
                    placeholder={`Member ${i + 1}`}
                    className="input-field flex-1 py-2 text-sm"
                  />
                  <button
                    onClick={() => removeMember(i)}
                    className="min-w-[40px] min-h-[40px] rounded-xl text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addMember}
              className="mt-2 w-full py-2 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white/60 hover:border-white/30 text-sm transition-colors min-h-[44px]"
            >
              + Add member
            </button>
          </div>

          {/* Save / Cancel */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={save}
              disabled={!dirty}
              className="flex-1 btn-primary py-3 font-bold min-h-[48px] disabled:opacity-40"
            >
              💾 Save
            </button>
            <button onClick={cancel} className="btn-ghost px-5 min-h-[48px]">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
