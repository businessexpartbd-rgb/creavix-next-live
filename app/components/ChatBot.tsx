'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Send, X } from 'lucide-react';
import { SITE, SUGGESTED_QUESTIONS } from '../../lib/site-data';
import SubscribeModal from './SubscribeModal';

interface Msg {
  id: string;
  role: 'user' | 'bot';
  text: string;
  ts: number;
}

const greeting: Msg = {
  id: 'g',
  role: 'bot',
  text:
    'হ্যালো! 👋 আমি Creavix-এর AI সাপোর্ট। ভিডিও মার্কেটিং সংক্রান্ত যেকোনো প্রশ্ন করতে পারেন — অথবা নিচের সাজেশন থেকে একটা ট্যাপ করুন।',
  ts: Date.now(),
};

/**
 * ChatBot trigger lives bottom-right (above safe-area).
 * Window opens with: 24/7 Support header + logo + Home icon + 6 suggested
 * questions (BN). Tapping a question or typing fires /api/chat.
 *
 * If ANTHROPIC_API_KEY is unset, the API returns a canned bilingual answer
 * picked from a small server-side knowledge base — UI stays identical.
 *
 * Listens for 'creavix:open-chat' events (Navbar search submits with prefill).
 */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Listen for global open events from Navbar / Search
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const detail = (e as CustomEvent).detail as { prefill?: string } | undefined;
      if (detail?.prefill) {
        setTimeout(() => sendMessage(detail.prefill!), 250);
      }
    };
    window.addEventListener('creavix:open-chat', onOpen as EventListener);
    return () => window.removeEventListener('creavix:open-chat', onOpen as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc → minimize
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Autoscroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text: trimmed, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data: { reply?: string; error?: string } = await res.json().catch(() => ({}));
      const reply =
        data.reply ??
        'দুঃখিত — এই মুহূর্তে উত্তর দিতে পারছি না। সরাসরি WhatsApp করুন: ' + SITE.whatsapp;
      // small natural-feeling delay
      await new Promise((r) => setTimeout(r, 350));
      setMessages((m) => [
        ...m,
        { id: `b-${Date.now()}`, role: 'bot', text: reply, ts: Date.now() },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `b-${Date.now()}`,
          role: 'bot',
          text:
            'দুঃখিত — সংযোগ বিচ্ছিন্ন। সরাসরি WhatsApp করুন: ' + SITE.whatsapp,
          ts: Date.now(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {open ? (
        <div
          className="fixed inset-0 z-[58] bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* Trigger */}
      <button
        type="button"
        aria-label="Open Creavix AI ChatBot"
        title="Creavix 24/7 Support"
        onClick={() => setOpen((v) => !v)}
        className="chatbot-trigger"
      >
        <ChatGlyph open={open} />
      </button>

      {/* Window */}
      {open ? (
        <div
          className="fixed right-4 bottom-[100px] z-[60] flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-card border border-on-dark/10 bg-ink-900 shadow-deep sm:right-7 sm:bottom-[110px]"
          role="dialog"
          aria-label="Creavix chat support"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-on-dark/10 bg-ink-800 p-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 flex-none place-items-center rounded-full bg-soft-dark/5 text-muted transition hover:bg-soft-dark/10 hover:text-on-dark"
              aria-label="Go home"
              title="Home"
            >
              <Home size={16} />
            </Link>
            <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full bg-gradient-to-br from-warm-fg/10 to-warm-fg/0 ring-1 ring-white/10">
              <Image
                src="/logo.png"
                alt="Creavix"
                width={80}
                height={80}
                sizes="40px"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
            <div className="flex flex-1 flex-col leading-tight">
              <span className="font-display text-base tracking-[0.14em] text-on-dark">
                CREAVIX
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                24/7 Support
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 flex-none place-items-center rounded-full text-muted hover:bg-soft-dark/5 hover:text-on-dark"
              aria-label="Close chat"
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="max-h-[55vh] flex-1 space-y-3 overflow-y-auto bg-ink-900 p-4"
          >
            {messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-accent-primary px-4 py-2 text-sm leading-6 text-on-dark shadow-glow">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-on-dark/10 bg-ink-700 px-4 py-2 text-sm leading-6 text-muted0">
                    <span className="font-bn">{m.text}</span>
                  </div>
                </div>
              ),
            )}
            {typing ? (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-tl-sm border border-on-dark/10 bg-ink-700 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cream00 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cream00 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cream00" />
                </div>
              </div>
            ) : null}
          </div>

          {/* Suggested questions */}
          <div className="border-t border-on-dark/10 bg-ink-800 p-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-on-dark/10 bg-soft-dark/5 px-3 py-1.5 text-left font-bn text-xs text-muted transition hover:border-accent-primary/40 hover:bg-accent-primary/10 hover:text-on-dark"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-on-dark/10 bg-ink-900 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="মেসেজ লিখুন... · Type a message"
              aria-label="Type a message"
              className="flex-1 rounded-full border border-on-dark/10 bg-ink-800 px-4 py-2 text-sm text-on-dark outline-none focus:border-accent-primary/60"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={typing || !input.trim()}
              className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent-primary text-on-dark shadow-glow transition hover:bg-accent-primary-secondary disabled:opacity-50"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      ) : null}

      {/* Mount the subscribe modal here so a single CustomEvent triggers it
          regardless of which page is active. */}
      <SubscribeModal />
    </>
  );
}

function ChatGlyph({ open }: { open: boolean }) {
  if (open) return <X size={22} />;
  // Speech-bubble glyph + small video badge — no third-party brand
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.06c0 4.39-3.94 7.94-8.8 7.94-1.5 0-2.93-.34-4.18-.94L3 21l1.07-3.95C3.4 15.83 3 14.49 3 13.06 3 8.67 6.94 5.12 11.8 5.12s9.2 2.55 9.2 6.94Z"
      />
      <circle cx="9.5" cy="12.5" r="1" fill="currentColor" />
      <circle cx="13" cy="12.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="12.5" r="1" fill="currentColor" />
    </svg>
  );
}
