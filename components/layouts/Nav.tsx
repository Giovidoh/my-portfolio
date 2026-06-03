'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme/ThemeToggle';
import ButtonLink from '@/components/ui/ButtonLink';
import { MenuIcon, CloseIcon } from '@/components/ui/icons';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Logo = ({ href, onClick }: { href: string; onClick?: () => void }) => (
  <Link className="logo" href={href} aria-label="Cir-Giovanni IDOH — home" onClick={onClick}>
    <span className="logo__mark">CG</span>
    <span>
      IDOH<span className="accent-dot">.</span>
    </span>
  </Link>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';

  // Anchor links resolve to the home page when we're on a subpage.
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // The active class only renders on the home page (onHome && …), so there is
    // no need to reset state on subpages — leaving it avoids a sync setState in effect.
    if (!onHome) return;
    const update = () => {
      const navH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 76;
      const line = navH + 140;
      let cur: string | null = null;
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        cur = LINKS[LINKS.length - 1].id;
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

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
        <div className="nav__inner">
          <Logo href={sectionHref('top')} />
          <div className="nav__links">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={sectionHref(l.id)}
                className={onHome && active === l.id ? 'active' : undefined}
              >
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
          <div className="nav__tools">
            <ThemeToggle />
            <ButtonLink variant="ghost" size="sm" href="/cv">
              Download CV
            </ButtonLink>
            <ButtonLink variant="primary" size="sm" href="/contact">
              Contact
            </ButtonLink>
            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      <div className={`drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="drawer__top">
          <Logo href={sectionHref('top')} onClick={() => setOpen(false)} />
          <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="drawer__links" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link key={l.id} href={sectionHref(l.id)} onClick={() => setOpen(false)}>
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="drawer__foot">
          <ButtonLink variant="primary" href="/contact" onClick={() => setOpen(false)}>
            Get in touch
          </ButtonLink>
          <ButtonLink variant="ghost" href="/cv" onClick={() => setOpen(false)}>
            Download CV
          </ButtonLink>
        </div>
      </div>
    </>
  );
};

export default Nav;
