import ProgramCategoryPage from '@/components/programs/ProgramCategoryPage';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Training Programs | Elevate for Humanity',
  description: 'Start your healthcare career with free WIOA-funded training. CNA, Medical Assistant, Phlebotomy, and more. Job placement assistance included.',
};

const programs = [
  {
    title: 'CNA Certification',
    duration: '4-6 Weeks',
    description: 'Become a Certified Nursing Assistant and start your healthcare career providing direct patient care.',
    href: '/programs/cna',
    image: '/images/programs-hq/cna-training.jpg',
  },
  {
    title: 'Medical Assistant',
    duration: '12-16 Weeks',
    description: 'Learn clinical and administrative skills for medical offices, clinics, and healthcare facilities.',
    href: '/programs/medical-assistant',
    image: '/images/programs-hq/medical-assistant.jpg',
  },
  {
    title: 'Phlebotomy Technician',
    duration: '4-6 Weeks',
    description: 'Draw blood for tests, transfusions, and donations in hospitals, labs, and clinics.',
    href: '/programs/phlebotomy',
    image: '/images/programs-hq/phlebotomy.jpg',
  },
  {
    title: 'Direct Support Professional',
    duration: '2-4 Weeks',
    description: 'Support individuals with disabilities in daily living activities and community integration.',
    href: '/programs/direct-support-professional',
    image: '/images/programs-hq/healthcare-hero.jpg',
  },
  {
    title: 'Drug Collector',
    duration: '1-2 Weeks',
    description: 'Certified specimen collection for drug testing facilities and healthcare organizations.',
    href: '/programs/drug-collector',
    image: '/images/programs-hq/phlebotomy.jpg',
  },
];

const highlights = [
  'High Demand Industry',
  'Competitive Wages',
  'Job Security',
  'Career Advancement',
];

export default function HealthcareProgramsPage() {
  return (
    <ProgramCategoryPage
      categoryName="Healthcare"
      categorySlug="healthcare"
      tagline="In-Demand Careers"
      description="Start a rewarding career helping others. Healthcare is one of the fastest-growing industries with strong job security, competitive wages, and opportunities for advancement."
      heroVideoSrc="/videos/cna-hero.mp4"
      heroPosterImage="/images/programs-hq/healthcare-hero.jpg"
      accentColor="red"
      programs={programs}
      highlights={highlights}
      avatarVideoSrc="/videos/avatars/healthcare-guide.mp4"
      avatarName="Healthcare Guide"
    />
  );
}
