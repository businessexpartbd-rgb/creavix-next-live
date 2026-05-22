import { REVIEWS_SEED } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import ReviewSection from '../components/ReviewSection';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'Client Reviews & Ratings | Creavix',
  description:
    'আমাদের ক্লায়েন্টরা কি বলছেন — রিয়েল রিভিউ, ৫ স্টার রেটিং সিস্টেম।',
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Creavix Reviews — Verified Client Feedback',
    description: 'Real client reviews for Creavix AI video campaigns. 4.8/5 from 4,300+ projects.',
  },
};

export default function ReviewsPage() {
  return (
    <>
      <HeroSection theme="reviews" watermark="REVIEWS">
        <Reveal>
          <span className="eyebrow">Reviews · ক্লায়েন্ট রিভিউ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            Verified <span className="accent">client feedback</span> across BD.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
            আমাদের প্রতিটি ক্যাম্পেইনের পেছনে একটি বাস্তব গল্প — পড়ুন, রেট দিন এবং নিজেও আপনার
            অভিজ্ঞতা শেয়ার করুন।
          </p>
        </Reveal>
      </HeroSection>

      <ReviewSection initial={REVIEWS_SEED} />

      <CtaBand />
    </>
  );
}
