import ProgramCategoryPage from '@/components/programs/ProgramCategoryPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skilled Trades Training Programs | Elevate for Humanity',
  description: 'Learn hands-on trade skills with free WIOA-funded training. HVAC, Welding, Electrical, Plumbing, and CDL programs.',
};

const programs = [
  {
    title: 'HVAC Technician',
    duration: '12-24 Weeks',
    description: 'Install and repair heating, cooling, and ventilation systems. EPA certification included.',
    href: '/programs/hvac',
    image: '/images/programs-hq/hvac-technician.jpg',
  },
  {
    title: 'CDL Class A Training',
    duration: '3-6 Weeks',
    description: 'Get your Commercial Driver License and start earning $50,000-$80,000+ annually.',
    href: '/programs/cdl',
    image: '/images/programs-hq/cdl-trucking.jpg',
  },
  {
    title: 'Welding',
    duration: '8-16 Weeks',
    description: 'Join metal parts using MIG, TIG, and stick welding techniques. AWS certification prep.',
    href: '/programs/welding',
    image: '/images/programs-hq/welding.jpg',
  },
  {
    title: 'Electrical',
    duration: '12-24 Weeks',
    description: 'Install and maintain electrical systems in residential and commercial buildings.',
    href: '/programs/electrical',
    image: '/images/programs-hq/electrical.jpg',
  },
  {
    title: 'Plumbing',
    duration: '12-24 Weeks',
    description: 'Install and repair water supply, drainage, and gas systems.',
    href: '/programs/plumbing',
    image: '/images/programs-hq/skilled-trades-hero.jpg',
  },
];

const highlights = [
  'High Earning Potential',
  'Job Security',
  'Hands-On Work',
  'Cannot Be Outsourced',
];

export default function SkilledTradesProgramsPage() {
  return (
    <ProgramCategoryPage
      categoryName="Skilled Trades"
      categorySlug="skilled-trades"
      tagline="Build Your Future"
      description="Learn hands-on skills for well-paying trade careers that cannot be outsourced. Many graduates start earning $40,000-$60,000+ within their first year."
      heroVideoSrc="/videos/hvac-hero-final.mp4"
      heroPosterImage="/images/programs-hq/skilled-trades-hero.jpg"
      accentColor="orange"
      programs={programs}
      highlights={highlights}
      avatarVideoSrc="/videos/avatars/trades-guide.mp4"
      avatarName="Trades Guide"
    />
  );
}
