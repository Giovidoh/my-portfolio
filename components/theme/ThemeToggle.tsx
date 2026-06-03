'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from '@/components/ui/icons';

/**
 * Dark/light toggle. Icon visibility is driven by the `[data-theme]` attribute
 * in CSS (.theme-toggle .sun / .moon), so there is no hydration guard needed.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      aria-label="Toggle dark mode"
      title="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Moon className="moon" />
      <Sun className="sun" />
    </button>
  );
};

export default ThemeToggle;
