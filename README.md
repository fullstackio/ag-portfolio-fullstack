# AG Portfolio Fullstack

A production-ready monorepo foundation for a public portfolio website, an admin dashboard, and a NestJS API, sharing UI, types, and tooling across a PNPM + Turborepo workspace.

> This repository currently contains the **infrastructure foundation only** — monorepo tooling, app shells, shared packages, database wiring, Docker, CI, and linting. Portfolio content and admin business logic have not been implemented yet.

## Architecture Overview

```
ag-portfolio-fullstack/
│
├── apps/
│   ├── web/                 # Public portfolio website (Next.js App Router)
│   ├── admin/                # Admin dashboard (Next.js App Router)
│   └── api/                  # NestJS backend API (MongoDB / Mongoose)
│
├── packages/
│   ├── ui/                   # Shared UI primitives, Tailwind theme, typography tokens
│   ├── eslint-config/        # Shared ESLint flat configs (base / next / nestjs / react-library)
│   ├── typescript-config/     # Shared tsconfig bases (base / nextjs / nestjs / react-library)
│   └── shared/                # Shared types, zod schemas, utilities
│
├── docker/
│   ├── nginx/                 # Production reverse proxy config + Dockerfile
│   └── mongo/                 # Mongo init script (app user bootstrap)
│
├── .github/workflows/         # CI: lint, type-check, format, build
│
├── docker-compose.yml          # Development stack
├── docker-compose.prod.yml     # Production stack (adds nginx)
├── pnpm-workspace.yaml
├── turbo.json
└── .env.example
```

### Request flow

- **web** (port 3000) and **admin** (port 3001) are independent Next.js App Router apps. Both consume the **api** over HTTP via an Axios client, using TanStack Query for data fetching/caching.
- **api** (port 4000) is a NestJS app exposing `api/v1/*` routes, backed by MongoDB via Mongoose.
- In production, **nginx** fronts all three services behind a single host, proxying `/api/*` to the API, `/admin/*` to the admin dashboard, and everything else to the public site.

## Technology Stack

| Area | Stack |
| --- | --- |
| Monorepo | PNPM Workspaces, Turborepo |
| Public site | Next.js (App Router), React, TypeScript (strict), Tailwind CSS v4, shadcn/ui-style primitives, Radix UI, Lucide, Framer Motion, React Hook Form, Zod, TanStack Query, Axios |
| Admin dashboard | Same base stack + TanStack Table, Radix Dialog/Dropdown/Avatar, Sonner (toasts) |
| API | NestJS, MongoDB, Mongoose, class-validator/class-transformer, Zod (env validation), Swagger/OpenAPI, Terminus (health checks), Throttler (rate limiting), Helmet, compression |
| Typography | `next/font/google`: Barlow Condensed (body), Bebas Neue (headings) |
| Tooling | ESLint (flat config), Prettier (+ Tailwind class sorting), Husky, lint-staged, Commitlint (Conventional Commits) |
| Infrastructure | Docker, Docker Compose, Nginx, GitHub Actions |

## Prerequisites

- Node.js ≥ 22 (project developed against Node 24)
- [pnpm](https://pnpm.io/) 11.x (`corepack enable` will pick up the version pinned in `package.json`)
- Docker + Docker Compose (for containerized development/production)
- A local MongoDB instance if running the API outside Docker

## Local Installation

```bash
pnpm install
```

This installs dependencies for every app and package in the workspace and sets up Husky git hooks via the `prepare` script.

## Environment Configuration

Copy the example env files and fill in real values before running anything:

```bash
cp .env.example .env                     # Docker Compose variables
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
cp apps/api/.env.example apps/api/.env
```

| File | Purpose |
| --- | --- |
| `.env` (root) | Consumed by `docker-compose.yml` / `docker-compose.prod.yml` — Mongo credentials, ports, shared API URL |
| `apps/web/.env` | `NEXT_PUBLIC_API_URL`, dev server port |
| `apps/admin/.env` | `NEXT_PUBLIC_API_URL`, dev server port |
| `apps/api/.env` | `PORT`, `API_PREFIX`, `CORS_ORIGINS`, `MONGODB_URI`/`MONGODB_DATABASE`/`MONGODB_USERNAME`/`MONGODB_PASSWORD`, throttle settings |

Environment variables are validated at startup with Zod (`apps/api/src/config/env.validation.ts`); the API refuses to boot with an invalid or missing required variable. Never commit a populated `.env` file — only `.env.example` files are tracked.

## Running Locally (without Docker)

```bash
# start MongoDB however you prefer locally, then:
pnpm dev
```

`pnpm dev` runs every app's dev server in parallel via Turborepo:

- Web: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000/api/v1 (Swagger at http://localhost:4000/docs)

## Docker Development Setup

```bash
pnpm docker:dev          # build + start web, admin, api, mongo
pnpm docker:dev:down     # stop the stack
pnpm docker:logs         # tail logs
pnpm docker:rebuild      # force rebuild + recreate containers
```

The dev compose file mounts the repo into each container for hot reload and persists MongoDB data in a named volume.

## Docker Production Setup

```bash
pnpm docker:prod         # build + start production stack (detached)
pnpm docker:prod:down    # stop the stack
```

The production stack builds multi-stage, non-root images for `web`, `admin`, and `api` (Next.js standalone output / compiled Nest `dist`), and fronts them with an Nginx reverse proxy on ports 80/443. To enable HTTPS, mount certificates into `docker/nginx/certs` and uncomment the TLS server block in `docker/nginx/nginx.conf`.

## MongoDB Configuration

- Connection is established via `@nestjs/mongoose` in `apps/api/src/database/database.module.ts`, with connection/error/disconnect logging.
- `docker/mongo/init-mongo-user.js` runs once on first container start to create an application-scoped user (`MONGODB_USERNAME`/`MONGODB_PASSWORD`) with `readWrite` on `MONGODB_DATABASE`, separate from the root admin credentials.
- Health is monitored at `GET /api/v1/health` via Terminus's `MongooseHealthIndicator`.

## ESLint Commands

```bash
pnpm lint          # lint every app/package (turbo-orchestrated)
pnpm lint:fix       # autofix where possible
```

Each app/package extends a shared flat config from `packages/eslint-config` (`base`, `next`, `nestjs`, or `react-library`), so rules stay consistent across the monorepo.

## Prettier Commands

```bash
pnpm format         # write formatting fixes
pnpm format:check   # verify formatting in CI
```

Prettier is configured with `prettier-plugin-tailwindcss` for deterministic Tailwind class ordering.

## Husky & Commitlint

- **pre-commit**: runs `lint-staged`, which lints and formats only staged files (fails the commit on lint errors).
- **commit-msg**: runs Commitlint against `commitlint.config.js`, enforcing [Conventional Commits](https://www.conventionalcommits.org/) with the types `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Example commit messages:

```
feat(web): initialize portfolio frontend
feat(admin): initialize dashboard
feat(api): initialize nestjs backend
build(docker): configure development containers
chore(config): setup eslint and prettier
```

## Git Workflow

- `main` — production-ready history.
- `development` — integration branch; CI runs on pushes here and to `main`, and on every pull request.
- Feature branches should be rebased/merged into `development`, following Conventional Commits for every commit message (enforced by Commitlint).

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `pnpm install` fails with peer dependency warnings | Run `pnpm install` again; warnings are non-fatal, but run `pnpm peers check` to review them if a build later fails. |
| API fails to start with a Mongo connection error | Confirm MongoDB is running and `MONGODB_URI`/`MONGODB_DATABASE` in `apps/api/.env` point at it; in Docker, the URI must use the `mongo` service name, not `localhost`. |
| `tsc`/`next build` complains about `LayoutProps`/route types | Run `pnpm --filter web type-check` (or `admin`) — it runs `next typegen` before `tsc` to generate route types first. |
| Husky hooks don't run | Re-run `pnpm install` (the `prepare` script wires `core.hooksPath` to `.husky`), and ensure hook files are executable (`chmod +x .husky/*`). |
| Docker build fails pruning the workspace | Ensure `turbo` can see a `pnpm-lock.yaml` at the repo root — `turbo prune <app> --docker` requires it to compute the pruned lockfile. |

## Validation Performed

- `pnpm lint`, `pnpm type-check`, and `pnpm format:check` pass across all 7 workspace projects.
- `pnpm build` succeeds for `web`, `admin`, and `api`.
- Production builds for `web` and `admin` were started standalone and returned HTTP 200/307 as expected (home page, and auth-redirect-to-login on the protected dashboard).
- The compiled API was started against a local MongoDB instance: `GET /api/v1/health` returned a healthy Mongo + memory status, and `GET /docs` served the Swagger UI.

## Known Limitations

- Docker Desktop/Engine is not installed in the environment this scaffold was built in, so `docker-compose.yml` / `docker-compose.prod.yml` and the Dockerfiles have **not** been built or run end-to-end — only reviewed for correctness. Validate them in a Docker-capable environment before relying on them.
- No authentication, authorization, or portfolio/admin business logic has been implemented — only auth-ready scaffolding (protected routes via `apps/admin/src/proxy.ts`, role types in `apps/admin/src/lib/auth.ts`, a non-wired login form).
