import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { fontVars } from '@/lib/fonts';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { SanityLive } from '@/sanity/lib/live';
import { getLocales } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Cir-Giovanni IDOH — Full-Stack Developer',
  description:
    'Cir-Giovanni IDOH — full-stack web developer building fast, accessible, design-forward products.',
};

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
