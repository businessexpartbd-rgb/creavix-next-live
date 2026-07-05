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
    default: `${baseClasses} border-on-dark/10 bg-ink-800 shadow-card ${
      hoverGlow ? 'hover:border-accent-primary/40 hover:shadow-glow' : ''
    }`,
    glass: `${baseClasses} border-on-dark/10 bg-soft-dark/5 shadow-card backdrop-blur-sm ${
      hoverGlow ? 'hover:border-accent-primary/30 hover:bg-soft-dark/10' : ''
    }`,
    minimal: `${baseClasses} border-white/5 bg-transparent ${
      hoverGlow ? 'hover:border-accent-primary/30' : ''
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
