'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme/ThemeToggle';
import ButtonLink from '@/components/ui/ButtonLink';
import { MenuIcon, CloseIcon } from '@/components/ui/icons';
import LanguageSwitcher from '@/components/layouts/LanguageSwitcher';
import type { Language } from '@/lib/i18n';

type NavLink = { id: string; label: string };

const DEFAULT_LINKS: NavLink[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// Sections that actually exist on the home page — drives the scroll-spy
// independently of the (configurable) nav labels.
const SECTION_IDS = ['work', 'about', 'experience', 'contact'];

const Logo = ({
  href,
  mark,
  text,
  onClick,
}: {
  href: string;
  mark: string;
  text: string;
  onClick?: () => void;
}) => (
  <Link className="logo" href={href} aria-label={`${text} — home`} onClick={onClick}>
    <span className="logo__mark">{mark}</span>
    <span>
      {text}
      <span className="accent-dot">.</span>
    </span>
  </Link>
);

const Nav = ({
  locale,
  languages,
  links = DEFAULT_LINKS,
  cvHref,
  cvLabel = 'Download CV',
  contactLabel = 'Contact',
  logoMark = 'CG',
  logoText = 'IDOH',
}: {
  locale: string;
  languages: Language[];
  links?: NavLink[];
  cvHref?: string;
  cvLabel?: string;
  contactLabel?: string;
  logoMark?: string;
  logoText?: string;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === `/${locale}`;

  const cv = cvHref ?? `/${locale}/cv`;
  const cvExternal = cv.startsWith('http');
  const contactHref = `/${locale}/contact`;

  // Anchor links resolve to the localized home page when we're on a subpage.
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/${locale}#${id}`);
  const linkHref = (target: string) =>
    target.startsWith('/') ? `/${locale}${target}` : sectionHref(target);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const update = () => {
      const navH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 76;
      const line = navH + 140;
      let cur: string | null = null;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        cur = SECTION_IDS[SECTION_IDS.length - 1];
      }
      setActive(cur);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const cvExtraProps = cvExternal ? { target: '_blank', rel: 'noopener' } : {};

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
        <div className="nav__inner">
          <Logo href={sectionHref('top')} mark={logoMark} text={logoText} />
          <div className="nav__links">
            {links.map((l) => (
              <Link
                key={l.id}
                href={linkHref(l.id)}
                className={onHome && active === l.id ? 'active' : undefined}
              >
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
          <div className="nav__tools">
            <LanguageSwitcher languages={languages} locale={locale} />
            <ThemeToggle />
            <ButtonLink variant="ghost" size="sm" href={cv} {...cvExtraProps}>
              {cvLabel}
            </ButtonLink>
            <ButtonLink variant="primary" size="sm" href={contactHref}>
              {contactLabel}
            </ButtonLink>
            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      <div className={`drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="drawer__top">
          <Logo
            href={sectionHref('top')}
            mark={logoMark}
            text={logoText}
            onClick={() => setOpen(false)}
          />
          <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="drawer__links" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.id} href={linkHref(l.id)} onClick={() => setOpen(false)}>
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="drawer__foot">
          <ButtonLink variant="primary" href={contactHref} onClick={() => setOpen(false)}>
            {contactLabel}
          </ButtonLink>
          <ButtonLink variant="ghost" href={cv} onClick={() => setOpen(false)} {...cvExtraProps}>
            {cvLabel}
          </ButtonLink>
        </div>
      </div>
    </>
  );
};

export default Nav;
