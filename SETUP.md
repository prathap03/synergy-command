# Synergy Command — Setup Guide

## Step 1: Create a Supabase Project
1. Go to https://supabase.com → New Project
2. Note your **Project URL** and **anon public key** (Settings → API)

## Step 2: Run the Schema
1. In Supabase → SQL Editor → New Query
2. Paste the full contents of `supabase/schema.sql` and Run

## Step 3: Configure Environment
```bash
cp .env.local.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_ARBITER1_PASSWORD=yourpassword1
NEXT_PUBLIC_ARBITER2_PASSWORD=yourpassword2
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Step 4: Seed the Database
```bash
npm install -g tsx
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npx tsx supabase/seed.ts
```
Or manually insert data via Supabase Table Editor.

## Step 5: Run Locally
```bash
npm run dev
```
- `/display` — participant leaderboard (share this QR)
- `/arbiter` — arbiter login (password from .env)
- `/arbiter/home` — main control panel

## Step 6: Deploy to Vercel
```bash
npx vercel
```
Set the same env vars in Vercel dashboard (Settings → Environment Variables).
Update `NEXT_PUBLIC_APP_URL` to your Vercel URL, redeploy.

## Event Day Workflow
1. Open `/arbiter` → login → go to `/arbiter/home`
2. Share QR code — participants scan to open `/display`
3. Set Active Team + On-Deck Team
4. Hit ▶ on the Global Timer
5. Navigate phases: Phase I → Phase II → Phase III → Podium

## Arbiter Roles
- **Arbiter 1 password** → controls timers, active/ondeck team
- **Arbiter 2 password** → same access (use same or different password)
- Both can score — use the nav to switch between phases

## Key URLs
| URL | Purpose |
|-----|---------|
| `/display` | Participant live leaderboard (read-only) |
| `/arbiter` | Arbiter login |
| `/arbiter/home` | Control panel |
| `/arbiter/phase1` | Guess the Song |
| `/arbiter/phase2` | Kinetic Challenges |
| `/arbiter/phase3` | Shout the Thought |
| `/arbiter/admin` | Song management + End Event |
| `/podium` | Champion reveal |
