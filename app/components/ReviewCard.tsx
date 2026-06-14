'use client';

import { timeAgo, getInitial } from '@/lib/reviews';

interface ReviewCardProps {
  name: string;
  email_masked: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewCard({
  name,
  email_masked,
  rating,
  comment,
  created_at,
}: ReviewCardProps) {
  // Get avatar color based on name
  const colors = [
    'bg-brand-primary',
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500',
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="flex gap-3 sm:gap-4 rounded-card border border-black/10 bg-ink-800 p-3 sm:p-4 transition-all hover:border-brand/30 hover:shadow-sm">
      {/* Avatar */}
      <div
        className={`flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full ${avatarColor} flex items-center justify-center text-xs sm:text-sm font-semibold text-white`}
      >
        {getInitial(name)}
      </div>

      {/* Review Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Name and Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-ash-50 truncate">{name}</h3>
            <span className="text-xs text-ash-400 flex-shrink-0">{email_masked}</span>
          </div>
          <span className="text-xs text-ash-400 flex-shrink-0">{timeAgo(created_at)}</span>
        </div>

        {/* Rating */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg leading-none ${
                i < rating ? 'text-yellow-400' : 'text-ash-400'
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm text-ash-200 break-words text-pretty">{comment}</p>
      </div>
    </div>
  );
}
