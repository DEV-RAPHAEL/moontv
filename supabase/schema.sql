-- Moon TV user data: favourites and push notification tokens.
-- Paste this whole file into the Supabase SQL editor and run it once.
-- Auth itself (email + password signups) is enabled in the Supabase dashboard.

create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  programme_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, programme_slug)
);

create table if not exists public.push_tokens (
  user_id uuid not null references auth.users (id) on delete cascade,
  token text primary key,
  platform text not null check (platform in ('ios', 'android', 'web')),
  created_at timestamptz not null default now()
);

-- One row per (user, show, slot) so a reminder is never sent twice.
create table if not exists public.reminders_sent (
  user_id uuid not null references auth.users (id) on delete cascade,
  programme_slug text not null,
  broadcast_day date not null,
  start_time text not null,
  sent_at timestamptz not null default now(),
  primary key (user_id, programme_slug, broadcast_day, start_time)
);

alter table public.favorites enable row level security;
alter table public.push_tokens enable row level security;
alter table public.reminders_sent enable row level security;

-- Users can only see and manage their own rows.
create policy "own favorites" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own push tokens" on public.push_tokens
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own reminders" on public.reminders_sent
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
