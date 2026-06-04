import { cache } from 'react';
import { client } from '@/sanity/lib/client';

export type Language = { id: string; title: string; isDefault?: boolean };

/** Used when Sanity has no `language` documents yet, so the site still builds. */
export const FALLBACK_LOCALE = 'en';
const FALLBACK_LANGUAGES: Language[] = [{ id: FALLBACK_LOCALE, title: 'English', isDefault: true }];

/**
 * Active languages, ordered, from Sanity. Cached per request. Degrades to a
 * single English fallback if the dataset is empty or unreachable — the locale
 * list is data, but the site never 404s for lack of it.
 */
export const getLanguages = cache(async (): Promise<Language[]> => {
  try {
    const langs = await client.fetch<Language[]>(
      `*[_type == "language" && isActive == true] | order(order asc){ id, title, isDefault }`,
    );
    return langs && langs.length > 0 ? langs : FALLBACK_LANGUAGES;
  } catch {
    return FALLBACK_LANGUAGES;
  }
});

export async function getLocales(): Promise<string[]> {
  return (await getLanguages()).map((l) => l.id);
}

export async function getDefaultLocale(): Promise<string> {
  const langs = await getLanguages();
  return (langs.find((l) => l.isDefault) ?? langs[0]).id;
}

// ---- Pure helpers (safe in client components) ----

/** First path segment, e.g. "/fr/contact" → "fr". */
export function localeFromPathname(pathname: string, fallback = FALLBACK_LOCALE): string {
  return pathname.split('/')[1] || fallback;
}

/** Prefix an internal path with the locale. Hashes and external links pass through. */
export function withLocale(locale: string, path: string): string {
  if (!path.startsWith('/')) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Resolve the value of an internationalized-array field for a locale, falling
 * back to the default locale and then the first available entry.
 */
export function pickLocale<T = string>(
  field: Array<{ _key: string; value: T }> | undefined | null,
  locale: string,
  defaultLocale: string,
): T | undefined {
  if (!field?.length) return undefined;
  return (
    field.find((e) => e._key === locale)?.value ??
    field.find((e) => e._key === defaultLocale)?.value ??
    field[0]?.value
  );
}
