import Link from 'next/link';

type NavLink = { id: string; label: string };

const DEFAULT_LINKS: NavLink[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Footer = ({
  locale,
  tagline = "Let's make the web a little better.",
  copyright = '© 2026 Cir-Giovanni Idoh — Built with care.',
  email = 'hello@cgidoh.dev',
  github = 'https://github.com',
  linkedin = 'https://linkedin.com',
  cvHref,
  cvLabel = 'Download CV',
  links = DEFAULT_LINKS,
  navHeading = 'Navigate',
  elsewhereHeading = 'Elsewhere',
}: {
  locale: string;
  tagline?: string;
  copyright?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  cvHref?: string;
  cvLabel?: string;
  links?: NavLink[];
  navHeading?: string;
  elsewhereHeading?: string;
}) => {
  const cv = cvHref ?? `/${locale}/cv`;
  const hrefFor = (target: string) =>
    target.startsWith('/') ? `/${locale}${target}` : `/${locale}#${target}`;

  return (
    <footer className="footer wrap">
      <div className="footer__grid">
        <div>
          <p className="footer__big">{tagline}</p>
        </div>
        <div className="footer__col">
          <h5>{navHeading}</h5>
          {links.map((l) => (
            <Link key={l.id} href={hrefFor(l.id)}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="footer__col">
          <h5>{elsewhereHeading}</h5>
          <a href={github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href={`mailto:${email}`}>Email</a>
          {cv.startsWith('http') ? (
            <a href={cv} target="_blank" rel="noopener">
              {cvLabel}
            </a>
          ) : (
            <Link href={cv}>{cvLabel}</Link>
          )}
        </div>
      </div>
      <div className="footer__bar">
        <small>{copyright}</small>
        <small>Space Grotesk · IBM Plex Sans</small>
      </div>
    </footer>
  );
};

export default Footer;
