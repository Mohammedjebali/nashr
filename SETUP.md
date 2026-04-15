# Nashr — Setup Notes

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://nuekoqauvwjqgjqvqygc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

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

- `proxy.ts` handles route protection (Next.js 16 proxy pattern)
- Auth uses `@supabase/ssr` cookie-based sessions throughout
- Project creation seeds demo content (transcript, highlights, generated assets) so the product feels alive
- Demo seed logic is in `src/lib/services/demo-seed.ts` — replace with real AI/video processing later
- RLS enforces row-level ownership; the app uses the authenticated anon client (not service role) for user-scoped queries
