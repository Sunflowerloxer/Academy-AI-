create extension if not exists pgcrypto;
create table if not exists public.activities (
 id uuid primary key default gen_random_uuid(),
 teacher_id uuid not null references auth.users(id) on delete cascade,
 title text not null,
 type text not null check (type in ('multiple_choice','true_false','flashcards','matching','ordering')),
 content jsonb not null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists activities_teacher_id_idx on public.activities(teacher_id);
alter table public.activities enable row level security;
drop policy if exists "Teachers can view own activities" on public.activities;
create policy "Teachers can view own activities" on public.activities for select to authenticated using (auth.uid() = teacher_id);
drop policy if exists "Teachers can insert own activities" on public.activities;
create policy "Teachers can insert own activities" on public.activities for insert to authenticated with check (auth.uid() = teacher_id);
drop policy if exists "Teachers can update own activities" on public.activities;
create policy "Teachers can update own activities" on public.activities for update to authenticated using (auth.uid() = teacher_id) with check (auth.uid() = teacher_id);
drop policy if exists "Teachers can delete own activities" on public.activities;
create policy "Teachers can delete own activities" on public.activities for delete to authenticated using (auth.uid() = teacher_id);
drop policy if exists "Anyone can read shared activities" on public.activities;
drop policy if exists "Public activity links" on public.activities;
create policy "Public activity links" on public.activities for select to anon using (true);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists activities_updated_at on public.activities;
create trigger activities_updated_at before update on public.activities for each row execute procedure public.set_updated_at();
