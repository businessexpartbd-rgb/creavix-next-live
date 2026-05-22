import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <span className="eyebrow">404 · Not found</span>
      <h1 className="mt-6 font-display text-5xl font-semibold text-white sm:text-6xl">
        This <span className="accent">scene</span> didn&apos;t make the cut.
      </h1>
      <p className="mt-6 max-w-md text-zinc-400">
        The page you&apos;re looking for has moved or never existed. Let&apos;s get you back to the work.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </section>
  );
}
