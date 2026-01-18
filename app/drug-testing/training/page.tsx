import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowLeft, ExternalLink, GraduationCap, Award, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drug Testing Training Courses | Elevate for Humanity',
  description: 'DOT and non-DOT drug testing training courses. Supervisor training, collector certification, DER training. Online courses with certification.',
};

const courses = [
  {
    category: 'Supervisor Training',
    items: [
      {
        name: 'DOT Supervisor Training Course',
        price: 75,
        description: 'Required training for supervisors of DOT-regulated employees. Learn to identify signs of drug and alcohol use and make reasonable suspicion determinations.',
        duration: '2 hours',
        certification: 'DOT Compliant Certificate',
        link: 'https://mydrugtesttraining.com/course/dot-supervisor-training-course',
      },
      {
        name: 'Non-DOT Supervisor Training Course',
        price: 75,
        description: 'Training for supervisors in non-DOT workplaces. Covers drug-free workplace policies, recognizing impairment, and documentation.',
        duration: '2 hours',
        certification: 'Certificate of Completion',
        link: 'https://mydrugtesttraining.com/course/nds-non-dot-supervisor-training-course',
      },
    ],
  },
  {
    category: 'Employee Training',
    items: [
      {
        name: 'Drug Free Workplace Training for Employees',
        price: 29,
        description: 'Employee awareness training covering drug-free workplace policies, testing procedures, and consequences of violations.',
        duration: '1 hour',
        certification: 'Certificate of Completion',
        link: 'https://mydrugtesttraining.com/course/drug-free-workplace-training-for-employees',
        popular: true,
      },
    ],
  },
  {
    category: 'Collector Certification',
    items: [
      {
        name: 'DOT Urine Specimen Collector Training and Mocks',
        price: 749,
        description: 'Complete DOT urine collector certification. Includes online training and mock collections required for certification.',
        duration: '8+ hours',
        certification: 'DOT Collector Certification',
        link: 'https://mydrugtesttraining.com/course/dot-urine-specimen-collector-training-and-mocks',
      },
      {
        name: 'DOT Urine Collector Mock Collections',
        price: 379,
        description: 'Mock collection sessions for collectors who have completed training. Required for initial certification and refresher.',
        duration: '2-3 hours',
        certification: 'Mock Completion Certificate',
        link: 'https://mydrugtesttraining.com/course/nds-dot-collector-mock-collections',
      },
      {
        name: 'DOT Oral Fluid Collector Training (Mocks Included)',
        price: 799,
        description: 'NEW! Complete training for DOT oral fluid specimen collection. Includes mock collections.',
        duration: '8+ hours',
        certification: 'DOT Oral Fluid Collector Certification',
        link: 'https://mydrugtesttraining.com/course/dot-oral-fluid-collector-mocks',
        new: true,
      },
      {
        name: 'Saliva/Oral Fluid Non-DOT Drug Testing Training',
        price: 399,
        description: 'Training for non-DOT oral fluid specimen collection procedures.',
        duration: '4 hours',
        certification: 'Certificate of Completion',
        link: 'https://mydrugtesttraining.com/course/nds-saliva-oral-fluid-drug-testing-training',
      },
    ],
  },
  {
    category: 'DER Training (Designated Employer Representative)',
    items: [
      {
        name: 'DER Training Course - FMCSA',
        price: 249,
        description: 'Comprehensive DER training for FMCSA-regulated employers. Covers all DER responsibilities and Clearinghouse requirements.',
        duration: '4 hours',
        certification: 'DER Certificate',
        link: 'https://mydrugtesttraining.com/course/nds-der-training-course-fmcsa',
      },
      {
        name: 'DER Training Course - FAA',
        price: 249,
        description: 'DER training specific to FAA drug and alcohol testing requirements.',
        duration: '4 hours',
        certification: 'DER Certificate',
        link: 'https://mydrugtesttraining.com/course/nds-der-training-course-faa',
      },
      {
        name: 'Non-DOT General DER Training',
        price: 249,
        description: 'DER training for non-DOT employers managing workplace drug testing programs.',
        duration: '4 hours',
        certification: 'DER Certificate',
        link: 'https://mydrugtesttraining.com/course/nds-non-dot-general-designated-employer-representative-training-der',
      },
    ],
  },
  {
    category: 'Advanced & Business Training',
    items: [
      {
        name: 'Drug Testing Start-Up Overview',
        price: 119,
        description: 'Learn how to start a drug testing business. Covers industry overview, requirements, and business setup.',
        duration: '2 hours',
        certification: 'Certificate of Completion',
        link: 'https://mydrugtesttraining.com/course/nds-drug-testing-start-up-overview',
      },
      {
        name: 'DOT Urine Specimen Collector Train the Trainer',
        price: 1999,
        description: 'Become a qualified trainer for DOT urine specimen collectors. For experienced collectors wanting to train others.',
        duration: '16+ hours',
        certification: 'Train the Trainer Certification',
        link: 'https://mydrugtesttraining.com/course/nds-dot-urine-specimen-collector-train-the-trainer',
      },
    ],
  },
];

export default function DrugTestingTrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/drug-testing" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Drug Testing
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-indigo-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Drug Testing Training Courses</h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-2xl mb-8">
            Online certification courses for supervisors, collectors, and employers. 
            DOT-compliant training with certificates upon completion.
          </p>
          <a
            href="https://mydrugtesttraining.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition"
          >
            Browse All Courses
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-indigo-50 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">100% Online</div>
                <div className="text-sm text-gray-600">Learn at your pace</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Certificates</div>
                <div className="text-sm text-gray-600">Instant download</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Self-Paced</div>
                <div className="text-sm text-gray-600">Start anytime</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Group Rates</div>
                <div className="text-sm text-gray-600">Call for pricing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {courses.map((category) => (
            <div key={category.category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-indigo-200">
                {category.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((course) => (
                  <div
                    key={course.name}
                    className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-shadow ${
                      course.popular ? 'border-green-500' : course.new ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    {course.popular && (
                      <div className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-3">
                        MOST POPULAR
                      </div>
                    )}
                    {course.new && (
                      <div className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded mb-3">
                        NEW
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                    
                    <div className="text-sm text-indigo-600 font-medium mb-4">
                      <Award className="w-4 h-4 inline mr-1" />
                      {course.certification}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition text-sm"
                      >
                        Enroll
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Group Training */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Group Training?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We offer volume discounts for employers training multiple supervisors or employees. 
            Contact us for custom pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="https://mydrugtesttraining.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition border-2 border-gray-200"
            >
              Visit Training Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Certified?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            All courses are available online. Start training today and get your certificate.
          </p>
          <a
            href="https://mydrugtesttraining.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-indigo-50 transition text-lg"
          >
            Browse All Courses
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
