import Link from 'next/link';
import type { Metadata } from 'next';
import ThemeToggle from '@/components/theme/ThemeToggle';
import PrintButton from '@/components/cv/PrintButton';
import LanguageSwitcher from '@/components/layouts/LanguageSwitcher';
import IcgMark from '@/components/ui/IcgMark';
import { imageBuilder } from '@/sanity/lib/image';
import { getDefaultLocale, getLanguages, makeT, pickLocale } from '@/lib/i18n';
import {
  getHome,
  getSiteSettings,
  getExperiences,
  getSkills,
  getSkillCategories,
  getEducation,
  getCertifications,
} from '@/lib/content';

export const metadata: Metadata = {
  title: 'CV · Cir-Giovanni IDOH',
  robots: { index: false },
};

// Two-column résumé: a dark rail (identity, contact, skills, languages, soft
// skills) beside the narrative column (profile, experience, projects,
// education) — the layout of the PDF, rebuilt with the site's own tokens so it
// stays on brand in light, dark and print.
const css = `
.cv { max-width:980px; margin:0 auto; padding:clamp(24px,4vw,48px) var(--gutter) 80px; }
.cv__sheet { display:grid; grid-template-columns:290px 1fr; background:var(--surface); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; box-shadow:var(--shadow-md); }

.cv__rail { background:var(--cta-bg); color:var(--cta-fg); padding:var(--s-7) var(--s-6); }
.cv__rail h1 { font-size:clamp(24px,3.2vw,30px); font-weight:700; letter-spacing:-.02em; line-height:1.15; text-transform:uppercase; }
.cv__rail .role { font-family:var(--font-mono); font-size:13px; color:var(--accent); margin-top:10px; }
.cv__rail h2 { font-family:var(--font-mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); margin:var(--s-6) 0 var(--s-3); }
.cv__rail ul { list-style:none; display:grid; gap:6px; }
.cv__rail li, .cv__rail a { font-size:13px; color:rgba(246,244,236,.82); line-height:1.5; }
.cv__rail a { text-decoration:underline; text-underline-offset:2px; overflow-wrap:anywhere; }
.cv__rail a:hover { color:var(--accent); }
.cv__catname { font-size:12px; font-weight:600; color:var(--cta-fg); margin:var(--s-4) 0 6px; }
.cv__catname:first-of-type { margin-top:0; }
.cv__stack { display:flex; flex-wrap:wrap; gap:6px 12px; }
.cv__stack span { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; color:rgba(246,244,236,.86); }
.cv__stack img { width:14px; height:14px; object-fit:contain; }
.cv__stack .mask { width:14px; height:14px; background:rgba(246,244,236,.86); mask-size:contain; mask-repeat:no-repeat; mask-position:center; -webkit-mask-size:contain; -webkit-mask-repeat:no-repeat; -webkit-mask-position:center; }

.cv__main { padding:var(--s-7) var(--s-6); }
.cv__main section + section { margin-top:var(--s-6); }
.cv__main h2 { font-family:var(--font-mono); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink); padding-bottom:6px; border-bottom:2px solid var(--accent); margin-bottom:var(--s-4); }
.cv__main p { color:var(--ink-2); font-size:14px; line-height:1.6; white-space:pre-line; }
.cv__entry + .cv__entry { margin-top:var(--s-5); }
.cv__entry h3 { font-size:15px; font-weight:600; }
.cv__entry h3 .co { color:var(--accent-ink); background:var(--accent); border-radius:4px; padding:0 5px; }
.cv__entry .when { font-family:var(--font-mono); font-size:12px; color:var(--muted); margin-top:2px; }
.cv__entry ul { list-style:disc; margin:8px 0 0 18px; display:grid; gap:5px; }
.cv__entry li { font-size:13.5px; line-height:1.55; color:var(--ink-2); }
.cv__entry .meta { font-family:var(--font-mono); font-size:12px; color:var(--muted); }
.cv__entry .code { font-size:12.5px; margin-top:6px; display:inline-block; text-decoration:underline; text-underline-offset:2px; }
.cv__edu { display:grid; gap:10px; }
.cv__edu div { font-size:13.5px; color:var(--ink-2); }
.cv__edu strong { color:var(--ink); font-weight:600; }
.cv__edu .cert { text-decoration:underline; text-underline-offset:2px; }

@media (max-width:820px){ .cv__sheet { grid-template-columns:1fr; } }
@media print {
  .noprint { display:none !important; }
  .cv { padding:0; max-width:none; }
  .cv__sheet { border:none; border-radius:0; box-shadow:none; display:grid; grid-template-columns:270px 1fr; }
  .cv__rail { background:#16233d !important; color:#fff !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .cv__main { padding:24px 28px; }
  .cv__entry, .cv__edu div, section { break-inside:avoid; }
}
`;

const strip = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
/** Multiline Sanity text → bullet list. Blank lines are dropped. */
const lines = (v?: string | null): string[] =>
  (v ?? '')
    .split('\n')
    .map((l) => l.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);

const LOCAL_ICONS: Record<string, string> = { foundry: '/assets/icons/foundry.svg' };

export default async function CvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [
    defaultLocale,
    languages,
    home,
    settings,
    experiences,
    skills,
    categories,
    education,
    certifications,
  ] = await Promise.all([
    getDefaultLocale(),
    getLanguages(),
    getHome(),
    getSiteSettings(),
    getExperiences(),
    getSkills(),
    getSkillCategories(),
    getEducation(),
    getCertifications(),
  ]);
  const t = makeT(locale, defaultLocale);
  const p = (f: Parameters<typeof t>[0]) => pickLocale<string>(f, locale, defaultLocale);

  const name = settings?.brandName ?? 'Cir-Giovanni IDOH';
  const role = t(home?.hero?.roleLabel, 'Full-Stack Web Developer');

  const contact = [
    settings?.phone ? { text: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` } : null,
    settings?.email ? { text: settings.email, href: `mailto:${settings.email}` } : null,
    { text: t(settings?.location, 'Lomé, Togo'), href: null },
    settings?.githubUrl ? { text: strip(settings.githubUrl), href: settings.githubUrl } : null,
    settings?.websiteUrl ? { text: strip(settings.websiteUrl), href: settings.websiteUrl } : null,
    settings?.linkedinUrl ? { text: strip(settings.linkedinUrl), href: settings.linkedinUrl } : null,
  ].filter((c): c is { text: string; href: string | null } => Boolean(c?.text));

  // Skills grouped by category, in category order — categories with no skill
  // are dropped so the rail never shows an empty heading.
  const skillGroups = (categories ?? [])
    .map((c) => ({
      key: c.key ?? '',
      label: p(c.title) ?? c.key ?? '',
      items: (skills ?? []).filter((s) => s.category?.key === c.key),
    }))
    .filter((g) => g.items.length > 0);

  const jobs = (experiences ?? []).map((e) => ({
    id: e._id,
    role: p(e.role) ?? '',
    company: e.company ?? '',
    when: p(e.period) ?? '',
    bullets: lines(p(e.highlights)) ,
    desc: p(e.description) ?? '',
  }));

  const cvProjects = (settings?.cvProjects ?? []).map((pr) => ({
    key: pr._key,
    title: p(pr.title) ?? '',
    meta: pr.meta ?? '',
    bullets: lines(p(pr.highlights)),
    linkLabel: p(pr.linkLabel) ?? 'Code',
    linkUrl: pr.linkUrl ?? '',
  }));

  const spoken = lines(t(settings?.cvSpokenLanguages, ''));
  const soft = lines(t(settings?.cvSoftSkills, ''));
  const summary = t(settings?.cvSummary, '');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav className="nav scrolled noprint" aria-label="Primary">
        <div className="nav__inner">
          <Link className="logo" href={`/${locale}`} aria-label="ICGreborns — home">
            <IcgMark className="logo__mark" />
            <span>reborns</span>
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
        <article className="cv__sheet">
          <aside className="cv__rail">
            <h1>{name}</h1>
            <div className="role">{role}</div>

            <h2>{t(settings?.cvContactLabel, 'Contact')}</h2>
            <ul>
              {contact.map((c) => (
                <li key={c.text}>
                  {c.href ? (
                    <a href={c.href} rel="noreferrer">
                      {c.text}
                    </a>
                  ) : (
                    c.text
                  )}
                </li>
              ))}
            </ul>

            {skillGroups.length > 0 && (
              <>
                <h2>{t(settings?.cvSkillsLabel, 'Skills')}</h2>
                {skillGroups.map((g) => (
                  <div key={g.key}>
                    <div className="cv__catname">{g.label}</div>
                    <div className="cv__stack">
                      {g.items.map((s) => {
                        const url =
                          imageBuilder(s.iconDark)?.width(48).height(48).fit('max').url() ??
                          imageBuilder(s.icon)?.width(48).height(48).fit('max').url();
                        const local = s.simpleIconSlug ? LOCAL_ICONS[s.simpleIconSlug] : undefined;
                        return (
                          <span key={s._id}>
                            {url ? (
                              <img src={url} alt="" />
                            ) : local ? (
                              <span
                                className="mask"
                                aria-hidden="true"
                                style={{ maskImage: `url(${local})`, WebkitMaskImage: `url(${local})` }}
                              />
                            ) : s.simpleIconSlug ? (
                              <img
                                src={`https://cdn.simpleicons.org/${s.simpleIconSlug}/f6f4ec`}
                                alt=""
                              />
                            ) : null}
                            {s.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}

            {spoken.length > 0 && (
              <>
                <h2>{t(settings?.cvSpokenLanguagesLabel, 'Languages')}</h2>
                <ul>
                  {spoken.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </>
            )}

            {soft.length > 0 && (
              <>
                <h2>{t(settings?.cvSoftSkillsLabel, 'Soft skills')}</h2>
                <ul>
                  {soft.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </>
            )}
          </aside>

          <div className="cv__main">
            {summary && (
              <section>
                <h2>{t(settings?.cvProfileLabel, 'Profile')}</h2>
                <p>{summary}</p>
              </section>
            )}

            {jobs.length > 0 && (
              <section>
                <h2>{t(settings?.cvExperienceLabel, 'Experience')}</h2>
                {jobs.map((j) => (
                  <div className="cv__entry" key={j.id}>
                    <h3>
                      {j.role}
                      {j.company ? (
                        <>
                          {' — '}
                          <span className="co">{j.company}</span>
                        </>
                      ) : null}
                    </h3>
                    {j.when && <div className="when">{j.when}</div>}
                    {j.bullets.length > 0 ? (
                      <ul>
                        {j.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      j.desc && <p style={{ marginTop: 8 }}>{j.desc}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {cvProjects.length > 0 && (
              <section>
                <h2>{t(settings?.cvProjectsLabel, 'Recent personal project')}</h2>
                {cvProjects.map((pr) => (
                  <div className="cv__entry" key={pr.key}>
                    <h3>
                      {pr.title}
                      {pr.meta ? (
                        <>
                          {'  '}
                          <span className="meta">{pr.meta}</span>
                        </>
                      ) : null}
                    </h3>
                    {pr.bullets.length > 0 && (
                      <ul>
                        {pr.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {pr.linkUrl && (
                      <a className="code" href={pr.linkUrl} target="_blank" rel="noreferrer">
                        {pr.linkLabel} : {strip(pr.linkUrl)}
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}

            {(education ?? []).length > 0 && (
              <section>
                <h2>{t(settings?.cvEducationLabel, 'Education')}</h2>
                <div className="cv__edu">
                  {(education ?? []).map((e) => (
                    <div key={e._id}>
                      <strong>{p(e.degree)}</strong>
                      {p(e.school) ? ` — ${p(e.school)}` : ''}
                      {e.period ? `  ·  ${e.period}` : ''}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(certifications ?? []).length > 0 && (
              <section>
                <h2>{t(settings?.cvCertificationsLabel, 'Courses & certifications')}</h2>
                <div className="cv__edu">
                  {(certifications ?? []).map((c) => (
                    <div key={c._id}>
                      <strong>
                        {c.url ? (
                          <a className="cert" href={c.url} target="_blank" rel="noreferrer">
                            {c.title}
                          </a>
                        ) : (
                          c.title
                        )}
                      </strong>
                      {c.issuer ? ` — ${c.issuer}` : ''}
                      {p(c.issued) ? `  ·  ${p(c.issued)}` : ''}
                      {c.credentialId ? `  ·  ${c.credentialId}` : ''}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
