# Nashr — Setup Notes

## Quick Start

```bash
cp .env.example .env.local
# Fill in your Supabase keys (see below)
npm install
npm run dev
```

Without env vars the app runs in **demo mode** with generated mock data.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://nuekoqauvwjqgjqvqygc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

Get keys from: Supabase Dashboard → Project Settings → API (project `nuekoqauvwjqgjqvqygc`).

## Database Setup

### First-time setup

Paste `supabase/schema.sql` into the SQL Editor in the Supabase dashboard, or use the CLI:

```bash
supabase link --project-ref nuekoqauvwjqgjqvqygc
supabase db push
```

### Migration: add `draft` status

If you already applied the schema before the `draft` status was added, run this migration:

```sql
-- Add 'draft' to project status values and make it the default
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('draft', 'processing', 'completed', 'failed'));
ALTER TABLE public.projects ALTER COLUMN status SET DEFAULT 'draft';
```

## Supabase Auth Config

In the Supabase dashboard under Authentication → URL Configuration:

- **Site URL**: `http://localhost:3000` (or your deploy URL)
- **Redirect URLs**: add `http://localhost:3000/auth/callback`

For email confirmation toggle: Authentication → Providers → Email → toggle "Confirm email" on/off as needed. Disabling it lets users sign in immediately after registration.

## Running

```bash
npm run dev    # Start dev server on :3000
npm run build  # Production build
```

## Architecture Notes

- `proxy.ts` handles route protection (Next.js 16 proxy pattern — replaces traditional middleware.ts)
- `src/app/(app)/layout.tsx` provides a shared auth guard for all app routes
- Auth uses `@supabase/ssr` cookie-based sessions throughout
- Login/register pages are wired to real Supabase Auth (email/password); OAuth callback handler at `/auth/callback`
- Project lifecycle: `draft` → `processing` → `completed` (or `failed`)
- Content generation is deterministic from source input (no external API calls yet)
- The generation engine at `src/lib/ai/generate.ts` produces context-aware content based on the user's actual input text, title, and source type
- To plug in real AI services (Whisper, Gemini, etc.), replace internals of `generateFromInput()` while keeping the same return type
- RLS enforces row-level ownership; the app uses the authenticated anon client for user-scoped queries
- Dashboard revalidates after project creation via `revalidatePath`

## Next Steps

- Wire real AI pipeline into `src/lib/ai/generate.ts` (Whisper transcription, LLM content generation)
- Enable OAuth providers (Google, GitHub) in Supabase dashboard
- Add file upload support (Supabase Storage or Vercel Blob)
- Add billing/usage limits
