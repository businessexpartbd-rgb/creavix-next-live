import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <span className="eyebrow">404 · Not found</span>
      <h1 className="mt-6 font-display text-6xl uppercase tracking-[0.04em] text-white sm:text-7xl">
        This <span className="accent">scene</span> didn&apos;t make the cut.
      </h1>
      <p className="mt-6 max-w-md font-bn text-ash-300">
        আপনি যে পেজটি খুঁজছেন সেটা সরে গেছে অথবা কখনো ছিলো না। চলুন কাজে ফিরে যাই।
      </p>
      <Link href="/" className="btn-3d-primary mt-8">
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </section>
  );
}
