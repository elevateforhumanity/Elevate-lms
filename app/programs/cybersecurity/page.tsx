import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'Cybersecurity Training | Elevate for Humanity',
  description: 'Launch your cybersecurity career. CompTIA Security+ certification prep. Learn network security, threat detection, and incident response. WIOA funding available.',
};

const programData: ProgramData = {
  title: 'Cybersecurity Analyst',
  category: 'Technology Programs',
  categoryHref: '/programs/technology',
  description: 'Enter one of the fastest-growing fields in tech. Learn to protect organizations from cyber threats, manage security systems, and respond to incidents.',
  image: '/images/programs-new/program-3.jpg',
  duration: '12-16 weeks',
  tuition: '$0 with WIOA',
  fundingType: 'funded',
  salary: '$55K-$85K',
  demand: 'Very High',
  highlights: [
    'CompTIA Security+ certification',
    'Hands-on lab environment',
    'High starting salaries',
  ],
  skills: [
    'Network security fundamentals',
    'Threat detection and analysis',
    'Vulnerability assessment',
    'Security operations (SOC)',
    'Incident response',
    'Firewall and IDS/IPS management',
    'Risk management',
    'Compliance frameworks (NIST, ISO)',
  ],
  outcomes: [
    'Security Analyst',
    'SOC Analyst',
    'Information Security Specialist',
    'Network Security Administrator',
    'Cybersecurity Consultant',
  ],
  requirements: [
    'High school diploma or GED',
    'Basic computer skills',
    'CompTIA A+ or Network+ recommended',
    'Problem-solving aptitude',
  ],
  relatedPrograms: [
    {
      title: 'IT Support',
      href: '/programs/it-support',
      description: 'CompTIA A+ certification',
    },
    {
      title: 'Technology Programs',
      href: '/programs/technology',
      description: 'All tech training options',
    },
  ],
};

export default function CybersecurityPage() {
  return <ProgramPageTemplate program={programData} />;
}
