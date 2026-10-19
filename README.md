# Synergy Command

A real-time, mobile-first scoring and control app for running a live team event. Two arbiters run the show from their phones while participants watch a live leaderboard on a shared screen. Every score, timer tick and team switch syncs instantly through Supabase Realtime.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Supabase.

## Features

- **Live leaderboard** for participants at `/display`, reached by scanning a QR code shown on the arbiter's control panel. Read-only, and it updates in real time.
- **Arbiter control panel** to set the active and on-deck team, jump between phases, and run a global countdown timer (play, pause and resume stay in sync across all devices).
- **Phase I: Guess the Song.** Three difficulty levels (Nostalgia Hits, Modern Kuthu, Absurd Literalism) with Tamil and Hindi song pools. A randomizer picks an unused song, reveals the answer card, and scores the team (with a separate spoil penalty).
- **Phase II: Kinetic Challenges.** Timed physical games (ball pyramid, cup dribble, cone hole, cup straw), each with its own timer.
- **Phase III: Shout the Thought.** Timed round with per-team scoring.
- **Penalties** that can be applied to any team from any phase.
- **Append-only score log**, so every point has a reason, a phase and a timestamp, and totals are always recomputed from the log.
- **Admin page** to manage the song bank and end the event.
- **Podium page** with a champion reveal, including a weighted finish when not all segments were completed.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Backend | Supabase (Postgres + Realtime) |
| Extras | `qrcode.react` for the participant QR code |
| Hosting | Vercel |

## Routes

| Route | Purpose |
|---|---|
| `/display` | Participant live leaderboard (read-only) |
| `/arbiter` | Arbiter login |
| `/arbiter/home` | Control panel: teams, timer, phase navigation, QR code |
| `/arbiter/phase1` | Guess the Song |
| `/arbiter/phase2` | Kinetic Challenges |
| `/arbiter/phase3` | Shout the Thought |
| `/arbiter/admin` | Song management and End Event |
| `/podium` | Champion reveal |

## Data model

Four Supabase tables, all with Realtime enabled (see [`supabase/schema.sql`](supabase/schema.sql)):

- `teams`: name, members, colour
- `songs`: clue, answer, movie, director or singer, level (1 to 3), language, used flag
- `scores`: append-only log of points per team, with reason and phase
- `event_state`: single row holding the active and on-deck team, current phase, and the shared timer state

## Getting started

### 1. Create a Supabase project

Create a project at [supabase.com](https://supabase.com) and note the **Project URL** and **anon public key** (Settings, then API).

### 2. Create the schema

In the Supabase SQL Editor, run the contents of [`supabase/schema.sql`](supabase/schema.sql), then add the song-language column:

```sql
ALTER TABLE songs ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'tamil';
```

(This is also in [`supabase/migration_add_language.sql`](supabase/migration_add_language.sql).)

### 3. Configure environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ARBITER1_PASSWORD=choose-a-password
NEXT_PUBLIC_ARBITER2_PASSWORD=choose-another-password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed the database

This clears all tables and loads the default teams and songs from `src/lib/defaultData.ts`:

```bash
npm install
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npx tsx supabase/seed.ts
```

### 5. Run it

```bash
npm run dev
```

Open [http://localhost:3000/arbiter](http://localhost:3000/arbiter) and sign in with one of the arbiter passwords.

### Deploy

```bash
npx vercel
```

Set the same environment variables in the Vercel dashboard, set `NEXT_PUBLIC_APP_URL` to your deployed URL (it is encoded in the participant QR code), and redeploy.

## Running an event

1. Sign in at `/arbiter` and open the control panel.
2. Show the QR code so participants can open `/display` on their phones.
3. Set the active team and the on-deck team.
4. Start the global timer.
5. Move through Phase I, Phase II and Phase III, then open the podium.

## Project structure

```
src/
  app/            Next.js routes (display, arbiter/*, podium)
  components/     Leaderboard, timers, song cards, penalty bar, QR code, ...
  lib/            Supabase client, realtime hooks (useScores, useTeams,
                  useEventState, useTimer, ...), types, seed data
supabase/         schema.sql, migration, seed script
```

## Security note

This app is designed for a single, trusted, one-day event:

- Arbiter passwords are `NEXT_PUBLIC_*` variables, so they are checked in the browser and are visible in the client bundle.
- The Row Level Security policies allow all operations on all tables.

That is fine for a private event with short-lived data. Before reusing it for anything public or long-lived, move auth to Supabase Auth or server-side checks and tighten the RLS policies.
