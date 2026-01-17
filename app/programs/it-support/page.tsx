import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'IT Support Specialist | Elevate for Humanity',
  description: 'Start your IT career with CompTIA A+ certification. Learn hardware, software, networking, and troubleshooting. WIOA funding available.',
};

const programData: ProgramData = {
  title: 'IT Support Specialist',
  category: 'Technology Programs',
  categoryHref: '/programs/technology',
  description: 'Launch your tech career with foundational IT skills. Earn your CompTIA A+ certification and learn to support computer systems, networks, and end users.',
  image: '/images/programs-new/program-7.jpg',
  duration: '8-12 weeks',
  tuition: '$0 with WIOA',
  salary: '$40K-$55K',
  demand: 'High',
  highlights: [
    'CompTIA A+ certification',
    'Entry-level IT career',
    'Pathway to advanced certs',
  ],
  skills: [
    'Hardware troubleshooting',
    'Operating systems (Windows, macOS, Linux)',
    'Software installation and support',
    'Network fundamentals',
    'Security basics',
    'Help desk procedures',
    'Customer service',
    'Documentation',
  ],
  outcomes: [
    'IT Support Specialist',
    'Help Desk Technician',
    'Desktop Support',
    'Field Service Technician',
    'Technical Support Representative',
  ],
  requirements: [
    'High school diploma or GED',
    'Basic computer skills',
    'Problem-solving aptitude',
    'Good communication skills',
  ],
  relatedPrograms: [
    {
      title: 'Cybersecurity',
      href: '/programs/cybersecurity',
      description: 'Security+ certification',
    },
    {
      title: 'Technology Programs',
      href: '/programs/technology',
      description: 'All tech training options',
    },
  ],
};

export default function ITSupportPage() {
  return <ProgramPageTemplate program={programData} />;
}
