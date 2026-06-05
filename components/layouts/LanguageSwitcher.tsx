'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/lib/i18n';

/**
 * Segmented language toggle — matches the design's `.lang` control: every active
 * language is shown side by side, the current one highlighted. Each segment links
 * to the same path with the locale segment swapped. (No dropdown: the design's
 * `.lang` uses `overflow:hidden`, which would clip a popover.)
 */
const LanguageSwitcher = ({ languages, locale }: { languages: Language[]; locale: string }) => {
  const pathname = usePathname();

  if (languages.length < 2) return null;

  // Swap the first path segment (the locale) for the target one.
  const hrefFor = (target: string) => {
    const segs = pathname.split('/');
    segs[1] = target;
    return segs.join('/') || `/${target}`;
  };

  return (
    <div className="lang" role="group" aria-label="Language">
      {languages.map((l) => (
        <Link
          key={l.id}
          href={hrefFor(l.id)}
          aria-current={l.id === locale ? 'page' : undefined}
          title={l.title}
        >
          {l.id.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
