'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const AvatarVideoOverlay = dynamic(() => import('@/components/AvatarVideoOverlay'), {
  ssr: false,
  loading: () => null,
});

// Map page patterns to avatar videos and names
const avatarConfig: { pattern: RegExp; video: string; name: string }[] = [
  // Healthcare pages
  { pattern: /^\/programs\/(healthcare|cna|medical-assistant|phlebotomy|nursing)/i, video: '/videos/avatars/healthcare-guide.mp4', name: 'Healthcare Guide' },
  { pattern: /^\/healthcare/i, video: '/videos/avatars/healthcare-guide.mp4', name: 'Healthcare Guide' },
  
  // Barber/Cosmetology pages
  { pattern: /^\/programs\/(barber|cosmetology|esthetician|nail-tech)/i, video: '/videos/avatars/barber-guide.mp4', name: 'Beauty Guide' },
  { pattern: /^\/barber/i, video: '/videos/avatars/barber-guide.mp4', name: 'Barber Guide' },
  
  // Skilled trades pages
  { pattern: /^\/programs\/(hvac|electrical|welding|plumbing|skilled-trades|cdl|construction)/i, video: '/videos/avatars/trades-guide.mp4', name: 'Trades Guide' },
  { pattern: /^\/skilled-trades/i, video: '/videos/avatars/trades-guide.mp4', name: 'Trades Guide' },
  
  // Financial/Tax pages
  { pattern: /^\/programs\/(tax|accounting|bookkeeping)/i, video: '/videos/avatars/financial-guide.mp4', name: 'Financial Guide' },
  { pattern: /^\/(vita|tax|financial|funding|wioa)/i, video: '/videos/avatars/financial-guide.mp4', name: 'Financial Guide' },
  
  // Store pages
  { pattern: /^\/store/i, video: '/videos/avatars/store-assistant.mp4', name: 'Store Assistant' },
  { pattern: /^\/shop/i, video: '/videos/avatars/store-assistant.mp4', name: 'Store Assistant' },
  
  // Onboarding/Orientation pages
  { pattern: /^\/(onboarding|orientation|getting-started)/i, video: '/videos/avatars/orientation-guide.mp4', name: 'Orientation Guide' },
  
  // LMS/Learning pages
  { pattern: /^\/(lms|courses|learn|student)/i, video: '/videos/avatars/ai-tutor.mp4', name: 'AI Tutor' },
  
  // Default for all other pages
  { pattern: /.*/, video: '/videos/avatars/home-welcome.mp4', name: 'Elevate Guide' },
];

// Pages that should NOT show the avatar (admin, auth, API, etc.)
const excludedPatterns = [
  /^\/admin/i,
  /^\/api/i,
  /^\/auth/i,
  /^\/login/i,
  /^\/signup/i,
  /^\/register/i,
  /^\/(dashboard)/i,
  /^\/staff-portal/i,
  /^\/partner-portal/i,
  /^\/employer-portal/i,
  /^\/instructor/i,
  /^\/\(partner\)/i,
  /^\/\(dashboard\)/i,
  /^\/\(auth\)/i,
];

export default function GlobalAvatar() {
  const pathname = usePathname();
  
  // Don't show on excluded pages
  if (excludedPatterns.some(pattern => pattern.test(pathname))) {
    return null;
  }
  
  // Find matching avatar config
  const config = avatarConfig.find(c => c.pattern.test(pathname));
  
  if (!config) {
    return null;
  }
  
  return (
    <AvatarVideoOverlay
      videoSrc={config.video}
      avatarName={config.name}
      position="bottom-right"
      autoPlay={false}
      showOnLoad={true}
      size="medium"
    />
  );
}
