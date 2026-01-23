import { Metadata } from 'next';
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
  image: '/images/programs-hq/phlebotomy.jpg',
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
    'Certified Phlebotomy Technician (CPT)',
    'Hospital Phlebotomist',
    'Lab Technician',
    'Blood Bank Technician',
    'Mobile Phlebotomist',
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
