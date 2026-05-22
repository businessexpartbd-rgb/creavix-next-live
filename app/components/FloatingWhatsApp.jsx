import { MessageCircle } from 'lucide-react';
import { SITE } from '../../data/site-data';

export default function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Creavixit on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.5)] transition hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={24} />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
        WhatsApp us
      </span>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-25" />
    </a>
  );
}
