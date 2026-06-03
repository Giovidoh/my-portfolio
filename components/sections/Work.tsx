import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowOut, GithubMark, LiveIcon } from '@/components/ui/icons';

type Project = {
  slug: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  big?: boolean;
  delay?: '1' | '2';
};

const PROJECTS: Project[] = [
  {
    slug: 'lumina',
    num: '01 / Featured',
    big: true,
    title: 'Lumina',
    desc: 'A component platform & design-system manager — versioned tokens, live docs, and one-click theming across products.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'tRPC'],
  },
  {
    slug: 'atlas-bank',
    num: '02',
    title: 'Atlas Bank',
    desc: 'A mobile-first banking dashboard — payments, budgets and instant transfers with delightful micro-interactions.',
    tags: ['Next.js', 'tRPC', 'Stripe'],
  },
  {
    slug: 'verdant',
    num: '03',
    delay: '1',
    title: 'Verdant',
    desc: 'A carbon-tracking analytics suite turning messy supplier data into clear, decision-ready dashboards.',
    tags: ['Vue', 'D3', 'Node'],
  },
  {
    slug: 'studio-kora',
    num: '04',
    title: 'Studio Kora',
    desc: 'An award-leaning agency site with WebGL transitions and a buttery, scroll-driven narrative.',
    tags: ['Three.js', 'GSAP', 'Astro'],
  },
  {
    slug: 'mealjoy',
    num: '05',
    delay: '1',
    title: 'Mealjoy',
    desc: 'A food-delivery PWA with offline carts, live order tracking and a sub-second perceived load.',
    tags: ['React', 'Supabase', 'PWA'],
  },
  {
    slug: 'opendocs',
    num: '06 / Open source',
    big: true,
    title: 'OpenDocs',
    desc: 'An open-source docs engine — MDX, instant search and edge-rendered pages. 2.1k stars and counting.',
    tags: ['TypeScript', 'Remark', 'Cloudflare', 'Open source'],
  },
];

const Work = () => (
  <section className="section wrap" id="work">
    <div className="section-head reveal">
      <div>
        <span className="eyebrow">Selected work</span>
        <h2 style={{ marginTop: 'var(--s-4)' }}>Things I&apos;ve designed &amp; built</h2>
      </div>
      <ButtonLink variant="ghost" size="sm" href="#contact">
        Got a project? Let&apos;s talk
      </ButtonLink>
    </div>
    <div className="proj__grid">
      {PROJECTS.map((p) => (
        <article
          key={p.slug}
          className={`card reveal${p.big ? ' card--big' : ''}`}
          data-d={p.delay}
        >
          <Link href={`/projects/${p.slug}`} className="card__cover" aria-label={`Open ${p.title} case study`}>
            <div className="ph">
              <span className="ph__label">{p.big ? 'project cover — 21:8' : 'project cover'}</span>
            </div>
            <span className="card__num">{p.num}</span>
            <span className="card__open">
              <ArrowOut />
            </span>
          </Link>
          <div className="card__body">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="card__tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="card__links">
            <a href="https://github.com" target="_blank" rel="noopener">
              <GithubMark />
              Code
            </a>
            <Link href={`/projects/${p.slug}`}>
              <LiveIcon />
              {p.big ? 'Live demo' : 'Live'}
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Work;
