/**
 * Curriculum Modules for Programs
 * Detailed module breakdowns for each training program
 */

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  hours: number;
  topics: string[];
}

export interface ProgramCurriculum {
  programSlug: string;
  totalHours: number;
  modules: CurriculumModule[];
}

export const programCurriculums: ProgramCurriculum[] = [
  {
    programSlug: 'hvac-technician',
    totalHours: 720,
    modules: [
      {
        id: 'hvac-1',
        title: 'HVAC Fundamentals',
        description: 'Introduction to heating, ventilation, and air conditioning systems',
        hours: 80,
        topics: [
          'HVAC system components and terminology',
          'Heat transfer principles',
          'Thermodynamics basics',
          'Tools and equipment identification',
          'Safety protocols and PPE',
        ],
      },
      {
        id: 'hvac-2',
        title: 'Electrical Systems',
        description: 'Electrical fundamentals for HVAC technicians',
        hours: 120,
        topics: [
          'Basic electrical theory',
          'Reading electrical diagrams',
          'Multimeter usage and testing',
          'Motors and controls',
          'Troubleshooting electrical issues',
        ],
      },
      {
        id: 'hvac-3',
        title: 'Refrigeration Cycle',
        description: 'Understanding and working with refrigeration systems',
        hours: 160,
        topics: [
          'Refrigeration cycle components',
          'Refrigerant types and handling',
          'EPA 608 certification prep',
          'Charging and recovery procedures',
          'System diagnostics',
        ],
      },
      {
        id: 'hvac-4',
        title: 'Heating Systems',
        description: 'Gas furnaces, heat pumps, and heating equipment',
        hours: 120,
        topics: [
          'Gas furnace operation and repair',
          'Heat pump systems',
          'Combustion analysis',
          'Venting and exhaust systems',
          'Heating system maintenance',
        ],
      },
      {
        id: 'hvac-5',
        title: 'Air Conditioning',
        description: 'Residential and light commercial AC systems',
        hours: 120,
        topics: [
          'AC system components',
          'Installation procedures',
          'Ductwork and airflow',
          'System sizing and load calculations',
          'Preventive maintenance',
        ],
      },
      {
        id: 'hvac-6',
        title: 'Field Training',
        description: 'Hands-on experience with real HVAC systems',
        hours: 120,
        topics: [
          'Service call procedures',
          'Customer communication',
          'Job site safety',
          'Documentation and paperwork',
          'Career preparation',
        ],
      },
    ],
  },
  {
    programSlug: 'barber-apprenticeship',
    totalHours: 2000,
    modules: [
      {
        id: 'barber-1',
        title: 'Barbering Fundamentals',
        description: 'Introduction to professional barbering',
        hours: 200,
        topics: [
          'History of barbering',
          'Sanitation and sterilization',
          'Tool identification and care',
          'Client consultation basics',
          'Shop safety and hygiene',
        ],
      },
      {
        id: 'barber-2',
        title: 'Haircutting Techniques',
        description: 'Core cutting skills and techniques',
        hours: 500,
        topics: [
          'Clipper techniques and fades',
          'Scissor over comb',
          'Taper cuts',
          'Lineup and edge work',
          'Texturizing and blending',
        ],
      },
      {
        id: 'barber-3',
        title: 'Shaving & Facial Hair',
        description: 'Hot towel shaves and beard grooming',
        hours: 300,
        topics: [
          'Straight razor techniques',
          'Hot towel preparation',
          'Beard trimming and shaping',
          'Facial hair design',
          'Skin care basics',
        ],
      },
      {
        id: 'barber-4',
        title: 'Hair & Scalp Treatments',
        description: 'Understanding hair and scalp health',
        hours: 200,
        topics: [
          'Hair and scalp analysis',
          'Common scalp conditions',
          'Treatment options',
          'Product knowledge',
          'Chemical services basics',
        ],
      },
      {
        id: 'barber-5',
        title: 'Business & Client Relations',
        description: 'Building a successful barbering career',
        hours: 300,
        topics: [
          'Client retention strategies',
          'Appointment scheduling',
          'Pricing and services',
          'Social media marketing',
          'Building your brand',
        ],
      },
      {
        id: 'barber-6',
        title: 'State Board Preparation',
        description: 'Preparing for Indiana barber licensing exam',
        hours: 500,
        topics: [
          'Written exam preparation',
          'Practical exam techniques',
          'Indiana barber laws and regulations',
          'Mock exams and practice',
          'Licensing requirements',
        ],
      },
    ],
  },
  {
    programSlug: 'cna-certification',
    totalHours: 105,
    modules: [
      {
        id: 'cna-1',
        title: 'Introduction to Healthcare',
        description: 'Healthcare system overview and CNA role',
        hours: 15,
        topics: [
          'Healthcare team roles',
          'CNA scope of practice',
          'Medical terminology basics',
          'HIPAA and patient rights',
          'Professional ethics',
        ],
      },
      {
        id: 'cna-2',
        title: 'Basic Nursing Skills',
        description: 'Fundamental patient care techniques',
        hours: 25,
        topics: [
          'Vital signs measurement',
          'Body mechanics and positioning',
          'Bed making and patient comfort',
          'Personal hygiene assistance',
          'Nutrition and feeding',
        ],
      },
      {
        id: 'cna-3',
        title: 'Safety & Infection Control',
        description: 'Maintaining safe care environments',
        hours: 15,
        topics: [
          'Infection control procedures',
          'Hand hygiene techniques',
          'PPE usage',
          'Fall prevention',
          'Emergency procedures',
        ],
      },
      {
        id: 'cna-4',
        title: 'Patient Communication',
        description: 'Effective communication with patients and families',
        hours: 10,
        topics: [
          'Therapeutic communication',
          'Working with diverse populations',
          'Dementia care communication',
          'Documentation basics',
          'Reporting observations',
        ],
      },
      {
        id: 'cna-5',
        title: 'Clinical Experience',
        description: 'Hands-on patient care in clinical setting',
        hours: 40,
        topics: [
          'Direct patient care',
          'Working with nursing staff',
          'Real-world skill application',
          'Time management',
          'Professional behavior',
        ],
      },
    ],
  },
  {
    programSlug: 'cdl-training',
    totalHours: 160,
    modules: [
      {
        id: 'cdl-1',
        title: 'CDL Permit Preparation',
        description: 'Written test preparation and regulations',
        hours: 20,
        topics: [
          'General knowledge test prep',
          'Air brakes endorsement',
          'Combination vehicles',
          'FMCSA regulations',
          'Hours of service rules',
        ],
      },
      {
        id: 'cdl-2',
        title: 'Vehicle Inspection',
        description: 'Pre-trip and post-trip inspection procedures',
        hours: 20,
        topics: [
          'Pre-trip inspection sequence',
          'Engine compartment checks',
          'Brake system inspection',
          'Coupling system inspection',
          'Documentation requirements',
        ],
      },
      {
        id: 'cdl-3',
        title: 'Basic Control Skills',
        description: 'Yard maneuvers and basic vehicle control',
        hours: 40,
        topics: [
          'Straight line backing',
          'Offset backing',
          'Parallel parking',
          'Alley docking',
          'Coupling and uncoupling',
        ],
      },
      {
        id: 'cdl-4',
        title: 'Road Training',
        description: 'On-road driving experience',
        hours: 60,
        topics: [
          'City driving',
          'Highway driving',
          'Rural road navigation',
          'Adverse conditions',
          'Defensive driving',
        ],
      },
      {
        id: 'cdl-5',
        title: 'Career Preparation',
        description: 'Job readiness and placement assistance',
        hours: 20,
        topics: [
          'Resume and application prep',
          'Interview skills',
          'Carrier research',
          'Understanding pay structures',
          'First job expectations',
        ],
      },
    ],
  },
  {
    programSlug: 'phlebotomy-technician',
    totalHours: 80,
    modules: [
      {
        id: 'phleb-1',
        title: 'Introduction to Phlebotomy',
        description: 'Overview of phlebotomy profession and healthcare',
        hours: 10,
        topics: [
          'Role of phlebotomist',
          'Healthcare team integration',
          'Medical terminology',
          'Legal and ethical considerations',
          'Patient rights',
        ],
      },
      {
        id: 'phleb-2',
        title: 'Anatomy & Physiology',
        description: 'Circulatory system and venipuncture sites',
        hours: 15,
        topics: [
          'Circulatory system anatomy',
          'Vein identification',
          'Common venipuncture sites',
          'Difficult draw situations',
          'Complications and contraindications',
        ],
      },
      {
        id: 'phleb-3',
        title: 'Blood Collection Techniques',
        description: 'Venipuncture and capillary collection',
        hours: 25,
        topics: [
          'Venipuncture procedure',
          'Capillary puncture',
          'Order of draw',
          'Equipment selection',
          'Specimen handling',
        ],
      },
      {
        id: 'phleb-4',
        title: 'Safety & Infection Control',
        description: 'Maintaining safe blood collection practices',
        hours: 10,
        topics: [
          'Standard precautions',
          'Sharps safety',
          'Exposure prevention',
          'Waste disposal',
          'Emergency procedures',
        ],
      },
      {
        id: 'phleb-5',
        title: 'Clinical Practicum',
        description: 'Supervised blood draws in clinical setting',
        hours: 20,
        topics: [
          'Live patient draws',
          'Documentation',
          'Quality assurance',
          'Professional conduct',
          'Certification preparation',
        ],
      },
    ],
  },
  {
    programSlug: 'medical-assistant',
    totalHours: 600,
    modules: [
      {
        id: 'ma-1',
        title: 'Medical Office Administration',
        description: 'Front office procedures and management',
        hours: 100,
        topics: [
          'Appointment scheduling',
          'Medical records management',
          'Insurance and billing basics',
          'HIPAA compliance',
          'Office communication',
        ],
      },
      {
        id: 'ma-2',
        title: 'Clinical Procedures',
        description: 'Patient care and clinical skills',
        hours: 150,
        topics: [
          'Vital signs and measurements',
          'Patient preparation',
          'Assisting with examinations',
          'Specimen collection',
          'Medication administration',
        ],
      },
      {
        id: 'ma-3',
        title: 'Pharmacology',
        description: 'Medication knowledge and safety',
        hours: 80,
        topics: [
          'Drug classifications',
          'Dosage calculations',
          'Prescription handling',
          'Side effects and interactions',
          'Patient education',
        ],
      },
      {
        id: 'ma-4',
        title: 'Laboratory Procedures',
        description: 'Basic lab skills and testing',
        hours: 80,
        topics: [
          'Phlebotomy basics',
          'Urinalysis',
          'Point-of-care testing',
          'Quality control',
          'Lab safety',
        ],
      },
      {
        id: 'ma-5',
        title: 'EKG & Diagnostics',
        description: 'Electrocardiography and diagnostic procedures',
        hours: 60,
        topics: [
          'EKG fundamentals',
          'Lead placement',
          'Rhythm recognition basics',
          'Other diagnostic tests',
          'Equipment maintenance',
        ],
      },
      {
        id: 'ma-6',
        title: 'Externship',
        description: 'Clinical experience in medical office',
        hours: 130,
        topics: [
          'Real-world application',
          'Patient interaction',
          'Team collaboration',
          'Professional development',
          'Certification preparation',
        ],
      },
    ],
  },
  {
    programSlug: 'tax-prep-financial-services',
    totalHours: 120,
    modules: [
      {
        id: 'tax-1',
        title: 'Tax Fundamentals',
        description: 'Introduction to federal and state taxation',
        hours: 25,
        topics: [
          'Tax system overview',
          'Filing statuses',
          'Income types',
          'Standard vs itemized deductions',
          'Tax credits overview',
        ],
      },
      {
        id: 'tax-2',
        title: 'Individual Tax Returns',
        description: 'Preparing Form 1040 and schedules',
        hours: 35,
        topics: [
          'Form 1040 preparation',
          'W-2 and 1099 processing',
          'Schedule A, B, C, D',
          'Earned Income Credit',
          'Child Tax Credit',
        ],
      },
      {
        id: 'tax-3',
        title: 'Tax Software Training',
        description: 'Professional tax preparation software',
        hours: 25,
        topics: [
          'Software navigation',
          'Data entry best practices',
          'E-filing procedures',
          'Quality review process',
          'Client management',
        ],
      },
      {
        id: 'tax-4',
        title: 'State Tax Returns',
        description: 'State-specific tax requirements',
        hours: 15,
        topics: [
          'Indiana state returns',
          'Multi-state situations',
          'State credits and deductions',
          'Local tax considerations',
          'State e-filing',
        ],
      },
      {
        id: 'tax-5',
        title: 'Business & Ethics',
        description: 'Running a tax practice professionally',
        hours: 20,
        topics: [
          'IRS Circular 230',
          'PTIN requirements',
          'Client confidentiality',
          'Due diligence requirements',
          'Practice management',
        ],
      },
    ],
  },
];

export function getCurriculumBySlug(slug: string): ProgramCurriculum | undefined {
  return programCurriculums.find(c => c.programSlug === slug);
}
