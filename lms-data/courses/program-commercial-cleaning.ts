import type { Course } from '@/types/course';

export const commercialCleaningCourse: Course = {
  id: 'commercial-cleaning-001',
  slug: 'commercial-cleaning',
  title: 'Commercial Cleaning Certification Program',
  shortTitle: 'Commercial Cleaning',
  credentialPartner: 'OTHER',
  externalCredentialName: 'Certified Commercial Cleaning',
  description: 'Comprehensive training program for Commercial Cleaning.',
  hoursTotal: 80,
  deliveryMode: 'HYBRID',
  locationLabel: 'Multiple Locations',
  fundingEligible: ['WRG', 'WIOA_ADULT', 'WIOA_DW', 'WEX', 'SELF_PAY'],
  targetAudience: ['Career seekers', 'Career changers', 'Recent graduates'],
  outcomes: [
    'Master core competencies',
    'Gain hands-on experience',
    'Prepare for certification',
    'Develop professional skills',
    'Achieve career readiness',
  ],
  modules: [
    {
      id: 'commercial-cleaning-mod-1',
      title: 'Introduction to Commercial Cleaning',
      description: 'Overview and fundamentals',
      lessons: [
        {
          id: 'commercial-cleaning-1-1',
          title: 'Industry Overview',
          type: 'reading',
          durationMinutes: 45,
        },
        {
          id: 'commercial-cleaning-1-2',
          title: 'Core Concepts',
          type: 'video',
          durationMinutes: 60,
        },
        {
          id: 'commercial-cleaning-1-3',
          title: 'Safety and Ethics',
          type: 'reading',
          durationMinutes: 45,
        },
        {
          id: 'commercial-cleaning-1-4',
          title: 'Module Quiz',
          type: 'quiz',
          durationMinutes: 20,
        },
      ],
    },
    {
      id: 'commercial-cleaning-mod-2',
      title: 'Core Skills',
      description: 'Essential skills and techniques',
      lessons: [
        {
          id: 'commercial-cleaning-2-1',
          title: 'Skill Development',
          type: 'reading',
          durationMinutes: 60,
        },
        {
          id: 'commercial-cleaning-2-2',
          title: 'Hands-On Practice',
          type: 'lab',
          durationMinutes: 180,
        },
        {
          id: 'commercial-cleaning-2-3',
          title: 'Advanced Techniques',
          type: 'video',
          durationMinutes: 90,
        },
      ],
    },
    {
      id: 'commercial-cleaning-mod-3',
      title: 'Certification Preparation',
      description: 'Prepare for certification exam',
      lessons: [
        {
          id: 'commercial-cleaning-3-1',
          title: 'Exam Overview',
          type: 'reading',
          durationMinutes: 30,
        },
        {
          id: 'commercial-cleaning-3-2',
          title: 'Practice Exam',
          type: 'quiz',
          durationMinutes: 120,
        },
        {
          id: 'commercial-cleaning-3-3',
          title: 'Final Review',
          type: 'reading',
          durationMinutes: 60,
        },
      ],
    },
  ],
  lmsPath: '/student/enroll/commercial-cleaning',
  isPublished: true,
};
