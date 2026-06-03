'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight } from '@/components/ui/icons';
import CustomSelect from '@/components/ui/CustomSelect';
import { sendContact } from '@/app/actions/contact';

const SUBJECTS = [
  { value: 'role', label: 'A full-time role' },
  { value: 'freelance', label: 'A freelance project' },
  { value: 'collab', label: 'A collaboration' },
  { value: 'hello', label: 'Just saying hi' },
];

type Status = 'idle' | 'busy' | 'success' | 'error';
type Invalid = { name?: boolean; email?: boolean; message?: boolean };

const AlertSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16h.01" />
  </svg>
);

const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [invalid, setInvalid] = useState<Invalid>({});
  const [errorKind, setErrorKind] = useState<'invalid' | 'config' | 'send' | null>(null);

  const validate = (fd: FormData): boolean => {
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const inv: Invalid = { name: !name, email: !emailOk, message: message.length < 10 };
    setInvalid(inv);
    return !inv.name && !inv.email && !inv.message;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!validate(fd)) {
      setErrorKind('invalid');
      setStatus('error');
      form.querySelector<HTMLElement>('.field.invalid input, .field.invalid textarea')?.focus();
      return;
    }
    setStatus('busy');
    const res = await sendContact({
      name: String(fd.get('name')),
      email: String(fd.get('email')),
      subject: String(fd.get('subject') ?? 'hello'),
      message: String(fd.get('message')),
    });
    if (res.ok) {
      setStatus('success');
      setInvalid({});
      form.reset();
    } else {
      setErrorKind(res.error);
      setStatus('error');
    }
  };

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <div className={`form-banner success${status === 'success' ? ' show' : ''}`} role="status">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1f9d3d"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
        <div>
          <strong>Message sent.</strong> Thanks for reaching out — I&apos;ll reply within a day.
        </div>
      </div>
      <div className={`form-banner error${status === 'error' ? ' show' : ''}`} role="alert">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e5484d"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5M12 16h.01" />
        </svg>
        <div>
          {errorKind === 'invalid' && (
            <>
              <strong>Please fix the fields below</strong> and try again.
            </>
          )}
          {errorKind === 'config' && (
            <>
              <strong>The form isn&apos;t configured yet.</strong> Email me directly at
              hello@cgidoh.dev.
            </>
          )}
          {errorKind === 'send' && (
            <>
              <strong>Something went wrong sending your message.</strong> Please try again or email
              me directly.
            </>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className={`field${invalid.name ? ' invalid' : ''}`}>
          <label htmlFor="name">
            Name <span className="req">required</span>
          </label>
          <input type="text" id="name" name="name" placeholder="Ada Lovelace" autoComplete="name" />
          <span className="err">
            <AlertSvg />
            Please enter your name.
          </span>
        </div>
        <div className={`field${invalid.email ? ' invalid' : ''}`}>
          <label htmlFor="email">
            Email <span className="req">required</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@company.com"
            autoComplete="email"
          />
          <span className="err">
            <AlertSvg />
            Enter a valid email address.
          </span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="subject">Subject</label>
        <CustomSelect name="subject" options={SUBJECTS} />
      </div>

      <div className={`field${invalid.message ? ' invalid' : ''}`}>
        <label htmlFor="message">
          Message <span className="req">required</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me a little about what you have in mind…"
        />
        <span className="err">
          <AlertSvg />
          Please add at least a few words (10+ characters).
        </span>
      </div>

      <button className="btn btn-primary btn-block" type="submit" aria-busy={status === 'busy'}>
        <span>{status === 'busy' ? 'Sending…' : 'Send message'}</span>
        {status === 'busy' ? <span className="spinner" /> : <ArrowRight className="arr" />}
      </button>
    </form>
  );
};

export default ContactForm;
