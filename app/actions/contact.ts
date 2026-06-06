'use server';

import { Resend } from 'resend';

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: 'invalid' | 'config' | 'send' };

const SUBJECT_LABELS: Record<string, string> = {
  role: 'A job opportunity',
  freelance: 'A freelance project',
  collaboration: 'A collaboration',
  other: 'Something else',
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  const name = (input.name ?? '').trim();
  const email = (input.email ?? '').trim();
  const message = (input.message ?? '').trim();
  const subjectKey = (input.subject ?? 'hello').trim();

  // Server-side validation (never trust the client).
  if (!name || !isEmail(email) || message.length < 10) {
    return { ok: false, error: 'invalid' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.');
    return { ok: false, error: 'config' };
  }

  const label = SUBJECT_LABELS[subjectKey] ?? subjectKey;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio — ${label} (from ${name})`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${label}\n\n${message}`,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return { ok: false, error: 'send' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[contact] Resend exception:', err);
    return { ok: false, error: 'send' };
  }
}
