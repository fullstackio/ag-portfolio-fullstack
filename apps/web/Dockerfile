# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

# ---- Prune the monorepo down to what "web" needs ----
FROM base AS pruner
RUN apk add --no-cache libc6-compat
COPY . .
RUN pnpm dlx turbo prune web --docker

# ---- Install dependencies for the pruned workspace ----
FROM base AS deps
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
COPY --from=deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=web...

# ---- Development image (hot reload) ----
FROM base AS development
COPY --from=pruner /app/out/full/ .
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=development
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "dev"]

# ---- Production runtime ----
FROM node:22-alpine AS production
RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "apps/web/server.js"]
