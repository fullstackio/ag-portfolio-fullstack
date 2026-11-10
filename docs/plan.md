# Implementation Plan

Phases per BRD §18, re-sequenced after the architecture pivot (BRD §0: single Next.js project,
no monorepo, no NestJS). Status reflects actual repository inspection, not assumptions.

| # | Phase | Status | Notes |
|---|---|---|---|
| 1 | Foundation (single Next.js project) | **Completed** | Monorepo (PNPM Workspaces + Turborepo + NestJS) was built first, then fully dismantled and rebuilt as a single project per the owner's explicit request. `apps/`, `packages/`, `turbo.json` removed; source consolidated under `src/`. |
| 2 | Applications (public site, `/admin` route group, `/api/v1` Route Handlers) | **Completed** | All three live in one Next.js app now. Verified running together: home page, `/admin/login`, and `/api/v1/health` all returned 200 from the same `pnpm dev` server. |
| 3 | Shared system (UI, TS config, ESLint, fonts, design tokens) | **Completed** | One `tsconfig.json`, one `eslint.config.mjs`, one `globals.css` with the approved dark/purple palette as default and `next-themes` for the light toggle. |
| 4 | Infrastructure (MongoDB, Docker Compose, Nginx, env validation) | **Completed** (pending live Docker run) | `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `docker/nginx/nginx.conf` all rewritten for the single-`app`-service topology. Zod env validation in `src/lib/env.ts`. Not yet run through `docker compose up` in this environment. |
| 5 | Quality gates (Prettier, Husky, lint-staged, Commitlint, CI) | **Completed** | `.lintstagedrc.json` simplified to one glob (no more per-package `--config` flags — that workaround was specific to the old cross-package Tailwind content-detection bug, which no longer exists). CI workflow updated to drop Turborepo env vars and the old per-app `NEXT_PUBLIC_API_URL` build var. `pnpm lint` and `pnpm type-check` both pass clean after the restructure. |
| 6 | Public UI (mockup sections, in order) | **Completed** (desktop verified) | Header, Hero, Featured Projects, Work Experience, Skills, Process, Contact CTA, Footer — all built in the prior (monorepo) session and carried over intact during the restructure; re-verified visually after the move (screenshot matches the mockup). |
| 7 | Verification (screenshots, responsive, a11y, perf) | **In Progress** | Desktop visual verification done. Mobile spot-checked (header/hero/start-of-projects) only, before the restructure — not yet re-verified on mobile post-move. No accessibility, Lighthouse/PageSpeed, or SEO audits run yet. |
| 8 | Documentation (README, living docs, BRD) | **Completed for this pivot** | README, `docs/*.md`, and the BRD itself (new §0 Architecture Decision Addendum, plus targeted edits to §1, §4.1, §8, §9, §10, §11, §12, §13, §17, §18) all updated to reflect the single-project architecture. |

## Carried-over open items (unaffected by the architecture pivot)

From the original BRD-driven plan, still pending:

1. Full tablet/mobile responsive pass across all 8 public sections (only an initial spot-check
   was done).
2. SEO metadata/sitemap/robots/structured data (BRD §15.3 / §16).
3. Accessibility pass + manual WCAG 2.2 AA checks (BRD §15.2).
4. Real Lighthouse/PageSpeed/axe audits against a production build, recorded in
   `quality-report.md` (BRD §15.1–15.4).
5. Resolving open content questions with the owner — real social links, case-study URLs, contact
   destination, the footer design conflict, disposition of the non-canonical `design/*.jpg`
   images (see `tasks.md` "Open questions").
6. Admin dashboard business logic (content management modules, real auth) — explicitly out of
   scope for this phase per BRD §4.2.

## New follow-ups introduced by the architecture pivot

1. Live-test the Docker dev/prod stacks (`docker compose up`) against the new single-`app`
   topology — not yet run in this environment.
2. Decide whether to replicate the dropped NestJS features (Swagger/OpenAPI docs, rate limiting,
   a formal exception-filter layer) for the Route Handler API, and if so, how.
3. Re-run the mobile/tablet responsive check post-restructure (low risk of regression since
   component code didn't change, only its location, but not yet re-verified).
