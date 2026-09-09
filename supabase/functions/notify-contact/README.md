# Contact email notification

Deploy this Edge Function as `notify-contact`, then configure a Database Webhook on `public.messages` for INSERT events.

Required Edge Function secrets:
- `RESEND_API_KEY` — your Resend API key
- `ADMIN_EMAIL` — the portfolio admin inbox (defaults to the supplied admin email)
- `FROM_EMAIL` — a verified Resend sender, e.g. `Portfolio <hello@yourdomain.com>`
- `WEBHOOK_SECRET` — a random secret; send it as the `x-webhook-secret` webhook header

The function expects the standard Supabase Database Webhook payload and sends the new message to the admin inbox.
