-- Final compatibility migration for the portfolio Admin CMS.
-- Safe to run on the already-configured project.

alter table if exists public.projects add column if not exists live_url text;
alter table if exists public.projects add column if not exists project_url text;
alter table if exists public.projects add column if not exists thumbnail_url text;
alter table if exists public.projects add column if not exists published boolean default true;
alter table if exists public.projects add column if not exists display_order integer default 0;

update public.projects
set live_url = project_url
where (live_url is null or btrim(live_url) = '')
  and project_url is not null
  and btrim(project_url) <> '';

update public.projects
set project_url = live_url
where (project_url is null or btrim(project_url) = '')
  and live_url is not null
  and btrim(live_url) <> '';

update public.projects set published = true where published is null;
update public.projects set display_order = 0 where display_order is null;

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

-- Keep public reads and admin writes working for the portfolio-assets bucket.
drop policy if exists "portfolio assets public read" on storage.objects;
drop policy if exists "portfolio assets admin insert" on storage.objects;
drop policy if exists "portfolio assets admin update" on storage.objects;
drop policy if exists "portfolio assets admin delete" on storage.objects;

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
