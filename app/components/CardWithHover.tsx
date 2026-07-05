'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardWithHoverProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export default function CardWithHover({
  children,
  className = '',
  delay = 0,
  index = 0,
}: CardWithHoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: delay + index * 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      viewport={{ once: true, margin: '-100px' }}
      className={`group relative rounded-2xl border border-accent-primary/15 bg-gradient-to-br from-accent-primary/8 to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-gold-glow ${className}`}
    >
      {/* Animated gradient border overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
