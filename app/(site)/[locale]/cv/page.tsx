import Link from 'next/link';
import type { Metadata } from 'next';
import ThemeToggle from '@/components/theme/ThemeToggle';
import PrintButton from '@/components/cv/PrintButton';
import LanguageSwitcher from '@/components/layouts/LanguageSwitcher';
import { getDefaultLocale, getLanguages, makeT, pickLocale } from '@/lib/i18n';
import { getHome, getSiteSettings, getExperiences, getSkills } from '@/lib/content';

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

const strip = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');

const FALLBACK_JOBS = [
  {
    when: '2023 — Present · Paris',
    role: 'Senior Full-Stack Developer',
    company: 'Northwind Studio',
    desc: 'Lead developer on a multi-tenant SaaS platform. Rebuilt the design system, cut page load by 40%, mentored two juniors.',
  },
  {
    when: '2021 — 2023 · Lyon',
    role: 'Full-Stack Developer',
    company: 'Atelier Onze',
    desc: 'Shipped client web apps end-to-end in a small agency — often the only engineer in the room.',
  },
  {
    when: '2020 — 2021 · Remote',
    role: 'Freelance Web Developer',
    company: '',
    desc: 'Marketing sites and small tools for founders and creators. Learned to scope, price and ship under real constraints.',
  },
];

const FALLBACK_SKILLS = [
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
];

export default async function CvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [defaultLocale, languages, home, settings, experiences, skills] = await Promise.all([
    getDefaultLocale(),
    getLanguages(),
    getHome(),
    getSiteSettings(),
    getExperiences(),
    getSkills(),
  ]);
  const t = makeT(locale, defaultLocale);

  const name = settings?.brandName ?? 'Cir-Giovanni Idoh';
  const logoMark = settings?.logoMark ?? 'CG';
  const logoText = settings?.logoText ?? 'IDOH';
  const role = `${t(home?.hero?.roleLabel, 'Full-Stack Web Developer')} · ${
    home?.hero?.roleStack ?? 'React · Next.js · Node · TypeScript'
  }`;
  const email = settings?.email ?? 'hello@cgidoh.dev';
  const github = settings?.githubUrl ? strip(settings.githubUrl) : 'github.com/cgidoh';
  const location = t(settings?.location, 'Paris, France');
  const summary = t(
    settings?.cvSummary,
    'Full-stack developer with 6+ years building fast, accessible web products end-to-end — from database schema to the last pixel. Equally comfortable owning architecture and obsessing over interface craft. Looking for a full-stack role on a small, ambitious team that ships often.',
  );
  const education = pickLocale(settings?.cvEducation, locale, defaultLocale);

  const jobs =
    experiences && experiences.length
      ? experiences.map((e) => ({
          when: pickLocale(e.period, locale, defaultLocale) ?? '',
          role: pickLocale(e.role, locale, defaultLocale) ?? '',
          company: e.company ?? '',
          desc: pickLocale(e.description, locale, defaultLocale) ?? '',
        }))
      : FALLBACK_JOBS;

  const skillNames =
    skills && skills.length ? skills.map((s) => s.title ?? '').filter(Boolean) : FALLBACK_SKILLS;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav className="nav scrolled noprint" aria-label="Primary">
        <div className="nav__inner">
          <Link className="logo" href={`/${locale}`} aria-label="Home">
            <span className="logo__mark">{logoMark}</span>
            <span>
              {logoText}
              <span className="accent-dot">.</span>
            </span>
          </Link>
          <div className="nav__tools">
            <LanguageSwitcher languages={languages} locale={locale} />
            <ThemeToggle />
            <PrintButton label={t(settings?.cvPrint, 'Print / Save PDF')} />
            <Link className="btn btn-ghost btn-sm" href={`/${locale}`}>
              {t(settings?.cvBack, 'Back')}
            </Link>
          </div>
        </div>
      </nav>
      <div className="subnav-pad noprint" />

      <main className="cv">
        <header className="cv__head">
          <div>
            <h1>{name}</h1>
            <div className="role">{role}</div>
          </div>
          <div className="cv__contact">
            <span>{email}</span>
            <span>{github}</span>
            <span>{location}</span>
          </div>
        </header>

        <section>
          <h2>Profile</h2>
          <p>{summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {jobs.map((j, i) => (
            <div className="cv__job" key={i}>
              <div className="when">{j.when}</div>
              <div>
                <h3>
                  {j.role}
                  {j.company ? (
                    <>
                      {' · '}
                      <span className="co">{j.company}</span>
                    </>
                  ) : null}
                </h3>
                <p>{j.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          <div className="cv__skills">
            {skillNames.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section style={{ border: 'none' }}>
          <h2>Education &amp; languages</h2>
          {education ? (
            <p>{education}</p>
          ) : (
            <p>
              <strong>B.Sc. Computer Science</strong> — Université de Paris, 2019. &nbsp;·&nbsp;
              French (native), English (fluent).
            </p>
          )}
        </section>
      </main>
    </>
  );
}
