import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Award,
  Users,
  CheckCircle,
  MapPin,
  Briefcase,
  GraduationCap,
  Play,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Training Programs | Elevate For Humanity',
  description: 'Free workforce training in healthcare, skilled trades, IT, and business. WIOA funded programs with job placement.',
};

const PROGRAMS = [
  {
    id: 'cna',
    name: 'Certified Nursing Assistant',
    slug: 'cna',
    category: 'Healthcare',
    description: 'Start your healthcare career as a CNA. Learn patient care, vital signs, and medical terminology. Work in hospitals, nursing homes, and clinics.',
    duration: '4-6 weeks',
    format: 'Hybrid',
    funding: 'WIOA Funded',
    salary: '$32,000 - $45,000',
    image: '/images/efh/programs/cna.jpg',
  },
  {
    id: 'hvac',
    name: 'HVAC Technician',
    slug: 'hvac',
    category: 'Skilled Trades',
    description: 'Learn heating, ventilation, and air conditioning installation and repair. High-demand career with excellent pay and year-round work.',
    duration: '12-18 months',
    format: 'Apprenticeship',
    funding: 'USDOL Registered',
    salary: '$45,000 - $75,000',
    image: '/images/efh/programs/trades.jpg',
  },
  {
    id: 'barber',
    name: 'Barber Apprenticeship',
    slug: 'barber-apprenticeship',
    category: 'Beauty',
    description: 'Master barbering skills and earn your Indiana Barber License. 1,500 hours of hands-on training with experienced professionals.',
    duration: '18 months',
    format: 'Apprenticeship',
    funding: '$4,980 Tuition',
    salary: '$45,000 - $100,000+',
    image: '/images/efh/hero/hero-barber.jpg',
  },
  {
    id: 'cdl',
    name: 'CDL Commercial Driving',
    slug: 'cdl',
    category: 'Transportation',
    description: 'Get your Commercial Driver\'s License in just 3-4 weeks. Class A and Class B training available with job placement assistance.',
    duration: '3-4 weeks',
    format: 'In-Person',
    funding: 'WIOA Funded',
    salary: '$50,000 - $80,000',
    image: '/images/trades/program-cdl-commercial-driving.jpg',
  },
  {
    id: 'phlebotomy',
    name: 'Phlebotomy Technician',
    slug: 'phlebotomy',
    category: 'Healthcare',
    description: 'Learn blood collection techniques and laboratory procedures. Quick certification for immediate employment in healthcare settings.',
    duration: '4-8 weeks',
    format: 'Hybrid',
    funding: 'WIOA Funded',
    salary: '$35,000 - $48,000',
    image: '/images/healthcare/hero-program-phlebotomy.jpg',
  },
  {
    id: 'welding',
    name: 'Welding Technology',
    slug: 'welding',
    category: 'Skilled Trades',
    description: 'Learn MIG, TIG, and stick welding techniques. Industry certifications included with hands-on shop training.',
    duration: '12-16 weeks',
    format: 'In-Person',
    funding: 'WIOA Funded',
    salary: '$42,000 - $72,000',
    image: '/images/trades/hero-program-welding.jpg',
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width Image */}
      <section className="relative h-[70vh] min-h-[600px]">
        <img
          src="/images/efh/hero/hero-main-clean.jpg"
          alt="Students in training"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8">
                <CheckCircle className="w-5 h-5" />
                Most Programs 100% Free
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1]">
                Launch Your<br />New Career
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed">
                Free workforce training in healthcare, skilled trades, technology, and more. 
                Get certified. Get hired. Get ahead.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl"
                >
                  Apply Now <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  href="#programs"
                  className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
                >
                  <Play className="w-6 h-6" /> Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black">15+</div>
              <div className="text-blue-100 text-lg mt-1">Programs</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black">500+</div>
              <div className="text-blue-100 text-lg mt-1">Graduates</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black">85%</div>
              <div className="text-blue-100 text-lg mt-1">Job Placement</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black">50+</div>
              <div className="text-blue-100 text-lg mt-1">Employers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free Training</h3>
                <p className="text-gray-600">No tuition, no fees, no student debt. Focus on learning, not paying.</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WIOA Funded</h3>
                <p className="text-gray-600">Federal workforce funding covers your training costs when you qualify.</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Job Placement</h3>
                <p className="text-gray-600">Career services included. We help you get hired after graduation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from healthcare, skilled trades, technology, and more
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {['All Programs', 'Healthcare', 'Skilled Trades', 'Technology', 'Beauty'].map((cat, i) => (
              <button
                key={cat}
                className={`px-6 py-3 rounded-full text-base font-semibold transition ${
                  i === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs Grid - Large Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {PROGRAMS.map((program) => (
              <Link
                key={program.id}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Large Image */}
                  <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-sm font-bold px-4 py-2 rounded-full ${
                        program.funding.includes('$')
                          ? 'bg-purple-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                        {program.funding}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-3/5 p-8">
                    <div className="text-sm font-semibold text-blue-600 mb-3">{program.category}</div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition">
                      {program.name}
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-6 text-base text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {program.format}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Average Salary</div>
                        <div className="text-xl font-bold text-green-600">{program.salary}</div>
                      </div>
                      <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold group-hover:bg-blue-700 transition">
                        Learn More <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-14">
            <Link
              href="/programs/all"
              className="inline-flex items-center gap-2 text-blue-600 text-lg font-semibold hover:underline"
            >
              View All 15+ Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Your path from application to employment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { step: '1', title: 'Apply', desc: 'Submit your free application online in minutes' },
              { step: '2', title: 'Get Approved', desc: 'We verify your WIOA eligibility for free training' },
              { step: '3', title: 'Train', desc: 'Complete your certification program with expert instructors' },
              { step: '4', title: 'Get Hired', desc: 'Our career services team helps you land your new job' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <img
          src="/images/efh/sections/staffing.jpg"
          alt="Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/85" />
        
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-10">
            Apply today. Most students qualify for 100% free training.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-xl"
            >
              Apply Now <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition border-2 border-white"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
