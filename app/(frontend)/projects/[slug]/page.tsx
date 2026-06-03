import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowOut, ArrowRight, GithubMark, LiveIcon } from '@/components/ui/icons';
import { PROJECTS, getProject, nextProject } from '@/lib/projects';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — Case study · Cir-Giovanni IDOH` : 'Case study' };
}

const RAIL = [
  { id: 'problem', label: '01 — Problem' },
  { id: 'role', label: '02 — My role' },
  { id: 'solution', label: '03 — Solution' },
  { id: 'outcome', label: '04 — Outcome' },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  return (
    <main>
      <div className="subnav-pad" />

      <header className="case-hero wrap section" style={{ paddingBottom: 0 }}>
        <Link className="back-link" href="/#work">
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
          <span>All work</span>
        </Link>
        <div className="case-meta">
          {project.caseMeta.map((m) => (
            <span className="tag" key={m}>
              {m}
            </span>
          ))}
        </div>
        <h1>{project.title}</h1>
        <p className="sub">{project.sub}</p>
        <dl className="case-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.facts.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{project.facts.timeline}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.facts.stack}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{project.facts.team}</dd>
          </div>
        </dl>
        <div className="case-actions">
          <a className="btn btn-primary" href="https://github.com" target="_blank" rel="noopener">
            <GithubMark />
            View code
          </a>
          <a className="btn btn-ghost" href="#live">
            <LiveIcon />
            Live preview
          </a>
        </div>
      </header>

      {/* SIGNATURE: live preview frame */}
      <section className="section wrap" id="live">
        <div className="section-head reveal" style={{ marginBottom: 'var(--s-5)' }}>
          <div>
            <span className="eyebrow">{project.hasLive ? 'Live preview' : 'State · private'}</span>
            <h2 style={{ marginTop: 'var(--s-4)', fontSize: 'clamp(28px,3.4vw,40px)' }}>
              {project.hasLive ? 'Experience it in-page' : 'Not public — by request'}
            </h2>
          </div>
          {project.hasLive && (
            <a className="btn btn-ghost btn-sm" href="/demo" target="_blank" rel="noopener">
              Open full screen
              <ArrowOut className="arr" />
            </a>
          )}
        </div>

        {project.hasLive ? (
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
                  <span>{project.slug}.cgidoh.dev</span>
                </div>
                <a className="live-frame__open" href="/demo" target="_blank" rel="noopener">
                  Open
                  <LiveIcon />
                </a>
              </div>
              <div className="live-frame__stage">
                <div className="live-frame__hint">
                  <span className="pip" />
                  Live · interactive
                </div>
                <iframe src="/demo" title={`${project.title} live demo`} loading="lazy" />
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
                <span style={{ color: 'var(--faint)' }}>private — internal client work</span>
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
                  <h4>No public demo for this one</h4>
                  <p>
                    This was internal client work under NDA. The write-up and gallery below capture
                    the build — happy to walk through it live.
                  </p>
                  <ButtonLink variant="ghost" size="sm" href="/contact">
                    Request a walkthrough
                  </ButtonLink>
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
            {RAIL.map((r) => (
              <a href={`#${r.id}`} key={r.id}>
                {r.label}
              </a>
            ))}
          </nav>
          <div className="case-prose">
            <div className="case-block reveal" id="problem">
              <span className="eyebrow">The problem</span>
              <h2>Seven products, seven slightly different buttons.</h2>
              <p>
                The company had grown to seven web products, each maintained by a different squad.
                Brand drift was everywhere — three blues that were almost the same, four button
                heights, inconsistent focus states. Every rebrand was a multi-month, all-hands
                ordeal.
              </p>
              <p>
                Leadership wanted one source of truth that designers and engineers could both trust
                — without slowing any team down.
              </p>
            </div>
            <div className="case-block reveal" id="role">
              <span className="eyebrow">My role</span>
              <h2>Lead full-stack — from schema to docs.</h2>
              <p>I owned the platform end-to-end with a designer and a second engineer. My remit:</p>
              <ul>
                <li>Architect the token data model and versioning (Postgres + Prisma).</li>
                <li>Build the editor UI and live documentation site (Next.js, tRPC).</li>
                <li>Ship the theming engine that pushes tokens to consuming apps at build time.</li>
                <li>Define the contribution workflow so squads could add components safely.</li>
              </ul>
            </div>
            <div className="case-block reveal" id="solution">
              <span className="eyebrow">The solution</span>
              <h2>Tokens as data, docs as a product.</h2>
              <p>
                Every token, component and theme became a versioned database record with a clean
                API. The docs site renders live, interactive examples straight from that data —
                never a screenshot, never out of date.
              </p>
              <p>
                Accessibility was non-negotiable: contrast is validated automatically on every token
                change, and a component can&apos;t ship without passing focus and keyboard checks.
              </p>
            </div>
            <div className="case-block reveal" id="outcome">
              <span className="eyebrow">The outcome</span>
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
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2 style={{ marginTop: 'var(--s-4)', fontSize: 'clamp(28px,3.4vw,40px)' }}>
              A look inside
            </h2>
          </div>
        </div>
        <div className="gallery reveal" data-d="1">
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
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="wrap">
        <div className="next-proj">
          <div>
            <span className="eyebrow">Next project</span>
            <Link href={`/projects/${next.slug}`} style={{ marginTop: 10 }}>
              <span className="lab">{next.title}</span>
              <ArrowRight width={46} height={46} />
            </Link>
          </div>
          <ButtonLink variant="ghost" href="/#work">
            Back to all work
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
