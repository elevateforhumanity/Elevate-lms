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
  image: '/images/programs-hq/medical-assistant.jpg',
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
    {
      title: 'Certified Medical Assistant (CMA)',
      description: 'Work in physician offices, clinics, and outpatient facilities performing both clinical and administrative duties. Average salary $38,000-$45,000 with excellent benefits.',
      image: '/images/programs-hq/medical-assistant.jpg',
    },
    {
      title: 'Clinical Medical Assistant',
      description: 'Focus on patient care tasks like taking vitals, administering injections, performing EKGs, and assisting physicians during examinations.',
      image: '/images/programs-hq/healthcare-hero.jpg',
    },
    {
      title: 'Administrative Medical Assistant',
      description: 'Manage front office operations including patient scheduling, medical records, insurance verification, and billing. Great for those who prefer office work.',
      image: '/images/programs-hq/medical-assistant.jpg',
    },
    {
      title: 'Medical Office Specialist',
      description: 'Combine clinical knowledge with office management skills. Oversee daily operations, manage staff schedules, and ensure smooth patient flow.',
      image: '/images/programs-hq/healthcare-hero.jpg',
    },
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
