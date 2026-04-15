# Nashr

AI-powered content repurposing platform for MENA creators, coaches, and agencies. Drop a YouTube video, upload a file, or paste text and Nashr generates LinkedIn posts, X threads, blog drafts, hooks, hashtags, and captions.

## MVP Status

| Layer | Status |
|-------|--------|
| Landing page | Complete |
| Auth UI (login/register) | UI complete, not wired to Supabase Auth yet |
| Dashboard + project list | Complete, data-layer abstracted |
| Project creation flow | Complete (YouTube URL / upload placeholder / paste text) |
| Project results page | Complete (transcript, highlights, LinkedIn, X thread, blog, hooks/hashtags) |
| Supabase schema + RLS | Complete, ready to apply |
| Data service abstraction | Complete (auto-switches between mock and Supabase) |
| AI processing | Placeholder stubs returning mock data |

### What is mocked vs real

- **Mocked**: AI processing, transcript extraction, content generation, auth session. All demo data lives in `src/lib/mock-data.ts`.
- **Real (when env vars set)**: Supabase database operations for projects, transcripts, highlights, generated assets, and usage events via `src/lib/services/projects.ts`.
- **Seam for auth**: The service layer accepts an optional `userId` parameter. Once Supabase Auth is integrated, pass the authenticated user's ID to switch from demo mode to real persistence.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, Server Actions)
- **UI**: shadcn/ui (base-nova), Tailwind CSS 4, Lucide icons
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Language**: TypeScript 5

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |

Without these variables the app runs in demo mode with mock data.

### 3. Set up the database

Run the schema migration against your Supabase project:

```bash
# Via Supabase Dashboard: SQL Editor > paste contents of supabase/schema.sql
# Or via psql:
psql "$DATABASE_URL" -f supabase/schema.sql
```

This creates tables for profiles, projects, source_inputs, transcripts, highlights, generated_assets, and usage_events with full RLS policies and auto-triggers.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    (app)/dashboard/     Dashboard with input card + project list
    (app)/project/[id]/  Project results page
    (auth)/login/        Login page
    (auth)/register/     Registration page
    actions.ts           Server actions (project creation)
    page.tsx             Landing page
  components/
    dashboard/           InputCard, ProjectList
    project/             TranscriptPanel, HighlightCards, LinkedInPost, etc.
    landing/             Navbar, Hero, Features, HowItWorks, CTA, Footer
    ui/                  shadcn/ui primitives
  lib/
    services/projects.ts Data service abstraction (mock or Supabase)
    supabase/            Client, server helpers, and DB types
    mock-data.ts         Demo data for offline/development use
    ai/process.ts        AI processing stubs
  types/
    index.ts             TypeScript interfaces
supabase/
  schema.sql             Full database schema with RLS
```

## Next Steps

- Wire Supabase Auth (Google/GitHub OAuth)
- Connect AI processing pipeline (transcription, content generation)
- Add real file upload via Supabase Storage
- Usage tracking and plan limits
- Billing integration
