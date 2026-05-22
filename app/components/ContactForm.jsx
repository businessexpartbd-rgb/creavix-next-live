'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { SITE } from '../../data/site-data';

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

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const service = data.get('service')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';

    // Compose a WhatsApp message — most reliable contact path for this brand
    const text = `Hi Creavixit team,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(
      email,
    )}%0AService: ${encodeURIComponent(service)}%0A%0A${encodeURIComponent(message)}`;
    const url = `${SITE.whatsappLink}?text=${text}`;

    // Open WhatsApp with prefilled message
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
      <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
        Tell us about your project
      </h2>
      <p className="mt-2 text-sm leading-7 text-zinc-400">
        Share a few details. Submitting opens WhatsApp with your message pre-filled — the fastest
        path to a real human reply.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" placeholder="Hannan Khan" required />
        <Field name="email" label="Email" type="email" placeholder="you@brand.com" required />
      </div>

      <div className="mt-5">
        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
          Service
        </label>
        <select
          name="service"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none transition focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
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
        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
          Project brief
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your product, audience, goal and timeline."
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none transition focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">
          <Send size={16} />
          Send via WhatsApp
        </button>
        <a href={`mailto:${SITE.email1}`} className="btn-secondary">
          <MessageCircle size={16} />
          Or email us
        </a>
      </div>

      {submitted ? (
        <p className="mt-5 rounded-xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-sm text-gold-400">
          WhatsApp opened in a new tab with your message. If it didn&apos;t, please tap the button above.
        </p>
      ) : null}
    </form>
  );
}

function Field({ name, label, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
      />
    </div>
  );
}
