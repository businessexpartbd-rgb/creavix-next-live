'use client';

import { ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

const speedMap = {
  slow: 'marquee-slow',
  normal: 'marquee-normal',
  fast: 'marquee-fast',
};

export default function InfiniteMarquee({
  children,
  pauseOnHover = true,
  speed = 'normal',
}: InfiniteMarqueeProps) {
  return (
    <div
      className={`overflow-hidden py-8 ${pauseOnHover ? '[&:hover_.marquee-content]:pause' : ''}`}
    >
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-slow {
          animation: marquee 60s linear infinite;
        }
        .marquee-normal {
          animation: marquee 40s linear infinite;
        }
        .marquee-fast {
          animation: marquee 20s linear infinite;
        }

        .marquee-content {
          display: flex;
          gap: 2rem;
          width: fit-content;
        }

        .marquee-content.pause {
          animation-play-state: paused;
        }

        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      `}</style>

      {/* Wrapper for smooth scrolling */}
      <div className="flex gap-8">
        {/* First set */}
        <div className={`marquee-content ${speedMap[speed]}`}>
          {children}
        </div>

        {/* Duplicate for seamless loop */}
        <div className={`marquee-content ${speedMap[speed]}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
