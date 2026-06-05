import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowOut, ArrowRight, GithubMark, LiveIcon } from '@/components/ui/icons';
import { PROJECTS, getProject as getPlaceholder, nextProject } from '@/lib/projects';
import { getProjects, getProjectSlugs, getSiteSettings } from '@/lib/content';
import { getDefaultLocale, makeT, pickLocale } from '@/lib/i18n';
import { imageBuilder } from '@/sanity/lib/image';

const GALLERY_TILES = ['wide', 'tall', 'half', 'half'];

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  const list = slugs.length ? slugs : PROJECTS.map((p) => p.slug);
  return list.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const title =
    projects.find((p) => p.slug?.current === slug)?.title ?? getPlaceholder(slug)?.title;
  return { title: title ? `${title} — Case study · Cir-Giovanni IDOH` : 'Case study' };
}

const paras = (text: string | undefined) =>
  (text ?? '')
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [defaultLocale, projects, settings] = await Promise.all([
    getDefaultLocale(),
    getProjects(),
    getSiteSettings(),
  ]);
  const t = makeT(locale, defaultLocale);
  const lbl = {
    allWork: t(settings?.allWork, 'All work'),
    viewCode: t(settings?.viewCode, 'View code'),
    livePreview: t(settings?.livePreview, 'Live preview'),
    openFullscreen: t(settings?.openFullscreen, 'Open full screen'),
    nextProject: t(settings?.nextProject, 'Next project'),
    backToWork: t(settings?.backToWork, 'Back to all work'),
    gallery: t(settings?.gallery, 'Gallery'),
    builtWith: t(settings?.builtWith, 'Built with'),
    requestWalkthrough: t(settings?.requestWalkthrough, 'Request a walkthrough'),
    problem: t(settings?.caseProblem, 'The problem'),
    role: t(settings?.caseRole, 'My role'),
    solution: t(settings?.caseSolution, 'The solution'),
    outcome: t(settings?.caseOutcome, 'The outcome'),
  };
  const rail = [
    { id: 'problem', label: lbl.problem },
    { id: 'role', label: lbl.role },
    { id: 'solution', label: lbl.solution },
    { id: 'outcome', label: lbl.outcome },
  ];

  const idx = projects.findIndex((p) => p.slug?.current === slug);
  const sanity = idx >= 0 ? projects[idx] : null;
  const placeholder = getPlaceholder(slug);
  if (!sanity && !placeholder) notFound();

  // Unified view model: Sanity wins, placeholder fills the gaps.
  const title = sanity?.title ?? placeholder?.title ?? slug;
  const caseMeta = sanity
    ? [
        pickLocale(sanity.badge, locale, defaultLocale),
        pickLocale(sanity.caseType, locale, defaultLocale),
        sanity.year ?? undefined,
      ].filter((x): x is string => Boolean(x))
    : (placeholder?.caseMeta ?? []);
  const sub = sanity
    ? (pickLocale(sanity.sub, locale, defaultLocale) ?? '')
    : (placeholder?.sub ?? '');
  const facts = sanity
    ? {
        role: t(sanity.facts?.role, '—'),
        timeline: t(sanity.facts?.timeline, '—'),
        stack: sanity.facts?.stack ?? '—',
        team: t(sanity.facts?.team, '—'),
      }
    : (placeholder?.facts ?? { role: '—', timeline: '—', stack: '—', team: '—' });

  const githubLink = sanity?.githubLink ?? 'https://github.com';
  const liveLink = sanity?.liveLink ?? undefined;
  const allowEmbed = sanity?.allowEmbed ?? false;

  // Live preview: embed when there is an embeddable URL, else a fallback card.
  const placeholderLive = !sanity && Boolean(placeholder?.hasLive);
  const embedUrl = allowEmbed && liveLink ? liveLink : placeholderLive ? '/demo' : null;
  const openUrl = liveLink ?? (placeholderLive ? '/demo' : null);
  const hasEmbed = Boolean(embedUrl);
  let liveHost = `${slug}.cgidoh.dev`;
  try {
    if (liveLink) liveHost = new URL(liveLink).host;
  } catch {
    // keep the placeholder host
  }

  // Case study body
  const cs = sanity?.caseStudy;
  const problem = pickLocale(cs?.problem, locale, defaultLocale);
  const role = pickLocale(cs?.role, locale, defaultLocale);
  const solution = pickLocale(cs?.solution, locale, defaultLocale);
  const outcome = pickLocale(cs?.outcome, locale, defaultLocale);
  const hasCaseStudy = Boolean(problem || role || solution || outcome);
  const metrics = (cs?.metrics ?? [])
    .map((m) => ({
      value: m.value ?? '',
      label: pickLocale(m.label, locale, defaultLocale) ?? '',
    }))
    .filter((m) => m.value || m.label);

  const galleryImages = (sanity?.gallery ?? [])
    .map((g) => ({ url: imageBuilder(g)?.width(1400).url(), alt: g.alt ?? '' }))
    .filter((g): g is { url: string; alt: string } => Boolean(g.url));

  const projectSkills = (sanity?.skills ?? []).filter((s): s is { _id: string; title: string } =>
    Boolean(s?.title),
  );

  // Next project
  const nextSanity = sanity && projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  const fallbackNext = nextProject(slug);
  const next = nextSanity
    ? { slug: nextSanity.slug?.current ?? '', title: nextSanity.title ?? '' }
    : { slug: fallbackNext.slug, title: fallbackNext.title };

  return (
    <main>
      <div className="subnav-pad" />

      <header className="case-hero wrap section" style={{ paddingBottom: 0 }}>
        <Link className="back-link" href={`/${locale}#work`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          <span>{lbl.allWork}</span>
        </Link>
        <div className="case-meta">
          {caseMeta.map((m) => (
            <span className="tag" key={m}>
              {m}
            </span>
          ))}
        </div>
        <h1>{title}</h1>
        <p className="sub">{sub}</p>
        <dl className="case-facts">
          <div>
            <dt>Role</dt>
            <dd>{facts.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{facts.timeline}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{facts.stack}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{facts.team}</dd>
          </div>
        </dl>
        {projectSkills.length > 0 && (
          <div style={{ marginTop: 'var(--s-5)' }}>
            <span className="eyebrow" style={{ display: 'inline-block' }}>
              {lbl.builtWith}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {projectSkills.map((s) => (
                <span className="tag" key={s._id}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="case-actions">
          <a className="btn btn-primary" href={githubLink} target="_blank" rel="noopener">
            <GithubMark />
            {lbl.viewCode}
          </a>
          <a className="btn btn-ghost" href="#live">
            <LiveIcon />
            {lbl.livePreview}
          </a>
        </div>
      </header>

      {/* SIGNATURE: live preview frame */}
      <section className="section wrap" id="live">
        <div className="section-head reveal" style={{ marginBottom: 'var(--s-5)' }}>
          <div>
            <span className="eyebrow">{hasEmbed ? lbl.livePreview : 'State · private'}</span>
            <h2 style={{ marginTop: 'var(--s-4)', fontSize: 'clamp(28px,3.4vw,40px)' }}>
              {hasEmbed ? 'Experience it in-page' : 'Not public — by request'}
            </h2>
          </div>
          {hasEmbed && openUrl && (
            <a className="btn btn-ghost btn-sm" href={openUrl} target="_blank" rel="noopener">
              {lbl.openFullscreen}
              <ArrowOut className="arr" />
            </a>
          )}
        </div>

        {hasEmbed ? (
          <>
            <div className="live-frame reveal" data-d="1">
              <div className="live-frame__bar">
                <div className="live-frame__dots">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="live-frame__url">
                  <svg
                    className="lock"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <span>{liveHost}</span>
                </div>
                <a
                  className="live-frame__open"
                  href={openUrl ?? '#'}
                  target="_blank"
                  rel="noopener"
                >
                  Open
                  <LiveIcon />
                </a>
              </div>
              <div className="live-frame__stage">
                <iframe src={embedUrl ?? ''} title={`${title} live demo`} loading="lazy" />
              </div>
            </div>
            <p className="form-note reveal" data-d="2" style={{ marginTop: 'var(--s-4)' }}>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span>
                The project is embedded above — scroll, hover and explore it without leaving the
                page.
              </span>
            </p>
          </>
        ) : (
          <div className="live-frame reveal" data-d="1">
            <div className="live-frame__bar">
              <div className="live-frame__dots">
                <i />
                <i />
                <i />
              </div>
              <div className="live-frame__url">
                <span style={{ color: 'var(--faint)' }}>
                  {openUrl ? 'public — embedding disabled' : 'private — internal client work'}
                </span>
              </div>
            </div>
            <div className="live-frame__stage">
              <div className="live-fallback">
                <div>
                  <span className="ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                  </span>
                  <h4>
                    {openUrl ? 'Live, but best seen full-screen' : 'No public demo for this one'}
                  </h4>
                  <p>
                    {openUrl
                      ? 'This site blocks embedding — open it in a new tab for the full experience.'
                      : 'This was internal client work under NDA. The write-up and gallery below capture the build — happy to walk through it live.'}
                  </p>
                  {openUrl ? (
                    <a
                      className="btn btn-ghost btn-sm"
                      href={openUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      <LiveIcon />
                      Open live site
                    </a>
                  ) : (
                    <ButtonLink variant="ghost" size="sm" href={`/${locale}/contact`}>
                      {lbl.requestWalkthrough}
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CASE BODY */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="case-body">
          <nav className="case-body__rail" aria-label="Case study sections">
            {rail.map((r, i) => (
              <a href={`#${r.id}`} key={r.id}>
                {String(i + 1).padStart(2, '0')} — {r.label}
              </a>
            ))}
          </nav>
          <div className="case-prose">
            {hasCaseStudy ? (
              <>
                <div className="case-block reveal" id="problem">
                  <span className="eyebrow">{lbl.problem}</span>
                  {paras(problem).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="case-block reveal" id="role">
                  <span className="eyebrow">{lbl.role}</span>
                  {paras(role).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="case-block reveal" id="solution">
                  <span className="eyebrow">{lbl.solution}</span>
                  {paras(solution).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="case-block reveal" id="outcome">
                  <span className="eyebrow">{lbl.outcome}</span>
                  {paras(outcome).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {metrics.length > 0 && (
                    <div className="metrics">
                      {metrics.map((m, i) => (
                        <div className="metric" key={i}>
                          <div className="big">
                            <em>{m.value}</em>
                          </div>
                          <div className="lbl">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="case-block reveal" id="problem">
                  <span className="eyebrow">{lbl.problem}</span>
                  <h2>Seven products, seven slightly different buttons.</h2>
                  <p>
                    The company had grown to seven web products, each maintained by a different
                    squad. Brand drift was everywhere — three blues that were almost the same, four
                    button heights, inconsistent focus states. Every rebrand was a multi-month,
                    all-hands ordeal.
                  </p>
                  <p>
                    Leadership wanted one source of truth that designers and engineers could both
                    trust — without slowing any team down.
                  </p>
                </div>
                <div className="case-block reveal" id="role">
                  <span className="eyebrow">{lbl.role}</span>
                  <h2>Lead full-stack — from schema to docs.</h2>
                  <p>
                    I owned the platform end-to-end with a designer and a second engineer. My remit:
                  </p>
                  <ul>
                    <li>Architect the token data model and versioning (Postgres + Prisma).</li>
                    <li>Build the editor UI and live documentation site (Next.js, tRPC).</li>
                    <li>
                      Ship the theming engine that pushes tokens to consuming apps at build time.
                    </li>
                    <li>Define the contribution workflow so squads could add components safely.</li>
                  </ul>
                </div>
                <div className="case-block reveal" id="solution">
                  <span className="eyebrow">{lbl.solution}</span>
                  <h2>Tokens as data, docs as a product.</h2>
                  <p>
                    Every token, component and theme became a versioned database record with a clean
                    API. The docs site renders live, interactive examples straight from that data —
                    never a screenshot, never out of date.
                  </p>
                  <p>
                    Accessibility was non-negotiable: contrast is validated automatically on every
                    token change, and a component can&apos;t ship without passing focus and keyboard
                    checks.
                  </p>
                </div>
                <div className="case-block reveal" id="outcome">
                  <span className="eyebrow">{lbl.outcome}</span>
                  <h2>One system, adopted fast.</h2>
                  <p>
                    Within two quarters, adoption crossed 90% and the next rebrand shipped in days
                    instead of months.
                  </p>
                  <div className="metrics">
                    <div className="metric">
                      <div className="big">
                        <em>94%</em>
                      </div>
                      <div className="lbl">component adoption across products</div>
                    </div>
                    <div className="metric">
                      <div className="big">
                        −40<em>%</em>
                      </div>
                      <div className="lbl">faster page loads after consolidation</div>
                    </div>
                    <div className="metric">
                      <div className="big">
                        3<em>d</em>
                      </div>
                      <div className="lbl">to ship a full rebrand, down from months</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">{lbl.gallery}</span>
            <h2 style={{ marginTop: 'var(--s-4)', fontSize: 'clamp(28px,3.4vw,40px)' }}>
              A look inside
            </h2>
          </div>
        </div>
        <div className="gallery reveal" data-d="1">
          {galleryImages.length ? (
            galleryImages.map((g, i) => (
              <div className={`ph ${GALLERY_TILES[i % GALLERY_TILES.length]}`} key={i}>
                <img
                  src={g.url}
                  alt={g.alt}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))
          ) : (
            <>
              <div className="ph wide">
                <span className="ph__label">screen — main</span>
              </div>
              <div className="ph tall">
                <span className="ph__label">mobile</span>
              </div>
              <div className="ph half">
                <span className="ph__label">detail</span>
              </div>
              <div className="ph half">
                <span className="ph__label">flow</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="wrap">
        <div className="next-proj">
          <div>
            <span className="eyebrow">{lbl.nextProject}</span>
            <Link href={`/${locale}/projects/${next.slug}`} style={{ marginTop: 10 }}>
              <span className="lab">{next.title}</span>
              <ArrowRight width={46} height={46} />
            </Link>
          </div>
          <ButtonLink variant="ghost" href={`/${locale}#work`}>
            {lbl.backToWork}
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
