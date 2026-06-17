'use client';

import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
  variant?: 'default' | 'glass' | 'minimal';
}

/**
 * Premium animated card with motion-powered hover effects.
 * Supports multiple variants for flexibility across sections.
 * - default: Full card shadow with border glow
 * - glass: Frosted glass effect with subtle backdrop
 * - minimal: Lightweight card with minimal styling
 */
export default function AnimatedCard({
  children,
  className = '',
  hoverGlow = true,
  variant = 'default',
}: AnimatedCardProps) {
  const baseClasses =
    'relative rounded-card border transition-all duration-300';
  
  const variantClasses = {
    default: `${baseClasses} border-warm-fg/10 bg-ink-800 shadow-card ${
      hoverGlow ? 'hover:border-warm-accent/40 hover:shadow-glow' : ''
    }`,
    glass: `${baseClasses} border-warm-fg/10 bg-warm-fg/5 shadow-card backdrop-blur-sm ${
      hoverGlow ? 'hover:border-warm-accent/30 hover:bg-warm-fg/10' : ''
    }`,
    minimal: `${baseClasses} border-white/5 bg-transparent ${
      hoverGlow ? 'hover:border-warm-accent/30' : ''
    }`,
  };

  return (
    <div
      className={`${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
