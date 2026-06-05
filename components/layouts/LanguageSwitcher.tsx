'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/lib/i18n';

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * Language dropdown. Shows the current locale; the menu lists every active
 * language (scrolls if there are many) and links to the same path with the
 * locale segment swapped. Uses a dedicated `.langsel` container (no
 * `overflow:hidden`) so the menu is never clipped.
 */
const LanguageSwitcher = ({ languages, locale }: { languages: Language[]; locale: string }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (languages.length < 2) return null;

  const current = languages.find((l) => l.id === locale) ?? languages[0];

  // Swap the first path segment (the locale) for the target one.
  const hrefFor = (target: string) => {
    const segs = pathname.split('/');
    segs[1] = target;
    return segs.join('/') || `/${target}`;
  };

  return (
    <div className="langsel" ref={ref}>
      <button
        type="button"
        className="langsel__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((o) => !o)}
      >
        {current.id.toUpperCase()}
        <Chevron />
      </button>
      {open && (
        <ul className="langsel__menu" role="listbox">
          {languages.map((l) => (
            <li key={l.id}>
              <Link
                href={hrefFor(l.id)}
                role="option"
                aria-current={l.id === locale ? 'page' : undefined}
                aria-selected={l.id === locale}
                onClick={() => setOpen(false)}
              >
                <span>{l.title}</span>
                <span className="code">{l.id.toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
