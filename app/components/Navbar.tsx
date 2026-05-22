'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Search, MessageCircle, Bell } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../lib/site-data';

export default function Navbar({ onSubscribe }: { onSubscribe?: () => void } = {}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Search submit → push pre-filled question into chatbot via custom event
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    window.dispatchEvent(
      new CustomEvent('creavix:open-chat', { detail: { prefill: searchValue.trim() } }),
    );
    setSearchValue('');
    setSearchOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6">
        {/* Logo + brand wordmark */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-white/10 shadow-glow sm:h-11 sm:w-11">
            <Image
              src="/logo.png"
              alt={`${SITE.name} logo`}
              width={500}
              height={500}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-2xl tracking-[0.18em] text-brand sm:text-[26px]">
              CREAVIX
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-ash-300 sm:text-[10px]">
              IT Solution
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
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
                    ? 'bg-white/10 text-white'
                    : 'text-ash-300 hover:bg-white/5 hover:text-white'
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
          {/* Search → chatbot */}
          <button
            type="button"
            aria-label="Search / Open chatbot"
            onClick={() => setSearchOpen((v) => !v)}
            className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-brand/60 sm:grid"
          >
            <Search size={16} />
          </button>

          {/* Subscribe (Bell) */}
          <button
            type="button"
            aria-label="Subscribe to updates"
            onClick={() =>
              onSubscribe
                ? onSubscribe()
                : window.dispatchEvent(new CustomEvent('creavix:open-subscribe'))
            }
            className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-brand/60 sm:grid"
          >
            <Bell size={16} />
          </button>

          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="hidden btn-3d-primary md:inline-flex"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Search palette (desktop) */}
      {searchOpen ? (
        <div className="border-t border-white/10 bg-ink-900/95 backdrop-blur">
          <form
            onSubmit={submitSearch}
            className="container-x flex items-center gap-3 py-3"
          >
            <Search size={16} className="text-brand" />
            <input
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="ChatBot-কে যা জিজ্ঞেস করতে চান টাইপ করুন... / Ask the chatbot anything"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-ash-400"
            />
            <button type="submit" className="btn-3d-primary !py-2 !px-4 text-xs">
              Ask AI
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-ash-300 hover:text-white"
              aria-label="Close search"
            >
              <X size={14} />
            </button>
          </form>
        </div>
      ) : null}

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-ink-900/95 backdrop-blur transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[640px]' : 'max-h-0'
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-ash-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label_en}</span>
                <span className="font-bn text-xs text-ash-400">{link.label_bn}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent('creavix:open-chat'));
            }}
            className="mt-3 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm text-white"
          >
            <span>AI ChatBot — সরাসরি জিজ্ঞেস করুন</span>
            <Search size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent('creavix:open-subscribe'));
            }}
            className="mt-1 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm text-white"
          >
            <span>Subscribe — নতুন অফার ও ভিডিও</span>
            <Bell size={16} />
          </button>
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-3d-primary mt-3"
          >
            <MessageCircle size={16} />
            WhatsApp করুন
          </a>
        </nav>
      </div>
    </header>
  );
}
