import { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  MapPin,
  DollarSign,
  Building2,
  GraduationCap,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Services | Elevate for Humanity',
  description: 'Resume building, interview prep, and job placement assistance for program graduates.',
};

const SERVICES = [
  {
    icon: FileText,
    title: 'Resume Building',
    description: 'Professional resume writing and ATS optimization to get past applicant tracking systems.',
    href: '/career-services/resume-building',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Interview Coaching',
    description: 'Mock interviews, feedback, and proven strategies to ace your interviews.',
    href: '/career-services/interview-prep',
    color: 'bg-purple-500',
  },
  {
    icon: Briefcase,
    title: 'Job Placement',
    description: 'Direct connections to 50+ hiring employers actively seeking our graduates.',
    href: '/career-services/job-placement',
    color: 'bg-green-500',
  },
  {
    icon: Calendar,
    title: 'Career Counseling',
    description: 'One-on-one guidance to plan your career path and set achievable goals.',
    href: '/career-services/career-counseling',
    color: 'bg-orange-500',
  },
];

const JOBS = [
  {
    title: 'CNA - Full Time',
    company: 'Community Health Network',
    location: 'Indianapolis, IN',
    salary: '$18-22/hr',
    type: 'Full-time',
  },
  {
    title: 'HVAC Technician',
    company: 'Johnson Controls',
    location: 'Carmel, IN',
    salary: '$25-35/hr',
    type: 'Full-time',
  },
  {
    title: 'Medical Assistant',
    company: 'IU Health',
    location: 'Indianapolis, IN',
    salary: '$17-21/hr',
    type: 'Full-time',
  },
  {
    title: 'IT Support Specialist',
    company: 'Salesforce',
    location: 'Remote',
    salary: '$50-65K/yr',
    type: 'Full-time',
  },
];

export default function CareerServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Image */}
      <section className="relative">
        <div className="relative h-[450px] sm:h-[500px]">
          <img
            src="/images/efh/sections/staffing.jpg"
            alt="Career success"
            className="w-full h-full object-cover"
          />
          
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <TrendingUp className="w-4 h-4" />
                  Career Services Included
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Your Career<br />Starts Here
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  From resume building to job placement, we're with you every step. 
                  We don't just train you—we help you get hired.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/career-services/job-placement"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
                  >
                    Browse Jobs <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
                  >
                    Start Training
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold">50+</div>
              <div className="text-green-100">Employer Partners</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold">15+</div>
              <div className="text-green-100">Training Programs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold">Free</div>
              <div className="text-green-100">Career Services</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold">1:1</div>
              <div className="text-green-100">Advisor Support</div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link href="/outcomes" className="text-green-200 text-sm hover:text-white underline">
              View outcomes methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How We Help You Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive career support from day one through employment
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Job Openings
              </h2>
              <p className="text-gray-600">Exclusive opportunities for our graduates</p>
            </div>
            <Link
              href="/career-services/job-placement"
              className="hidden sm:flex items-center gap-2 text-blue-600 font-medium hover:underline"
            >
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {JOBS.map((job, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-blue-200 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/career-services/job-placement"
              className="inline-flex items-center gap-2 text-blue-600 font-medium"
            >
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real graduates, real careers, real success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Marcus J.', program: 'HVAC Technician', company: 'Carrier', salary: '$58,000', quote: 'The career services team helped me land my dream job before I even graduated.' },
              { name: 'Sarah W.', program: 'CNA', company: 'Community Health', salary: '$42,000', quote: 'From resume help to interview prep, they were with me every step of the way.' },
              { name: 'David C.', program: 'IT Support', company: 'Tech Solutions', salary: '$55,000', quote: 'I had three job offers within two weeks of completing my certification.' },
            ].map((story) => (
              <div key={story.name} className="bg-gray-50 rounded-2xl p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {story.name.split(' ')[0][0]}{story.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-gray-500 text-sm">{story.program}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{story.quote}"</p>
                <div className="flex items-center justify-between text-sm pt-4 border-t">
                  <span className="text-gray-500">Now at {story.company}</span>
                  <span className="text-green-600 font-semibold">{story.salary}/yr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="/images/efh/sections/coaching.jpg"
            alt="Success"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/80" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Launch Your Career?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start your training today and let us help you get hired.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition border-2 border-white"
            >
              Talk to Career Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
