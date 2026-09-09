<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e0965a9b-3fb0-445d-ad62-174b1108883a

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Supabase CMS setup

The static portfolio is wired to the supplied Supabase project. The browser uses the public publishable/anon key only; authorization is enforced by Row Level Security.

1. Run `supabase/migrations/001_portfolio_cms.sql` in the Supabase SQL Editor.
2. Make sure the Supabase Auth user for the configured admin email exists and has the intended password. Do not put the password in source code.
3. Deploy `supabase/functions/notify-contact` as the `notify-contact` Edge Function.
4. Add Edge Function secrets `RESEND_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL`, and `WEBHOOK_SECRET`.
5. In Supabase Database Webhooks, create an INSERT webhook for `public.messages` targeting the deployed `notify-contact` function URL and include the `x-webhook-secret` header.
6. Create/verify the `portfolio-assets` Storage bucket using the migration.

After these steps, `/\#admin` uses Supabase Auth, the dashboard is protected by `is_admin()`, contact messages are stored in `messages`, CMS changes use Supabase CRUD, and uploaded portfolio/profile images use `portfolio-assets`.

## Supabase repair migration

If the project was already connected and you saw errors such as missing `display_order`, `site_settings.created_at`, or `site_settings.initials`, run `supabase/migrations/002_portfolio_schema_repair.sql` once in the new Supabase project's SQL Editor.

The repair migration also recreates the `portfolio-assets` Storage policies for `ck797097224@gmail.com`, adds the project live-link compatibility column, and reloads the PostgREST schema cache.

If the admin login says the account is not authorized, run `supabase/migrations/006_admin_email_fix.sql` in the same SQL Editor. The Supabase Auth user must have the exact email `ck797097224@gmail.com`.

To enable the Instagram footer link, run `supabase/migrations/007_instagram_link.sql`, then add the URL under Admin > Site Settings.

### Project publishing and uploads

- Project Live URL accepts `example.com` or a full `https://...` URL.
- Saving a project stores the link in both `live_url` and `project_url` for compatibility with existing data.
- Project/profile uploads use the `portfolio-assets` bucket and include a clear timeout/error instead of staying indefinitely on “Uploading…”.
