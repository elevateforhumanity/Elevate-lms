import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Electrical Apprenticeship | Elevate for Humanity',
  description: 'Become a licensed electrician through our apprenticeship program. Earn while you learn. USDOL registered. High-demand skilled trade.',
};

const programData: ProgramData = {
  title: 'Electrical Apprenticeship',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'Start your career as an electrician through our registered apprenticeship. Learn residential, commercial, and industrial electrical work while earning a paycheck.',
  image: '/images/programs-new/program-4.jpg',
  duration: '4 years',
  tuition: 'Employer Sponsored',
  salary: '$45K-$75K',
  demand: 'Very High',
  highlights: [
    'Earn while you learn',
    'USDOL registered program',
    'Journeyman license pathway',
  ],
  skills: [
    'Electrical theory and code (NEC)',
    'Residential wiring',
    'Commercial electrical systems',
    'Industrial controls',
    'Blueprint reading',
    'Safety protocols (OSHA)',
    'Troubleshooting and repair',
    'Panel installation',
  ],
  outcomes: [
    'Apprentice Electrician',
    'Journeyman Electrician',
    'Master Electrician',
    'Electrical Contractor',
    'Maintenance Electrician',
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'Valid driver\'s license',
    'Basic math skills',
    'Physical ability to climb and lift',
  ],
  relatedPrograms: [
    {
      title: 'HVAC Technician',
      href: '/programs/hvac',
      description: 'Heating and cooling systems',
    },
    {
      title: 'Plumbing',
      href: '/programs/plumbing',
      description: 'Plumbing apprenticeship',
    },
  ],
};

export default function ElectricalPage() {
  return <ProgramPageTemplate program={programData} />;
}
