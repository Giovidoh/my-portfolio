import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { fontVars } from '@/lib/fonts';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { SanityLive } from '@/sanity/lib/live';
import { getDefaultLocale, getLocales, pickLocale } from '@/lib/i18n';
import { getSiteSettings } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [defaultLocale, settings] = await Promise.all([getDefaultLocale(), getSiteSettings()]);
  const title =
    pickLocale(settings?.metaTitle, locale, defaultLocale) ??
    'Cir-Giovanni IDOH — Full-Stack Developer';
  const description =
    pickLocale(settings?.metaDescription, locale, defaultLocale) ??
    'Cir-Giovanni IDOH — full-stack web developer building fast, accessible, design-forward products.';
  const og = settings?.ogUrl ?? undefined;
  return {
    title,
    description,
    openGraph: { title, description, images: og ? [og] : undefined },
  };
}

export async function generateStaticParams() {
  const locales = await getLocales();
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const locales = await getLocales();
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning className={fontVars}>
      <body className="antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SanityLive />
        </ThemeProvider>
      </body>
    </html>
  );
}
