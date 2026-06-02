'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { SITE } from '../../lib/site-data';

const SERVICE_OPTIONS = [
  'AI Video Ads',
  'Promotional Videos',
  'Cinematic Storytelling',
  'Product & Brand Ads',
  'Financial Video Ads',
  'Custom Project',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e: string) => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    setEmailError(ok ? '' : 'সঠিক ইমেইল দিন · Enter a valid email');
    return ok;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name')?.toString().trim() ?? '';
    const email = data.get('email')?.toString().trim() ?? '';
    const service = data.get('service')?.toString().trim() ?? '';
    const message = data.get('message')?.toString().trim() ?? '';
    if (!validateEmail(email)) return;

    const text =
      `হ্যালো Creavix team,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service: ${service}\n\n` +
      `${message}`;
    const url = `${SITE.whatsappLink}?text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-3d p-7 sm:p-9"
      aria-label="Contact form"
    >
      <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-slate-900 sm:text-3xl">
        Tell us about your project
      </h2>
      <p className="mt-1 font-bn text-sm text-slate-600">
        ফর্ম সাবমিট করলেই WhatsApp খুলবে আপনার বার্তা সহ — দ্রুত উত্তরের সবচেয়ে সহজ পথ।
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" placeholder="Hannan Khan" required />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="you@brand.com"
          required
          onBlur={(e) => validateEmail(e.target.value)}
          error={emailError}
        />
      </div>

      <div className="mt-5">
        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
          Service
        </label>
        <select
          name="service"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
        >
          <option value="" disabled>
            Choose a service
          </option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
          Project brief / প্রজেক্ট ডিটেইলস
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your product, audience, goal and timeline."
          className="mt-2 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-3d-primary">
          <Send size={16} />
          Send via WhatsApp
        </button>
        <a href={`mailto:${SITE.email1}`} className="btn-3d-secondary">
          <MessageCircle size={16} />
          Or email us
        </a>
      </div>

      {submitted ? (
        <p className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          ✓ WhatsApp opened in a new tab with your message. If it didn&apos;t open, tap the
          button again.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
  required,
  onBlur,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onBlur={onBlur}
        className="mt-2 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
      />
      {error ? <p className="mt-1 text-xs text-blue-600">{error}</p> : null}
    </div>
  );
}
