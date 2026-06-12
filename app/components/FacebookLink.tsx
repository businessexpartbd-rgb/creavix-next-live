'use client';

import { Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FacebookLinkProps {
  url: string;
  label?: string;
  className?: string;
}

export default function FacebookLink({ url, label = 'Follow on Facebook', className = '' }: FacebookLinkProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if on mobile
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      e.preventDefault();
      
      // Extract the facebook profile from URL
      // Convert https://web.facebook.com/username to facebook://profile/username or fb://profile/username
      const profileMatch = url.match(/facebook\.com\/([^/?]+)/);
      const profileId = profileMatch ? profileMatch[1] : '';
      
      if (profileId) {
        // Try Facebook app first
        const facebookIntent = `fb://profile/${profileId}`;
        
        // Set a timeout to fall back to web if app doesn't exist
        const timeout = setTimeout(() => {
          window.open(url, '_blank');
        }, 500);
        
        // Attempt to open the Facebook app
        window.location.href = facebookIntent;
        
        return;
      }
    }
    
    // Desktop or fallback - open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const defaultClassName =
    'inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand hover:bg-brand/20 transition';

  return (
    <a
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className || defaultClassName}
    >
      <Facebook size={16} />
      <span>{label}</span>
    </a>
  );
}
