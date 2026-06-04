import { NextResponse, type NextRequest } from 'next/server';

// The root `/` carries no locale. Redirect it to the default locale's home.
// Kept dependency-free (no Sanity fetch) so it runs cheaply at the edge; the
// default is configurable via env, defaulting to English.
// Next 16.2 renamed the `middleware` convention to `proxy`.
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Only the bare root — everything else is already locale-prefixed or non-localized.
  matcher: '/',
};
