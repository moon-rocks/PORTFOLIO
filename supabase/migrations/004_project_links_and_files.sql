-- Project link/file management compatibility migration.
alter table if exists public.projects add column if not exists project_file_path text;
alter table if exists public.projects add column if not exists project_file_url text;
alter table if exists public.projects add column if not exists project_file_name text;
alter table if exists public.projects add column if not exists project_file_size bigint;

-- Keep project file metadata editable only by the authenticated admin.
-- Public visitors read published project rows through the existing public SELECT policy.
notify pgrst, 'reload schema';
