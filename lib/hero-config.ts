// Centralized hero image configuration
// Only high-value pages get hero images

export const heroMap: Record<string, string | null> = {
  // Homepage - Full hero with priority
  '/': '/videos/hero-home.mp4', // Video hero

  // Primary landing pages - Small heroes
  '/programs': 'https://burst.shopifycdn.com/photos/students-in-class.jpg?width=1920&format=pjpg&exif=1&iptc=1',
  '/about': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '/apprenticeships': 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '/for-employers': 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '/services': 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '/features': 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '/locations': 'https://burst.shopifycdn.com/photos/students-studying-together.jpg?width=1920&format=pjpg&exif=1&iptc=1',
  '/contact': null, // No hero - form-focused

  // Tax site
  '/supersonic-fast-cash': '/videos/hero-tax-avatar.mp4', // Video hero

  // LMS
  '/lms': 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',

  // All other pages: NO HERO (null)
  // This includes 890+ pages that don't need heroes
};

export function getHeroImage(pathname: string): string | null {
  return heroMap[pathname] ?? null;
}

export function isVideoHero(heroSrc: string | null): boolean {
  return heroSrc?.endsWith('.mp4') ?? false;
}

export function shouldPrioritizeHero(pathname: string): boolean {
  // Only homepage hero gets priority loading
  return pathname === '/';
}
