import Link from 'next/link';

const Footer = () => (
  <footer className="footer wrap">
    <div className="footer__grid">
      <div>
        <p className="footer__big">Let&apos;s make the web a little better.</p>
      </div>
      <div className="footer__col">
        <h5>Navigate</h5>
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/contact">Contact</Link>
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
        <Link href="/cv">Download CV</Link>
      </div>
    </div>
    <div className="footer__bar">
      <small>© 2026 Cir-Giovanni Idoh — Built with care.</small>
      <small>Space Grotesk · IBM Plex Sans</small>
    </div>
  </footer>
);

export default Footer;
