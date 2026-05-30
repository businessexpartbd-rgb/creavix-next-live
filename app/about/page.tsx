import { CheckCircle2, Quote } from 'lucide-react';
import { SITE, TRUST_PILLARS } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import TrustCard from '../components/TrustCard';
import CtaBand from '../components/CtaBand';
import TeamMember from '../components/TeamMember';

export const metadata = {
  title: 'About Creavix — Founder Hannan Khan | AI Video Studio Bangladesh Since 2014',
  description:
    'Creavix IT Solution — Founded by Hannan Khan in Savar, Dhaka. 10+ years of AI video production & storytelling. 4,300+ projects. হানান খান-এর নেতৃত্বে বাংলাদেশের প্রিমিয়াম এআই ভিডিও স্টুডিও।',
  alternates: { canonical: '/about' },
  openGraph: {
    title: "About Creavix — Founded by Hannan Khan | AI Video Studio Since 2014",
    description:
      'Founded 2014 by Hannan Khan in Savar, Dhaka. Creavix — 4,300+ projects. Cinematic AI video production with founder-led direction. Production team led by Sabbir Khan.',
    url: 'https://www.creavixit.com/about',
    images: [
      {
        url: '/share-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Creavix — AI Video Marketing Agency Bangladesh',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    title: 'About Creavix — Founded by Hannan Khan | AI Video Studio Since 2014',
    description:
      "Founded 2014 by Hannan Khan in Savar, Dhaka. Bangladesh's premier AI video studio with 10+ years experience.",
    images: ['/share-card.jpg'],
  },
};

const TOUCHPOINTS_BN = [
  'প্রতিটি ব্রিফে ফাউন্ডার-লেড সরাসরি ক্রিয়েটিভ ওভারসাইট।',
  'বাংলা-ইংরেজি বাইলিঙ্গুয়াল কমিউনিকেশন ও প্রিমিয়াম প্রেজেন্টেশন।',
  'সাভার, ঢাকার বাস্তব স্টুডিও — WhatsApp, ইমেইল ও সরাসরি অ্যাক্সেস।',
  '১০+ বছরের অভিজ্ঞতা — প্রোডাক্ট, ফিনান্স, কর্পোরেট ও শর্ট-ফর্ম।',
];

const STATS = [
  { value: SITE.servingSince, label_en: 'Serving since', label_bn: 'কার্যক্রমে' },
  { value: '10+', label_en: 'Years', label_bn: 'বছর' },
  { value: '4,300+', label_en: 'Projects', label_bn: 'প্রজেক্ট' },
  { value: 'Savar', label_en: 'Studio', label_bn: 'স্টুডিও' },
];

export default function AboutPage() {
  const mapsSrc = `https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=14&output=embed`;

  return (
    <>
      <HeroSection theme="about" watermark="ABOUT">
        <Reveal>
          <span className="eyebrow">About Creavix · আমাদের গল্প</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            Storytelling, performance & <span className="accent">AI production</span> together.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
            Creavix বাংলাদেশের একটি ফোকাসড AI ভিডিও মার্কেটিং স্টুডিও। সিনেম্যাটিক ডিরেকশন ও আধুনিক
            AI ওয়ার্কফ্লো একসাথে — তাই ক্যাম্পেইন দ্রুত গতি পায় ও আত্মবিশ্বাসী লাগে।
          </p>
        </Reveal>
      </HeroSection>

      {/* Founder section */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand/30 to-transparent blur-2xl" />
              <div className="card-3d relative p-8 sm:p-10">
                <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-deep font-display text-4xl text-white">
                  HK
                </div>
                <h3 className="mt-6 font-display text-3xl uppercase tracking-[0.04em] text-white">
                  {SITE.founder.name}
                </h3>
                <p className="mt-1 text-sm text-brand">{SITE.founder.role_en}</p>
                <p className="font-bn text-sm text-ash-400">{SITE.founder.role_bn}</p>
                <p className="mt-5 font-bn text-sm leading-7 text-ash-200">
                  Hannan সরাসরি প্রতিটি ব্রিফের ক্রিয়েটিভ ডিরেকশন করে — প্রথম মেসেজ থেকে ফাইনাল
                  এক্সপোর্ট পর্যন্ত। স্টোরিটেলিং, বাইলিঙ্গুয়াল প্রেজেন্টেশন ও ব্র্যান্ড-সেফ আউটপুটের
                  স্ট্যান্ডার্ড এখান থেকেই শুরু।
                </p>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Quote size={16} className="mt-1 flex-none text-brand" />
                  <p className="font-bn text-sm leading-7 text-ash-200">
                    &ldquo;ক্লায়েন্ট শুধু ভিডিও কেনে না — তারা চয়েস করে কে ব্রিফের কাছাকাছি থাকবে
                    আর সময়মতো রেসপন্স দেবে।&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">Founder-led direction · ফাউন্ডার-লেড</span>
              <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl">
                Closer creative ownership behind <span className="accent">every delivery.</span>
              </h2>
              <p className="mt-5 font-bn text-sm leading-7 text-ash-200">
                Creavix একটি ফাউন্ডার-লেড স্টুডিও। তাই ব্রিফ, রিভিশন ও ফাইনাল পলিশ — সবই কোর
                ডিসিশন-মেকারের কাছাকাছি থাকে।
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {TOUCHPOINTS_BN.map((t, i) => (
                <Reveal key={t} delay={i * 60}>
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-1 flex-none text-brand" />
                    <span className="font-bn text-sm leading-7 text-ash-200">{t}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={String(s.label_en)} className="rounded-card border border-white/10 bg-white/5 p-4">
                    <div className="font-display text-3xl uppercase tracking-wide text-white">
                      <span className="accent">{s.value}</span>
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-ash-300">
                      {s.label_en}
                    </div>
                    <div className="mt-1 font-bn text-[11px] text-ash-400">{s.label_bn}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-x py-24 sm:py-28">
        <Reveal>
          <span className="eyebrow">Leadership · নেতৃত্ব</span>
          <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl">
            Meet the <span className="accent">creative leadership</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal delay={80}>
            <TeamMember
              name="Hannan Khan"
              title_en="Founder & Creative Director"
              title_bn="প্রতিষ্ঠাতা ও ক্রিয়েটিভ ডিরেক্টর"
              description_bn="Hannan সরাসরি প্রতিটি প্রজেক্টের ক্রিয়েটিভ ডিরেকশন করে। ২০১৪ সাল থেকে Creavix নেতৃত্ব দিচ্ছে — ৪,৩০০+ ব্র্যান্ডের সাথে কাজ করেছে। স্টোরিটেলিং, সিনেম্যাটিক ভিজ্যুয়াল ও বাইলিঙ্গুয়াল প্রেজেন্টেশনে তার দক্ষতা অতুলনীয়। ফাউন্ডার-লেড ডিরেকশনের মাধ্যমে তিনি নিশ্চিত করেন প্রতিটি আউটপুট প্রিমিয়াম কোয়ালিটিতে।"
              description_en="Creative director overseeing every project from concept to final delivery. Founded Creavix in 2014 — 4,300+ brand campaigns delivered. Specialized in cinematic storytelling, AI-driven production, and bilingual campaign strategy."
              image="/images/hannan-khan.webp"
              imageAlt="Hannan Khan — Founder & Creative Director at Creavix"
              facebookUrl="https://web.facebook.com/HannanKhanDesigner/"
              linkedinUrl="https://www.linkedin.com/in/creavix-it-solution"
              delay={0}
            />
          </Reveal>

          <Reveal delay={160}>
            <TeamMember
              name="Sabbir Khan"
              title_en="Production Manager"
              title_bn="প্রোডাকশন ম্যানেজার"
              description_bn="Sabbir ৫+ বছরের অভিজ্ঞতা নিয়ে Creavix-এ প্রোডাকশন ম্যানেজমেন্ট করছে। ভিডিও প্রোডাকশনের সম্পূর্ণ সাইকেল — ব্রিফ ডেভেলপমেন্ট, শ্যুট প্ল্যানিং, পোস্ট-প্রোডাকশন ও কোয়ালিটি অ্যাশিউরেন্স পরিচালনা করে। তার দক্ষতা নিশ্চিত করে দ্রুত ডেলিভারি এবং প্রিমিয়াম আউটপুট কোয়ালিটি সবসময় মেইনটেইন থাকে।"
              description_en="Production Manager with 5+ years of experience managing full-cycle video production. Handles project planning, production scheduling, post-production coordination, and quality assurance. Ensures fast delivery timelines and consistent premium output quality."
              image="/images/sabbir-khan.webp"
              imageAlt="Sabbir Khan — Production Manager at Creavix"
              facebookUrl="https://web.facebook.com/sabbirkhanmotivation"
              linkedinUrl="https://www.linkedin.com/in/creavix-it-solution"
              delay={80}
            />
          </Reveal>
        </div>
      </section>

      {/* Studio Map */}
      <section className="border-y border-white/10 bg-ink-800/60 py-20 sm:py-24">
        <div className="container-x">
          <SectionIntro
            eyebrow="Studio · স্টুডিও"
            title="Find us in"
            accent="Hemayetpur, Savar"
            body_bn="হেমায়েতপুর, সাভার, ঢাকা — ১৩৪০। ভিজিটের জন্য আগেই WhatsApp করে অ্যাপয়েন্টমেন্ট নিন।"
          />
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-card border border-white/10">
              <iframe
                src={mapsSrc}
                title="Creavix Studio location — Hemayetpur, Savar, Dhaka"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-ash-400">
              {SITE.address_en}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why teams stay */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Why teams stay · কেন আমাদের সাথে থাকে"
          title="Process discipline backed by"
          accent="real production experience"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_PILLARS.slice(0, 4).map((pillar, i) => (
            <Reveal key={pillar.title_en} delay={i * 60}>
              <TrustCard pillar={pillar} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
