import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  MONGODB_DATABASE: z.string().min(1, 'MONGODB_DATABASE is required'),
  MONGODB_USERNAME: z.string().optional(),
  MONGODB_PASSWORD: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/**
 * Validates server-only environment variables once per process (lazily, on first use from a
 * Route Handler or other server-only module) rather than at module import time — Next.js can
 * import server modules during the build/type-check step before real env vars are injected.
 */
export function getEnv(): Env {
  if (cached) return cached;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${message}`);
  }

  cached = parsed.data;
  return cached;
}
