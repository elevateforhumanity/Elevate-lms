// Force static generation for performance
export const dynamic = 'force-static';
export const revalidate = 86400;

import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'HVAC Training | Elevate for Humanity',
  description: 'HVAC Technician training in Indiana. 12-16 weeks, EPA 608 certification. Start earning $45K+.',
};

const programData: ProgramData = {
  title: 'HVAC Technician',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'Learn heating, ventilation, and air conditioning installation and repair. Includes EPA 608 certification.',
  image: '/images/trades/program-hvac-technician.jpg',
  avatarVideo: '/videos/hero-hvac-avatar.mp4',
  avatarName: 'Amanda',
  duration: '12-16 weeks',
  tuition: '$0*',
  fundingType: 'funded',
  salary: '$45K+',
  demand: 'High',
  highlights: [
    'EPA 608 certification included',
    'Hands-on lab training',
    'WIOA funding available',
  ],
  skills: [
    'HVAC system fundamentals and theory',
    'Heating system installation and repair',
    'Air conditioning and refrigeration',
    'Electrical components and wiring',
    'Ductwork design and installation',
    'Troubleshooting and diagnostics',
    'EPA 608 refrigerant handling',
    'OSHA safety protocols',
  ],
  outcomes: [
    'HVAC Technician',
    'HVAC Installer',
    'Refrigeration Technician',
    'Maintenance Technician',
    'Service Technician',
    'Commercial HVAC Tech',
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'Valid driver\'s license',
    'Ability to work in various conditions',
    'Basic math and reading skills',
  ],
};

export default function HVACPage() {
  return <ProgramPageTemplate program={programData} />;
}
