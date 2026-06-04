import Nav from '@/components/layouts/Nav';
import Footer from '@/components/layouts/Footer';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollReveals from '@/components/motion/ScrollReveals';
import { getLanguages } from '@/lib/i18n';

export default async function ChromeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const languages = await getLanguages();

  return (
    <>
      <SmoothScroll />
      <ScrollReveals />
      <Nav locale={locale} languages={languages} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
