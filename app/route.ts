import { NextResponse } from 'next/server';
import { getDefaultLocale } from '@/lib/i18n';

// The root `/` carries no locale: redirect to the default language configured in
// the Studio (read fresh, so changing the default takes effect on the next hit).
// Replaces the old hardcoded `proxy.ts` env default.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const locale = await getDefaultLocale();
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}
