'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/lib/i18n';

const menuStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  minWidth: 150,
  padding: 6,
  margin: 0,
  listStyle: 'none',
  background: 'var(--surface)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--r-md)',
  boxShadow: '0 14px 40px rgba(0,0,0,.16)',
  zIndex: 70,
};

const LanguageSwitcher = ({ languages, locale }: { languages: Language[]; locale: string }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
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
    <div className="lang" ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className="icon-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 'auto',
          padding: '0 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '.04em',
        }}
      >
        {current.id.toUpperCase()}
      </button>
      {open && (
        <ul role="listbox" style={menuStyle}>
          {languages.map((l) => (
            <li key={l.id}>
              <Link
                href={hrefFor(l.id)}
                role="option"
                aria-selected={l.id === locale}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '8px 10px',
                  borderRadius: 'var(--r-sm)',
                  color: l.id === locale ? 'var(--ink)' : 'var(--muted)',
                  fontWeight: l.id === locale ? 600 : 500,
                }}
              >
                <span>{l.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  {l.id.toUpperCase()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
