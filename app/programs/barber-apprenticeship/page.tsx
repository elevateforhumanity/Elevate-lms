import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship | Elevate for Humanity',
  description: 'USDOL Registered Barber Apprenticeship in Indiana. Earn while you learn. Pathway to Indiana Barber License.',
};

const programData: ProgramData = {
  title: 'Barber Apprenticeship',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'USDOL Registered Apprenticeship. Earn while you learn with a licensed barber sponsor. Pathway to Indiana Barber License.',
  image: '/images/programs/barber.jpg',
  duration: '18 months',
  tuition: '$4,980',
  salary: '$45K+',
  demand: 'High',
  skills: [
    'Hair cutting techniques and styles',
    'Clipper and shear work',
    'Beard trimming and shaping',
    'Hot towel shaves',
    'Scalp treatments',
    'Sanitation and safety protocols',
    'Customer service and consultation',
    'Business and chair rental basics',
    'Indiana state board exam preparation',
  ],
  outcomes: [
    'Licensed Barber',
    'Barbershop Employee',
    'Chair Renter',
    'Barbershop Owner',
    'Mobile Barber',
    'Barber Instructor',
  ],
  requirements: [
    'High school diploma or GED',
    '16 years or older',
    'Find a licensed barber sponsor',
    'Register with USDOL',
    'Complete 2,000 hours of training',
    'Pass Indiana state board exam',
  ],
};

export default function BarberApprenticeshipPage() {
  return <ProgramPageTemplate program={programData} />;
}
