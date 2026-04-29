-- Synergy Command: Full schema

-- Teams
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  members text[] not null default '{}',
  color text not null default '#6366f1',
  created_at timestamptz default now()
);

-- Songs
create table if not exists songs (
  id uuid primary key default gen_random_uuid(),
  clue text not null,
  answer text not null,
  movie text not null default '',
  director_singer text not null default '',
  level int not null check (level in (1, 2, 3)),
  used boolean not null default false,
  created_at timestamptz default now()
);

-- Scores (append-only log)
create table if not exists scores (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references teams(id) on delete cascade,
  points int not null,
  reason text not null default '',
  phase int not null default 1,
  created_at timestamptz default now()
);

-- Event state (single row)
create table if not exists event_state (
  id uuid primary key default gen_random_uuid(),
  active_team_id uuid references teams(id) on delete set null,
  ondeck_team_id uuid references teams(id) on delete set null,
  current_phase int not null default 0,
  phase1_active_level int not null default 1,
  weighted_finish boolean not null default false,
  ended_at timestamptz,
  completed_segments int not null default 0,
  timer_end_at timestamptz,
  timer_paused boolean not null default true,
  timer_remaining_ms bigint not null default 3600000,
  updated_at timestamptz default now()
);

-- Enable Row Level Security (open for event-day use)
alter table teams enable row level security;
alter table songs enable row level security;
alter table scores enable row level security;
alter table event_state enable row level security;

-- Allow all operations (event-day, single-session use)
create policy "allow all teams" on teams for all using (true) with check (true);
create policy "allow all songs" on songs for all using (true) with check (true);
create policy "allow all scores" on scores for all using (true) with check (true);
create policy "allow all event_state" on event_state for all using (true) with check (true);

-- Enable realtime on all tables
alter publication supabase_realtime add table teams;
alter publication supabase_realtime add table songs;
alter publication supabase_realtime add table scores;
alter publication supabase_realtime add table event_state;
