import { Metadata } from 'next';
import { ProgramPageTemplate, ProgramData } from '@/components/programs/ProgramPageTemplate';

export const metadata: Metadata = {
  title: 'CDL Training | Elevate for Humanity',
  description: 'Commercial Driver License training in Indiana. 4-8 weeks, Class A CDL. Start earning $50K+.',
};

const programData: ProgramData = {
  title: 'CDL Commercial Driving',
  category: 'Skilled Trades Programs',
  categoryHref: '/programs/skilled-trades',
  description: 'Get your Class A Commercial Driver License and start a trucking career. High demand, competitive pay.',
  image: '/images/trades/hero-program-cdl.jpg',
  avatarVideo: '/videos/hero-cdl-avatar.mp4',
  avatarName: 'Amanda',
  duration: '4-8 weeks',
  tuition: '$0*',
  salary: '$50K+',
  demand: 'Very High',
  highlights: [
    'Class A CDL in 4-8 weeks',
    'Job placement assistance',
    'WIOA funding available',
  ],
  skills: [
    'Pre-trip vehicle inspection',
    'Basic vehicle control and maneuvering',
    'Backing and parking techniques',
    'Shifting and gear patterns',
    'Coupling and uncoupling trailers',
    'Road driving and highway safety',
    'Air brake systems',
    'DOT regulations and logbooks',
    'Hazmat endorsement preparation (optional)',
  ],
  outcomes: [
    'Over-the-Road (OTR) Driver',
    'Regional Truck Driver',
    'Local Delivery Driver',
    'Tanker Driver',
    'Flatbed Driver',
    'Owner-Operator',
  ],
  requirements: [
    '21 years or older (18 for intrastate)',
    'Valid driver\'s license',
    'Clean driving record',
    'Pass DOT physical exam',
    'Pass drug screening',
    'No DUI/DWI in past 5 years',
  ],
};

export default function CDLPage() {
  return <ProgramPageTemplate program={programData} />;
}
