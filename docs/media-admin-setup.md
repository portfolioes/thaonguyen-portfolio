# Portfolio Media Admin Setup

This project uses Vercel for hosting/API functions and Supabase for media storage plus the slot mapping table.

## 1. Supabase

Run `supabase/schema.sql` in the Supabase SQL editor.

It creates:

- Public storage bucket: `portfolio-media`
- Public-readable table: `portfolio_assets`
- No public insert/update/delete policy; admin writes use `SUPABASE_SERVICE_ROLE_KEY` through Vercel API functions.

## 2. Environment Variables

Add these in Vercel:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_UPLOAD_PASSWORD=...
ADMIN_SESSION_SECRET=...
```

Use a long random value for `ADMIN_SESSION_SECRET`.

## 3. Upload Flow

Open `/admin`, sign in with `ADMIN_UPLOAD_PASSWORD`, and upload media into each slot.

Images accept `jpg`, `png`, `webp` up to 8MB.
Videos accept `mp4`, `webm` up to 300MB.

The public portfolio reads `portfolio_assets` with the anon key. If Supabase env vars are missing, the site still renders the original placeholders.

For local testing of the admin API, use Vercel's local runtime (`vercel dev`) instead of plain `npm run dev`; Vite alone does not serve the `api/` functions.
