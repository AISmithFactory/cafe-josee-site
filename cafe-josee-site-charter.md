# Cafe Josee, site charter

**Slug** `cafe-josee` · **Repo** `AISmithFactory/cafe-josee-site` · **Built** 14 August 2026
**Canon pointer** site-contract **1.8.18** (`dist/site-contract/contract.json`, read from the
session reference cache at Factory main `e0d91cd`)
**Scenario** intake Scenario 2, prospect DEMO concept. `noindex` on. Not a working client.

This is the declaration the audit checks the repo against (build-agent S5, deliverable 2).

---

## 1. Identity

| | |
|---|---|
| Trading name | Cafe Josee (Google Business Profile spells it without the accent) |
| Archetype | neighbourhood cafe / coffee bar, breakfast + lunch, evening apero |
| Language | **nl** only, hard-set in `__root`. No second language, no switcher. Operator ruling: Borgerhout neighbourhood trade. |
| Domain target | `cafe-josee.demos.aismith.io` (demo). No production domain exists: the business has never had a website or a domain. |
| Character | plain, warm, local. Short sentences. No hospitality marketing register. |

## 2. Skin

Read from the render (intake S6), never inferred from the words. The source was the mark the
cafe publishes as its own profile image: a printed cream card carrying two teal cups stacked
over a green dome, with the name in a coral brush script. The published drinks card repeats
the same two inks on white.

| token | value | note |
|---|---|---|
| `--bg` | `#FBF8EF` | the card's cream ground |
| `--bg-alt` | `#EBE7D6` | |
| `--surface` | `#FFFFFF` | the drinks card ground |
| `--surface-warm` | `#F5F1E4` | |
| `--text` | `#14302D` | |
| `--text-soft` | `#4A5B55` | |
| `--action` | `#0A6270` | CTA fill behind white text |
| `--accent` | `#0F94A5` | sampled from the cup ink `#0295A5`, darkened to sit on cream |
| `--accent-text` | `#0A6270` | accent as text on light |
| `--accent-on-dark` | `#79D6E2` | |
| `--highlight` | `#0D9A62` | sampled from the green dome |
| `--dark` | `#123531` | |
| `--dark-alt` | `#12504C` | |
| `--on-dark` | `#F7F4E9` | |

**Fonts** are concept stand-ins (intake S7): Fraunces display + Inter body. The card's coral
script and the drinks card's heavy geometric sans are not publicly identified, so the exact
faces are the one go-live swap.

**AA matrix, re-derived on THIS palette (S2.3).** Every pair a route uses:

| ink | ground | ratio |
|---|---|---|
| `--text` | `--bg` | 13.27 |
| `--text` | `--bg-alt` | 11.36 |
| `--text` | `--surface` | 14.09 |
| `--text-soft` | `--bg` | 6.78 |
| `--text-soft` | `--bg-alt` | 5.80 |
| `--text-soft` | `--surface` | 7.19 |
| `--on-dark` | `--dark` | 12.08 |
| `--on-dark` | `--dark-alt` | 8.37 |
| `--accent-text` | `--bg` | 6.61 |
| `--accent-text` | `--bg-alt` | 5.66 |
| `--accent-text` | `--surface` | 7.01 |
| `--accent-on-dark` | `--dark` | 7.93 |
| `--accent-on-dark` | `--dark-alt` | 5.50 |
| white | `--action` | 7.01 |
| `--on-dark` | `--accent` | 3.29 (large-display only) |

`--on-dark` on `--accent` clears the 3.0 large threshold and not 4.5, so **no section uses
`tone="accent"`**. The accent ink appears only through `--accent-text` on light grounds and
`--accent-on-dark` on dark ones. No `--hue-N` slots are declared: the brand is a two-ink
family already carried by `--accent` and `--highlight`, and the coral belongs to the mark
rather than to a section ground.

**Brand mark** `brandMark: { kind: "image", src: "/cafe-josee-mark.png" }`. The real mark,
extracted from the published card and keyed off its printed ground. Not a text wordmark.

## 3. Structure

```routes
/
/drankkaart
/apero
/het-cafe
/praktisch
/privacy
```

| route | what it carries |
|---|---|
| `/` | the offer, the new apero, the day (ontbijt / lunch / koffie), the room, the hours |
| `/drankkaart` | the full drinks card, built into a route, every line and price from their own published card |
| `/apero` | the evening service that began 14 August 2026 |
| `/het-cafe` | the room, the Boelaerbuurt, the rotating wall of neighbourhood art |
| `/praktisch` | hours, address, Map facade, contact form |
| `/privacy` | core `PrivacyNotice` (S7.4) |

## 4. Content model

Static in repo. Copy written from extracted facts in spine voice; nothing pasted from a
social caption. Voice grep: zero prose em-dashes across the rendered routes.

## 5. Data posture

**no-db, static-in-repo.** Connects the shared **`AISmith-functions`** project
(`https://jctzzxibnflyvfallpva.supabase.co`) for the hardened `contact` function only.
No table, no DB client in the bundle, nothing stored. `builder_backend_provisioned: false`.

## 6. Modules enabled

- `Hours` (S3.3) on `/` and `/praktisch`, static, marked publicly sourced and unverified.
- `Map` (S3.5 facade) on `/praktisch`. Nothing third-party loads until a click.
- No gallery, no video, no marquee, no audio, no deco.

## 7. Integrations

- **Contact form: on.** Posts `{name, email, message, honeypot}` to the shared `contact` fn.
  **Demo destination is the AI Smith catch-all `contact@aismith.io`.** The cafe's own public
  address (`josee.cafe@gmail.com`, read from their Facebook page) is deliberately **not**
  wired: it is the one go-live `CONTACT_TENANTS` swap.
- **Newsletter: off.**
- **Booking: none.** The cafe takes no reservations.

## 8. Legal and privacy (S7.4)

Controller: Cafe Josee. Enabled subprocessors, and only the enabled ones: **Netlify**
(hosting and logs), **Resend** (contact form delivery, through the shared fn), **Google Maps**
(the `/praktisch` facade, loads only on a click). Notice language `nl`. Concept marker in the
footer: "Conceptsite door AI Smith, 2026."

## 9. Host, runtime, SEO

- Host **Netlify**. Runtime **Supabase Edge Functions** on the shared project.
- `seo.noindex: true`. `<meta name="robots" content="noindex,nofollow">` plus an
  `X-Robots-Tag: noindex` header from `netlify.toml` and `public/_headers`. **`robots.txt`
  carries no Disallow**, on purpose: blocking the crawl would stop the crawler reading the
  noindex.
- No `og:image` ships with the concept. A 1200x630 card is a go-live item.

## 10. Transfer unit (S8)

The Netlify site plus a one-time free port of its contact function off `AISmith-functions`.

---

## 11. What extraction left open (the review list)

Carried from the brief. Every line here is a go-live item.

**Facts**

1. **Hours are publicly sourced and unverified.** GBP and the cafe's own Instagram bio agree
   line for line, which is unusually clean. A third source, the borgermap.be directory listing,
   still carries a 2022 take-out era record (open Wednesday and Thursday 16.00 to 18.30, closed
   the rest of the week) that is wrong in every cell. Worth telling them: that listing is live.
2. **The apero is not on their Google profile.** The evening service starting 14 August 2026 is
   announced only on Instagram and hinted at in the Facebook bio. Anyone checking Google sees a
   place that shuts at 16.30. This is the single most valuable finding of the run.
3. **The address dispute is settled and both aggregators were half right.** GBP gives Vosstraat
   2, 2140 Antwerpen; another source described a cafe at Te Boelaerpark. The Maps panel shows
   the cafe on the corner of Vosstraat and Gitschotellei with the park directly opposite, and
   the cafe's own Facebook bio says "aan het Te Boelaerpark". Same place, two descriptions.
4. **No website field on the GBP record.** The "Add website" prompt is still showing, which
   confirms the premise of this build and is itself a thing to hand them.
5. **Menu prices are from their published drinks card,** date of publication unknown. Confirm
   before go-live.
6. **No food menu is public.** Reviews and photos evidence breakfast, lunch, salads, an omelet,
   cake and vegetarian options, and the Facebook bio says koffie, brunch, lunch, taart en apero.
   The site therefore describes the food in the register their own bio uses and prices nothing.
7. **Apero prices are not public** and are deliberately absent from `/apero`.

**People and ownership**

8. **No person is named anywhere on this site, deliberately.** The cafe changed hands around
   June 2026 and nothing about the current operators has been confirmed owner-direct. Public
   sources carry names belonging to *earlier* owners: a farewell post from the previous owner
   who took the cafe over on 1 July 2022 from two named predecessors, and a named cook. None of
   it is used, and none of it may be attributed to the people running it now.
9. **"Josee-familie" is used once, and it is theirs.** The current operators call themselves
   that in their own July and August 2026 posts, and the Instagram highlight carries the name.
   Confirm they are happy to see it on a website.
10. **The GBP record carries an "Identifies as women-owned" attribute.** Public, on their own
    profile, and not used on the site. Ask whether they want it surfaced.

**Assets**

11. **Photography is referenced, not claimed.** Cafe Josee has no website, so there is no site
    of their own to reuse image URLs from. Every photo on this demo is one of their own photos,
    referenced by its live Google Business Profile URL. Instagram and Facebook were ruled out as
    an image origin: both CDNs sign their URLs and expire them, so a page built on them breaks
    within days. At go-live the photos should be supplied as files and served from the site.
12. **The mark is extracted from a photograph.** No clean logo file exists in public. The mark
    on this demo is the cups-and-dome device lifted from the card they publish and keyed off its
    printed ground, so it carries the paper grain. Ask for the original artwork.
13. **The coral script wordmark was not extracted.** Only the device is used; the name is set in
    the display face. The real script is a go-live swap alongside the fonts.
14. **No `og:image`.**

17. **One interior photo shows staff faces.** It is the cafe's own photograph, published by
    them on their own Google profile, so it ships under the standing default. It is still
    identifiable people, so confirm it at go-live like any named person.

**Wiring**

15. **Contact form goes to `contact@aismith.io`.** Their real address is known and unused.
16. **The origin is not yet registered** in the shared `contact` function's `CONTACT_TENANTS`
    map. Until it is, a submitted form will be rejected by the origin allowlist. Operator step.
