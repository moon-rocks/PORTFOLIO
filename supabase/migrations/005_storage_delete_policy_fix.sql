-- Fix Storage delete permissions for the existing admin system.
-- Uses the same public.is_admin() check as the rest of the CMS instead of a hard-coded email.

drop policy if exists "portfolio assets admin insert" on storage.objects;
drop policy if exists "portfolio assets admin update" on storage.objects;
drop policy if exists "portfolio assets admin delete" on storage.objects;

drop policy if exists "admin upload portfolio assets" on storage.objects;
drop policy if exists "admin update portfolio assets" on storage.objects;
drop policy if exists "admin delete portfolio assets" on storage.objects;

create policy "admin upload portfolio assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'portfolio-assets' and public.is_admin());

create policy "admin update portfolio assets"
on storage.objects for update
to authenticated
using (bucket_id = 'portfolio-assets' and public.is_admin())
with check (bucket_id = 'portfolio-assets' and public.is_admin());

create policy "admin delete portfolio assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'portfolio-assets' and public.is_admin());

notify pgrst, 'reload schema';
