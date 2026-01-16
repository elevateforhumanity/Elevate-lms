import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Briefcase,
  Clock,
  MapPin,
  Award,
  DollarSign,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
  Users,
  GraduationCap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Pathways | Elevate For Humanity',
  description: 'Explore career pathways in healthcare, skilled trades, technology, and business. Find your path to a rewarding career with free training.',
};

export default async function PathwaysPage() {
  // Use static data - pathways/pathway_industries tables don't exist
  const pathwayCount = 12;
  const graduateCount = 500;
  const employerCount = 50;

  const defaultPathways = [
    {
      id: '1',
      title: 'Certified Nursing Assistant (CNA)',
      industry: 'Healthcare',
      description: 'Start your healthcare career as a CNA. Provide essential patient care in hospitals, nursing homes, and home health settings.',
      duration: '4-6 weeks',
      salary_range: '$32,000 - $45,000',
      location: 'Indianapolis, IN',
      format: 'Hybrid',
      funding: ['WIOA', 'State Grant'],
      outcomes: ['State CNA Certification', 'CPR/First Aid', 'Job Placement'],
      image_url: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'HVAC Technician',
      industry: 'Skilled Trades',
      description: 'Learn to install, maintain, and repair heating, ventilation, and air conditioning systems. High demand trade with excellent pay.',
      duration: '12-16 weeks',
      salary_range: '$45,000 - $65,000',
      location: 'Indianapolis, IN',
      format: 'In-Person',
      funding: ['WIOA', 'Employer Reimbursement'],
      outcomes: ['EPA 608 Certification', 'OSHA 10', 'Job Placement'],
      image_url: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'Commercial Driver (CDL)',
      industry: 'Transportation',
      description: 'Obtain your Commercial Driver License and start a career in trucking. Local and long-haul opportunities available.',
      duration: '3-4 weeks',
      salary_range: '$50,000 - $75,000',
      location: 'Indianapolis, IN',
      format: 'In-Person',
      funding: ['WIOA', 'State Grant'],
      outcomes: ['Class A CDL', 'Hazmat Endorsement', 'Job Placement'],
      image_url: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      title: 'IT Support Specialist',
      industry: 'Technology',
      description: 'Launch your tech career with CompTIA certifications. Provide technical support and troubleshooting for businesses.',
      duration: '8-12 weeks',
      salary_range: '$40,000 - $55,000',
      location: 'Indianapolis, IN',
      format: 'Hybrid',
      funding: ['WIOA', 'State Grant'],
      outcomes: ['CompTIA A+', 'CompTIA Network+', 'Job Placement'],
      image_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '5',
      title: 'Medical Assistant',
      industry: 'Healthcare',
      description: 'Work alongside physicians in clinics and medical offices. Perform clinical and administrative duties.',
      duration: '12-16 weeks',
      salary_range: '$35,000 - $48,000',
      location: 'Indianapolis, IN',
      format: 'Hybrid',
      funding: ['WIOA', 'State Grant'],
      outcomes: ['CCMA Certification', 'Phlebotomy', 'Job Placement'],
      image_url: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '6',
      title: 'Barber Apprenticeship',
      industry: 'Personal Services',
      description: 'Master the art of barbering through hands-on apprenticeship. Build your clientele while earning.',
      duration: '18 months',
      salary_range: '$30,000 - $60,000+',
      location: 'Indianapolis, IN',
      format: 'In-Person',
      funding: ['WIOA', 'State Grant'],
      outcomes: ['Indiana Barber License', 'Business Skills', 'Job Placement'],
      image_url: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const displayPathways = defaultPathways;

  const stats = [
    { icon: Briefcase, value: pathwayCount || 15, label: 'Career Pathways' },
    { icon: GraduationCap, value: graduateCount || 500, label: 'Graduates' },
    { icon: Users, value: employerCount || 50, label: 'Hiring Partners' },
    { icon: TrendingUp, value: '85%', label: 'Placement Rate' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[450px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Career Pathways
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Discover your path to a rewarding career. Free training programs in healthcare, 
            skilled trades, technology, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold">
                  {typeof stat.value === 'number' ? `${stat.value}+` : stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search pathways by title, industry, or outcome..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Link href="/pathways?industry=healthcare" className="px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Healthcare</Link>
              <Link href="/pathways?industry=trades" className="px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Trades</Link>
              <Link href="/pathways?industry=technology" className="px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Technology</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">All Pathways</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPathways.map((pathway: any) => (
              <div
                key={pathway.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition group"
              >
                <div className="h-48 relative">
                  {pathway.image_url ? (
                    <img
                      src={pathway.image_url}
                      alt={pathway.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {pathway.industry}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{pathway.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pathway.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {pathway.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {pathway.location}
                    </span>
                  </div>
                  {pathway.salary_range && (
                    <div className="flex items-center gap-1 text-green-600 font-medium text-sm mb-4">
                      <DollarSign className="w-4 h-4" /> {pathway.salary_range}
                    </div>
                  )}
                  {pathway.outcomes && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {pathway.outcomes.slice(0, 3).map((outcome: string, i: number) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {outcome}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-green-600 font-bold">FREE</span>
                    <Link
                      href={`/pathways/${pathway.slug || pathway.id}`}
                      className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Pathway Is Right for You?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Talk to a career advisor who can help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Talk to an Advisor
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
