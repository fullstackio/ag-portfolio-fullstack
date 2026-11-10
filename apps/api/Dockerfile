# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

# ---- Prune the monorepo down to what "api" needs ----
FROM base AS pruner
RUN apk add --no-cache libc6-compat
COPY . .
RUN pnpm dlx turbo prune api --docker

# ---- Install dependencies for the pruned workspace ----
FROM base AS deps
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
COPY --from=deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=api...
RUN pnpm --filter=api --prod deploy /app/out/deploy

# ---- Development image (hot reload) ----
FROM base AS development
COPY --from=pruner /app/out/full/ .
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=development
WORKDIR /app/apps/api
EXPOSE 4000
CMD ["pnpm", "dev"]

# ---- Production runtime ----
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/out/deploy/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

USER nestjs
EXPOSE 4000
CMD ["node", "dist/main.js"]
