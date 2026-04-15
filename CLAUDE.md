# Nashr (Repurpose-MENA)

AI-powered content repurposing SaaS for MENA creators. Transforms long-form content (YouTube videos, text, uploads) into platform-ready formats: LinkedIn posts, X threads, blog drafts, hooks, hashtags, and captions.

@AGENTS.md

## Tech Stack

- **Framework**: Next.js 16.2.3 (Turbopack) with App Router and React 19
- **Styling**: Tailwind CSS 4, shadcn/ui, tw-animate-css
- **Auth & Database**: Supabase (SSR auth, PostgreSQL with RLS)
- **AI**: Google Gemini 2.0 Flash via `@google/generative-ai` — falls back to deterministic generation when API key is absent
- **Language**: TypeScript (strict mode)

## Running Locally

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev                   # starts on http://localhost:3000
```

Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_GEMINI_API_KEY` (optional).

## Architecture

```
src/
  app/
    (app)/          # authenticated routes (dashboard, project/[id])
    (auth)/         # login, register
    actions/        # server actions
    auth/callback/  # Supabase OAuth callback
  components/
    dashboard/      # stat cards, project list, input card
    landing/        # hero, features, CTA, footer
    project/        # content workspace, thread viz, download
    ui/             # shadcn/ui primitives
  lib/
    ai/             # Gemini LLM integration (llm.ts)
    services/       # data layer — auto-switches mock vs Supabase
    supabase/       # client.ts (browser), server.ts (server-side)
  types/            # shared TypeScript interfaces
```

- `proxy.ts` handles route protection (redirects unauthenticated users)
- `src/lib/services/projects.ts` abstracts data access — uses Supabase when env vars are present, otherwise falls back to mock data
- Supabase migrations live in `supabase/`

## Conventions

- Dark theme with amber/gold accent (`amber-400`, `amber-500`)
- No emojis in UI text
- AR/FR/EN i18n planned but not yet implemented
- Server Components by default; `'use client'` only where interactivity is required
- All Supabase tables use Row Level Security
