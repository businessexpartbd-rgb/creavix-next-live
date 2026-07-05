'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: FadeInUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // Premium bounce easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
