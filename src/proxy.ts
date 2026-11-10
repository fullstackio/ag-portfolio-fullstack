import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];

/**
 * Route protection is scoped to /admin/** only — the public site must never require a token.
 * Real authentication is not implemented in this foundation phase (BRD §4.2); this only
 * prepares the protected-route architecture for later wiring.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((path) => pathname.startsWith(path));
  const token = request.cookies.get('admin_token')?.value;

  if (!token && !isPublicAdminPath) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
