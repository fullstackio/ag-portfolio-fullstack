# Implementation Status (resume checkpoint)

**Last updated:** 2026-11-10 (session 3 — architecture pivot)

## Current phase

Just completed a full architecture pivot (BRD §0): the project was dismantled from a PNPM
Workspaces + Turborepo monorepo (`apps/web`, `apps/admin`, `apps/api`, `packages/*`, NestJS
backend) into a **single Next.js project** at the repo root, per the owner's explicit request.
All previously-built public-site UI (Phase 6) and admin scaffold (BRD §9) were carried over intact
into the new structure, not rebuilt from scratch.

## Last completed task

T045 — updated `.github/workflows/ci.yml` for the single-project structure (dropped Turborepo env
var and the old per-app build-time env var).

## In progress / next

- Nothing is actively in progress. The restructure (T040–T045) is complete and verified
  (`pnpm type-check`, `pnpm lint` both pass; dev server serves `/`, `/admin/login`, and
  `/api/v1/health` correctly; screenshots confirm the public site and admin login render
  correctly post-move).
- **Next action, if resuming:** either (a) ask the owner to confirm the pivot looks right and/or
  resolve the open questions in `tasks.md`, or (b) continue the pre-pivot backlog: finish the
  mobile/tablet responsive pass (T028), then move into Phase 7 (SEO/structured data, accessibility
  pass, real Lighthouse/PageSpeed/axe audits — T030–T033).
- Also pending: live-testing the Docker dev/prod stacks against the new single-`app` topology
  (never run in this environment, not just "broken by the pivot" — this was already a known gap
  before the restructure too).

## Blockers

None blocking further code changes. The same content-only open questions from before the pivot
still stand (real social/contact/case-study links, the footer design conflict, disposition of the
non-canonical `design/*.jpg` images) — see `tasks.md`. One new question from the pivot itself:
whether to rebuild the dropped NestJS features (Swagger, rate limiting, exception-filter layer)
for the Route Handler API.

## Commands run this session (pivot) and outcomes

- Inventoried every file under `apps/web/src`, `apps/admin/src`, `apps/api/src`, and `packages/*`
  before moving anything, to avoid silently losing admin scaffold work (login form, dashboard
  shell, sidebar/header, auth types, route-protection middleware) that already existed beyond what
  earlier sessions' docs had recorded.
- Moved all source to `src/` at the repo root; fixed every `@ag-portfolio/ui/...` import to `@/...`
  via `sed` across the moved files; manually fixed the handful of imports/exports that needed
  semantic changes rather than a straight path swap (admin `Header` → `AdminHeader` to avoid a
  collision with a future public-site header type; route-group restructuring from bare
  `/login`,`/dashboard`,`/settings` to `/admin/login`, `/admin/dashboard`, `/admin/settings`.
- **Caught and corrected a mistake during the move:** briefly renamed `src/proxy.ts` to
  `middleware.ts` (with `proxy()` → `middleware()`) on the assumption that was the current
  Next.js convention. A `pnpm build` run surfaced a deprecation warning saying the opposite —
  Next.js 16 renamed the convention from `middleware.ts` to `proxy.ts`, so the original admin
  scaffold's filename/export were already correct. Reverted back to `src/proxy.ts`/`proxy()`.
- Replaced the NestJS API (`apps/api`) with Next.js Route Handlers: `src/lib/env.ts`,
  `src/lib/mongodb.ts`, `src/lib/api-response.ts`, `src/app/api/v1/health/route.ts`.
- Wrote new root `package.json` (merging all three apps' dependencies, dropping all `@nestjs/*`
  and NestJS-only packages), `tsconfig.json`, `eslint.config.mjs` (merging the base/react/next
  flat configs that used to live in `packages/eslint-config`), `.lintstagedrc.json` (simplified to
  one glob).
- Merged `packages/ui/src/styles.css`'s design tokens directly into `src/app/globals.css`; this
  also **removed the need for** the earlier `@source` Tailwind workaround (no more cross-package
  symlink for Tailwind to miss).
- Rewrote `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `docker/nginx/nginx.conf`,
  `.dockerignore` for a single-`app`-service topology.
- Rewrote `README.md` fully; updated `.github/workflows/ci.yml`.
- Rewrote the BRD itself (`AG-Portfolio-BRD-Full-Updated.md`): new §0 Architecture Decision
  Addendum, plus targeted edits to §1, §4.1, §8, §9, §10, §11, §12, §13, §17, §18.
- `rm -rf node_modules .next pnpm-lock.yaml && pnpm install` — clean reinstall against the new
  single `package.json`; succeeded (regenerated `pnpm-workspace.yaml` automatically for an
  unrelated pnpm setting, `minimumReleaseAgeExclude` — this is not a workspace-packages config and
  doesn't make this a monorepo again).
- `pnpm type-check` — passed clean on the first run after the restructure.
- `pnpm lint` / `pnpm lint:fix` — found and fixed import-order warnings (expected, since the `@/`
  alias now groups differently) plus two real issues: a `no-undef` error in
  `docker/mongo/init-mongo-user.js` (added to ESLint's `ignores` — it's a MongoDB shell script with
  an implicit `db` global, not a module to lint) and a `@next/next/no-location-assign-relative-
  destination` warning in the admin API client (justified with an inline disable comment — it's an
  axios interceptor, outside React render/event-handler context, so `useRouter()` isn't available).
  Lint passes clean now.
- Started the dev server in the background; confirmed via `curl` that `/`, `/api/v1/health`
  (against a real local MongoDB — `{"success":true,"data":{"status":"ok",...}}`), and
  `/admin/login` all return 200 from the same process. Took Playwright screenshots of the home
  page and the admin login page — both render correctly with the shared dark/purple theme (a nice
  side effect: admin now automatically inherits the public site's design tokens, since there's no
  longer a separate admin theme to keep in sync).
- Did not run: `docker compose up` (still never tested in this environment), a production
  (`next build`) smoke test, or any Lighthouse/axe/PageSpeed audit.

## Repository state snapshot

- Git: branch `main`, last commit still `cc9dc4f` (the old monorepo scaffold) — **none of this
  session's restructuring has been committed**. The working tree currently reflects the new
  single-project structure; the previous commit's tree does not. The user has not asked for a
  commit yet.
- `src/app/page.tsx` renders the full public site (unchanged content from before the pivot — only
  its file location changed, from `apps/web/src/app/page.tsx`).
- A background dev server may still be running on port 3000 from this session's verification step
  — check before starting another one (`lsof -ti:3000` / `ss -ltnp | grep 3000`) to avoid an
  `EADDRINUSE`-style conflict.
