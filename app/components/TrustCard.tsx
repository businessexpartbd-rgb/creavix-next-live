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
  const Icon = ICONS[pillar.icon] ?? ShieldCheck;
  return (
    <div className="rounded-card border border-accent-primary/10 bg-accent-primary/5 group h-full p-6 transition-all duration-300 hover:shadow-gold-glow">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-primary/20">
        <Icon size={20} className="transition-transform duration-500 group-hover:rotate-12" />
      </span>
      <h3 className="mt-5 font-serif text-lg tracking-tight text-on-dark">
        {pillar.title_en}
      </h3>
      <p className="mt-1 font-bn text-xs text-muted">{pillar.title_bn}</p>
      <p className="mt-3 font-bn text-sm leading-7 text-muted">{pillar.desc_bn}</p>
    </div>
  );
}
