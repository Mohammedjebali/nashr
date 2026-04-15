# Nashr — Setup Notes

## Quick Start

```bash
cp .env.example .env.local
# Fill in your Supabase keys (see below)
npm install
npm run dev
```

Without Supabase env vars the app runs in **demo mode** with mock data.
Without the Gemini key, content generation uses a deterministic engine (no AI calls).

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://nuekoqauvwjqgjqvqygc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
GOOGLE_GEMINI_API_KEY=<your-gemini-api-key>
```

**Supabase keys**: Dashboard → Project Settings → API (project `nuekoqauvwjqgjqvqygc`).

**Gemini key** (optional): [Google AI Studio](https://aistudio.google.com/apikey). Enables real AI-generated content (LinkedIn, threads, blogs, hooks, captions). Without it, the deterministic engine produces structured content from the input text.

## Database Setup

### First-time setup

Paste `supabase/schema.sql` into the SQL Editor in the Supabase dashboard, or use the CLI:

```bash
supabase link --project-ref nuekoqauvwjqgjqvqygc
supabase db push
```

### Migrations (if schema was already applied)

Run these in order via the Supabase SQL Editor if you previously applied an earlier version of the schema:

**001 — add `draft` status** (`supabase/migrations/001_add_draft_status.sql`)

**002 — live readiness** (`supabase/migrations/002_live_readiness.sql`)
Adds unique constraint on `transcripts.project_id` and delete policies for re-generation.

If starting fresh, `schema.sql` already includes everything — no migrations needed.

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
- Content generation uses Google Gemini (`gemini-2.0-flash`) when `GOOGLE_GEMINI_API_KEY` is set; falls back to a deterministic engine otherwise
- The LLM service layer at `src/lib/ai/llm.ts` encapsulates the Gemini call with structured JSON output and safe parsing
- `generateFromInput()` in `src/lib/ai/generate.ts` is async — it always builds transcript/highlights deterministically, then attempts LLM for written content
- For pasted text input, the actual user text is sent directly to the LLM (no synthetic padding)
- Each generation records its method (`llm` or `deterministic`) in a usage event
- RLS enforces row-level ownership; the app uses the authenticated anon client for user-scoped queries
- Dashboard revalidates after project creation via `revalidatePath`

## End-to-End Verification

After applying the schema and setting env vars, walk through this flow to confirm everything works:

1. **Auth** — visit `/register`, create an account with email + password. Verify redirect to `/dashboard`. Sign out, then sign back in at `/login`.
2. **Project creation (text)** — on the dashboard, switch to "Paste Text", enter a paragraph, click "Generate Content". You should be redirected to `/project/<id>` showing a "completed" badge and all 7 content panels (transcript, highlights, LinkedIn, X thread, blog, hooks/hashtags, captions).
3. **Project creation (YouTube)** — paste a YouTube URL, generate. Same flow — deterministic content is built from the URL metadata.
4. **Project listing** — return to `/dashboard`. Both projects should appear in the list with status badges.
5. **Gemini integration (optional)** — if `GOOGLE_GEMINI_API_KEY` is set, create another project. The project detail page should show an "AI generated" badge instead of "Auto generated".
6. **Error state** — if generation fails for any reason, the project should still appear with a "failed" badge and a retry message — not a raw server error.

### Quick smoke test (curl)

```bash
# After signing in via the browser, copy your sb-* cookies and run:
curl -s http://localhost:3000/dashboard -H "Cookie: <your-cookies>" | grep -o 'Dashboard'
```

If you see `Dashboard`, the auth + server rendering pipeline is working.

## Next Steps

- Add YouTube transcript extraction (Whisper or third-party API) for richer source material
- Enable OAuth providers (Google, GitHub) in Supabase dashboard
- Add file upload support (Supabase Storage or Vercel Blob)
- Add billing/usage limits
- Explore additional LLM providers or model upgrades
