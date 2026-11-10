# Business Requirements Document (BRD)

## AG Portfolio --- Fullstack Software Engineer Portfolio

**Document version:** 1.1 (see Architecture Decision Addendum below)\
**Status:** Draft for implementation\
**Project repository:**
`https://github.com/fullstackio/ag-portfolio-fullstack.git`\
**Primary design source:**
`design/mockup/AG-Portfolio-Fullpage-Mockup.png`

------------------------------------------------------------------------

## 0. Architecture Decision Addendum (supersedes conflicting sections below)

**Decision date:** 2026-11-10. **Requested by:** project owner, during implementation.

The project owner decided against the monorepo architecture originally specified in this BRD
(PNPM Workspaces + Turborepo with separate `apps/web`, `apps/admin`, `apps/api` and shared
`packages/*`). The project is now a **single Next.js project** at the repository root:

- **One codebase, one `package.json`, no workspace tooling** (no PNPM Workspaces, no
  Turborepo, no `packages/*`). Source lives under `src/` at the repository root.
- **Public site** — `src/app/**` (route segments at the root, e.g. `/`, future `/work`, etc.).
- **Admin dashboard** — `src/app/admin/**`, a route group within the same Next.js app (not a
  separate project), e.g. `/admin/login`, `/admin/dashboard`, `/admin/settings`.
- **Backend API** — NestJS was replaced with **Next.js Route Handlers**
  (`src/app/api/v1/**`), calling MongoDB directly via Mongoose from `src/lib/mongodb.ts`. There
  is no separate API server/process; one Next.js server serves pages, the admin dashboard, and
  the API from a single deploy.

Wherever a section below still describes the monorepo (`apps/web`, `apps/admin`, `apps/api`,
`packages/*`, PNPM Workspaces, Turborepo, or NestJS), that section is **superseded by this
addendum** and is kept only for historical context of the original request. The functional/UI
requirements (design fidelity, section content, typography, quality targets, living
documentation, etc.) are unaffected by this decision and remain in force.

------------------------------------------------------------------------

## 1. Project Overview

AG Portfolio is a modern, responsive, fullstack personal portfolio
platform for a Senior Fullstack Software Engineer. It will present
professional identity, selected projects, work experience, technical
expertise, engineering process, and contact information through a
premium dark visual experience.

The platform consists of three functional areas within **one single Next.js project**
(see §0 Architecture Decision Addendum — this supersedes the originally planned
monorepo/multi-app split):

1.  **Public Portfolio Website** --- the visitor-facing portfolio (`src/app/**`).
2.  **Admin Dashboard** --- a private route group prepared for managing
    portfolio content (`src/app/admin/**`).
3.  **Backend API** --- Next.js Route Handlers that expose versioned APIs and
    connect to MongoDB directly via Mongoose (`src/app/api/v1/**`).

The current delivery phase is the project foundation and the public
portfolio implementation. The architecture must allow portfolio content
to become data-driven through the API and admin dashboard.

## 2. Business Goals

-   Establish a credible, premium personal brand for the portfolio
    owner.
-   Showcase real projects and measurable engineering contributions.
-   Make professional experience and technical capabilities easy to
    understand.
-   Provide a clear contact path for recruiters, clients, and
    collaborators.
-   Provide a maintainable foundation for future content management
    through an admin dashboard.
-   Ensure the website is fast, accessible, responsive, secure, and
    search-engine friendly.

## 3. Primary Users and Audiences

  -----------------------------------------------------------------------
  Audience                            Primary need
  ----------------------------------- -----------------------------------
  Recruiters and hiring managers      Quickly understand experience,
                                      skills, and project impact

  Potential clients                   Review relevant work and contact
                                      the owner

  Engineering peers                   Understand technical depth,
                                      architecture, and engineering
                                      approach

  Portfolio owner / administrator     Maintain portfolio content through
                                      a future admin interface
  -----------------------------------------------------------------------

## 4. Scope

### 4.1 In scope

-   Single Next.js project (see §0) — no PNPM Workspaces/Turborepo monorepo.
-   Public site routes within the same Next.js application.
-   Admin dashboard route group (`/admin/**`) within the same Next.js application.
-   Backend API as Next.js Route Handlers (`/api/v1/**`), no separate NestJS service.
-   MongoDB and Mongoose integration (called directly from Route Handlers).
-   Reusable UI components within `src/components/`.
-   Shadcn UI component system.
-   Docker development and production foundations.
-   ESLint, Prettier, Husky, lint-staged, and Commitlint.
-   GitHub Actions CI validation.
-   Public portfolio UI implementation matching the approved mockup.
-   Responsive layouts for desktop, tablet, and mobile.
-   SEO, accessibility, performance, and error/loading foundations.
-   Documentation and environment examples.

### 4.2 Out of scope for the initial setup phase

-   Real authentication and production user provisioning unless
    separately approved.
-   Full portfolio CRUD workflows in the admin dashboard.
-   Blog publishing workflows.
-   Payment processing, subscriptions, or e-commerce.
-   Complex analytics integrations.
-   Deployment to a production domain.
-   Any content or employment claim that has not been verified by the
    owner.

These items may be added in later phases without changing the overall
architecture.

## 5. Design Source of Truth and UI Fidelity

### 5.1 Mandatory design folder

The repository must contain a top-level `design` folder. The approved
full-page mockup must be stored inside it.

Required path:

``` text
design/
└── mockup/
    └── AG-Portfolio-Fullpage-Mockup.png
```

Place the approved mockup image at this path before or during UI
implementation. If the final approved mockup filename differs, update
the path in the project documentation and keep one clearly identified
source-of-truth mockup.

### 5.2 Pixel-perfect requirement

The approved mockup is the visual source of truth. The implementation
must match it as closely as technically possible; visual fidelity is a
release acceptance requirement, not an optional enhancement.

Developers and coding agents must:

-   Inspect the full mockup before implementing each section.
-   Match section order, widths, alignment, spacing, typography, colors,
    borders, radii, shadows, and visual hierarchy.
-   Match the desktop composition at the reference viewport first.
-   Use the actual supplied mockup and approved assets; do not
    substitute unrelated stock imagery or invented dashboard
    screenshots.
-   Avoid redesigning, simplifying, rearranging, or adding sections
    without approval.
-   Avoid generic portfolio templates and CV/biodata-style layouts.
-   Reuse shared components and design tokens rather than introducing
    inconsistent one-off styles.
-   Compare browser screenshots against the reference during
    implementation and correct visual differences.
-   Preserve the reference composition while adapting it responsively
    for smaller screens.

**Important:** Pixel-perfect matching is measured against the supplied
reference viewport. Tablet and mobile layouts must be carefully adapted
because the desktop composition cannot be copied literally onto narrow
screens.

### 5.3 Visual direction

-   Theme: premium dark interface.
-   Base background: near-black / deep navy.
-   Accent: purple / violet with restrained glow effects.
-   Text: high-contrast off-white with muted secondary text.
-   Visual language: minimal, editorial, spacious, technical, and
    polished.
-   Use subtle grid, diagonal-line, dotted, or particle treatments only
    where shown in the approved mockup.
-   Avoid excessive gradients, glowing borders, cards, animations, or
    decorative elements not present in the reference.

Suggested initial design tokens (refine against the mockup):

  Token                  Initial value
  ---------------------- --------------------------
  `--background`         `#080510`
  `--surface`            `#120B20`
  `--primary`            `#A855F7`
  `--accent`             `#D946EF`
  `--foreground`         `#F5F1FA`
  `--muted-foreground`   `#A49AAF`
  `--border`             `rgba(255,255,255,0.12)`

These are starting values only. The mockup takes precedence if its
sampled colors differ.

## 6. Typography Requirements

Typography must be consistent across the public website and admin
dashboard.

### Body font

-   Family: `Barlow Condensed`
-   Fallback name: `Barlow Condensed Fallback`
-   Usage: body copy, paragraphs, descriptions, navigation, labels,
    buttons, metadata, and form text.

### Heading font

-   Family: `Bebas Neue`
-   Fallback name: `Bebas Neue Fallback`
-   Usage: all display headings and heading levels H1--H6.

### Implementation requirements

-   Use `next/font/google` where supported.
-   Expose font CSS variables such as `--font-body` and
    `--font-heading`.
-   Define explicit fallback font stacks.
-   Ensure the fonts load without layout shifts where possible.
-   Do not silently replace these fonts with Inter, Arial, or another
    default family.
-   Verify font weights and available variants before assigning them;
    Bebas Neue is generally used at its supported regular weight.

## 7. Public Website --- Functional and UI Requirements

The public website must follow the approved full-page mockup and
implement the following sections in the same order.

### 7.1 Header and navigation

-   Compact brand / logo area.
-   Small, refined navigation typography.
-   Navigation links for the sections/pages approved in the mockup.
-   Primary contact CTA.
-   Theme toggle button in the header.
-   Theme toggle must be keyboard accessible and have an accessible
    label.
-   Keep the header clean and visually lightweight.
-   On mobile, collapse navigation into an accessible menu.

### 7.2 Hero banner

-   Profile image/avatar and availability status.
-   Large headline with the same line breaks and visual emphasis as the
    mockup where viewport permits.
-   Short professional introduction.
-   Primary CTA: Get in touch.
-   Secondary CTA: My work / View projects.
-   Abstract dotted / particle sphere visual on the right side on
    desktop.
-   Preserve the hero's generous whitespace and grid/background
    treatment.
-   On mobile, stack the content and reposition or simplify the
    decorative visual without obscuring text.

### 7.3 Featured Projects

The Featured Projects section must use the approved alternating layout.

-   Display project count / sequence such as `01 / 04`.
-   Each project has a title, concise description, technology tags,
    preview image, and case-study link.
-   Alternate the image and text sides for successive project rows.
-   Use thin separators between rows.
-   Maintain consistent preview aspect ratios, image treatment, row
    spacing, and content alignment.
-   Include a centered "See all projects" CTA if shown in the mockup.
-   Do not convert this section into a generic uniform card grid.
-   Project names, screenshots, descriptions, and technologies must be
    owner-approved. Use clearly marked temporary placeholders only until
    real content is supplied.

### 7.4 Work Experience

Use the approved two-column composition.

**Left column:** - Section eyebrow and heading. - Numbered experience
timeline. - Role/title, company, and date range. - Clear active/current
role treatment. - Thin dividers and restrained hover/active styling.

**Right column:** - Dark terminal / code-editor-inspired panel. - Small
window controls and filename/title treatment. - Short role-specific
responsibility or achievement text. - Active/current position indicator.

Do not invent employer names, role titles, or employment dates. Use
verified details supplied by the owner.

### 7.5 Skills and Expertise

-   Section heading and short supporting copy.
-   Technology/tool showcase using reusable skill items.
-   Use authentic technology names and icons.
-   Group technologies logically where the mockup indicates.
-   Avoid progress bars or percentage proficiency claims unless
    specifically provided by the owner.

### 7.6 How I Work / Process

-   Show the process steps in the approved visual format.
-   Initial suggested steps: Discover, Design, Build, Deliver.
-   Use numbered markers, concise descriptions, and a connected
    timeline/line where shown.
-   Keep the section minimal and consistent with the overall design.

### 7.7 Contact CTA banner

-   Prominent purple-accented contact banner.
-   Strong heading, short supporting statement, and contact CTA.
-   Decorative pattern or particle detail only if present in the mockup.
-   CTA must lead to the contact section or configured contact
    destination.

### 7.8 Footer

-   Follow the supplied footer reference: centered profile/avatar, owner
    name, role/short descriptor, social links, and availability status.
-   Include copyright text.
-   Use subtle dotted/pattern background where shown.
-   Maintain a restrained, spacious finish.
-   Ensure all social and contact links are real and owner-approved.

## 8. Reusable Component Requirements

The application must use reusable, composable components. Do not build
the entire page as one large component.

Public website component structure (single-project layout per §0 — paths are relative to the
repository root, not a nested `apps/web`):

``` text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── admin/            (admin dashboard route group — see §9)
│   └── api/v1/           (Route Handlers — see §10)
├── components/
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── section-container.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── featured-projects-section.tsx
│   │   ├── work-experience-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── process-section.tsx
│   │   └── contact-cta-section.tsx
│   ├── projects/
│   │   ├── project-row.tsx
│   │   ├── project-preview.tsx
│   │   └── technology-tags.tsx
│   ├── experience/
│   │   ├── experience-timeline.tsx
│   │   └── experience-terminal.tsx
│   ├── skills/
│   │   └── skill-item.tsx
│   ├── ui/               (shared Button, Card, Input, Dialog, etc.)
│   └── admin/            (admin-only components: sidebar, admin header)
├── data/
├── hooks/
├── lib/                  (utils, mongodb.ts, env.ts, api-response.ts)
├── models/                (Mongoose schemas, as content modules are added)
├── types/
└── proxy.ts         (route protection, scoped to /admin/**)
```

Component requirements:

-   Use single-responsibility components.
-   Use props and typed data models for repeated UI.
-   Render repeated projects, experience entries, and skills from
    structured data.
-   Keep content/data separate from presentation.
-   Use shared buttons, badges, section headings, containers, and layout
    primitives.
-   Keep components accessible and responsive.
-   Avoid unnecessary abstraction; reuse components where there is
    genuine repetition.

## 9. Admin Dashboard Requirements

Build the admin dashboard as a route group under `src/app/admin/**` within the single Next.js
project (see §0), not as an independent application.

Initial foundation:

-   Dashboard shell with sidebar and header.
-   Responsive navigation.
-   Theme support consistent with the design system.
-   Shared typography.
-   Reusable Shadcn UI components.
-   API client and query provider foundation.
-   Form and validation foundation.
-   Protected-route architecture prepared for later authentication.
-   Dashboard overview placeholder only.

Actual content-management modules and CRUD workflows are not part of the
initial setup unless separately approved.

## 10. Backend API Requirements

Build the backend as Next.js Route Handlers under `src/app/api/v1/**` within the single Next.js
project (see §0) — not an independent NestJS application.

-   Use versioned API path prefix: `/api/v1`.
-   MongoDB integration through Mongoose, via a cached connection helper (`src/lib/mongodb.ts`)
    so dev-mode hot reload and serverless invocations don't exhaust connections.
-   Environment-based configuration and validation (Zod, `src/lib/env.ts`).
-   Health-check endpoint (`/api/v1/health`).
-   Consistent JSON success/error response shape (`src/lib/api-response.ts`, `src/types/api.ts`).
-   CORS allowlist for any cross-origin callers (same-origin calls from this project's own
    pages/admin UI do not need CORS).
-   Security headers (via `next.config.ts` `headers()`) and a rate-limiting foundation.
-   Modular, testable Route Handlers, one per resource/action.

Swagger/OpenAPI documentation, request-level throttling, and a formal exception-filter layer were
part of the original NestJS design; they are not yet replicated 1:1 in the Route Handler
architecture and are tracked as follow-up tasks in `docs/tasks.md` rather than implemented
ad hoc. Do not implement unapproved business modules during the setup phase.

## 11. Technology Stack

  Layer               Technology
  ------------------- --------------------------------------------
  Project structure   Single Next.js project (no monorepo/workspace tooling — see §0)
  Frontend + Admin     Latest stable Next.js + React + TypeScript (one app, admin is a route group)
  UI                  Tailwind CSS + Shadcn-style components + Radix UI
  Icons               Lucide React + react-icons (Simple Icons, for authentic brand marks)
  Animation           Framer Motion
  Forms               React Hook Form + Zod
  Data fetching       TanStack Query + Axios
  Backend             Next.js Route Handlers (no separate NestJS service — see §0)
  Database            MongoDB + Mongoose
  Containers          Docker + Docker Compose (single app image)
  Reverse proxy       Nginx
  Code quality        ESLint + Prettier
  Git hooks           Husky + lint-staged + Commitlint
  CI                  GitHub Actions

Use latest stable, mutually compatible versions at implementation time.
Record the actual installed versions in the README.

## 12. Repository Structure

Single-project structure (see §0 — supersedes the originally planned monorepo layout):

``` text
ag-portfolio-fullstack/
├── .github/
│   └── workflows/
├── .husky/
├── src/
│   ├── app/            (pages, admin route group, api/v1 route handlers)
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── types/
│   └── proxy.ts
├── public/
├── design/
│   └── mockup/
│       └── AG-Portfolio-Fullpage-Mockup.png
├── docker/
│   ├── nginx/
│   └── mongo/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── package.json
├── .env.example
├── .gitignore
├── .dockerignore
└── README.md
```

## 13. Docker and Infrastructure

Development Docker Compose must support (single-app topology per §0 — one `app` service
serving the public site, admin dashboard, and API together):

-   The single Next.js application (public site + admin + API).
-   MongoDB with persistent volume.
-   Internal Docker network.
-   Health checks.
-   Environment variables.
-   Hot reload / development workflow.

Production foundation must support:

-   Multi-stage Dockerfiles.
-   Small production images.
-   Non-root application users.
-   Production builds.
-   Nginx reverse proxy.
-   Persistent database volume.
-   Restart policies and health checks.
-   HTTPS deployment preparation.

Do not expose MongoDB publicly by default. Use Docker service names for
internal container-to-container communication.

## 14. Code Quality and Git Workflow

### ESLint and Prettier

-   Shared ESLint flat configuration.
-   TypeScript and framework-specific lint rules.
-   Consistent import ordering.
-   Unused variable detection.
-   Prettier formatting.
-   Tailwind class sorting.
-   Root scripts for lint, lint fix, format, format check, and type
    checking.

### Husky and Commitlint

-   Pre-commit: lint-staged, ESLint, and Prettier.
-   Commit-msg: Commitlint using Conventional Commits.
-   Supported types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`,
    `test`, `build`, `ci`, `chore`, `revert`.


## 15. Quality Targets — Performance, Accessibility, and SEO

These quality targets are mandatory project objectives and release gates. The implementation must be continuously measured and optimized, not merely described as optimized.

### 15.1 Google PageSpeed Insights — target 100/100

Target **100/100 in Google PageSpeed Insights Lighthouse Performance** for both Mobile and Desktop, wherever technically achievable.

Requirements:
- Optimize Core Web Vitals: LCP, INP, and CLS.
- Use optimized image formats and responsive image sizing.
- Set explicit image dimensions or aspect ratios to prevent layout shifts.
- Use `next/image` where appropriate.
- Optimize fonts and avoid font-loading layout shifts.
- Minimize JavaScript shipped to the browser.
- Prefer Server Components and defer non-critical Client Components.
- Lazy-load below-the-fold images and non-critical media.
- Avoid render-blocking resources and unnecessary third-party scripts.
- Use efficient CSS, code splitting, caching, and production builds.
- Respect reduced-motion preferences and avoid expensive animation effects.
- Test the production build, not only the development server.

Measurement and acceptance:
- Run Google PageSpeed Insights on the deployed or production-equivalent URL.
- Record Mobile and Desktop scores and test dates in the project quality report.
- Target 100/100 Performance on both Mobile and Desktop.
- If a score below 100 is caused by a third-party service, browser/environment variation, or a factor outside the project team's control, document the cause, evidence, mitigation, and remaining limitation. Do not claim 100 when the measured score is lower.
- A score of 100 in one test run is not a permanent guarantee; re-test after material UI, dependency, or infrastructure changes.

### 15.2 Accessibility / ADA — target 100% automated checks

Target **100% on the selected automated accessibility audit/scoring tool**, with no known critical or serious accessibility violations.

Requirements:
- Follow WCAG 2.2 Level AA as the minimum accessibility standard.
- Use semantic HTML and a logical heading hierarchy.
- Ensure complete keyboard navigation and visible focus indicators.
- Provide accessible names and labels for controls, links, inputs, dialogs, and theme toggles.
- Ensure sufficient text and UI contrast.
- Provide meaningful alternative text for informative images; use empty alt text for decorative images.
- Ensure menus, dialogs, and interactive components support keyboard and assistive technologies.
- Respect reduced-motion preferences.
- Do not communicate meaning through color alone.
- Test responsive layouts, zoom, and text resizing.
- Include manual keyboard and screen-reader checks; automated scores alone do not prove full ADA or WCAG compliance.

Measurement and acceptance:
- Run automated accessibility checks using tools such as Lighthouse and axe.
- Target 100% automated accessibility score in the agreed audit tool.
- Resolve all critical, serious, and moderate issues before release, or document an explicitly approved exception.
- Perform manual WCAG 2.2 AA checks for keyboard operation, focus order, accessible names, and representative screen-reader flows.
- Do not state that the website is legally ADA-compliant solely because an automated score is 100%.

### 15.3 SEO — target 100/100

Target **100/100 in the agreed Lighthouse SEO audit** and implement strong technical and content SEO foundations.

Requirements:
- Unique, meaningful page title and meta description.
- Correct canonical URL configuration.
- Open Graph and social sharing metadata.
- Semantic HTML and logical heading hierarchy.
- Crawlable navigation and descriptive link text.
- XML sitemap and robots.txt.
- Appropriate indexing directives.
- Descriptive image alt text.
- Clean, stable URL structure.
- Structured data / JSON-LD where accurate and relevant, such as Person and WebSite.
- Correct status codes, redirects, and not-found handling.
- Mobile-friendly responsive design.
- Fast loading and secure HTTPS deployment.
- Avoid duplicate metadata and accidental `noindex` on public pages.

Measurement and acceptance:
- Run Lighthouse SEO audits against the production build.
- Target 100/100 Lighthouse SEO score.
- Validate sitemap, robots.txt, canonical URLs, metadata, and structured data.
- Use Google Search Console after domain deployment to monitor indexing and search enhancements.
- Do not use misleading, hidden, or keyword-stuffed content to increase a score.

### 15.4 Quality reporting

Maintain a quality report in `docs/quality-report.md` containing:
- Test date and tested URL/build.
- Lighthouse/PageSpeed Mobile and Desktop scores.
- Performance/Core Web Vitals findings.
- Automated accessibility score and tool used.
- Manual accessibility checks completed.
- Lighthouse SEO score.
- Outstanding issues, causes, owners, and remediation plan.

Re-run quality checks after major UI changes and before production release.

## 16. Non-Functional Requirements

### Performance

-   Optimize images and fonts.
-   Use Server Components by default.
-   Avoid unnecessary client-side JavaScript.
-   Lazy-load non-critical visual assets.
-   Avoid layout shifts.
-   Target strong Core Web Vitals.

### Accessibility

-   Semantic HTML.
-   Keyboard navigation.
-   Visible focus states.
-   Accessible theme toggle and mobile menu.
-   Sufficient color contrast.
-   Appropriate labels and alt text.
-   Respect reduced-motion preferences.

### SEO

-   Page title and description.
-   Open Graph metadata.
-   Canonical URL configuration.
-   Sitemap and robots configuration.
-   Semantic heading hierarchy.
-   Structured data where appropriate.

### Security

-   Never expose secrets in client bundles.
-   Validate all API input.
-   Restrict CORS origins.
-   Apply security headers and rate limits.
-   Keep dependencies updated.
-   Do not commit real environment files or credentials.

### Maintainability

-   Strict TypeScript.
-   Clear module boundaries.
-   Reusable components.
-   Shared design tokens.
-   Typed API contracts.
-   Consistent error handling.
-   Documented setup and scripts.

## 17. Acceptance Criteria

The project is accepted when all applicable checks pass.

### Repository and architecture

-   [ ] Existing repository inspected before changes.
-   [ ] Single Next.js project configured at the repository root (no PNPM Workspaces/Turborepo — see §0).
-   [ ] Public site, `/admin/**` route group, and `/api/v1/**` Route Handlers all run from the one Next.js server.
-   [ ] `design/mockup/` exists and contains the approved mockup.

### UI fidelity

-   [ ] All public sections match the approved mockup's order and
    composition.
-   [ ] Desktop screenshot is visually compared against the reference.
-   [ ] Typography uses Barlow Condensed for body and Bebas Neue for
    headings.
-   [ ] Header includes compact navigation and a working theme toggle.
-   [ ] Featured Projects uses alternating image/text rows.
-   [ ] Work Experience uses timeline plus terminal-style panel.
-   [ ] Footer follows the approved centered profile layout.
-   [ ] Tablet and mobile layouts are usable and visually consistent.
-   [ ] No unapproved sections or generic template layouts are
    introduced.

### Application and API

-   [ ] Public website loads successfully.
-   [ ] Admin dashboard (`/admin/**`) loads successfully.
-   [ ] API health endpoint (`/api/v1/health`) responds successfully.
-   [ ] MongoDB connection succeeds.
-   [ ] Environment validation works.

### Quality and infrastructure
- [ ] Google PageSpeed Insights Performance target: 100/100 Mobile and Desktop, or documented evidence-based exception.
- [ ] Automated accessibility target: 100% in the agreed audit tool, with manual WCAG 2.2 AA checks completed.
- [ ] Lighthouse SEO target: 100/100, or documented evidence-based exception.
- [ ] `docs/tech-stack.md`, `docs/tech-spec.md`, `docs/plan.md`, and `docs/tasks.md` are created and maintained automatically.
- [ ] `docs/implementation-status.md` provides a reliable resume checkpoint.
- [ ] Work resumes from the first verified incomplete task after interruption; completed work is not needlessly repeated.

-   [ ] Docker development stack starts successfully.
-   [ ] Production images build successfully.
-   [ ] ESLint passes.
-   [ ] TypeScript checks pass.
-   [ ] Prettier check passes.
-   [ ] Husky pre-commit hook works.
-   [ ] Commitlint rejects invalid commit messages.
-   [ ] GitHub Actions validation workflow passes.
-   [ ] README setup instructions are verified.

## 18. Implementation Phases

1.  **Foundation:** inspect repository, confirm versions, configure the
    single Next.js project (see §0).
2.  **Applications:** initialize the public site routes, the `/admin`
    route group, and the `/api/v1` Route Handlers within that one project.
3.  **Shared system:** configure shared UI, TypeScript, ESLint, fonts,
    and design tokens.
4.  **Infrastructure:** configure MongoDB, Docker Compose, Nginx, and
    environment validation.
5.  **Quality gates:** configure Prettier, Husky, lint-staged,
    Commitlint, and GitHub Actions.
6.  **Public UI:** implement the approved mockup section by section
    using reusable components.
7.  **Verification:** compare screenshots, test responsive breakpoints,
    run accessibility and performance checks.
8.  **Documentation:** finalize README and setup instructions.

## 19. Claude Code Execution, Living Documentation, and Resume Behavior

This BRD is intended to be executable as the primary project requirements document by Claude Code or another repository-aware AI coding agent. When the agent is asked to execute this BRD, it must create and maintain the project documentation below automatically.

### 19.1 Required living documentation files

Create these files in the repository under `docs/` using the exact lowercase, hyphenated filenames:

```text
docs/
├── tech-stack.md
├── tech-spec.md
├── plan.md
├── tasks.md
├── quality-report.md
└── implementation-status.md
```

If the repository already contains equivalent documentation, inspect and update it instead of creating duplicate documents.

### 19.2 Document responsibilities

**`docs/tech-stack.md`**
- Record the selected technologies, frameworks, libraries, tools, and actual installed versions.
- Record the reason for important technology choices.
- Keep the document aligned with the actual package manifests and lockfile.
- Update it whenever a dependency, framework, tool, or infrastructure technology is added, removed, or upgraded.

**`docs/tech-spec.md`**
- Record the application architecture, monorepo structure, module boundaries, API conventions, database design foundations, environment variables, Docker services, shared packages, design tokens, typography, and security decisions.
- Include relevant diagrams or concise text-based architecture descriptions.
- Update it whenever implementation changes the architecture, interfaces, configuration, or technical decisions.

**`docs/plan.md`**
- Maintain the phased implementation roadmap.
- Record phase goals, dependencies, milestones, sequencing, and acceptance conditions.
- Mark phases as `Not Started`, `In Progress`, `Blocked`, or `Completed`.
- Update the plan when scope, sequencing, or technical dependencies change.

**`docs/tasks.md`**
- Maintain a detailed, actionable task list derived from this BRD and the approved mockup.
- Use stable task IDs and clear status markers: `Todo`, `In Progress`, `Blocked`, and `Done`.
- Include acceptance criteria and relevant file paths for each task.
- Break large tasks into smaller verifiable subtasks.
- Update task status immediately when work starts, is blocked, or is completed.
- Never mark a task `Done` unless its implementation and relevant validation have actually passed.

**`docs/quality-report.md`**
- Record Lighthouse/PageSpeed, accessibility, SEO, responsive, and relevant test results.
- Include test dates, tested build/URL, scores, findings, and unresolved issues.
- Never fabricate scores or report unexecuted tests as passed.

**`docs/implementation-status.md`**
- Record the current implementation phase and task ID.
- Record the last completed task, current in-progress task, next task, blockers, and exact validation status.
- Record relevant commands already run and their outcomes.
- This file is the resume checkpoint when implementation is interrupted.

### 19.3 Automatic documentation workflow

At the beginning of execution:

1. Inspect the repository, existing source files, package manifests, lockfile, current Git status, and existing documentation.
2. Read this BRD and inspect the approved mockup in `design/mockup/`.
3. Create or reconcile all required `docs/*.md` files.
4. Convert the BRD into a phased plan and stable task IDs.
5. Record the initial project state in `docs/implementation-status.md`.
6. Confirm the intended implementation scope before changing existing project behavior.

During implementation:

- Update `tech-stack.md` when actual dependencies or versions change.
- Update `tech-spec.md` when architecture, configuration, interfaces, or technical decisions change.
- Update `plan.md` when phase progress or sequencing changes.
- Update `tasks.md` as soon as task status changes.
- Update `quality-report.md` after each meaningful quality audit.
- Update `implementation-status.md` at the end of each work session and before stopping.
- Keep documentation factual and consistent with the repository. Do not document planned work as completed work.
- Include relevant validation results and unresolved issues.

### 19.4 Resume after interruption or session closure

Implementation must be resumable without restarting completed work.

Whenever Claude Code is opened again or execution resumes:

1. Read this BRD.
2. Read `docs/implementation-status.md`, `docs/plan.md`, and `docs/tasks.md`.
3. Inspect the actual repository state, Git diff/status, and relevant source files.
4. Verify whether the last recorded completed task is genuinely complete.
5. Reconcile documentation with the actual code if they differ.
6. Continue from the earliest incomplete or blocked task that can safely proceed.
7. Do not recreate the project, overwrite working code, or repeat completed tasks unnecessarily.
8. Re-run only the validations needed to establish confidence in the current state and the next change.
9. Update all affected documentation as implementation proceeds.

If implementation stops unexpectedly, the next execution must use the last reliable checkpoint and repository state to continue from that point. Never assume that an interrupted task completed successfully.

### 19.5 Task completion and checkpoint rules

Before considering a task complete:

- Confirm the expected files and behavior exist.
- Run the relevant lint, type-check, test, build, or audit command.
- Record the actual result.
- Update the task status and implementation checkpoint.
- Note any limitation or follow-up task.

Before ending any work session:

- Ensure no active task is falsely marked complete.
- Save the current task ID and exact next action in `implementation-status.md`.
- Record uncommitted changes and blockers where relevant.
- Keep all living documents synchronized with the implementation.

### 19.6 Scope and safety rules for automated execution

- Do not delete or overwrite existing user work without inspection and a clear need.
- Do not commit secrets, credentials, production data, or private keys.
- Do not invent project content, employment details, metrics, audit scores, or test results.
- Do not silently change approved mockup requirements.
- Ask for clarification when a required asset, credential, content item, or decision cannot be inferred safely.
- Prefer small, verifiable implementation steps over large unreviewed rewrites.

## 20. Delivery Rules for Developers and AI Coding Agents

- Treat this BRD and the image in `design/mockup/` as the implementation contract.
- Read the BRD and inspect the mockup before making UI changes.
- Do not start with a generic portfolio template.
- Do not replace the approved visual design with a different aesthetic.
- Do not invent personal, employment, project, or performance details.
- Build reusable components and data-driven repeated sections.
- Implement one section at a time and visually verify it before moving on.
- Keep the project setup phase separate from feature implementation.
- Maintain all living documentation described in Section 19.
- Resume interrupted work from the verified checkpoint and actual repository state.
- If a requirement conflicts with the supplied mockup, report the conflict and request clarification rather than silently changing the design.

---

**End of BRD**

-   Treat this BRD and the image in `design/mockup/` as the
    implementation contract.
-   Read the BRD and inspect the mockup before making UI changes.
-   Do not start with a generic portfolio template.
-   Do not replace the approved visual design with a different
    aesthetic.
-   Do not invent personal, employment, project, or performance details.
-   Build reusable components and data-driven repeated sections.
-   Implement one section at a time and visually verify it before moving
    on.
-   Keep the project setup phase separate from feature implementation.
-   If a requirement conflicts with the supplied mockup, report the
    conflict and request clarification rather than silently changing the
    design.

------------------------------------------------------------------------

**End of BRD**
