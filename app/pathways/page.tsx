import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Pathways | Free Job Training Programs | Indianapolis | Elevate for Humanity',
  description:
    'Explore career pathways in healthcare, skilled trades, business, and transportation. See course progressions, certifications, salaries, and career options. Free training with WIOA funding.',
  keywords: 'career pathways Indianapolis, job training programs, CNA training, HVAC training, CDL training, barber apprenticeship, tax preparation training, career progression, free job training',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/pathways',
  },
};

const pathways = [
  {
    title: 'Barbering/Cosmetology Pathway',
    slug: 'barber-apprenticeship',
    duration: '12-18 months',
    startingSalary: '$30,000',
    experiencedSalary: '$50,000+',
    courses: [
      { level: 1, title: 'Fundamentals of Barbering', weeks: 4, credits: 4 },
      { level: 1, title: 'Sanitation & Safety', weeks: 2, credits: 2 },
      { level: 2, title: 'Hair Cutting Techniques', weeks: 8, credits: 8 },
      { level: 2, title: 'Styling & Design', weeks: 6, credits: 6 },
      { level: 3, title: 'Advanced Techniques', weeks: 8, credits: 8 },
      { level: 3, title: 'Business Management', weeks: 4, credits: 4 },
      { level: 4, title: 'State Board Preparation', weeks: 4, credits: 4 },
      { level: 4, title: 'Apprenticeship/Practicum', weeks: 16, credits: 16 },
    ],
    certifications: ['State Barber License', 'Sanitation Certification'],
    careers: ['Barber', 'Salon Owner', 'Mobile Barber', 'Barber Instructor'],
  },
  {
    title: 'Certified Nursing Assistant (CNA) Pathway',
    slug: 'cna',
    duration: '4-8 weeks',
    startingSalary: '$28,000',
    experiencedSalary: '$38,000+',
    courses: [
      { level: 1, title: 'Introduction to Healthcare', weeks: 1, credits: 1 },
      { level: 1, title: 'Basic Patient Care', weeks: 2, credits: 2 },
      { level: 2, title: 'Medical Terminology', weeks: 1, credits: 1 },
      { level: 2, title: 'Vital Signs & Measurements', weeks: 1, credits: 1 },
      { level: 3, title: 'Personal Care Skills', weeks: 2, credits: 2 },
      {
        level: 3,
        title: 'Safety & Emergency Procedures',
        weeks: 1,
        credits: 1,
      },
      { level: 4, title: 'Clinical Practicum', weeks: 2, credits: 2 },
      { level: 4, title: 'State Exam Preparation', weeks: 1, credits: 1 },
    ],
    certifications: [
      'State CNA Certification',
      'CPR/First Aid',
      'HIPAA Certification',
    ],
    careers: [
      'Nursing Assistant',
      'Home Health Aide',
      'Hospital CNA',
      'Long-term Care CNA',
    ],
    nextSteps: ['LPN Program', 'RN Program', 'Medical Assistant'],
  },
  {
    title: 'HVAC Technician Pathway',
    slug: 'hvac-technician',
    duration: '8-12 weeks',
    startingSalary: '$35,000',
    experiencedSalary: '$60,000+',
    courses: [
      { level: 1, title: 'HVAC Fundamentals', weeks: 2, credits: 2 },
      { level: 1, title: 'Electrical Basics', weeks: 2, credits: 2 },
      { level: 2, title: 'Refrigeration Principles', weeks: 2, credits: 2 },
      { level: 2, title: 'Heating Systems', weeks: 2, credits: 2 },
      { level: 3, title: 'Air Conditioning Systems', weeks: 2, credits: 2 },
      { level: 3, title: 'Troubleshooting & Repair', weeks: 2, credits: 2 },
      { level: 4, title: 'EPA 608 Certification Prep', weeks: 1, credits: 1 },
      { level: 4, title: 'NATE Certification Prep', weeks: 1, credits: 1 },
    ],
    certifications: ['EPA 608 Universal', 'NATE Certification', 'OSHA 10'],
    careers: [
      'HVAC Technician',
      'Service Technician',
      'Installation Specialist',
      'HVAC Business Owner',
    ],
    nextSteps: ['Advanced HVAC', 'Commercial HVAC', 'HVAC Instructor'],
  },
  {
    title: 'Tax Preparation Pathway',
    slug: 'tax-preparation',
    duration: '8 weeks',
    startingSalary: '$35,000',
    experiencedSalary: '$75,000+',
    courses: [
      { level: 1, title: 'Tax Law Fundamentals', weeks: 2, credits: 2 },
      { level: 1, title: 'Individual Tax Returns', weeks: 2, credits: 2 },
      { level: 2, title: 'Business Tax Returns', weeks: 2, credits: 2 },
      { level: 2, title: 'Tax Software Training', weeks: 1, credits: 1 },
      { level: 3, title: 'Advanced Tax Topics', weeks: 2, credits: 2 },
      {
        level: 3,
        title: 'Ethics & Professional Standards',
        weeks: 1,
        credits: 1,
      },
      { level: 4, title: 'IRS Certification Prep', weeks: 1, credits: 1 },
      { level: 4, title: 'Business Development', weeks: 1, credits: 1 },
    ],
    certifications: [
      'IRS PTIN',
      'AFSP (Annual Filing Season Program)',
      'EA (Enrolled Agent) Prep',
    ],
    careers: [
      'Tax Preparer',
      'Tax Business Owner',
      'Enrolled Agent',
      'Tax Consultant',
    ],
    nextSteps: ['Enrolled Agent', 'CPA Track', 'Tax Attorney Track'],
  },
  {
    title: "Commercial Driver's License (CDL) Pathway",
    slug: 'cdl',
    duration: '4-6 weeks',
    startingSalary: '$45,000',
    experiencedSalary: '$70,000+',
    courses: [
      { level: 1, title: 'CDL Regulations & Safety', weeks: 1, credits: 1 },
      { level: 1, title: 'Vehicle Inspection', weeks: 1, credits: 1 },
      { level: 2, title: 'Basic Vehicle Control', weeks: 1, credits: 1 },
      { level: 2, title: 'Shifting & Operating', weeks: 1, credits: 1 },
      { level: 3, title: 'Road Driving Skills', weeks: 2, credits: 2 },
      { level: 3, title: 'Backing & Maneuvering', weeks: 1, credits: 1 },
      { level: 4, title: 'State CDL Exam Prep', weeks: 1, credits: 1 },
      { level: 4, title: 'Job Placement Prep', weeks: 1, credits: 1 },
    ],
    certifications: [
      'Class A CDL',
      'Hazmat Endorsement (optional)',
      'Tanker Endorsement (optional)',
    ],
    careers: [
      'Truck Driver',
      'Delivery Driver',
      'Owner-Operator',
      'Fleet Manager',
    ],
    nextSteps: [
      'Hazmat Certification',
      'Passenger Endorsement',
      'Trainer Certification',
    ],
  },
];

export default function PathwaysPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <Image
            src="/hero-images/pathways-hero.jpg"
            alt="Career Pathways"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        </div>
      </section>

      {/* Hero Content */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
              Free with funding
            </span>
            <span className="px-3 py-1 bg-brand-blue-600 text-white text-sm font-medium rounded-full">
              Multiple Career Paths
            </span>
            <span className="px-3 py-1 bg-brand-orange-600 text-white text-sm font-medium rounded-full">
              Industry Certifications
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl text-black">
            Career Pathways: Your roadmap from training to career
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-black leading-relaxed">
            Clear, structured paths from training to career success. See exactly what you'll learn, how long it takes, what certifications you'll earn, and where your career can go.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-black hover:bg-gray-50 transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Overview */}
        <div className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            How Our Pathways Work
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold text-black mb-2">Foundation</h3>
              <p className="text-sm text-black">
                Learn core concepts, safety, and industry fundamentals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-bold text-black mb-2">Skills Development</h3>
              <p className="text-sm text-black">
                Build hands-on abilities through practice and training
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-bold text-black mb-2">Advanced Training</h3>
              <p className="text-sm text-black">
                Master complex techniques and specialized skills
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-bold text-black mb-2">Certification & Career</h3>
              <p className="text-sm text-black">
                Earn credentials and start your career
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Our Pathways */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Industry-Recognized Credentials</h3>
            <p className="text-black">
              Earn certifications that employers value and that open doors to career advancement
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Clear Career Outcomes</h3>
            <p className="text-black">
              See exactly what jobs you can get and what you'll earn at each stage of your career
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Ongoing Support</h3>
            <p className="text-black">
              Get guidance from advisors and instructors throughout your training and job search
            </p>
          </div>
        </div>

        {/* Pathways */}
        <div className="space-y-12">
          {pathways.map((pathway) => (
            <div
              key={pathway.slug}
              className="bg-white rounded-lg overflow-hidden"
            >
              {/* Pathway Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {pathway.title}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-100">Duration</div>
                      <div className="font-bold text-lg">{pathway.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-100">Starting Salary</div>
                      <div className="font-bold text-lg">{pathway.startingSalary}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-100">Experienced</div>
                      <div className="font-bold text-lg">{pathway.experiencedSalary}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-100">Certifications</div>
                      <div className="font-bold text-lg">{pathway.certifications.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Sequence */}
              <div className="p-8">
                <h3 className="text-lg font-bold text-black mb-6">
                  Course Sequence
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((level) => (
                    <div key={level}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {level}
                        </div>
                        <h4 className="font-bold text-black">
                          Level {level}:{' '}
                          {level === 1
                            ? 'Foundation'
                            : level === 2
                              ? 'Skills Development'
                              : level === 3
                                ? 'Advanced Training'
                                : 'Certification & Career'}
                        </h4>
                      </div>
                      <div className="ml-11 grid md:grid-cols-2 gap-3">
                        {pathway.courses
                          .filter((course) => course.level === level)
                          .map((course, idx) => (
                            <div
                              key={idx}
                              className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-black mb-1">
                                    {course.title}
                                  </h5>
                                  <p className="text-sm text-black">
                                    {course.weeks} weeks • {course.credits}{' '}
                                    credits
                                  </p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h4 className="font-bold text-black mb-3">
                    Certifications Earned
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pathway.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-brand-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Options */}
                <div className="mt-6">
                  <h4 className="font-bold text-black mb-3">
                    Career Options
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pathway.careers.map((career, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                {pathway.nextSteps && (
                  <div className="mt-6">
                    <h4 className="font-bold text-black mb-3">
                      Continue Your Education
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pathway.nextSteps.map((step, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/programs/${pathway.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition font-medium"
                  >
                    View Full Program Details
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange-600 text-white rounded-lg hover:bg-brand-orange-700 transition font-medium"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-white text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Talk to an advisor to find the right pathway for your goals and
            schedule.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/advising"
              className="px-8 py-4 bg-white text-brand-blue-600 rounded-lg hover:bg-gray-50 transition font-bold text-lg"
            >
              Talk to an Advisor
            </Link>
            <Link
              href="/programs"
              className="px-8 py-4 bg-brand-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-bold text-lg border-2 border-white"
            >
              Browse All Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
