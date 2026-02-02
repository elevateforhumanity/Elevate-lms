// Force static generation for performance
export const dynamic = 'force-static';
export const revalidate = 86400;

import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Phlebotomy Certification | Elevate for Humanity',
  description: 'Become a Certified Phlebotomy Technician in 4-6 weeks. Learn venipuncture, specimen collection, and lab procedures. WIOA funding available.',
};

const programData: ProgramData = {
  title: 'Phlebotomy Technician',
  category: 'Healthcare Programs',
  categoryHref: '/programs/healthcare',
  description: 'Fast-track certification program to become a Phlebotomy Technician. Learn proper blood draw techniques, specimen handling, and patient care in just 4-6 weeks.',
  image: '/images/healthcare/hero-program-phlebotomy.jpg',
  duration: '4-6 weeks',
  tuition: '$0 with WIOA',
  fundingType: 'funded',
  salary: '$32K-$42K',
  demand: 'High',
  highlights: [
    'Fastest healthcare certification',
    'Hands-on clinical training',
    'National certification included',
  ],
  skills: [
    'Venipuncture techniques',
    'Capillary puncture',
    'Specimen collection and handling',
    'Order of draw protocols',
    'Infection control procedures',
    'Patient identification',
    'Lab safety standards',
    'Medical terminology',
  ],
  outcomes: [
    {
      title: 'Certified Phlebotomy Technician (CPT)',
      description: 'Draw blood in hospitals, clinics, and diagnostic labs. One of the fastest-growing healthcare careers with starting pay of $16-$20/hour and full benefits.',
      image: '/images/healthcare/video-thumbnail-phlebotomy.jpg',
    },
    {
      title: 'Hospital Phlebotomist',
      description: 'Work in hospital settings collecting blood samples from patients for diagnostic testing. Fast-paced environment with opportunities for overtime and shift differentials.',
      image: '/images/healthcare/healthcare-professional-portrait-1.jpg',
    },
    {
      title: 'Lab Technician',
      description: 'Combine phlebotomy skills with laboratory work. Process specimens, perform basic lab tests, and maintain equipment in clinical laboratories.',
      image: '/images/healthcare/phlebotomy-hero.jpg',
    },
    {
      title: 'Blood Bank Technician',
      description: 'Work at blood donation centers collecting and processing blood donations. Help save lives while enjoying regular hours and meaningful work.',
      image: '/images/healthcare/healthcare-professional-portrait-2.jpg',
    },
    {
      title: 'Mobile Phlebotomist',
      description: 'Travel to patients\' homes, nursing facilities, and businesses to collect blood samples. Enjoy independence, flexible scheduling, and mileage reimbursement.',
      image: '/images/healthcare/hero-healthcare-professionals.jpg',
    },
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'No fear of blood',
    'Good hand-eye coordination',
  ],
  relatedPrograms: [
    {
      title: 'Medical Assistant',
      href: '/programs/medical-assistant',
      description: 'Clinical and administrative training',
    },
    {
      title: 'CNA Certification',
      href: '/programs/cna',
      description: 'Certified Nursing Assistant',
    },
  ],
  avatarVideo: '/videos/avatars/healthcare-guide.mp4',
  avatarName: 'Phlebotomy Guide',
};

export default function PhlebotomyPage() {
  return <ProgramPageTemplate program={programData} />;
}
