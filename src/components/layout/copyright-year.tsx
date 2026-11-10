import { connection } from 'next/server';

/**
 * `new Date()` is an "unstable" value under Next.js 16 Cache Components (static prerendering) —
 * it must not be read directly in a statically-rendered component. Isolating it behind
 * `connection()` + Suspense keeps the rest of the page statically prerenderable (required for
 * the BRD's 100/100 performance target) while only this small part renders dynamically per
 * request. The Suspense fallback (build-time year) is what most visitors see.
 */
export async function CopyrightYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}
