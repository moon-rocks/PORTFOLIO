-- Add the Instagram URL to the public site settings.
-- Run once in the Supabase SQL Editor.

alter table if exists public.site_settings
  add column if not exists instagram_url text;

notify pgrst, 'reload schema';