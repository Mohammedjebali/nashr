# Nashr — Setup Notes

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://nuekoqauvwjqgjqvqygc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

Without env vars the app runs in demo mode with mock data.

## Database Schema

Apply the schema to the Supabase project:

```bash
# Option A: paste supabase/schema.sql into the SQL Editor in the Supabase dashboard
# Option B: supabase db push (if using Supabase CLI linked to project nuekoqauvwjqgjqvqygc)
```

The schema creates all tables, indexes, RLS policies, and triggers (including auto-profile creation on signup).

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
- `src/app/(app)/layout.tsx` provides a shared auth guard for all app routes (dashboard, project detail)
- Auth uses `@supabase/ssr` cookie-based sessions throughout
- Login/register pages are wired to real Supabase Auth (email/password); OAuth callback handler at `/auth/callback`
- Project creation writes to `projects`, `source_inputs`, `usage_events`, then seeds demo content
- Demo seed logic is in `src/lib/services/demo-seed.ts`, orchestrated through `src/lib/ai/process.ts`
- To plug in real AI/video processing, replace the internals of `processProject()` in `src/lib/ai/process.ts`
- RLS enforces row-level ownership; the app uses the authenticated anon client (not service role) for user-scoped queries
- Dashboard revalidates after project creation via `revalidatePath`

## Next Steps

- Apply schema to Supabase project (one-time)
- Wire real AI pipeline into `src/lib/ai/process.ts` (transcription, highlight extraction, content generation)
- Enable OAuth providers (Google, GitHub) in Supabase dashboard
- Add file upload support (Supabase Storage or Vercel Blob)
- Add billing/usage limits
