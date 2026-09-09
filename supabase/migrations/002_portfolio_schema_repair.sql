-- Portfolio CMS schema repair for an already-created Supabase project.
-- Run once in the Supabase SQL Editor.
-- This migration is intentionally additive and safe for existing data.

create extension if not exists pgcrypto;

-- Projects: columns used by the current portfolio admin/public UI.
alter table if exists public.projects add column if not exists category text;
alter table if exists public.projects add column if not exists description text;
alter table if exists public.projects add column if not exists technologies text[] default '{}';
alter table if exists public.projects add column if not exists live_url text;
alter table if exists public.projects add column if not exists project_url text;
alter table if exists public.projects add column if not exists github_url text;
alter table if exists public.projects add column if not exists thumbnail_url text;
alter table if exists public.projects add column if not exists published boolean default true;
alter table if exists public.projects add column if not exists display_order integer default 0;
alter table if exists public.projects add column if not exists created_at timestamptz default now();
alter table if exists public.projects add column if not exists updated_at timestamptz default now();

-- Services.
alter table if exists public.services add column if not exists description text;
alter table if exists public.services add column if not exists icon text default '↗';
alter table if exists public.services add column if not exists published boolean default true;
alter table if exists public.services add column if not exists display_order integer default 0;
alter table if exists public.services add column if not exists created_at timestamptz default now();
alter table if exists public.services add column if not exists updated_at timestamptz default now();

-- Skills.
alter table if exists public.skills add column if not exists description text;
alter table if exists public.skills add column if not exists published boolean default true;
alter table if exists public.skills add column if not exists display_order integer default 0;
alter table if exists public.skills add column if not exists created_at timestamptz default now();
alter table if exists public.skills add column if not exists updated_at timestamptz default now();

-- Site settings. The current UI stores one row rather than key/value settings.
alter table if exists public.site_settings add column if not exists name text;
alter table if exists public.site_settings add column if not exists initials text;
alter table if exists public.site_settings add column if not exists profile_image_url text;
alter table if exists public.site_settings add column if not exists about_short text;
alter table if exists public.site_settings add column if not exists about_lead text;
alter table if exists public.site_settings add column if not exists about_long text;
alter table if exists public.site_settings add column if not exists contact_note text;
alter table if exists public.site_settings add column if not exists github_url text;
alter table if exists public.site_settings add column if not exists linkedin_url text;
alter table if exists public.site_settings add column if not exists instagram_url text;
alter table if exists public.site_settings add column if not exists created_at timestamptz default now();
alter table if exists public.site_settings add column if not exists updated_at timestamptz default now();
-- Older attempts created this as NOT NULL; the current UI does not use it.
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='setting_key') then
    alter table public.site_settings alter column setting_key drop not null;
  end if;
end $$;

-- Messages.
alter table if exists public.messages add column if not exists subject text;
alter table if exists public.messages add column if not exists created_at timestamptz default now();

-- Ensure sane defaults for rows created before this repair.
update public.projects set published = true where published is null;
update public.projects set display_order = 0 where display_order is null;
update public.services set published = true where published is null;
update public.services set display_order = 0 where display_order is null;
update public.skills set published = true where published is null;
update public.skills set display_order = 0 where display_order is null;

-- Admin function: authorization is based on the authenticated Supabase user's email.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'ck797097224@gmail.com';
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Storage bucket.
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

-- Replace Storage policies so uploads do not depend on a stale admins table.
drop policy if exists "public read portfolio assets" on storage.objects;
drop policy if exists "admin upload portfolio assets" on storage.objects;
drop policy if exists "admin update portfolio assets" on storage.objects;
drop policy if exists "admin delete portfolio assets" on storage.objects;
drop policy if exists "Public can view portfolio assets" on storage.objects;
drop policy if exists "Admins can upload portfolio assets" on storage.objects;
drop policy if exists "Admins can update portfolio assets" on storage.objects;
drop policy if exists "Admins can delete portfolio assets" on storage.objects;


create policy "portfolio assets public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'portfolio-assets');

create policy "portfolio assets admin insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-assets'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ck797097224@gmail.com'
);

create policy "portfolio assets admin update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-assets'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ck797097224@gmail.com'
)
with check (
  bucket_id = 'portfolio-assets'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ck797097224@gmail.com'
);

create policy "portfolio assets admin delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-assets'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ck797097224@gmail.com'
);

notify pgrst, 'reload schema';
