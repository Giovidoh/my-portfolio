import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowRight } from '@/components/ui/icons';

const ContactCta = ({ locale }: { locale: string }) => (
  <section className="section wrap" id="contact">
    <div className="cta-band reveal">
      <div className="glow" />
      <span className="eyebrow" style={{ color: 'var(--accent)', justifyContent: 'center' }}>
        Contact
      </span>
      <h2 style={{ marginTop: 'var(--s-4)' }}>
        Let&apos;s build something <em>worth shipping.</em>
      </h2>
      <p>
        Open to full-stack roles and select freelance work. The fastest way to reach me is the form
        — I reply within a day.
      </p>
      <div
        className="hero__cta"
        style={{ justifyContent: 'center', animation: 'none', opacity: 1 }}
      >
        <ButtonLink variant="primary" href={`/${locale}/contact`}>
          Get in touch
          <ArrowRight className="arr" />
        </ButtonLink>
        <a
          className="btn btn-ghost"
          style={{
            background: 'transparent',
            color: 'var(--cta-fg)',
            borderColor: 'color-mix(in srgb, var(--cta-fg) 38%, transparent)',
          }}
          href="mailto:hello@cgidoh.dev"
        >
          hello@cgidoh.dev
        </a>
      </div>
    </div>
  </section>
);

export default ContactCta;
