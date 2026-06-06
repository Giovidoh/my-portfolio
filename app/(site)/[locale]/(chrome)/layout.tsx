import Nav from '@/components/layouts/Nav';
import Footer from '@/components/layouts/Footer';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollReveals from '@/components/motion/ScrollReveals';
import { getDefaultLocale, getLanguages, makeT } from '@/lib/i18n';
import { getSiteSettings, getHome } from '@/lib/content';

const DEFAULT_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default async function ChromeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const [defaultLocale, languages, settings, home] = await Promise.all([
    getDefaultLocale(),
    getLanguages(),
    getSiteSettings(),
    getHome(),
  ]);
  const tt = makeT(locale, defaultLocale);

  // Drop nav/footer links that point to a hidden home-page section, so a hidden
  // section never leaves a dead anchor behind.
  const vis = home?.sectionsVisibility;
  const SECTION_KEYS = ['work', 'about', 'skills', 'experience', 'testimonials', 'contact'] as const;
  const hiddenSections = new Set<string>(SECTION_KEYS.filter((k) => vis?.[k] === false));

  const navFromSanity = (settings?.navItems ?? [])
    .map((n) => ({ id: n.target ?? '', label: tt(n.label, n.target ?? '') }))
    .filter((l) => l.id);
  const links = (navFromSanity.length ? navFromSanity : DEFAULT_LINKS).filter(
    (l) => !hiddenSections.has(l.id),
  );

  const cvHref = settings?.cvUrl ?? `/${locale}/cv`;
  const cvLabel = tt(settings?.cvLabel, 'Download CV');
  const year = new Date().getFullYear();

  return (
    <>
      <SmoothScroll />
      <ScrollReveals />
      <Nav
        locale={locale}
        languages={languages}
        links={links}
        cvHref={cvHref}
        cvLabel={cvLabel}
        contactLabel={tt(settings?.getInTouch, 'Contact')}
        logoMark={settings?.logoMark ?? undefined}
        logoText={settings?.logoText ?? undefined}
      />
      {children}
      <Footer
        locale={locale}
        tagline={tt(settings?.footerTagline, "Let's make the web a little better.")}
        copyright={tt(settings?.copyright, '© {year} Cir-Giovanni Idoh — Built with care.').replace(
          '{year}',
          String(year),
        )}
        email={settings?.email ?? 'hello@cgidoh.dev'}
        github={settings?.githubUrl ?? 'https://github.com'}
        linkedin={settings?.linkedinUrl ?? 'https://linkedin.com'}
        cvHref={cvHref}
        cvLabel={cvLabel}
        links={links}
        navHeading={tt(settings?.footerNav, 'Navigate')}
        elsewhereHeading={tt(settings?.footerElsewhere, 'Elsewhere')}
      />
    </>
  );
}
