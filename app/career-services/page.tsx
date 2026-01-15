import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Users,
  Briefcase,
  Target,
  Calendar,
  Phone,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Building2,
  Handshake,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Services | Free Job Placement Support | Elevate For Humanity',
  description:
    'Free career services in Indianapolis including resume building, interview prep, job placement assistance, and career counseling. We help you land your next job.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/career-services',
  },
};

const services = [
  {
    title: 'Resume Building',
    description: 'Professional resume writing and optimization to help you stand out to employers and pass ATS systems.',
    icon: FileText,
    href: '/career-services/resume-building',
    color: 'orange',
  },
  {
    title: 'Interview Preparation',
    description: 'Mock interviews, coaching, and feedback to help you confidently answer questions and make a great impression.',
    icon: Users,
    href: '/career-services/interview-prep',
    color: 'blue',
  },
  {
    title: 'Job Search Assistance',
    description: 'Access to job boards, employer connections, and personalized job matching based on your skills and goals.',
    icon: Search,
    href: '/career-services/job-search',
    color: 'green',
  },
  {
    title: 'Career Counseling',
    description: 'One-on-one guidance to help you identify career paths, set goals, and create an action plan for success.',
    icon: Target,
    href: '/career-services/counseling',
    color: 'purple',
  },
  {
    title: 'Employer Connections',
    description: 'Direct introductions to hiring managers at companies actively seeking candidates with your qualifications.',
    icon: Building2,
    href: '/employers',
    color: 'slate',
  },
  {
    title: 'Ongoing Support',
    description: 'Career support doesn\'t end at placement. We provide follow-up assistance to help you succeed in your new role.',
    icon: Handshake,
    href: '/contact',
    color: 'orange',
  },
];

const process = [
  {
    step: 1,
    title: 'Schedule a Consultation',
    description: 'Book a free meeting with our career specialists to discuss your background, skills, and career goals.',
  },
  {
    step: 2,
    title: 'Assess Your Needs',
    description: 'We evaluate your current situation and create a personalized plan to help you reach your employment goals.',
  },
  {
    step: 3,
    title: 'Build Your Tools',
    description: 'Work with us to create a professional resume, practice interviewing, and develop your job search strategy.',
  },
  {
    step: 4,
    title: 'Connect with Employers',
    description: 'We introduce you to employers hiring in your field and support you through the application process.',
  },
  {
    step: 5,
    title: 'Land Your Job',
    description: 'Accept an offer and start your new career. We continue to support you during your transition.',
  },
];

export default function CareerServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Video Hero */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/career-services-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-600 p-3 rounded-xl">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <span className="text-orange-400 font-semibold text-lg">100% Free Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Career Services That Get You Hired
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              From resume building to job placement, our career specialists provide 
              personalized support to help you land your next opportunity. All services 
              are completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-colors"
              >
                <Calendar className="h-5 w-5" />
                Schedule Free Consultation
              </Link>
              <a
                href="tel:317-314-3757"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call 317-314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Who We Help</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our career services are available to anyone in the Indianapolis area looking for employment support
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-800 rounded-xl p-6">
              <GraduationCap className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <div className="font-semibold">Recent Graduates</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <Users className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <div className="font-semibold">Career Changers</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <Briefcase className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <div className="font-semibold">Job Seekers</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <Target className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <div className="font-semibold">Re-entry Individuals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Career Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support at every stage of your job search journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-orange-200 transition-all"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  service.color === 'orange' ? 'bg-orange-100' :
                  service.color === 'blue' ? 'bg-blue-100' :
                  service.color === 'green' ? 'bg-green-100' :
                  service.color === 'purple' ? 'bg-purple-100' :
                  'bg-slate-100'
                }`}>
                  <service.icon className={`h-7 w-7 ${
                    service.color === 'orange' ? 'text-orange-600' :
                    service.color === 'blue' ? 'text-blue-600' :
                    service.color === 'green' ? 'text-green-600' :
                    service.color === 'purple' ? 'text-purple-600' :
                    'text-slate-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold">
                  Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Your path from job seeker to employed in five steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {process.map((item, index) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {item.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="w-0.5 h-full bg-orange-200 mt-2" />
                    )}
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm flex-1 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What to Expect
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                When you work with our career services team, you get personalized 
                attention and support tailored to your unique situation and goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">One-on-One Support</h4>
                    <p className="text-gray-600">Work directly with a dedicated career specialist who understands your goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">No Cost to You</h4>
                    <p className="text-gray-600">All services are funded through workforce development grants—completely free.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Flexible Scheduling</h4>
                    <p className="text-gray-600">In-person, phone, or video appointments available to fit your schedule.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Employer Network</h4>
                    <p className="text-gray-600">Access to our network of employers actively hiring in Indianapolis.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Schedule a free consultation with our career services team. We&apos;ll 
                discuss your background, goals, and create a plan to help you succeed.
              </p>
              <div className="space-y-4">
                <Link
                  href="/schedule"
                  className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-4 rounded-full font-bold hover:bg-orange-700 transition-colors w-full"
                >
                  <Calendar className="h-5 w-5" />
                  Schedule Free Consultation
                </Link>
                <a
                  href="tel:317-314-3757"
                  className="flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors w-full border border-gray-200"
                >
                  <Phone className="h-5 w-5" />
                  Call 317-314-3757
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Available Monday–Friday, 9am–5pm EST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Your Next Career Starts Here
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don&apos;t navigate your job search alone. Our career specialists are ready 
            to help you build the skills and connections you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-colors"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/pathways"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Explore Career Pathways
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
