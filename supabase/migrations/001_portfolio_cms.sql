-- Portfolio CMS / messaging / storage setup for the supplied Supabase project.
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  technologies text[] default '{}',
  live_url text,
  project_url text,
  github_url text,
  thumbnail_url text,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text default '↗',
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  name text,
  initials text,
  profile_image_url text,
  about_short text,
  about_lead text,
  about_long text,
  contact_note text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Preserve existing contact_messages data if the earlier version of the portfolio used it.
do $$
begin
  if to_regclass('public.contact_messages') is not null then
    insert into public.messages (name, email, subject, message, created_at)
    select name, email, subject, message, created_at
    from public.contact_messages;
  end if;
end $$;

-- Admin authorization: only the supplied admin email is treated as an administrator.
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

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
drop trigger if exists skills_updated_at on public.skills;
create trigger skills_updated_at before update on public.skills for each row execute function public.set_updated_at();
drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.skills enable row level security;
alter table public.site_settings enable row level security;
alter table public.messages enable row level security;

-- Public visitors can read published portfolio content.
drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects for select to anon, authenticated using (published = true or public.is_admin());
drop policy if exists "admin manage projects" on public.projects;
create policy "admin manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published services" on public.services;
create policy "public read published services" on public.services for select to anon, authenticated using (published = true or public.is_admin());
drop policy if exists "admin manage services" on public.services;
create policy "admin manage services" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published skills" on public.skills;
create policy "public read published skills" on public.skills for select to anon, authenticated using (published = true or public.is_admin());
drop policy if exists "admin manage skills" on public.skills;
create policy "admin manage skills" on public.skills for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "admin manage site settings" on public.site_settings;
create policy "admin manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Anyone can submit a contact message; only the admin can read/delete messages.
drop policy if exists "public insert messages" on public.messages;
create policy "public insert messages" on public.messages for insert to anon, authenticated with check (true);
drop policy if exists "admin read messages" on public.messages;
create policy "admin read messages" on public.messages for select to authenticated using (public.is_admin());
drop policy if exists "admin delete messages" on public.messages;
create policy "admin delete messages" on public.messages for delete to authenticated using (public.is_admin());

-- Public portfolio asset bucket.
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

-- Admin-only writes; public can read images via public URLs.
drop policy if exists "public read portfolio assets" on storage.objects;
create policy "public read portfolio assets" on storage.objects for select to anon, authenticated using (bucket_id = 'portfolio-assets');
drop policy if exists "admin upload portfolio assets" on storage.objects;
create policy "admin upload portfolio assets" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-assets' and public.is_admin());
drop policy if exists "admin update portfolio assets" on storage.objects;
create policy "admin update portfolio assets" on storage.objects for update to authenticated using (bucket_id = 'portfolio-assets' and public.is_admin()) with check (bucket_id = 'portfolio-assets' and public.is_admin());
drop policy if exists "admin delete portfolio assets" on storage.objects;
create policy "admin delete portfolio assets" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-assets' and public.is_admin());
