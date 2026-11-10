# Tech Stack

Actual installed/configured technologies, reconciled against `package.json` and the lockfile.

**Architecture note:** this project was originally scaffolded as a PNPM Workspaces + Turborepo
monorepo (`apps/web`, `apps/admin`, `apps/api`, `packages/*`), per the original BRD. The project
owner requested a pivot to a **single Next.js project** (no workspace tooling, no separate
NestJS service) during implementation. BRD §0 (Architecture Decision Addendum) records this
decision; this document and its siblings describe the current, single-project reality.

| Layer | Technology | Version (installed) | Notes |
|---|---|---|---|
| Project structure | Single Next.js project | — | No PNPM Workspaces, no Turborepo, no `packages/*`. Source at `src/` off the repo root. |
| Runtime | Node.js | >=22 (engine) | see root `package.json` engines |
| Framework | Next.js (App Router) + React + TypeScript | next 16.4.6, react 19.3.0, typescript ^5.7.2 | Public site, `/admin/**` route group, and `/api/v1/**` Route Handlers all in one app |
| UI | Tailwind CSS v4 + Radix UI + CVA | tailwindcss ^4.0.0 | `src/components/ui/*` (Button, Card, Input, Dialog) |
| Icons | Lucide React + react-icons (Simple Icons) | lucide-react ^0.469.0, react-icons ^5.7.0 | Simple Icons for authentic tech-brand marks (Skills section, footer socials); LinkedIn/AWS have no mark in the installed Simple Icons bundle — LinkedIn falls back to `lucide-react`'s (upstream-deprecated) icon, AWS falls back to a generic `Cloud` icon |
| Animation | Framer Motion | ^11.15.0 | |
| Forms | React Hook Form + Zod | ^7.54.2 / ^3.24.1 | Also used for the admin login form |
| Data fetching | TanStack Query + Axios | ^5.62.11 / ^1.7.9 | Admin API client (`src/lib/admin/api-client.ts`) uses same-origin `baseURL: '/api/v1'` |
| Admin extras | TanStack Table, Radix Dialog/Dropdown/Avatar/Label, Sonner | — | Carried over from the original admin scaffold |
| Backend | Next.js Route Handlers | — | `src/app/api/v1/**`; replaces the originally planned NestJS service |
| Database | MongoDB + Mongoose | mongoose ^8.9.3 | Connected via a cached-connection helper, `src/lib/mongodb.ts` |
| Env validation | Zod | — | `src/lib/env.ts`, validated lazily on first server-side use |
| Containers | Docker + Docker Compose | `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml` | Single `app` service (was 3 separate app services + API) |
| Reverse proxy | Nginx | `docker/nginx/` | Single upstream now (`app:3000`) |
| Code quality | ESLint (flat config, v9) + Prettier | eslint ^9.17.0, prettier ^3.4.2 | One `eslint.config.mjs` at repo root (was 4+ shared configs across packages) |
| Git hooks | Husky + lint-staged + Commitlint | husky ^9.1.7, lint-staged ^15.3.0, commitlint ^19.x | `.lintstagedrc.json` now a single glob (no more per-app `--config` flags) |
| CI | GitHub Actions | `.github/workflows/ci.yml` | `pnpm lint` / `type-check` / `format:check` / `build`, no Turborepo filters |

## Dropped from the original (monorepo/NestJS) stack

- `turbo`, `pnpm-workspace.yaml` `packages:` field — no workspace to orchestrate.
- `@nestjs/*` (common, config, core, mongoose, platform-express, swagger, terminus, throttler),
  `class-validator`, `class-transformer`, `helmet`, `compression`, `reflect-metadata`, `rxjs`,
  NestJS CLI/testing/vitest — the backend is now Route Handlers, not a NestJS app.
- Swagger/OpenAPI docs, Terminus health checks, Throttler rate limiting, a formal exception
  filter, and structured request logging existed in the NestJS design and are **not yet
  replicated** in the Route Handler API — see `docs/tasks.md` for follow-up tasks. Basic security
  headers are applied via `next.config.ts` `headers()` instead of Helmet.

## Notable decisions

- **Tailwind v4 content detection** previously needed an explicit `@source` workaround because
  the shared `packages/ui` was consumed through a pnpm workspace symlink inside `node_modules`
  (which Tailwind never scans). That workaround is now **unnecessary and removed** — everything
  lives directly under `src/`, which Tailwind scans natively.
- Theme toggle (BRD §7.1): `next-themes` installed, dark is the default theme
  (`defaultTheme="dark"`, `enableSystem={false}`), light is the toggleable alternate via a
  `.light` CSS class in `src/app/globals.css`.
- Next.js 16's Cache Components feature rejects reading `new Date()` directly in
  statically-prerendered components; the footer's copyright year is isolated behind
  `connection()` + `<Suspense>` (`src/components/layout/copyright-year.tsx`) rather than
  hardcoded or forcing the whole page dynamic.
- Admin and public site now share **one** `Providers` component (`src/components/providers.tsx`:
  QueryClient + ThemeProvider + Toaster) instead of two separate provider trees.
- Admin and public API clients were consolidated: a single `src/lib/admin/api-client.ts` (Axios,
  same-origin `/api/v1`, with auth-token interceptors) remains for admin use; no separate
  public-site API client exists yet since nothing currently calls it.

Update this file whenever a dependency, framework, tool, or infrastructure technology is added,
removed, or upgraded.
