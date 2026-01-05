export interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string; // ISO 8601 duration format
  uploadDate: string; // ISO 8601 date
  category: string;
}

export const videos: VideoData[] = [
  {
    id: 'hero-home',
    title: 'Elevate for Humanity - Free Career Training Programs',
    description: 'Discover 100% free, funded workforce training programs in Indianapolis. WIOA-funded programs in healthcare, skilled trades, technology, and business. No tuition, no debt, real careers.',
    videoUrl: '/videos/hero-home.mp4',
    thumbnailUrl: '/images/heroes/hero-homepage.jpg',
    duration: 'PT1M30S',
    uploadDate: '2025-01-01',
    category: 'Overview',
  },
  {
    id: 'cna-hero',
    title: 'CNA Training Program - Certified Nursing Assistant',
    description: 'Free CNA training in Indianapolis. State-approved program, 6-8 weeks, job placement assistance. Become a Certified Nursing Assistant with WIOA funding.',
    videoUrl: '/videos/cna-hero.mp4',
    thumbnailUrl: '/images/healthcare/video-thumbnail-cna-training.jpg',
    duration: 'PT45S',
    uploadDate: '2025-01-01',
    category: 'Healthcare',
  },
  {
    id: 'barber-hero',
    title: 'Barber Apprenticeship Program - Licensed Barber Training',
    description: 'Registered barber apprenticeship in Indianapolis. Earn while you learn, 2000 hours, state licensure pathway. Free training with experienced mentors.',
    videoUrl: '/videos/barber-hero-final.mp4',
    thumbnailUrl: '/images/barber-hero.jpg',
    duration: 'PT1M',
    uploadDate: '2025-01-01',
    category: 'Skilled Trades',
  },
  {
    id: 'cdl-hero',
    title: 'CDL Training - Commercial Driver License Program',
    description: 'Free CDL training in Indianapolis. Class A, B, and C commercial driving licenses. WIOA-funded, job placement with local carriers.',
    videoUrl: '/videos/cdl-hero.mp4',
    thumbnailUrl: '/images/cdl-hero.jpg',
    duration: 'PT50S',
    uploadDate: '2025-01-01',
    category: 'Transportation',
  },
  {
    id: 'hvac-hero',
    title: 'HVAC Technician Training Program',
    description: 'Free HVAC training in Indianapolis. Learn heating, ventilation, air conditioning, and refrigeration. EPA certification included.',
    videoUrl: '/videos/hvac-hero-final.mp4',
    thumbnailUrl: '/images/hvac-hero.jpg',
    duration: 'PT40S',
    uploadDate: '2025-01-01',
    category: 'Skilled Trades',
  },
  {
    id: 'programs-overview',
    title: 'Programs Overview - All Training Programs',
    description: 'Overview of all free career training programs at Elevate for Humanity. Healthcare, skilled trades, technology, business, and more.',
    videoUrl: '/videos/programs-overview-video-with-narration.mp4',
    thumbnailUrl: '/images/programs-catalog-hero.jpg',
    duration: 'PT30S',
    uploadDate: '2025-01-01',
    category: 'Overview',
  },
  {
    id: 'training-providers',
    title: 'Training Providers - Partner Network',
    description: 'Learn about our network of training providers and partners. Quality education from certified instructors and industry experts.',
    videoUrl: '/videos/training-providers-video-with-narration.mp4',
    thumbnailUrl: '/images/training-providers-hero.jpg',
    duration: 'PT1M10S',
    uploadDate: '2025-01-01',
    category: 'About',
  },
  {
    id: 'getting-started',
    title: 'Getting Started - How to Apply',
    description: 'Step-by-step guide to applying for free career training programs. Learn about eligibility, application process, and what to expect.',
    videoUrl: '/videos/getting-started-hero.mp4',
    thumbnailUrl: '/images/getting-started-hero.jpg',
    duration: 'PT35S',
    uploadDate: '2025-01-01',
    category: 'How To',
  },
];

export function getVideoById(id: string): VideoData | undefined {
  return videos.find((v) => v.id === id);
}

export function getVideosByCategory(category: string): VideoData[] {
  return videos.filter((v) => v.category === category);
}
