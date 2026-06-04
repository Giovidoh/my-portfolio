import Link from 'next/link';

const Footer = ({ locale }: { locale: string }) => (
  <footer className="footer wrap">
    <div className="footer__grid">
      <div>
        <p className="footer__big">Let&apos;s make the web a little better.</p>
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
        <a href="https://github.com" target="_blank" rel="noopener">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a href="mailto:hello@cgidoh.dev">Email</a>
        <Link href={`/${locale}/cv`}>Download CV</Link>
      </div>
    </div>
    <div className="footer__bar">
      <small>© 2026 Cir-Giovanni Idoh — Built with care.</small>
      <small>Space Grotesk · IBM Plex Sans</small>
    </div>
  </footer>
);

export default Footer;
