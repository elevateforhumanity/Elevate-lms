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
    {
      title: 'Certified Nursing Assistant',
      description: 'Work in hospitals, nursing homes, or clinics providing direct patient care. Starting salary $16-$20/hour with benefits. High demand across all healthcare settings.',
      image: '/images/programs-hq/cna-training.jpg',
    },
    {
      title: 'Hospital CNA',
      description: 'Assist nurses in acute care settings with patient monitoring, mobility, and daily care. Fast-paced environment with opportunities for advancement to Patient Care Tech.',
      image: '/images/programs-hq/healthcare-hero.jpg',
    },
    {
      title: 'Nursing Home Aide',
      description: 'Provide compassionate long-term care to elderly residents. Build meaningful relationships while helping with daily activities, meals, and comfort.',
      image: '/images/programs-hq/cna-training.jpg',
    },
    {
      title: 'Home Health Aide',
      description: 'Deliver personalized care in patients\' homes. Flexible scheduling, independence, and one-on-one patient relationships. Growing demand as population ages.',
      image: '/images/programs-hq/healthcare-hero.jpg',
    },
    {
      title: 'Rehabilitation Aide',
      description: 'Support physical and occupational therapists in helping patients recover from injuries or surgeries. Work in rehab centers, hospitals, or outpatient clinics.',
      image: '/images/programs-hq/cna-training.jpg',
    },
    {
      title: 'Hospice Aide',
      description: 'Provide comfort and dignity to patients in end-of-life care. Meaningful work supporting patients and families during difficult times. Specialized training provided.',
      image: '/images/programs-hq/healthcare-hero.jpg',
    },
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
