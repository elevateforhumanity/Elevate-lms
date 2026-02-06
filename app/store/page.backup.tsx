import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Zap, Globe, GraduationCap, Code, Users, ShoppingBag, FileText, Shield, Building2, Heart, Wrench, DollarSign, BookOpen } from 'lucide-react';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description: 'Platform licenses, certification courses, toolkits, workbooks, and workforce development resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
};

// Store Categories with images and links to subpages
const storeCategories = [
  {
    id: 'licenses',
    name: 'Platform Licenses',
    description: 'Full workforce platform deployment with LMS, admin dashboard, enrollment, and compliance tools.',
    image: '/images/technology/hero-programs-technology.jpg',
    href: '/store/licenses',
    icon: Globe,
    color: 'bg-orange-600',
    featured: true,
    products: ['Core Platform $4,999', 'School License $15,000', 'Enterprise $50,000'],
  },
  {
    id: 'infrastructure',
    name: 'Monthly Infrastructure',
    description: 'Self-operating workforce infrastructure with automated intake, compliance, and credentialing.',
    image: '/images/technology/hero-program-it-support.jpg',
    href: '/store/licenses#monthly',
    icon: Zap,
    color: 'bg-blue-600',
    featured: true,
    products: ['Core $750/mo', 'Institutional $2,500/mo', 'Enterprise $8,500/mo'],
  },
  {
    id: 'certifications',
    name: 'Professional Certifications',
    description: 'Industry-recognized credentials from Certiport, HSI, and CareerSafe.',
    image: '/images/healthcare/hero-healthcare-professionals.jpg',
    href: '/store/courses',
    icon: GraduationCap,
    color: 'bg-green-600',
    products: ['Microsoft Office', 'Adobe Creative', 'Healthcare', 'OSHA Safety'],
  },
  {
    id: 'programs',
    name: 'Training Programs',
    description: 'Complete career training programs with hands-on instruction and job placement.',
    image: '/images/programs-hq/barber-hero.jpg',
    href: '/programs',
    icon: Users,
    color: 'bg-purple-600',
    products: ['Barber Apprenticeship', 'CNA Training', 'HVAC Certification', 'CDL Training'],
  },
  {
    id: 'compliance',
    name: 'Compliance Tools',
    description: 'WIOA, FERPA, WCAG compliance checklists, templates, and reporting tools.',
    image: '/images/heroes-hq/funding-hero.jpg',
    href: '/store/compliance',
    icon: Shield,
    color: 'bg-teal-600',
    products: ['WIOA Compliance', 'FERPA Templates', 'Grant Reporting', 'Audit Prep'],
  },
  {
    id: 'ai-tools',
    name: 'AI & Automation',
    description: 'AI-powered tutoring, content creation, and automated workflows.',
    image: '/images/technology/hero-program-cybersecurity.jpg',
    href: '/store/ai-studio',
    icon: Wrench,
    color: 'bg-violet-600',
    products: ['AI Studio', 'AI Tutor', 'AI Instructor Pack'],
  },
  {
    id: 'apps',
    name: 'Apps & Integrations',
    description: 'SAM.gov registration, Grants.gov navigator, website builder, and more.',
    image: '/images/team-hq/team-meeting.jpg',
    href: '/store/apps',
    icon: Building2,
    color: 'bg-sky-600',
    products: ['SAM.gov Assistant', 'Grants Navigator', 'Website Builder'],
  },
  {
    id: 'developer',
    name: 'Developer Licenses',
    description: 'Full codebase access for self-hosting and custom deployments.',
    image: '/images/technology/hero-programs-technology.jpg',
    href: '/store/licenses#developer',
    icon: Code,
    color: 'bg-slate-700',
    products: ['Starter $299', 'Pro $999', 'Enterprise $5,000'],
  },
  {
    id: 'digital',
    name: 'Digital Resources',
    description: 'Toolkits, guides, templates, and educational materials.',
    image: '/images/business/program-tax-preparation.jpg',
    href: '/store/digital',
    icon: FileText,
    color: 'bg-indigo-600',
    products: ['Tax Business Toolkit', 'Grant Guide', 'Fund-Ready Course'],
  },
  {
    id: 'shop',
    name: 'Shop & Supplies',
    description: 'Tools, apparel, workbooks, and supplies for your training.',
    image: '/images/programs-hq/hvac-technician.jpg',
    href: '/shop',
    icon: ShoppingBag,
    color: 'bg-pink-600',
    products: ['Tool Kits', 'Scrubs', 'Workbooks', 'Safety Gear'],
  },
];

// Featured Products with demos
const featuredProducts = [
  {
    id: 'school-license',
    name: 'School / Training Provider License',
    description: 'White-label platform with compliance tools, partner dashboard, and case management.',
    price: '$15,000',
    image: '/images/technology/hero-programs-technology.jpg',
    href: '/store/licenses/school-license',
    demoHref: '/demo/admin',
    badge: 'Most Popular',
  },
  {
    id: 'barber-program',
    name: 'Barber Apprenticeship Program',
    description: '1,500-hour state-approved apprenticeship with master barber instruction.',
    price: 'Funded Available',
    image: '/images/programs-hq/barber-training.jpg',
    href: '/programs/barber-apprenticeship',
    demoHref: '/programs/barber-apprenticeship#curriculum',
    badge: 'WIOA Eligible',
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor License',
    description: 'Personalized AI tutoring for learners with 24/7 support and progress tracking.',
    price: '$999',
    image: '/images/technology/hero-program-it-support.jpg',
    href: '/store/ai-studio',
    demoHref: '/demo/learner',
    badge: 'New',
  },
];

// Quick Stats
const stats = [
  { label: 'Platform Licenses Sold', value: '150+' },
  { label: 'Certifications Offered', value: '25+' },
  { label: 'Training Programs', value: '12' },
  { label: 'Students Trained', value: '5,000+' },
];

export default function StorePage() {
  return (
    <div className="bg-white">
      {/* Hero with Avatar */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black mb-6">
                Workforce Infrastructure Store
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Platform licenses, professional certifications, training programs, 
                compliance tools, and everything you need to run workforce development.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/store/licenses" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                  Browse Licenses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/demo" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/technology/hero-programs-technology.jpg"
                  alt="Elevate Platform"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-slate-300">Complete workforce platform</p>
                  <p className="text-lg font-bold">LMS • Admin • Enrollment • Compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Avatar Guide */}
        <AvatarVideoOverlay
          videoSrc="/videos/avatars/store-assistant.mp4"
          position="bottom-right"
          title="Store Guide"
          subtitle="Let me help you find what you need"
        />
      </section>

      {/* Stats Strip */}
      <section className="bg-orange-600 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black">{stat.value}</p>
                <p className="text-sm text-orange-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-2">Featured Products</h2>
          <p className="text-gray-600 mb-8">Most popular licenses and programs</p>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all group">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <p className="text-2xl font-black text-orange-600 mb-4">{product.price}</p>
                  <div className="flex gap-2">
                    <Link href={product.demoHref} className="flex-1 text-center py-2 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Demo
                    </Link>
                    <Link href={product.href} className="flex-1 text-center py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-2">Browse by Category</h2>
          <p className="text-gray-600 mb-8">Find exactly what you need</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {storeCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className={`group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all ${category.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <div className={`relative ${category.featured ? 'h-64 lg:h-full' : 'h-40'}`}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className={`inline-flex items-center gap-2 ${category.color} px-3 py-1 rounded-full text-xs font-bold mb-2`}>
                      <Icon className="w-3 h-3" />
                      {category.name}
                    </div>
                    <p className={`text-sm text-gray-200 mb-2 ${category.featured ? '' : 'line-clamp-2'}`}>
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.products.slice(0, category.featured ? 4 : 2).map((product, i) => (
                        <span key={i} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section with Images */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-2">Training Programs</h2>
          <p className="text-gray-600 mb-8">Career-ready training with job placement support</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Barber Apprenticeship', image: '/images/programs-hq/barber-hero.jpg', href: '/programs/barber-apprenticeship', duration: '12 months', funding: 'WIOA Eligible' },
              { name: 'CNA Training', image: '/images/programs-hq/cna-training.jpg', href: '/programs/cna', duration: '6 weeks', funding: '$1,200' },
              { name: 'HVAC Certification', image: '/images/programs-hq/hvac-technician.jpg', href: '/programs/hvac', duration: '8 weeks', funding: 'WRG Available' },
              { name: 'CDL Training', image: '/images/programs-hq/cdl-trucking.jpg', href: '/programs/cdl', duration: '4 weeks', funding: 'WIOA Eligible' },
            ].map((program) => (
              <Link key={program.name} href={program.href} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative h-40">
                  <Image src={program.image} alt={program.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">{program.funding}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{program.name}</h3>
                  <p className="text-sm text-gray-500">{program.duration}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/programs" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline">
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Browse', desc: 'Explore licenses, programs, and tools' },
              { step: '2', title: 'Demo', desc: 'Try interactive demos before you buy' },
              { step: '3', title: 'Purchase', desc: 'Secure checkout with Stripe' },
              { step: '4', title: 'Deploy', desc: 'Get instant access or scheduled onboarding' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-orange-100 mb-8">
            Schedule a demo or contact our team to find the right solution for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition">
              <Play className="w-5 h-5" />
              Try Live Demo
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
