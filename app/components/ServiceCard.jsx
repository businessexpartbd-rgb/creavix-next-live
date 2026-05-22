import { ArrowUpRight, Sparkles, Megaphone, Film, Package, Landmark, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { SITE } from '../../data/site-data';

const ICONS = {
  Sparkles,
  Megaphone,
  Film,
  Package,
  Landmark,
  Wand2,
};

export default function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] || Sparkles;
  return (
    <article className="glass group flex h-full flex-col">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/30 to-gold-600/10 text-gold-400 ring-1 ring-gold-400/20">
          <Icon size={22} />
        </span>
        <ArrowUpRight
          size={18}
          className="text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-white">{service.title_en}</h3>
      <p className="mt-1 font-bn text-sm text-zinc-400">{service.title_bn}</p>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{service.desc_en}</p>
      <p className="mt-3 font-bn text-sm leading-7 text-zinc-500">{service.desc_bn}</p>
      <div className="mt-auto pt-6">
        <Link
          href={SITE.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-500"
        >
          Discuss this service
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
