import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { GithubMark, MailIcon, ArrowOut } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Contact · Cir-Giovanni IDOH',
  description: 'Get in touch — open to full-stack roles and select freelance work.',
};

const LinkedInMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={19} height={19}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4z" />
  </svg>
);

const BackArrow = () => (
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
);

export default function ContactPage() {
  return (
    <main className="contact">
      <div className="subnav-pad" />
      <section className="section wrap" style={{ paddingTop: 'clamp(28px,5vw,56px)' }}>
        <Link className="back-link" href="/">
          <BackArrow />
          <span>Home</span>
        </Link>
        <div className="contact__grid" style={{ marginTop: 'var(--s-5)' }}>
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h1 style={{ marginTop: 'var(--s-4)' }}>
              Let&apos;s <em>talk.</em>
            </h1>
            <p className="contact__lede">
              Whether you&apos;re hiring, have a project, or just want to say hi — drop me a line. I
              read everything and reply within a day.
            </p>
            <div className="contact__alt">
              <a className="alt-row" href="mailto:hello@cgidoh.dev">
                <span className="ic">
                  <MailIcon />
                </span>
                <span>
                  <span className="k">Email</span>
                  <br />
                  <span className="v">hello@cgidoh.dev</span>
                </span>
                <span className="arr2">
                  <ArrowOut width={18} height={18} />
                </span>
              </a>
              <a className="alt-row" href="https://linkedin.com" target="_blank" rel="noopener">
                <span className="ic">
                  <LinkedInMark />
                </span>
                <span>
                  <span className="k">LinkedIn</span>
                  <br />
                  <span className="v">/in/cgidoh</span>
                </span>
                <span className="arr2">
                  <ArrowOut width={18} height={18} />
                </span>
              </a>
              <a className="alt-row" href="https://github.com" target="_blank" rel="noopener">
                <span className="ic">
                  <GithubMark />
                </span>
                <span>
                  <span className="k">GitHub</span>
                  <br />
                  <span className="v">@cgidoh</span>
                </span>
                <span className="arr2">
                  <ArrowOut width={18} height={18} />
                </span>
              </a>
            </div>
          </div>
          <div className="reveal" data-d="1">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
