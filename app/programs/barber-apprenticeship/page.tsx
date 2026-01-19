import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship | Elevate for Humanity',
  description: 'Indiana Barber Apprenticeship Program. Complete 2,000 hours of training under a licensed barber. Pathway to Indiana Barber License.',
};

// Indiana Barber Requirements per IC 25-8 and 820 IAC 4
// - 2,000 hours of training (apprenticeship)
// - Must be at least 18 years old (or 17 with high school diploma)
// - Pass written and practical state board exams
// - Work under supervision of licensed barber

const programData: ProgramData = {
  title: 'Barber Apprenticeship',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'Indiana State Board approved apprenticeship program. Complete 2,000 hours of hands-on training under a licensed barber sponsor. Elevate for Humanity serves as the Program Administrator, connecting apprentices with licensed barber sponsors and tracking hours toward licensure.',
  image: '/images/programs/barber.jpg',
  duration: '12-18 months',
  tuition: '$4,980',
  fundingType: 'self-pay',
  salary: '$35K-$55K',
  demand: 'High',
  highlights: [
    '2,000 hours hands-on training',
    'Licensed barber sponsor/mentor',
    'State board exam prep',
    'Elevate = Program Administrator',
  ],
  skills: [
    'Haircutting techniques (clipper, shear, razor)',
    'Beard trimming and shaping',
    'Hot towel shaves',
    'Scalp treatments and massage',
    'Sanitation and safety (820 IAC 4)',
    'Customer consultation',
    'Indiana state board exam preparation',
    'Business basics and chair rental',
  ],
  outcomes: [
    {
      title: 'Licensed Barber (Indiana)',
      description: 'Work legally as a barber anywhere in Indiana. Perform haircuts, shaves, and grooming services. Average starting salary $35K-$45K.',
    },
    {
      title: 'Barbershop Employee',
      description: 'Join an established shop as a staff barber. Steady paycheck, benefits at some shops, build your clientele with shop traffic.',
    },
    {
      title: 'Chair Renter',
      description: 'Rent a station in an existing shop. Keep more of your earnings (typically 60-70%), set your own hours, build your personal brand.',
    },
    {
      title: 'Shop Owner',
      description: 'Open your own barbershop. Full control over your business, hire other barbers, build equity. Top earners make $80K-$150K+.',
    },
    {
      title: 'Mobile Barber',
      description: 'Bring barbering to clients at homes, offices, or events. Flexible schedule, premium pricing, growing demand for convenience.',
    },
  ],
  requirements: [
    '18 years or older (17 with HS diploma)',
    'High school diploma or GED',
    'Find a licensed Indiana barber sponsor',
    'Complete 2,000 hours of supervised training',
    'Pass Indiana state board written exam',
    'Pass Indiana state board practical exam',
  ],
  relatedPrograms: [
    {
      title: 'Cosmetology',
      href: '/programs/cosmetology',
      description: 'Full cosmetology license program',
    },
    {
      title: 'Esthetician',
      href: '/programs/esthetician',
      description: 'Skincare and facial treatments',
    },
  ],
};

export default function BarberApprenticeshipPage() {
  return <ProgramPageTemplate program={programData} />;
}
