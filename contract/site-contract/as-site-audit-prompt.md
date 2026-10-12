# AI Smith — Public-Site Spine Audit: kickoff prompt

**Version 0.2 -- 11 October 2026.**

Companion to `as-site-spine-standard.md` (v0.4+). Paste the prompt below into a **fresh
chat**, one run per site. This is the standalone audit, it does **not** build anything;
point it at an already-built repo (and a preview/live URL if there is one). The build
dry-run harness is a different job.

## Use
- Attach `as-site-spine-standard.md` (the rubric), the site repo, and the site's
  `<slug>-site-charter.md`.
- If a preview/live URL exists, give it, the rendered checks (SSR view-source, real
  contrast, `lang`, per-route `<head>`) are stronger against the built site than the source.
- **Only if the charter declares a read-pipe** (S5.2/S6.4): also attach the doorway spec
  and the hub view DDL + its RLS proof. A no-db site needs none of this.
- Fill the placeholders: `<slug>` and `<host>`.
- Output is a JSON manifest (§5) + a human summary (§6). The chat stops at the plan, no
  fixes. Bring both back to the main thread for the fleet diff.

## Prompt

```
You are performing a READ-ONLY conformance audit of a single AI Smith PUBLIC SITE
against the attached Public-Site Spine Standard (as-site-spine-standard.md). That
document is the rubric — follow it. This message sets the task and the guardrails.
You are NOT building the site; do not produce build prompts or fixes.

SITE UNDER AUDIT: <slug, e.g. "aismith" or "zg-site">
HOST:             <host, e.g. the Netlify demo URL / aismith.io>

POSTURE (read first): a public site's risk is EXPOSURE, not unauthorised mutation
(the inverse of the hub audit). The gates are: no secret / service-role / hub-DB
write anywhere client-side (S6); no builder-provisioned backend on a no-db site
(S5.4); at most one declared read-only doorway with RLS on any exposed view (S6.4);
a separate app from any hub (S1.2). Plus the contrast gate (S2.3) and the voice gate
(S9.1).

INPUTS YOU SHOULD HAVE — ask for any that are missing; never infer them:
1. The Spine Standard doc (§4 = the contracts S1–S9, §5/§6 = the two outputs,
   the S2.3 worked matrix, §7 = disputes).
2. The site repo: src/styles/tokens.css + spine.css; src/components/spine/**;
   src/content/** (site.config + page compositions); src/routes/** incl. __root;
   functions/**; public/sitemap.xml + robots.txt; the charter.
3. The built output or a preview/live URL, if one exists (for SSR view-source,
   rendered contrast, lang, and per-route <head>).
4. ONLY IF the charter declares a read-pipe (S5.2/S6.4): the doorway spec + the
   hub view DDL and its RLS proof. A no-db site needs none of this; confirm no-db
   from the repo instead (no DB/Supabase client present).

If a required input is missing, name exactly which one and ask for it before
proceeding. Do not infer.

RULES (binding):
- Read-only. No fixes, no code, no CSS, no migrations. Stop at the plan.
- Evidence = code (cite path:line), the rendered/built output (quote view-source or
  computed contrast), and the charter (the declaration you reconcile against). Other
  docs, changelogs, atlases are NOT evidence.
- The CHARTER is the declaration; the REPO/built output is reality. Where they
  conflict, reality wins and the conflict is a finding. A charter claim nothing in
  the repo backs is a finding too (e.g. an integration declared but mounted on no
  page = S8.4 drift; flag it, don't pass it).
- No assertion is PASS without quoted evidence. "Looks fine" is not evidence.
- Tag every assertion IF (interface) or IMPL (implementation) per the Standard. Pass
  an interface assertion whenever the uniform surface is present.
- Do NOT flag intentional-public endpoints (contact/newsletter submit) for being
  public. Confirm instead that they hold no client-side secret and only send mail /
  hit the list API (S6).
- Read actual file contents in full (the token files, spine.css, function bodies,
  __root, the route head()s). Do not infer behaviour from filenames.

CONTRACT-SPECIFIC CHECKS (do these, don't eyeball):
- S2.2: grep BOTH the component dir AND spine.css for any raw colour literal —
  hex, colour-named token, or rgba(...) NOT composed over a token. Literal colour
  may live only in tokens.css.
- S2.3: REGENERATE the full text×tone contrast matrix from the actual tokens.css
  values (every text token × every section tone it renders on; 4.5 normal / 3.0
  large). Report the numbers. Do not trust the doc's matrix — the rule has shipped a
  fail three times by only checking the surfaces it was told to. Confirm accent-tone
  sections carry no small text.
- S4.1: tone enum is exactly paper/alt/surface/dark/slate/accent; tones are explicit
  (no :has() auto-alternation); accent-as-text resolves per tone (S4.3).
- S5.1 / S5.4: confirm no-db (no DB/Supabase client in src or bundle) AND that no
  builder backend was *provisioned*. Check an **actual surface** (client, tables, backend
  env keys), not the Lovable Cloud capability flag — the flag being auto-enabled-in-chat
  is not a finding; a provisioned backend behind a no-db site is a GATE finding.
- S6 / S6.4: no secret/service-role/write client-side; at most one read-only doorway,
  RLS on any exposed view, declared as a bridge.
- S7: per-route head() (title/description/OG) on EVERY content route; sitemap.xml +
  robots.txt present; lang hard-set in the shell; SSR view-source shows the copy,
  not an empty root div. A framework error-fallback returning an `<html>` string as a
  `Response` (e.g. `src/lib/error-page.ts`) is expected and is not a second shell.
- S9: grep the RENDERED routes for prose em-dashes (must be 0; // and {/* */}
  comments are exempt per S9.4) and for superlatives; confirm the copy matches the
  voice register declared in the charter.

PROCEDURE:
1. Confirm all inputs are present (or ask). State the slug, the host, the declared
   data posture (no-db / db / read-pipe), and whether any read-pipe is declared.
2. Walk S1 through S9 in order. For each assertion: PASS / PARTIAL / FAIL / N/A +
   the evidence + (for fails) what conformance requires.
3. Emit OUTPUT ARTIFACT 1 — the JSON manifest from §5, fully filled, as valid JSON
   in a single code block (include the regenerated contrast matrix, the voice block,
   data_posture, builder_backend_provisioned, and findings).
   Record the site's LIVE Netlify build settings in the manifest as a `netlify`
   block: `build_command`, `publish_dir` and `node_version`. It is SELF-REPORTED and
   proves what the client repo says, not what Netlify holds; that is the accepted
   trade and this block says so. `reconcile-pull.sh` then diffs it for free.
4. Emit OUTPUT ARTIFACT 2 — the human summary from §6, in this order: one-line
   verdict, contract scorecard (S1–S9), gate findings, important findings,
   additive/recommendations, variance/standard disputes.
5. Stop. Do not propose remediation code.

Begin by confirming the inputs are present.
```

## Changelog

*v0.2 -- 11 October 2026 (site-contract 1.8.30 -> **1.8.31**, coupled with hub-contract 1.7.21): **PROCEDURE step 3 records the site's live Netlify build settings as a `netlify` block** (R163's site half, NARROWED to the site track on 2026-09-23; `prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2 E12, drafted from `as-hub-spine-audit-prompt.md`'s step 3, where the hub half landed at hub-contract 1.7.8). `build_command`, `publish_dir` and `node_version`, self-reported and said to be; `host` is already a site manifest key and is not repeated. `schemas/manifest.schema.json` is `additionalProperties: true`, so no schema edit is owed. Nothing else moves. No em dashes.*

*v0.1 -- 20 September 2026 (site-contract 1.8.28 -> **1.8.29**): **FIRST VERSION HEADER, FIRST CHANGELOG ENTRY, FIRST REGISTRATION AND FIRST ATLAS DECLARATION, ALL IN ONE COMMIT, ON A FILE THAT HAS BEEN STAMPED SINCE BEFORE IT WAS VERSIONED.** This file is stamped into `site-contract` by `scripts/sync-contracts.sh`, carried NO version header and NO changelog tail, and was registered in NEITHER `scripts/doc-version-check.sh`'s `REGISTERED` array nor its `ABSENCES` array: **it was invisible rather than exempt**, and green only because it carried neither half. **It is the THIRD instance of that shape and `plan-cut-178` v0.3 SS4o predicted it in terms**, *A third instance would make this a rule about the stamped set rather than two accidents*; the first was `as-hub-spine-audit-prompt.md` at hub-contract 1.7.8 and the second is `as-client-config-standard.md`, which is HELD to the next hub cut by the operator's uncoupling ruling of 2026-09-19. **No content of the prompt moves.** No em-dashes.*
