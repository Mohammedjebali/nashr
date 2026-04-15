-- Nashr MVP Schema
-- Content repurposing SaaS for MENA creators
-- Run against Supabase project: nuekoqauvwjqgjqvqygc

-- ============================================================
-- Extensions
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- Tables
-- ============================================================

-- User profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  plan        text not null default 'free' check (plan in ('free', 'pro', 'team')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Projects (top-level container for each repurposing job)
create table if not exists public.projects (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  title          text not null,
  source_type    text not null check (source_type in ('youtube', 'upload', 'text')),
  source_url     text,
  status         text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  thumbnail_url  text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Source inputs (raw material for each project)
create table if not exists public.source_inputs (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  input_type  text not null check (input_type in ('youtube', 'upload', 'text')),
  raw_url     text,
  raw_text    text,
  file_path   text,
  metadata    jsonb default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

-- Transcripts (full transcript stored as JSON segments)
create table if not exists public.transcripts (
  id                uuid primary key default uuid_generate_v4(),
  project_id        uuid not null references public.projects(id) on delete cascade,
  segments          jsonb not null default '[]'::jsonb,
  language          text,
  duration_seconds  numeric,
  created_at        timestamptz not null default now()
);

-- Highlights (key moments extracted from content)
create table if not exists public.highlights (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  start_time  numeric not null,
  end_time    numeric not null,
  summary     text not null,
  tags        text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- Generated assets (all AI-produced output formats)
create table if not exists public.generated_assets (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  asset_type  text not null check (asset_type in (
    'linkedin', 'x_thread', 'blog_outline', 'blog_draft',
    'hooks', 'hashtags', 'captions', 'clip_ideas'
  )),
  content     jsonb not null default '{}'::jsonb,
  version     integer not null default 1,
  created_at  timestamptz not null default now()
);

-- Usage events (track generations, views, copies for analytics)
create table if not exists public.usage_events (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  project_id  uuid references public.projects(id) on delete set null,
  event_type  text not null,
  metadata    jsonb default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_source_inputs_project on public.source_inputs(project_id);
create index if not exists idx_transcripts_project on public.transcripts(project_id);
create index if not exists idx_highlights_project on public.highlights(project_id);
create index if not exists idx_generated_assets_project on public.generated_assets(project_id);
create index if not exists idx_generated_assets_type on public.generated_assets(asset_type);
create index if not exists idx_usage_events_user on public.usage_events(user_id);
create index if not exists idx_usage_events_project on public.usage_events(project_id);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.source_inputs enable row level security;
alter table public.transcripts enable row level security;
alter table public.highlights enable row level security;
alter table public.generated_assets enable row level security;
alter table public.usage_events enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Projects: users can CRUD their own projects
create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can create projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Source inputs: access via project ownership
create policy "Users can view own source inputs"
  on public.source_inputs for select
  using (exists (
    select 1 from public.projects
    where projects.id = source_inputs.project_id
    and projects.user_id = auth.uid()
  ));

create policy "Users can create source inputs"
  on public.source_inputs for insert
  with check (exists (
    select 1 from public.projects
    where projects.id = source_inputs.project_id
    and projects.user_id = auth.uid()
  ));

-- Transcripts: access via project ownership
create policy "Users can view own transcripts"
  on public.transcripts for select
  using (exists (
    select 1 from public.projects
    where projects.id = transcripts.project_id
    and projects.user_id = auth.uid()
  ));

create policy "Users can create transcripts"
  on public.transcripts for insert
  with check (exists (
    select 1 from public.projects
    where projects.id = transcripts.project_id
    and projects.user_id = auth.uid()
  ));

-- Highlights: access via project ownership
create policy "Users can view own highlights"
  on public.highlights for select
  using (exists (
    select 1 from public.projects
    where projects.id = highlights.project_id
    and projects.user_id = auth.uid()
  ));

create policy "Users can create highlights"
  on public.highlights for insert
  with check (exists (
    select 1 from public.projects
    where projects.id = highlights.project_id
    and projects.user_id = auth.uid()
  ));

-- Generated assets: access via project ownership
create policy "Users can view own generated assets"
  on public.generated_assets for select
  using (exists (
    select 1 from public.projects
    where projects.id = generated_assets.project_id
    and projects.user_id = auth.uid()
  ));

create policy "Users can create generated assets"
  on public.generated_assets for insert
  with check (exists (
    select 1 from public.projects
    where projects.id = generated_assets.project_id
    and projects.user_id = auth.uid()
  ));

-- Usage events: users can view/create their own
create policy "Users can view own usage events"
  on public.usage_events for select
  using (auth.uid() = user_id);

create policy "Users can create usage events"
  on public.usage_events for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- Trigger: auto-create profile on auth signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Trigger: auto-update updated_at timestamps
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger set_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at();
