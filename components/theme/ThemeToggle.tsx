'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Basculer le thème clair/sombre"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border bg-background text-foreground shadow-md transition hover:bg-accent"
    >
      {/* Icon visibility is driven by the `.dark` class (no JS, no hydration guard). */}
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
