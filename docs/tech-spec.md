# Technical Specification

**Architecture note:** see BRD §0 (Architecture Decision Addendum). This project is a single
Next.js project, not the monorepo originally specified. This document describes that reality.

## 1. Project structure

```
src/
  app/
    layout.tsx, page.tsx, globals.css, loading.tsx, error.tsx, not-found.tsx
    admin/                  Admin dashboard route group (not a separate app)
      (auth)/layout.tsx, (auth)/login/page.tsx
      (dashboard)/layout.tsx, (dashboard)/dashboard/page.tsx, (dashboard)/settings/page.tsx
    api/v1/
      health/route.ts        GET /api/v1/health
  components/
    layout/                 site-header, site-footer, section-container, theme-toggle, copyright-year
    sections/               hero, featured-projects, work-experience, skills, process, contact-cta
    projects/ experience/ skills/
    ui/                     Button, Card, Input, Dialog, DataTable (shared across site + admin)
    admin/                  Sidebar, AdminHeader (admin-only)
    providers.tsx           Single Providers tree: QueryClient + ThemeProvider + Toaster
  data/                     Typed content: projects.ts, experience.ts, skills.ts, process.ts
  lib/
    utils.ts                cn() (clsx + tailwind-merge)
    env.ts                  Zod-validated server env (lazy, cached)
    mongodb.ts              Cached Mongoose connection (survives dev hot-reload)
    api-response.ts         apiSuccess()/apiError() JSON response helpers
    admin/
      api-client.ts         Axios client, baseURL '/api/v1', auth-token interceptors
      auth.ts                Role/AuthUser types, hasRole()
  types/                    project.ts, experience.ts, skill.ts, api.ts
  proxy.ts             Route protection scoped to /admin/** (matcher: '/admin/:path*')
public/
  images/projects/*.png     Project preview images cropped directly from the approved mockup
design/
  mockup/AG-Portfolio-Fullpage-Mockup.png   <- canonical approved mockup (see §6)
docker/, docker-compose*.yml, Dockerfile    Single-app dev/prod container stack
```

## 2. Design source of truth (BRD §5)

- Canonical mockup: `design/mockup/AG-Portfolio-Fullpage-Mockup.png` (copied from the pre-existing
  `design/final-desing-mokeup.png`, which is kept in place for history).
- Confirmed identity in the canonical mockup: **Avijit Ghosh**, Software Engineer. Nav: Work /
  Services / Process / About / Blog. Real project names: iDot AI, AG Appliance Services, Port Of
  Subs, Ntooitive. Work experience: Senior Fullstack Engineer (Indus Net Technologies, May 2014–
  Present), Fullstack Developer (Freelance/Remote), SDE Intern (Webkul Software Pvt. Ltd.),
  Frontend Developer (TechVision Solutions), Web Developer (Self Employed).
- **Non-canonical reference assets** (do not use as content or visual source): `design/home.jpg`,
  `design/my-work.jpg`, `design/experiences.jpg`, `design/why-hiring.jpg`, `design/faq.jpg`,
  `design/blog.jpg`. These depict a different person ("Avi Srivastava"), different employers, and
  a light theme — an unrelated template/inspiration bundle. Flagged rather than deleted; confirm
  with the owner whether they should be removed.
- **Footer content conflict:** the BRD's prose for §7.8 ("centered profile/avatar... availability
  status") describes the non-canonical template images, not the actual canonical mockup, which
  shows a simple horizontal bar footer. Implemented to match the actual mockup per BRD §5/§20 —
  flagged for owner decision in `tasks.md`.

## 3. Design tokens (BRD §5.3)

Dark/purple theme, defined in `src/app/globals.css` under `@theme` / `.light`. Dark is the
default (not behind a `.dark` class); `.light` is the toggleable alternate, switched via
`next-themes` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`).

## 4. Typography (BRD §6)

- Body: `Barlow Condensed` via `next/font/google`, CSS var `--font-barlow-condensed`, mapped to
  the Tailwind theme token `--font-body` (with `'Barlow Condensed Fallback'` fallback).
- Heading: `Bebas Neue` via `next/font/google`, CSS var `--font-bebas-neue`, mapped to
  `--font-heading` (with `'Bebas Neue Fallback'` fallback).
- Wired once in `src/app/layout.tsx`, covering both the public site and `/admin/**` since they
  share the same root layout and `globals.css`.

## 5. Backend API (BRD §10)

- Versioned path prefix `/api/v1`, implemented as Next.js Route Handlers (not a NestJS
  controller/module tree).
- `src/lib/env.ts`: Zod schema, validated lazily (on first call to `getEnv()`) rather than at
  module load, since Next.js can import server modules during build/typegen before real env vars
  are injected. Requires `MONGODB_URI` and `MONGODB_DATABASE`; everything else has a default.
- `src/lib/mongodb.ts`: caches the Mongoose connection promise on `globalThis` to survive dev-mode
  hot reloads and avoid exhausting connections.
- `src/lib/api-response.ts` + `src/types/api.ts`: consistent `{ success, data }` /
  `{ success: false, statusCode, message, path, timestamp }` JSON shape across endpoints,
  replacing the NestJS global exception filter.
- `GET /api/v1/health`: checks Mongoose connection state and process heap usage, replacing the
  NestJS Terminus health module.
- **Not yet replicated from the original NestJS design** (tracked in `tasks.md`): Swagger/OpenAPI
  docs, Throttler-equivalent rate limiting, a formal global exception-filter/logging-interceptor
  layer. Basic security headers are applied via `next.config.ts` `headers()` as a partial
  Helmet-equivalent.

## 6. Admin dashboard (BRD §9)

- Route group `src/app/admin/**`, not a separate Next.js project.
- `(auth)/login` — React Hook Form + Zod login form (UI only; no real authentication wired, per
  BRD §4.2).
- `(dashboard)/dashboard`, `(dashboard)/settings` — sidebar + header shell, overview placeholder
  cards, settings placeholder.
- `src/proxy.ts` — redirects to `/admin/login` when no `admin_token` cookie is present,
  scoped only to `/admin/**` via its `matcher` (the public site never requires a token). This is
  route-protection scaffolding, not real auth.
- `src/lib/admin/api-client.ts` — same-origin Axios client (`baseURL: '/api/v1'`), reads/writes
  `admin_token` from `localStorage`, redirects to `/admin/login` on a 401.

## 7. Environment variables

See `.env.example` at the repo root (single file now, not one per app): `PORT`, `CORS_ORIGINS`,
`MONGODB_URI`, `MONGODB_DATABASE`, `MONGODB_USERNAME`, `MONGODB_PASSWORD`,
`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` (Docker Compose only).

## 8. Security decisions

- `.env` is gitignored repo-wide (only `.env.example` is tracked).
- `CORS_ORIGINS` exists for any future cross-origin callers of `/api/v1/**`; same-origin calls
  from this project's own pages/admin UI don't need it.
- Basic security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`) applied globally via `next.config.ts` `headers()`.
- Secrets must never be read into `NEXT_PUBLIC_*` vars.

## 9. Open architecture items

- Admin authentication is UI-only scaffolding; real auth (sessions/JWT/etc.) is unimplemented by
  design (BRD §4.2).
- Swagger/OpenAPI, rate limiting, and a formal exception-filter layer are not yet replicated for
  the Route Handler API.
- Docker build/run has not been executed end-to-end in this environment — reviewed for
  correctness only.

This document is updated whenever architecture, configuration, interfaces, or technical decisions
change.
