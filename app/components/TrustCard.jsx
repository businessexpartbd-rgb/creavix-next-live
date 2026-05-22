import {
  Cpu,
  Clapperboard,
  Zap,
  Workflow,
  Eye,
  Award,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

const ICONS = {
  Cpu,
  Clapperboard,
  Zap,
  Workflow,
  Eye,
  Award,
  MapPin,
  ShieldCheck,
};

export default function TrustCard({ pillar }) {
  const Icon = ICONS[pillar.icon] || ShieldCheck;
  return (
    <div className="glass h-full">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-gold-400 ring-1 ring-white/10">
        <Icon size={20} />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-white">{pillar.title_en}</h3>
      <p className="mt-1 font-bn text-xs text-zinc-500">{pillar.title_bn}</p>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.desc_en}</p>
    </div>
  );
}
