import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Medical Assistant Training | Elevate for Humanity',
  description: 'Become a Certified Medical Assistant. Learn clinical and administrative skills. WIOA funding available for eligible students.',
};

const programData: ProgramData = {
  title: 'Medical Assistant',
  category: 'Healthcare Programs',
  categoryHref: '/programs/healthcare',
  description: 'Train to become a Medical Assistant and work in clinics, hospitals, and physician offices. Learn both clinical procedures and front-office administration.',
  image: '/images/healthcare/hero-program-medical-assistant.jpg',
  duration: '12-16 weeks',
  tuition: '$0 with WIOA',
  fundingType: 'funded',
  salary: '$35K-$45K',
  demand: 'High',
  highlights: [
    'Clinical & administrative training',
    'Certification exam prep included',
    'Externship placement',
  ],
  skills: [
    'Vital signs measurement',
    'Patient intake and history',
    'Phlebotomy basics',
    'EKG administration',
    'Medication administration',
    'Medical records management',
    'Insurance and billing basics',
    'Patient scheduling',
  ],
  outcomes: [
    'Certified Medical Assistant (CMA)',
    'Clinical Medical Assistant',
    'Administrative Medical Assistant',
    'Medical Office Specialist',
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'Background check required',
    'Current immunizations',
  ],
  relatedPrograms: [
    {
      title: 'CNA Certification',
      href: '/programs/cna',
      description: 'Certified Nursing Assistant training',
    },
    {
      title: 'Phlebotomy',
      href: '/programs/phlebotomy',
      description: 'Blood draw certification',
    },
  ],
  avatarVideo: '/videos/avatars/healthcare-guide.mp4',
  avatarName: 'Medical Assistant Guide',
};

export default function MedicalAssistantPage() {
  return <ProgramPageTemplate program={programData} />;
}
