import ProgramCategoryPage from '@/components/programs/ProgramCategoryPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology Training Programs | Elevate for Humanity',
  description: 'Start your tech career with free WIOA-funded training. IT Support, Cybersecurity, and more. No experience required.',
};

const programs = [
  {
    title: 'IT Support Specialist',
    duration: '8-12 Weeks',
    description: 'CompTIA A+ certification prep. Help desk, troubleshooting, and technical support skills.',
    href: '/programs/it-support',
    image: '/images/technology/hero-program-it-support.jpg',
  },
  {
    title: 'Cybersecurity Fundamentals',
    duration: '12-16 Weeks',
    description: 'Protect organizations from cyber threats. Security+, network defense, and incident response.',
    href: '/programs/cybersecurity',
    image: '/images/technology/hero-program-cybersecurity.jpg',
  },
];

const highlights = [
  'Remote Work Options',
  'High Salaries',
  'Growing Industry',
  'No Experience Required',
];

export default function TechnologyProgramsPage() {
  return (
    <ProgramCategoryPage
      categoryName="Technology"
      categorySlug="technology"
      tagline="Future-Proof Careers"
      description="Enter the growing tech industry with no prior experience required. Technology careers offer remote work opportunities, high salaries, and continuous growth."
      heroVideoSrc="/videos/hero-home-fast.mp4"
      heroPosterImage="/images/technology/hero-programs-technology.jpg"
      accentColor="blue"
      programs={programs}
      highlights={highlights}
      avatarVideoSrc="/videos/avatars/ai-tutor.mp4"
      avatarName="Tech Guide"
    />
  );
}
