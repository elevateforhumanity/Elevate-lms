import type { Course } from '@/types/course';

export const warehouseLogisticsCourse: Course = {
  id: 'warehouse-logistics-001',
  slug: 'warehouse-logistics',
  title: 'Warehouse & Logistics Certification Program',
  shortTitle: 'Warehouse & Logistics',
  credentialPartner: 'OTHER',
  externalCredentialName: 'Certified Warehouse & Logistics',
  description: 'Comprehensive training program for Warehouse & Logistics.',
  hoursTotal: 120,
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
      id: 'warehouse-logistics-mod-1',
      title: 'Introduction to Warehouse & Logistics',
      description: 'Overview and fundamentals',
      lessons: [
        {
          id: 'warehouse-logistics-1-1',
          title: 'Industry Overview',
          type: 'reading',
          durationMinutes: 45,
        },
        {
          id: 'warehouse-logistics-1-2',
          title: 'Core Concepts',
          type: 'video',
          durationMinutes: 60,
        },
        {
          id: 'warehouse-logistics-1-3',
          title: 'Safety and Ethics',
          type: 'reading',
          durationMinutes: 45,
        },
        {
          id: 'warehouse-logistics-1-4',
          title: 'Module Quiz',
          type: 'quiz',
          durationMinutes: 20,
        },
      ],
    },
    {
      id: 'warehouse-logistics-mod-2',
      title: 'Core Skills',
      description: 'Essential skills and techniques',
      lessons: [
        {
          id: 'warehouse-logistics-2-1',
          title: 'Skill Development',
          type: 'reading',
          durationMinutes: 60,
        },
        {
          id: 'warehouse-logistics-2-2',
          title: 'Hands-On Practice',
          type: 'lab',
          durationMinutes: 180,
        },
        {
          id: 'warehouse-logistics-2-3',
          title: 'Advanced Techniques',
          type: 'video',
          durationMinutes: 90,
        },
      ],
    },
    {
      id: 'warehouse-logistics-mod-3',
      title: 'Certification Preparation',
      description: 'Prepare for certification exam',
      lessons: [
        {
          id: 'warehouse-logistics-3-1',
          title: 'Exam Overview',
          type: 'reading',
          durationMinutes: 30,
        },
        {
          id: 'warehouse-logistics-3-2',
          title: 'Practice Exam',
          type: 'quiz',
          durationMinutes: 120,
        },
        {
          id: 'warehouse-logistics-3-3',
          title: 'Final Review',
          type: 'reading',
          durationMinutes: 60,
        },
      ],
    },
  ],
  lmsPath: '/student/enroll/warehouse-logistics',
  isPublished: true,
};
