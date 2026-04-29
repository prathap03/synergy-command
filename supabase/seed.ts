/**
 * Run once to seed initial teams, songs, and event_state:
 *   npx tsx supabase/seed.ts
 */
import { createClient } from '@supabase/supabase-js'
import { DEFAULT_TEAMS, DEFAULT_SONGS } from '../src/lib/defaultData'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  console.log('Seeding teams...')
  const { data: teams, error: teamErr } = await supabase
    .from('teams')
    .insert(DEFAULT_TEAMS)
    .select()
  if (teamErr) { console.error(teamErr); process.exit(1) }
  console.log(`✅ ${teams?.length} teams inserted`)

  console.log('Seeding songs...')
  const { data: songs, error: songErr } = await supabase
    .from('songs')
    .insert(DEFAULT_SONGS)
    .select()
  if (songErr) { console.error(songErr); process.exit(1) }
  console.log(`✅ ${songs?.length} songs inserted`)

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

  console.log('\n🎉 Seed complete! Your event is ready.')
}

seed()
