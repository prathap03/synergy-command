export interface Team {
  id: string
  name: string
  members: string[]
  color: string
  created_at: string
}

export type SongLanguage = 'tamil' | 'hindi'

export interface Song {
  id: string
  clue: string
  answer: string
  movie: string
  director_singer: string
  level: 1 | 2 | 3
  language: SongLanguage
  used: boolean
  created_at: string
}

export interface ScoreEntry {
  id: string
  team_id: string
  points: number
  reason: string
  phase: number
  created_at: string
}

export interface EventState {
  id: string
  active_team_id: string | null
  ondeck_team_id: string | null
  current_phase: number
  phase1_active_level: number
  weighted_finish: boolean
  ended_at: string | null
  completed_segments: number
  timer_end_at: string | null
  timer_paused: boolean
  timer_remaining_ms: number
  updated_at: string
}

export type ArbiterRole = 'arbiter1' | 'arbiter2' | null

export interface TeamScore {
  team: Team
  total: number
  rank: number
}

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Nostalgia Hits',
  2: 'Modern Kuthu',
  3: 'Absurd Literalism',
}

export const LEVEL_EMOJIS: Record<number, string> = {
  1: '🎵',
  2: '🔥',
  3: '🤪',
}

export const TEAM_COLORS = ['#f59e0b', '#8b5cf6', '#10b981', '#ef4444']

export const PHASE_TIMERS: Record<string, number> = {
  phase1: 15 * 60,
  ball_pyramid: 8 * 60,
  cup_dribble: 8 * 60,
  cone_hole: 8 * 60,
  cup_straw: 60,
  phase3: 5 * 60,
}

export const SPINNER_MESSAGES: Record<SongLanguage, string[]> = {
  tamil: [
    'Asking Rajinikanth...',
    'Consulting AR Rahman...',
    'Rewinding the cassette...',
    'Bribing the music director...',
    'Calling Ilayaraja...',
    'Searching Vijay TV archives...',
    'Loading Tamil magic...',
    'Summoning Kalaignar...',
  ],
  hindi: [
    'Asking Bollywood...',
    'Consulting Arijit Singh...',
    'Rewinding the VHS tape...',
    'Calling Shah Rukh Khan...',
    'Searching Filmfare archives...',
    'Loading Bollywood magic...',
    'Summoning Yash Raj Films...',
    'Consulting the Khans...',
  ],
}
