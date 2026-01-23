import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'CNA Training | Elevate for Humanity',
  description: 'Certified Nursing Assistant training in Indiana. 4-6 weeks, job placement support. Start earning $16-$20/hour.',
};

const programData: ProgramData = {
  title: 'Certified Nursing Assistant (CNA)',
  category: 'Healthcare Programs',
  categoryHref: '/programs/healthcare',
  description: 'Become a Certified Nursing Assistant in 4-6 weeks. Work in hospitals, nursing homes, and home health settings.',
  image: '/images/programs-hq/cna-training.jpg',
  duration: '4-6 weeks',
  tuition: '$0*',
  fundingType: 'funded',
  salary: '$35K+',
  demand: 'High',
  highlights: [
    'State certification included',
    'Hands-on clinical training',
    'Job placement support',
  ],
  skills: [
    'Patient care fundamentals and activities of daily living (ADLs)',
    'Vital signs monitoring (blood pressure, pulse, temperature)',
    'Infection control and safety protocols',
    'Patient positioning and mobility assistance',
    'Basic nutrition and feeding assistance',
    'Documentation and reporting',
    'Communication with patients and healthcare team',
    'Indiana CNA state exam preparation',
  ],
  outcomes: [
    'Certified Nursing Assistant',
    'Hospital CNA',
    'Nursing Home Aide',
    'Home Health Aide',
    'Rehabilitation Aide',
    'Hospice Aide',
  ],
  requirements: [
    'High school diploma or GED',
    '18 years or older',
    'Pass background check',
    'Ability to lift 50 lbs',
    'TB test and immunizations',
  ],
  relatedPrograms: [
    { title: 'Medical Assistant', href: '/programs/healthcare', description: 'Clinical and administrative skills' },
    { title: 'Phlebotomy', href: '/programs/healthcare', description: 'Blood draw certification' },
    { title: 'Patient Care Tech', href: '/programs/healthcare', description: 'Advanced patient care' },
  ],
  avatarVideo: '/videos/avatars/healthcare-guide.mp4',
  avatarName: 'CNA Guide',
};

export default function CNAPage() {
  return <ProgramPageTemplate program={programData} />;
}
