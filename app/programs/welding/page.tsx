import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Welding Certification | Elevate for Humanity',
  description: 'Become a certified welder. Learn MIG, TIG, and stick welding. AWS certification prep included. High-demand skilled trade with great pay.',
};

const programData: ProgramData = {
  title: 'Welding Technology',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'Master the art of welding. Learn multiple welding processes and earn industry-recognized certifications. Welders are in high demand across manufacturing, construction, and energy sectors.',
  image: '/images/trades/welding-hero.jpg',
  duration: '12-16 weeks',
  tuition: '$0 with WIOA',
  fundingType: 'funded',
  salary: '$40K-$65K',
  demand: 'High',
  highlights: [
    'AWS certification prep',
    'Multiple welding processes',
    'Hands-on shop training',
  ],
  skills: [
    'MIG welding (GMAW)',
    'TIG welding (GTAW)',
    'Stick welding (SMAW)',
    'Flux-cored welding (FCAW)',
    'Blueprint reading',
    'Metal fabrication',
    'Welding safety (OSHA)',
    'Quality inspection',
  ],
  outcomes: [
    'Certified Welder',
    'Structural Welder',
    'Pipe Welder',
    'Fabrication Welder',
    'Welding Inspector',
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'Good hand-eye coordination',
    'Physical ability to stand and lift',
  ],
  relatedPrograms: [
    {
      title: 'HVAC Technician',
      href: '/programs/hvac',
      description: 'Heating and cooling systems',
    },
    {
      title: 'CDL Training',
      href: '/programs/cdl',
      description: 'Commercial driving license',
    },
  ],
  avatarVideo: '/videos/avatars/trades-guide.mp4',
  avatarName: 'Welding Guide',
};

export default function WeldingPage() {
  return <ProgramPageTemplate program={programData} />;
}
