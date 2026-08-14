# SCAFFOLD -- pinned toolchain for cafe-josee-site

Cloned from `AISmithFactory/aismith-site-seed` at `d719e03` on 14 August 2026 and re-skinned
in place (build-agent S5, agent-direct). The versions below are the ones that produced the
green build; they are the baseline the next agent diffs against.

## Pinned versions (from the green build, 14 August 2026)

| package | version |
|---|---|
| @tanstack/react-router | 1.170.16 |
| @tanstack/react-start | 1.168.26 |
| @tanstack/router-plugin | 1.168.18 |
| @netlify/vite-plugin-tanstack-start | 1.3.16 |
| react / react-dom | 19.2.0 |
| vite | 7.1.12 |
| typescript | 5.9.3 |
| node | 22 (sandbox) |

Gate at that pin: `npm run build` green, `verify.mjs` exit 0 (all of [0] through [6] PASS).

## API surface the seed targets (TanStack Start / Router v1)
- `createRootRoute`, `createFileRoute`
- route `head()` returning `{ meta: [...], links: [...] }`
- `HeadContent` + `Scripts` in the root document shell (`__root.tsx` owns `<html lang>`)
- file-based routing under `src/routes` with a generated `routeTree.gen.ts`

## Versions — fill from the first successful build, do NOT guess
Record the exact versions from `package.json` after the first green build, commit this
file, and treat it as the baseline the next agent diffs against.
