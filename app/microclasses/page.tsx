import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { 
  Clock, Award, ArrowRight, Play, BookOpen, 
  Zap, Target, CheckCircle, Smartphone, Calendar, Users
} from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'Microclasses | Short Courses & Quick Certifications | Elevate',
  description: 'Learn new skills in hours, not months. Microclasses offer focused training in high-demand topics. Digital badges and certificates included.',
  alternates: { canonical: `${SITE_URL}/microclasses` },
  keywords: [
    'microclasses Indianapolis',
    'short courses online',
    'quick certifications',
    'micro-credentials',
    'digital badges',
    'skill-based learning',
    'professional development courses',
    'career upskilling',
    'lunch and learn courses',
    'bite-sized learning',
    'workforce training short courses',
    'certificate programs Indianapolis',
    'online learning Indiana',
    'continuing education',
  ],
  openGraph: {
    title: 'Microclasses | Short Courses & Quick Certifications',
    description: 'Learn new skills in hours, not months. Focused training with digital badges.',
    url: `${SITE_URL}/microclasses`,
    siteName: 'Elevate for Humanity',
    images: [{ url: `${SITE_URL}/images/micro-classes-hero.jpg`, width: 1200, height: 630, alt: 'Microclasses - Short Courses' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microclasses | Short Courses & Quick Certifications',
    description: 'Learn new skills in hours, not months. Focused training with digital badges.',
    images: [`${SITE_URL}/images/micro-classes-hero.jpg`],
  },
};

const categories = [
  {
    title: 'Workplace Safety',
    icon: '🦺',
    courses: [
      { name: 'OSHA 10-Hour General Industry', duration: '10 hours', badge: true },
      { name: 'OSHA 30-Hour Construction', duration: '30 hours', badge: true },
      { name: 'Forklift Certification', duration: '4 hours', badge: true },
      { name: 'Bloodborne Pathogens', duration: '2 hours', badge: true },
    ],
  },
  {
    title: 'Healthcare Essentials',
    icon: '🏥',
    courses: [
      { name: 'CPR/AED/First Aid (HSI)', duration: '4 hours', badge: true },
      { name: 'BLS for Healthcare Providers', duration: '4 hours', badge: true },
      { name: 'HIPAA Compliance', duration: '2 hours', badge: true },
      { name: 'Infection Control', duration: '3 hours', badge: true },
    ],
  },
  {
    title: 'Professional Skills',
    icon: '💼',
    courses: [
      { name: 'Customer Service Excellence', duration: '3 hours', badge: true },
      { name: 'Workplace Communication', duration: '2 hours', badge: true },
      { name: 'Time Management', duration: '2 hours', badge: true },
      { name: 'Conflict Resolution', duration: '3 hours', badge: true },
    ],
  },
  {
    title: 'Technology',
    icon: '💻',
    courses: [
      { name: 'Microsoft Office Basics', duration: '6 hours', badge: true },
      { name: 'Google Workspace', duration: '4 hours', badge: true },
      { name: 'Digital Literacy', duration: '3 hours', badge: true },
      { name: 'Cybersecurity Awareness', duration: '2 hours', badge: true },
    ],
  },
  {
    title: 'Food Service',
    icon: '🍽️',
    courses: [
      { name: 'Food Handler Certification', duration: '2 hours', badge: true },
      { name: 'ServSafe Manager', duration: '8 hours', badge: true },
      { name: 'Allergen Awareness', duration: '1 hour', badge: true },
      { name: 'Food Safety Basics', duration: '2 hours', badge: true },
    ],
  },
  {
    title: 'Leadership',
    icon: '🎯',
    courses: [
      { name: 'Supervisory Skills', duration: '4 hours', badge: true },
      { name: 'Team Building', duration: '3 hours', badge: true },
      { name: 'Performance Management', duration: '3 hours', badge: true },
      { name: 'Coaching & Mentoring', duration: '4 hours', badge: true },
    ],
  },
];

const benefits = [
  { icon: Clock, title: 'Learn Fast', desc: 'Complete courses in hours, not months' },
  { icon: Award, title: 'Earn Badges', desc: 'Digital credentials for your resume' },
  { icon: Smartphone, title: 'Learn Anywhere', desc: 'Mobile-friendly, on-demand access' },
  { icon: Target, title: 'Focused Content', desc: 'No fluff, just essential skills' },
];

export default function MicroclassesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Microclasses' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image 
          src="/images/micro-classes-hero.jpg" 
          alt="Microclasses - Short Courses" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Zap className="w-4 h-4" /> Quick Skills, Big Impact
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Microclasses
            </h1>
            <p className="text-xl text-white/90 max-w-xl mb-6">
              Learn new skills in hours, not months. Focused training with digital badges and certificates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#courses" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
                Browse Courses <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/lms" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/40">
                <Play className="w-5 h-5" /> Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <benefit.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">{benefit.title}</div>
                <div className="text-slate-400 text-sm">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Are Microclasses */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">What Are Microclasses?</h2>
              <p className="text-lg text-slate-600 mb-6">
                Microclasses are short, focused courses designed to teach specific skills quickly. 
                Unlike traditional programs that take months, microclasses can be completed in hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Skill-Focused</h3>
                    <p className="text-slate-600">Each course teaches one specific, marketable skill</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Industry-Recognized</h3>
                    <p className="text-slate-600">Certifications employers actually look for</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Stackable</h3>
                    <p className="text-slate-600">Combine multiple badges to build your profile</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Perfect For:</h3>
              <div className="space-y-4">
                {[
                  'Job seekers adding quick credentials',
                  'Employees needing compliance training',
                  'Career changers exploring new fields',
                  'Students supplementing their education',
                  'Employers upskilling their teams',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="courses" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Course Categories</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Browse our library of microclasses. Each course includes a digital badge upon completion.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-bold text-xl text-slate-900 mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.courses.map((course, j) => (
                    <li key={j} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">{course.name}</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.duration}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/lms/courses" className="mt-6 inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Choose a Course', desc: 'Browse our catalog and pick a topic' },
              { num: 2, title: 'Learn Online', desc: 'Watch videos, read materials, take quizzes' },
              { num: 3, title: 'Pass Assessment', desc: 'Complete the final assessment' },
              { num: 4, title: 'Earn Your Badge', desc: 'Get your digital credential instantly' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-6">For Employers</h2>
              <p className="text-blue-100 mb-6">
                Need to train your team quickly? Microclasses are perfect for compliance training, 
                onboarding, and professional development.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Bulk enrollment discounts',
                  'Progress tracking dashboard',
                  'Completion certificates',
                  'Custom course bundles',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-200" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/employers" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all">
                Employer Solutions <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <Users className="w-10 h-10 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-blue-200 text-sm">Employers Served</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <Award className="w-10 h-10 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-blue-200 text-sm">Badges Issued</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <BookOpen className="w-10 h-10 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-blue-200 text-sm">Courses Available</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <Calendar className="w-10 h-10 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Start Learning Today
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Pick a course and earn your first badge in just a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/lms/courses" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105">
              Browse Courses <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-full font-bold text-lg transition-all border border-white/30">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
