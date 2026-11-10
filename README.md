# AG Portfolio

A single Next.js project housing the public portfolio website, an admin dashboard (route group),
and a backend API (Route Handlers backed by MongoDB/Mongoose) — no monorepo tooling, no separate
services.

> This repository contains the **public site implementation plus the infrastructure
> foundation** — the full public portfolio UI (header through footer), the admin dashboard
> shell (sidebar/header/login, no business logic yet), database wiring, Docker, CI, and linting.

## Architecture Overview

```
ag-portfolio-fullstack/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, globals.css, loading.tsx, error.tsx, not-found.tsx
│   │   ├── admin/              # Admin dashboard route group: /admin/login, /admin/dashboard, ...
│   │   └── api/v1/              # Backend Route Handlers, e.g. /api/v1/health
│   ├── components/
│   │   ├── layout/               # Site header/footer, section container, theme toggle
│   │   ├── sections/             # Hero, Featured Projects, Experience, Skills, Process, Contact CTA
│   │   ├── projects/ experience/ skills/
│   │   ├── ui/                   # Shared Button, Card, Input, Dialog, etc.
│   │   └── admin/                 # Admin-only sidebar/header
│   ├── data/                     # Typed content for repeated sections (projects, experience, skills)
│   ├── lib/                      # utils.ts, mongodb.ts, env.ts, api-response.ts, admin/
│   ├── types/
│   └── proxy.ts             # Route protection, scoped to /admin/**
│
├── public/                       # Static assets (including mockup-sourced project preview images)
├── design/
│   └── mockup/
│       └── AG-Portfolio-Fullpage-Mockup.png
│
├── docker/
│   ├── nginx/                     # Production reverse proxy config + Dockerfile
│   └── mongo/                     # Mongo init script (app user bootstrap)
│
├── .github/workflows/             # CI: lint, type-check, format, build
│
├── Dockerfile
├── docker-compose.yml              # Development stack (app + mongo)
├── docker-compose.prod.yml         # Production stack (adds nginx)
└── .env.example
```

### Request flow

- One Next.js server (port 3000) serves the public site, `/admin/**`, and `/api/v1/**` together.
- The admin dashboard calls the API via a same-origin Axios client (`src/lib/admin/api-client.ts`,
  `baseURL: '/api/v1'`) using TanStack Query for data fetching/caching.
- `src/proxy.ts` protects `/admin/**` (except `/admin/login`) behind an `admin_token` cookie
  check — a foundation for real auth, not real auth itself (see BRD §4.2, §9).
- In production, Nginx fronts the single `app` service on ports 80/443.

## Technology Stack

| Area | Stack |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict) |
| UI | Tailwind CSS v4, shadcn/ui-style primitives, Radix UI, Lucide + react-icons (Simple Icons), Framer Motion |
| Forms / data | React Hook Form, Zod, TanStack Query, TanStack Table (admin), Axios, Sonner (toasts) |
| Backend | Next.js Route Handlers, MongoDB, Mongoose, Zod (env validation) |
| Typography | `next/font/google`: Barlow Condensed (body), Bebas Neue (headings) |
| Tooling | ESLint (flat config), Prettier (+ Tailwind class sorting), Husky, lint-staged, Commitlint (Conventional Commits) |
| Infrastructure | Docker, Docker Compose, Nginx, GitHub Actions |

## Prerequisites

- Node.js ≥ 22
- [pnpm](https://pnpm.io/) 11.x (`corepack enable` will pick up the version pinned in `package.json`)
- Docker + Docker Compose (for containerized development/production)
- A local MongoDB instance if running outside Docker

## Local Installation

```bash
pnpm install
```

This installs dependencies and sets up Husky git hooks via the `prepare` script.

## Environment Configuration

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the Next.js server listens on |
| `CORS_ORIGINS` | Allowlist for any cross-origin callers of `/api/v1/**` |
| `MONGODB_URI`, `MONGODB_DATABASE` | Required — the app refuses to serve API requests without these |
| `MONGODB_USERNAME`, `MONGODB_PASSWORD` | Optional, for authenticated MongoDB connections |
| `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` | Docker Compose only — Mongo container root credentials |

Environment variables are validated lazily on first server-side use with Zod (`src/lib/env.ts`).
Never commit a populated `.env` file — only `.env.example` is tracked.

## Running Locally (without Docker)

```bash
# start MongoDB however you prefer locally, then:
pnpm dev
```

- App (public site + admin + API): http://localhost:3000
- Health check: http://localhost:3000/api/v1/health
- Admin: http://localhost:3000/admin/login

## Docker Development Setup

```bash
pnpm docker:dev          # build + start app, mongo
pnpm docker:dev:down     # stop the stack
pnpm docker:logs         # tail logs
pnpm docker:rebuild      # force rebuild + recreate containers
```

## Docker Production Setup

```bash
pnpm docker:prod         # build + start production stack (detached)
pnpm docker:prod:down    # stop the stack
```

The production stack builds a multi-stage, non-root image (Next.js standalone output) and fronts
it with an Nginx reverse proxy on ports 80/443. To enable HTTPS, mount certificates into
`docker/nginx/certs` and uncomment the TLS server block in `docker/nginx/nginx.conf`.

## MongoDB Configuration

- Connection is established via a cached Mongoose connection helper in `src/lib/mongodb.ts`,
  reused across hot reloads/serverless invocations.
- `docker/mongo/init-mongo-user.js` runs once on first container start to create an
  application-scoped user (`MONGODB_USERNAME`/`MONGODB_PASSWORD`), separate from the root admin
  credentials.
- Health is monitored at `GET /api/v1/health`.

## ESLint / Prettier

```bash
pnpm lint          # lint the whole project
pnpm lint:fix       # autofix where possible
pnpm format         # write formatting fixes
pnpm format:check   # verify formatting in CI
```

One flat config (`eslint.config.mjs`) at the repository root. Prettier is configured with
`prettier-plugin-tailwindcss` for deterministic Tailwind class ordering.

## Husky & Commitlint

- **pre-commit**: runs `lint-staged`, linting and formatting only staged files.
- **commit-msg**: runs Commitlint against `commitlint.config.js`, enforcing
  [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `docs`, `style`,
  `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`).

## Git Workflow

- `main` — production-ready history.
- Feature branches follow Conventional Commits for every commit message (enforced by Commitlint).

## Known Limitations

- Docker build/run has **not** been executed end-to-end in the environment this was built in —
  reviewed for correctness only. Validate in a Docker-capable environment before relying on it.
- Authentication for `/admin/**` is a foundation only (cookie-presence check in middleware), not
  real auth — see BRD §4.2 and §9.
- Swagger/OpenAPI docs, request-level throttling, and a formal exception-filter layer existed in
  the original NestJS design and are not yet replicated for the Route Handler API — tracked in
  `docs/tasks.md`.
