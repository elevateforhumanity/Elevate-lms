import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Plumbing Apprenticeship | Elevate for Humanity',
  description: 'Become a licensed plumber through our apprenticeship program. Earn while you learn. High-demand skilled trade with excellent pay.',
};

const programData: ProgramData = {
  title: 'Plumbing Apprenticeship',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'Learn the plumbing trade through hands-on apprenticeship. Install, repair, and maintain water systems, drainage, and gas lines while earning income.',
  image: '/images/programs-new/program-5.jpg',
  duration: '4-5 years',
  tuition: 'Employer Sponsored',
  fundingType: 'funded',
  salary: '$45K-$70K',
  demand: 'Very High',
  highlights: [
    'Earn while you learn',
    'Licensed plumber pathway',
    'Recession-proof career',
  ],
  skills: [
    'Pipe fitting and installation',
    'Water supply systems',
    'Drainage and waste systems',
    'Gas line installation',
    'Fixture installation',
    'Blueprint reading',
    'Plumbing codes and regulations',
    'Troubleshooting and repair',
  ],
  outcomes: [
    'Apprentice Plumber',
    'Journeyman Plumber',
    'Master Plumber',
    'Plumbing Contractor',
    'Service Plumber',
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'Valid driver\'s license',
    'Physical fitness',
    'Mechanical aptitude',
  ],
  relatedPrograms: [
    {
      title: 'HVAC Technician',
      href: '/programs/hvac',
      description: 'Heating and cooling systems',
    },
    {
      title: 'Electrical',
      href: '/programs/electrical',
      description: 'Electrical apprenticeship',
    },
  ],
};

export default function PlumbingPage() {
  return <ProgramPageTemplate program={programData} />;
}
