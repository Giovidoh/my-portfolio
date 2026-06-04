import Link from 'next/link';
import type { Metadata } from 'next';
import ThemeToggle from '@/components/theme/ThemeToggle';
import PrintButton from '@/components/cv/PrintButton';

export const metadata: Metadata = {
  title: 'CV · Cir-Giovanni IDOH',
  robots: { index: false },
};

const css = `
.cv { max-width:820px; margin:0 auto; padding:clamp(32px,6vw,72px) var(--gutter) 80px; }
.cv__head { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; flex-wrap:wrap; padding-bottom:var(--s-5); border-bottom:2px solid var(--ink); }
.cv__head h1 { font-size:clamp(36px,6vw,58px); font-weight:700; letter-spacing:-.03em; }
.cv__head .role { font-family:var(--font-mono); color:var(--muted); margin-top:6px; }
.cv__contact { font-family:var(--font-mono); font-size:13px; color:var(--ink-2); text-align:right; display:grid; gap:4px; }
.cv section { padding-block:var(--s-6); border-bottom:1px solid var(--line); }
.cv h2 { font-family:var(--font-mono); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent-ink); background:var(--accent); width:fit-content; padding:3px 9px; border-radius:5px; margin-bottom:var(--s-5); }
.cv p { color:var(--ink-2); max-width:64ch; }
.cv__job { display:grid; grid-template-columns:150px 1fr; gap:24px; padding-block:14px; }
.cv__job .when { font-family:var(--font-mono); font-size:13px; color:var(--muted); }
.cv__job h3 { font-size:19px; }
.cv__job .co { color:var(--accent-ink); }
.cv__job p { font-size:15px; margin-top:6px; }
.cv__skills { display:flex; gap:8px; flex-wrap:wrap; }
@media print { .noprint { display:none !important; } body { background:#fff; } .cv { padding-top:24px; } }
@media (max-width:600px){ .cv__job { grid-template-columns:1fr; gap:4px; } }
`;

export default async function CvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav className="nav scrolled noprint" aria-label="Primary">
        <div className="nav__inner">
          <Link className="logo" href={`/${locale}`} aria-label="Home">
            <span className="logo__mark">CG</span>
            <span>
              IDOH<span className="accent-dot">.</span>
            </span>
          </Link>
          <div className="nav__tools">
            <ThemeToggle />
            <PrintButton />
            <Link className="btn btn-ghost btn-sm" href={`/${locale}`}>
              Back
            </Link>
          </div>
        </div>
      </nav>
      <div className="subnav-pad noprint" />

      <main className="cv">
        <header className="cv__head">
          <div>
            <h1>Cir-Giovanni Idoh</h1>
            <div className="role">
              Full-Stack Web Developer · React · Next.js · Node · TypeScript
            </div>
          </div>
          <div className="cv__contact">
            <span>hello@cgidoh.dev</span>
            <span>github.com/cgidoh</span>
            <span>Paris, France</span>
          </div>
        </header>

        <section>
          <h2>Profile</h2>
          <p>
            Full-stack developer with 6+ years building fast, accessible web products end-to-end —
            from database schema to the last pixel. Equally comfortable owning architecture and
            obsessing over interface craft. Looking for a full-stack role on a small, ambitious team
            that ships often.
          </p>
        </section>

        <section>
          <h2>Experience</h2>
          <div className="cv__job">
            <div className="when">
              2023 — Present
              <br />
              Paris
            </div>
            <div>
              <h3>
                Senior Full-Stack Developer · <span className="co">Northwind Studio</span>
              </h3>
              <p>
                Lead developer on a multi-tenant SaaS platform. Rebuilt the design system, cut page
                load by 40%, mentored two juniors.
              </p>
            </div>
          </div>
          <div className="cv__job">
            <div className="when">
              2021 — 2023
              <br />
              Lyon
            </div>
            <div>
              <h3>
                Full-Stack Developer · <span className="co">Atelier Onze</span>
              </h3>
              <p>
                Shipped client web apps end-to-end in a small agency — often the only engineer in
                the room.
              </p>
            </div>
          </div>
          <div className="cv__job">
            <div className="when">
              2020 — 2021
              <br />
              Remote
            </div>
            <div>
              <h3>Freelance Web Developer</h3>
              <p>
                Marketing sites and small tools for founders and creators. Learned to scope, price
                and ship under real constraints.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Skills</h2>
          <div className="cv__skills">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Node.js',
              'PostgreSQL',
              'Prisma',
              'GraphQL',
              'Tailwind',
              'Docker',
              'Vercel',
              'Figma',
              'Vitest',
            ].map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section style={{ border: 'none' }}>
          <h2>Education &amp; languages</h2>
          <p>
            <strong>B.Sc. Computer Science</strong> — Université de Paris, 2019. &nbsp;·&nbsp;
            French (native), English (fluent).
          </p>
        </section>
      </main>
    </>
  );
}
