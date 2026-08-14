# cafe-josee-site

Public site for **Cafe Josee**, Vosstraat 2, 2140 Borgerhout (Antwerpen).

**Status: prospect DEMO concept** (intake Scenario 2). `seo.noindex` is **true**. Deployed to
`cafe-josee.demos.aismith.io`. Not a working client, not live, not shown to anyone before the
operator has reviewed it.

- **Canon pointer:** site-contract **1.8.18**
- **Charter:** [`cafe-josee-site-charter.md`](./cafe-josee-site-charter.md) (the declaration the audit checks)
- **Brief:** [`docs/cafe-josee-build-brief.md`](./docs/cafe-josee-build-brief.md) (intake S8, the nine-section spec)
- **Report to the Factory:** [`docs/cafe-josee-social-only-intake-report.md`](./docs/cafe-josee-social-only-intake-report.md)

## The unusual thing about this build

Cafe Josee **has no website and has never had one**. The standard trigger
(`prompts/builds/site-build.md` v4.6) requires a URL, which drives three of the five intake
lanes. Their Instagram and Facebook were the live surface instead. What that broke, and what
was substituted, is written up in the report above.

## Language

**Dutch only.** No second language, no switcher. Operator ruling; the trade is the
Borgerhout neighbourhood.

## Build and gate

```
npm install
npm run build
node <factory-cache>/agents/audit/site/verify.mjs . \
  --seed <pristine aismith-site-seed clone> \
  --charter cafe-josee-site-charter.md
```

Both green as of 14 August 2026.

## Touch surface

`src/styles/tokens.css`, `src/content/*`, per-route `head()`, `__root` `lang`. Nothing under
`src/components/spine/**` or `src/styles/spine.css` is ever edited.
