import Link from 'next/link';

const Footer = ({
  locale,
  tagline = "Let's make the web a little better.",
  copyright = '© 2026 Cir-Giovanni Idoh — Built with care.',
  email = 'hello@cgidoh.dev',
  github = 'https://github.com',
  linkedin = 'https://linkedin.com',
  cvHref,
  cvLabel = 'Download CV',
}: {
  locale: string;
  tagline?: string;
  copyright?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  cvHref?: string;
  cvLabel?: string;
}) => {
  const cv = cvHref ?? `/${locale}/cv`;

  return (
    <footer className="footer wrap">
      <div className="footer__grid">
        <div>
          <p className="footer__big">{tagline}</p>
        </div>
        <div className="footer__col">
          <h5>Navigate</h5>
          <Link href={`/${locale}#work`}>Work</Link>
          <Link href={`/${locale}#about`}>About</Link>
          <Link href={`/${locale}#experience`}>Experience</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
        </div>
        <div className="footer__col">
          <h5>Elsewhere</h5>
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
