/**
 * Reseed: clears and repopulates all tables.
 *   npx tsx supabase/seed.ts
 *
 * Run migration first if adding language column:
 *   ALTER TABLE songs ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'tamil';
 */
import { createClient } from '@supabase/supabase-js'
import { DEFAULT_TEAMS, DEFAULT_SONGS } from '../src/lib/defaultData'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  console.log('🧹 Clearing existing data...')

  const { error: delScores } = await supabase.from('scores').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delScores) console.warn('  scores:', delScores.message)

  const { error: delState } = await supabase.from('event_state').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delState) console.warn('  event_state:', delState.message)

  const { error: delSongs } = await supabase.from('songs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delSongs) console.warn('  songs:', delSongs.message)

  const { error: delTeams } = await supabase.from('teams').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delTeams) console.warn('  teams:', delTeams.message)

  console.log('✅ Tables cleared\n')

  console.log('Seeding teams...')
  const { data: teams, error: teamErr } = await supabase.from('teams').insert(DEFAULT_TEAMS).select()
  if (teamErr) { console.error(teamErr); process.exit(1) }
  console.log(`✅ ${teams?.length} teams inserted`)

  console.log('Seeding songs...')
  const { data: songs, error: songErr } = await supabase.from('songs').insert(DEFAULT_SONGS).select()
  if (songErr) { console.error(songErr); process.exit(1) }
  const tamil = songs?.filter((s: any) => s.language === 'tamil').length ?? 0
  const hindi = songs?.filter((s: any) => s.language === 'hindi').length ?? 0
  console.log(`✅ ${songs?.length} songs inserted (${tamil} Tamil, ${hindi} Hindi)`)

  console.log('Creating event_state...')
  const { error: stateErr } = await supabase.from('event_state').insert({
    current_phase: 0,
    phase1_active_level: 1,
    weighted_finish: false,
    completed_segments: 0,
    timer_paused: true,
    timer_remaining_ms: 3600000,
  })
  if (stateErr) { console.error(stateErr); process.exit(1) }
  console.log('✅ event_state created')

  console.log('\n🎉 Reseed complete! Your event is ready.')
}

seed()
