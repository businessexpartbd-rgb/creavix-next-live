'use client';

import {
  Cpu,
  Clapperboard,
  Zap,
  Workflow,
  Eye,
  Award,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { useRef } from 'react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

interface Pillar {
  icon: string;
  title_en: string;
  title_bn: string;
  desc_bn: string;
}

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  Clapperboard,
  Zap,
  Workflow,
  Eye,
  Award,
  MapPin,
  ShieldCheck,
};

export default function TrustCard({ pillar }: { pillar: Pillar }) {
  const h3Ref = useRef<HTMLHeadingElement>(null);
  useRevealOnScroll(h3Ref);
  const Icon = ICONS[pillar.icon] ?? ShieldCheck;
  return (
    <div className="card-3d h-full p-6">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-brand ring-1 ring-white/10">
        <Icon size={20} />
      </span>
      <h3 className="reveal-card mt-5 font-display text-xl uppercase tracking-[0.04em] text-white" ref={h3Ref}>
        {pillar.title_en}
      </h3>
      <p className="mt-1 font-bn text-xs text-ash-400">{pillar.title_bn}</p>
      <p className="mt-3 font-bn text-sm leading-7 text-ash-200">{pillar.desc_bn}</p>
    </div>
  );
}
