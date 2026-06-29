# Functions — deploy

Two different models, on purpose:

## contact — shared backbone (no per-site deploy)
`contact` is **not** a per-site function. Every AI Smith site posts to the **one** multi-tenant
`contact` endpoint on the shared **`AISmith-functions`** Supabase project. The source is
canon-tracked in the Factory repo (`functions/contact/`) and deployed from there; writes to the
live shared project are support-track / human-gated (one bad change hits every tenant).

**Onboard this site:** add one key to the `CONTACT_TENANTS` secret on the shared project —
`"https://<site-domain>": { "to": "<inbox>", "from"?, "subject"? }`. No source change, no
redeploy. Then point the front end's `contactAction` at
`https://<aismith-functions-ref>.supabase.co/functions/v1/contact`. Origin allowlist is the CORS
control; destination is server-side; honeypot + per-origin rate-limit are built in.
(Regression watch: `OPTIONS -> 204` must carry no body.)

## newsletter — per-site function (Brevo)
No shared newsletter backbone exists, so newsletter is a **per-site** Supabase Edge Function in
the site's **own** functions-only Supabase project (AS-owned org, empty of tables), mounted only
if the site runs a newsletter. Set secrets and deploy into that project:
