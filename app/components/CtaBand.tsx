import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE } from '../../lib/site-data';
import Reveal from './Reveal';

export default function CtaBand() {
  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 shadow-card sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">Ready to launch · যোগাযোগ</span>
              <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl lg:text-5xl">
                Let&apos;s build a <span className="accent">cinematic AI video</span> campaign for your brand.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-ash-300">
                Tell us about your product, audience and goal. We&apos;ll respond with a clear plan,
                timeline and sample creative direction within hours.
              </p>
              <p className="mt-3 max-w-xl font-bn text-sm leading-7 text-ash-200">
                আপনার পণ্য, অডিয়েন্স ও লক্ষ্য জানালেই আমরা পরিষ্কার প্ল্যান, টাইমলাইন ও স্যাম্পল ক্রিয়েটিভ ডিরেকশন পাঠিয়ে দিব।
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-3d-primary">
                <MessageCircle size={18} />
                WhatsApp করুন
              </a>
              <Link href="/contact" className="btn-3d-secondary">
                Open contact page
                <ArrowRight size={16} />
              </Link>
              <a
                href={`mailto:${SITE.email1}`}
                className="btn-ghost justify-start sm:justify-center"
              >
                or email {SITE.email1}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
