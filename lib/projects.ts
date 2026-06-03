/**
 * Placeholder project data shared by the Work section and the project detail
 * page. Replaced by Sanity-backed content in phase R8.
 */
export type Project = {
  slug: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  big?: boolean;
  delay?: '1' | '2';
  /** Case-study fields (placeholder until R8). */
  caseMeta: string[];
  sub: string;
  facts: { role: string; timeline: string; stack: string; team: string };
  /** Whether a public live demo exists (drives the live-preview vs fallback). */
  hasLive: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: 'lumina',
    num: '01 / Featured',
    big: true,
    title: 'Lumina',
    desc: 'A component platform & design-system manager — versioned tokens, live docs, and one-click theming across products.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'tRPC'],
    caseMeta: ['Featured', 'SaaS Platform', '2025'],
    sub: 'A component platform & design-system manager — versioned tokens, live documentation and one-click theming applied across an entire product suite.',
    facts: { role: 'Lead Full-Stack', timeline: '2024 — 2025', stack: 'Next · tRPC', team: '3 people' },
    hasLive: true,
  },
  {
    slug: 'atlas-bank',
    num: '02',
    title: 'Atlas Bank',
    desc: 'A mobile-first banking dashboard — payments, budgets and instant transfers with delightful micro-interactions.',
    tags: ['Next.js', 'tRPC', 'Stripe'],
    caseMeta: ['Fintech', 'Dashboard', '2024'],
    sub: 'A mobile-first banking dashboard — payments, budgets and instant transfers with delightful micro-interactions.',
    facts: { role: 'Full-Stack', timeline: '2024', stack: 'Next · Stripe', team: '4 people' },
    hasLive: true,
  },
  {
    slug: 'verdant',
    num: '03',
    delay: '1',
    title: 'Verdant',
    desc: 'A carbon-tracking analytics suite turning messy supplier data into clear, decision-ready dashboards.',
    tags: ['Vue', 'D3', 'Node'],
    caseMeta: ['Private', 'Analytics', '2024'],
    sub: 'A carbon-tracking analytics suite turning messy supplier data into clear, decision-ready dashboards.',
    facts: { role: 'Full-Stack', timeline: '2024', stack: 'Vue · D3', team: '5 people' },
    hasLive: false,
  },
  {
    slug: 'studio-kora',
    num: '04',
    title: 'Studio Kora',
    desc: 'An award-leaning agency site with WebGL transitions and a buttery, scroll-driven narrative.',
    tags: ['Three.js', 'GSAP', 'Astro'],
    caseMeta: ['Agency', 'WebGL', '2023'],
    sub: 'An award-leaning agency site with WebGL transitions and a buttery, scroll-driven narrative.',
    facts: { role: 'Creative Dev', timeline: '2023', stack: 'Astro · Three.js', team: '2 people' },
    hasLive: true,
  },
  {
    slug: 'mealjoy',
    num: '05',
    delay: '1',
    title: 'Mealjoy',
    desc: 'A food-delivery PWA with offline carts, live order tracking and a sub-second perceived load.',
    tags: ['React', 'Supabase', 'PWA'],
    caseMeta: ['Mobile', 'PWA', '2023'],
    sub: 'A food-delivery PWA with offline carts, live order tracking and a sub-second perceived load.',
    facts: { role: 'Full-Stack', timeline: '2023', stack: 'React · Supabase', team: '3 people' },
    hasLive: true,
  },
  {
    slug: 'opendocs',
    num: '06 / Open source',
    big: true,
    title: 'OpenDocs',
    desc: 'An open-source docs engine — MDX, instant search and edge-rendered pages. 2.1k stars and counting.',
    tags: ['TypeScript', 'Remark', 'Cloudflare', 'Open source'],
    caseMeta: ['Open source', 'Docs engine', '2022'],
    sub: 'An open-source docs engine — MDX, instant search and edge-rendered pages. 2.1k stars and counting.',
    facts: { role: 'Maintainer', timeline: '2022 — now', stack: 'TS · Cloudflare', team: 'OSS' },
    hasLive: true,
  },
];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const nextProject = (slug: string): Project => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
