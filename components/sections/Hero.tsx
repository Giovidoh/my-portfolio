import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowRight } from '@/components/ui/icons';

const MARQUEE = [
  'Frontend',
  'Backend',
  'UI Engineering',
  'Accessibility',
  'Performance',
  'Design Systems',
];

const Hero = ({ locale }: { locale: string }) => (
  <header className="hero wrap">
    <div className="hero__grid">
      <div className="hero__intro">
        <span className="hero__status">
          <span className="dot" />
          Open to full-stack roles — 2026
        </span>
        <h1>
          <span className="line">
            <span>Cir-Giovanni</span>
          </span>
          <span className="line">
            <span>
              I<em>D</em>OH
            </span>
          </span>
        </h1>
        <p className="hero__role">
          <b>Full-Stack Web Developer</b> — React · Next.js · Node · TypeScript
        </p>
        <p className="hero__lede">
          I design and build fast, accessible web products end-to-end — from the database to the
          last pixel. Equal parts engineer and craftsman.
        </p>
        <div className="hero__cta">
          <ButtonLink variant="primary" href={`/${locale}/contact`}>
            Get in touch
            <ArrowRight className="arr" />
          </ButtonLink>
          <ButtonLink variant="ghost" href="#work">
            View work
          </ButtonLink>
        </div>
      </div>
      <div className="hero__photo">
        <div className="ph">
          <span className="ph__label">portrait — hero</span>
        </div>
        <div className="yblock" />
        <div className="badge">6+ yrs shipping</div>
      </div>
    </div>
    <div className="hero__marquee" aria-hidden="true">
      <div className="track">
        {[...MARQUEE, ...MARQUEE].map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </div>
  </header>
);

export default Hero;
