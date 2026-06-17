'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Home,
  Briefcase,
  PlayCircle,
  CreditCard,
  Star,
  Info,
  Phone,
  MessageCircle,
  X,
  Search,
  LayoutGrid,
  Bell,
} from 'lucide-react';
import { NAV_LINKS, SITE } from '../../lib/site-data';

/**
 * Per-page icon for the Pages dropdown — looked up by `href`.
 */
const NAV_ICON_BY_HREF: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  '/': Home,
  '/services': Briefcase,
  '/portfolio': PlayCircle,
  '/pricing': CreditCard,
  '/reviews': Star,
  '/about': Info,
  '/contact': Phone,
};

/**
 * Top navigation:
 *  - Left: brand logo (clicks = Home).
 *  - Desktop centre (≥ lg): inline page links for fast access.
 *  - Right: subscribe bell (md+), WhatsApp button (md+), and a single
 *    "Pages" button that opens a dropdown with every site page (icons +
 *    bilingual labels) plus a fast search field. Same dropdown is
 *    reachable on mobile and desktop, so visitors always have one
 *    consistent way to see the full sitemap. The mobile hamburger
 *    is gone.
 *  - Search bar inside the dropdown:
 *      • If the typed text matches a page name, Enter navigates there.
 *      • Otherwise, Enter forwards the query to the AI ChatBot, so
 *        visitors can search arbitrary content even if it isn't a
 *        top-level page.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [pagesOpen, setPagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Scroll → translucent background once we leave the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on route change.
  useEffect(() => {
    setPagesOpen(false);
    setSearch('');
  }, [pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!pagesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPagesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pagesOpen]);

  // Auto-focus the search input on desktop only — on mobile the keyboard
  // pop-up would be jarring.
  useEffect(() => {
    if (!pagesOpen) return;
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 100);
    return () => window.clearTimeout(t);
  }, [pagesOpen]);

  const q = search.trim();
  const qLow = q.toLowerCase();

  const filteredPages = useMemo(() => {
    if (!q) return NAV_LINKS;
    return NAV_LINKS.filter(
      (p) =>
        p.label_en.toLowerCase().includes(qLow) ||
        p.label_bn.includes(q) ||
        p.href.toLowerCase().includes(qLow),
    );
  }, [q, qLow]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q) return;
    // Direct match → navigate to that page.
    const direct = NAV_LINKS.find(
      (p) =>
        p.label_en.toLowerCase() === qLow ||
        p.label_bn === q ||
        p.href === '/' + qLow.replace(/^\/?/, ''),
    );
    if (direct) {
      window.location.href = direct.href;
      return;
    }
    // Otherwise → hand off to ChatBot for AI search across content.
    setPagesOpen(false);
    window.dispatchEvent(
      new CustomEvent('creavix:open-chat', { detail: { prefill: q } }),
    );
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-warm-fg/10 bg-warm-bg/72 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      {/* Click-outside backdrop — visible only when the Pages dropdown
          is open. Dims the page content beneath so the navbar links
          never visually merge with content text underneath. Click =
          close. Sits below the header (z-40) so the dropdown itself
          stays interactive. */}
          {pagesOpen ? (
        <button
          type="button"
          aria-label="Close pages menu"
          onClick={() => setPagesOpen(false)}
          className="fixed inset-0 -z-10 cursor-default bg-warm-fg/20 backdrop-blur-sm"
        />
      ) : null}
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
        {/* Logo + brand wordmark — clicks Home */}
        <Link href="/" aria-label="Home" className="group flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-xl bg-warm-bg/50 ring-1 ring-warm-fg/10 transition-all hover:ring-warm-accent/40 sm:h-11 sm:w-11">
            <Image
              src="/new-logo.png"
              alt={`${SITE.name} logo`}
              width={88}
              height={88}
              sizes="(max-width: 640px) 40px, 44px"
              priority
              fetchPriority="high"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-2xl tracking-[0.18em] text-warm-accent sm:text-[26px]">
              CREAVIX
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-warm-muted sm:text-[10px]">
              IT Solution
            </span>
          </span>
        </Link>

        {/* Desktop inline nav (≥ lg) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-warm-accent/10 text-warm-accent'
                    : 'text-warm-muted hover:bg-warm-bg/50 hover:text-warm-accent'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label_en}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Subscribe bell (md+) */}
          <button
            type="button"
            aria-label="Subscribe to updates"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('creavix:open-subscribe'))
            }
            className="hidden h-10 w-10 place-items-center rounded-full border border-warm-fg/10 bg-warm-bg/50 text-warm-muted transition hover:border-warm-accent/60 hover:text-warm-accent md:grid"
          >
            <Bell size={16} />
          </button>

          {/* WhatsApp (md+) */}
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="hidden btn-3d-primary md:inline-flex"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

          {/* Pages button — replaces hamburger; visible on every breakpoint */}
          <button
            type="button"
            aria-expanded={pagesOpen}
            aria-controls="pages-dropdown"
            aria-label={pagesOpen ? 'Close pages menu' : 'Open pages menu'}
            onClick={() => setPagesOpen((v) => !v)}
            className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-warm-fg transition hover:border-warm-accent/60 sm:h-11 sm:px-4"
          >
            {pagesOpen ? <X size={16} /> : <LayoutGrid size={16} />}
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              Pages
            </span>
          </button>
        </div>
      </div>

      {/* ───── Pages dropdown ───── */}
      <div
        id="pages-dropdown"
        className={`overflow-hidden border-t border-white/10 bg-ink-950 shadow-2xl shadow-black/60 transition-[max-height,opacity] duration-300 md:bg-ink-900 md:shadow-black/40 ${
          pagesOpen
            ? 'max-h-[640px] opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="container-x py-4 sm:py-5">
          {/* Search bar */}
          <form
            onSubmit={submitSearch}
            className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-ink-800 px-4 py-2.5 focus-within:border-warm-accent/60 focus-within:ring-2 focus-within:ring-warm-accent/20"
          >
            <Search size={16} className="flex-none text-warm-accent" />
            <input
              ref={searchInputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages or ask AI… · পেজ বা কন্টেন্ট খুঁজুন"
              className="flex-1 bg-transparent text-sm text-warm-fg outline-none placeholder:text-warm-muted00"
              type="text"
              aria-label="Search website"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="grid h-7 w-7 flex-none place-items-center rounded-full text-warm-muted00 hover:bg-white/5 hover:text-warm-fg"
              >
                <X size={14} />
              </button>
            ) : null}
            {q ? (
              <button
                type="submit"
                className="hidden flex-none rounded-full bg-warm-accent px-3 py-1.5 text-xs font-semibold text-warm-fg transition hover:bg-warm-accent-secondary sm:inline-flex"
              >
                Go
              </button>
            ) : null}
          </form>

          {/* Pages grid */}
          <div className="grid gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPages.map((link) => {
              const Icon = NAV_ICON_BY_HREF[link.href] ?? Home;
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? 'bg-warm-accent/15 text-warm-fg ring-1 ring-warm-accent/40'
                      : 'text-warm-muted00 hover:bg-white/5 hover:text-warm-fg'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span
                    className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${
                      active ? 'bg-warm-accent text-warm-fg' : 'bg-white/5 text-warm-muted00'
                    }`}
                  >
                    <Icon size={14} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium">{link.label_en}</span>
                    <span className="font-bn text-xs text-warm-muted00">
                      {link.label_bn}
                    </span>
                  </span>
                </Link>
              );
            })}
            {filteredPages.length === 0 ? (
              <div className="col-span-full rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-warm-muted00">
                No pages match.{' '}
                <button
                  type="button"
                  onClick={submitSearch}
                  className="text-warm-accent underline hover:text-warm-fg"
                >
                  Press Enter to ask AI.
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile-only quick CTA row */}
          <div className="mt-4 flex flex-col gap-2 md:hidden">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-3d-primary w-full justify-center"
            >
              <MessageCircle size={16} />
              WhatsApp করুন
            </a>
            <button
              type="button"
              onClick={() => {
                setPagesOpen(false);
                window.dispatchEvent(new CustomEvent('creavix:open-subscribe'));
              }}
              className="flex items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-warm-fg"
            >
              <Bell size={16} />
              Subscribe — সাবস্ক্রাইব
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
