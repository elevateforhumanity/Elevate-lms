import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Shield, Play, Building2, Users, Briefcase, Code, Zap, Globe, BookOpen, GraduationCap, ShoppingBag, Heart, Wrench, FileText, DollarSign } from 'lucide-react';
import { STORE_PRODUCTS, CLONE_LICENSES, COMMUNITY_ADDONS } from '@/app/data/store-products';
import { DIGITAL_PRODUCTS } from '@/lib/pricing';
import { DIGITAL_PRODUCTS as ALL_DIGITAL_PRODUCTS } from '@/lib/store/digital-products';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description: 'Platform licenses, certification courses, toolkits, workbooks, and workforce development resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
};

// Monthly Infrastructure Licenses
const infrastructureLicenses = [
  {
    id: 'core',
    name: 'Core Workforce Infrastructure',
    price: 750,
    description: 'For solo operators, pilots, and small institutions.',
    capacity: ['Up to 100 learners', '3 programs', '1 organization'],
    cta: 'Activate Core',
    href: '/store/checkout?license=core',
    demoHref: '/demo/learner',
  },
  {
    id: 'institutional',
    name: 'Institutional Operator',
    price: 2500,
    popular: true,
    description: 'For schools, nonprofits, and training providers.',
    capacity: ['Up to 1,000 learners', '25 programs', '1 institution'],
    cta: 'Activate Institutional',
    href: '/store/checkout?license=institutional',
    demoHref: '/demo/admin',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Infrastructure',
    price: 8500,
    description: 'For workforce boards and regional systems.',
    capacity: ['Up to 10,000 learners', 'Unlimited programs', 'Multi-org'],
    cta: 'Request Access',
    href: '/contact?subject=Enterprise',
    demoHref: '/demo/employer',
  },
];

// Certification Courses
const certificationCourses = [
  { name: 'Microsoft Word Certification', price: 164, category: 'Microsoft Office', provider: 'Certiport' },
  { name: 'Microsoft Excel Certification', price: 164, category: 'Microsoft Office', provider: 'Certiport' },
  { name: 'Microsoft PowerPoint Certification', price: 164, category: 'Microsoft Office', provider: 'Certiport' },
  { name: 'Adobe Photoshop Certification', price: 210, category: 'Adobe Creative', provider: 'Certiport' },
  { name: 'Adobe Illustrator Certification', price: 210, category: 'Adobe Creative', provider: 'Certiport' },
  { name: 'Cybersecurity Fundamentals', price: 164, category: 'IT & Security', provider: 'Certiport' },
  { name: 'Python Programming', price: 164, category: 'IT & Security', provider: 'Certiport' },
  { name: 'QuickBooks Certification', price: 210, category: 'Business', provider: 'Certiport' },
  { name: 'IC3 Digital Literacy', price: 164, category: 'Digital Skills', provider: 'Certiport' },
  { name: 'CPR & AED Certification', price: 135, category: 'Healthcare', provider: 'HSI' },
  { name: 'First Aid Certification', price: 135, category: 'Healthcare', provider: 'HSI' },
  { name: 'BLS for Healthcare Providers', price: 159, category: 'Healthcare', provider: 'HSI' },
  { name: 'Food Handler Certification', price: 64, category: 'Food Safety', provider: 'HSI' },
  { name: 'OSHA 10-Hour General Industry', price: 89, category: 'Workplace Safety', provider: 'CareerSafe' },
  { name: 'OSHA 30-Hour General Industry', price: 189, category: 'Workplace Safety', provider: 'CareerSafe' },
];

// Tax Preparer Training
const taxTrainingCourses = [
  { name: 'Tax Preparation Fundamentals', price: 199, hours: 12, description: 'Complete beginner course' },
  { name: 'IRS Ethics & Professional Standards', price: 149, hours: 6, description: 'Circular 230, PTIN requirements' },
  { name: 'Advanced Tax Strategies', price: 199, hours: 16, description: 'Complex returns, investments' },
];

// Shop Products
const shopProducts = [
  { name: 'HVAC Tool Kit', price: 149.99, category: 'Tools' },
  { name: 'Medical Scrubs Set', price: 49.99, category: 'Apparel' },
  { name: 'Barber Shears Pro', price: 89.99, category: 'Tools' },
  { name: 'Study Guide Bundle', price: 29.99, category: 'Books' },
  { name: 'Safety Glasses', price: 24.99, category: 'Safety' },
  { name: 'Elevate Hoodie', price: 59.99, category: 'Apparel' },
];

// Workbooks & Templates
const workbooksTemplates = [
  { name: 'HVAC Certification Study Flashcards', price: 9.99, type: 'Digital' },
  { name: 'Medical Assistant Resume Template Pack', price: 0, type: 'Free' },
  { name: 'Barber Client Consultation Forms', price: 4.99, type: 'Template' },
  { name: 'Interview Preparation Workbook', price: 0, type: 'Free' },
  { name: 'Electrical Code Quick Reference', price: 14.99, type: 'Digital' },
  { name: 'Healthcare Terminology Cheat Sheet', price: 2.99, type: 'Digital' },
];

// Healing/Wellness Products
const wellnessProducts = [
  { name: 'Mindfulness Journal', price: 24.99 },
  { name: 'Aromatherapy Set', price: 34.99 },
  { name: 'Meditation Cushion', price: 49.99 },
  { name: 'Self-Care Kit', price: 59.99 },
  { name: 'Healing Crystals Set', price: 29.99 },
  { name: 'Wellness Tea Collection', price: 19.99 },
];

// AI & Compliance Tools
const aiComplianceTools = [
  { id: 'ai-studio-starter', name: 'AI Studio - Starter', price: '$99/mo', description: 'AI-powered content creation for training programs' },
  { id: 'ai-studio-pro', name: 'AI Studio - Professional', price: '$299/mo', description: 'Advanced AI tools with custom model training' },
  { id: 'ai-instructor-pack', name: 'AI Instructor Pack', price: '$499', description: 'AI teaching assistant for your courses' },
  { id: 'ai-tutor-license', name: 'AI Tutor License', price: '$999', description: 'Personalized AI tutoring for learners' },
  { id: 'workforce-compliance', name: 'Workforce Compliance Checklist', price: '$39', description: 'WIOA, FERPA, and accreditation requirements' },
];

// Hub Licenses (Credential & CRM Access)
const hubLicenses = [
  { id: 'community-hub-license', name: 'Community Hub License', price: '$1,999', description: 'Full community platform with forums, groups, and events' },
  { id: 'crm-hub-license', name: 'CRM Hub License', price: '$1,499', description: 'Student and employer relationship management' },
];

// Grant & Government Tools
const grantTools = [
  { id: 'sam-gov-assistant', name: 'SAM.gov Registration Assistant', price: 'Free', description: 'Step-by-step SAM.gov registration guide' },
  { id: 'grants-gov-navigator', name: 'Grants.gov Navigator', price: '$49', description: 'Find and apply for federal grants' },
];

// Platform Apps/Modules (included with licenses or available as add-ons)
const platformApps = [
  { name: 'Admin Dashboard', description: 'User management, reporting, analytics, system configuration', included: 'All licenses', icon: '⚙️' },
  { name: 'Learning Management System', description: 'Courses, SCORM, certifications, progress tracking', included: 'All licenses', icon: '📚' },
  { name: 'Enrollment & Intake', description: 'Applications, approvals, cohort management', included: 'All licenses', icon: '📝' },
  { name: 'Payments & Billing', description: 'Stripe integration, invoices, funding sources', included: 'All licenses', icon: '💳' },
  { name: 'Partner Dashboard', description: 'Tools for schools, employers, workforce partners', included: 'School+', icon: '🤝' },
  { name: 'Case Management', description: 'Track barriers, interventions, wraparound services', included: 'School+', icon: '📋' },
  { name: 'Compliance & Reporting', description: 'WIOA, FERPA, grant reporting with automated data', included: 'School+', icon: '📊' },
  { name: 'Employer Portal', description: 'Job postings, candidate matching, hiring pipeline', included: 'Enterprise', icon: '💼' },
  { name: 'AI Tutor', description: 'AI-powered tutoring and personalized learning', included: 'Enterprise', icon: '🤖' },
  { name: 'Mobile PWA', description: 'Progressive web app for iOS and Android', included: 'All licenses', icon: '📱' },
];

export default function StorePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Store</h1>
          <p className="text-xl text-slate-300">
            Platform licenses, certifications, courses, tools, and resources
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-4 bg-gray-50 border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-2 text-sm min-w-max">
            <a href="#infrastructure" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Infrastructure</a>
            <a href="#platform" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Platform Licenses</a>
            <a href="#platform-apps" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Apps & Modules</a>
            <a href="#certifications" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Certifications</a>
            <a href="#ai-tools" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">AI & Compliance</a>
            <a href="#hub-licenses" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Hub Licenses</a>
            <a href="#grant-tools" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Grant Tools</a>
            <a href="#developer" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Developer</a>
            <a href="#community" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Community</a>
            <a href="#shop" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Shop</a>
            <a href="#workbooks" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Workbooks</a>
            <a href="#resources" className="px-3 py-1.5 bg-white rounded-full border hover:bg-gray-50 whitespace-nowrap">Resources</a>
          </div>
        </div>
      </section>

      {/* Monthly Infrastructure Licenses */}
      <section id="infrastructure" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-black">Monthly Infrastructure Licenses</h2>
          </div>
          <p className="text-gray-600 mb-8">Self-operating workforce infrastructure • Cancel anytime</p>

          <div className="grid md:grid-cols-3 gap-6">
            {infrastructureLicenses.map((license) => (
              <div key={license.id} className={`bg-white rounded-xl p-6 border-2 ${license.popular ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}>
                {license.popular && <span className="text-xs font-bold text-blue-600 mb-2 block">MOST POPULAR</span>}
                <h3 className="font-bold text-lg mb-1">{license.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{license.description}</p>
                <p className="text-3xl font-black mb-3">${license.price.toLocaleString()}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {license.capacity.map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
                <div className="flex gap-2">
                  <Link href={license.demoHref} className="flex-1 text-center py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Demo</Link>
                  <Link href={license.href} className={`flex-1 text-center py-2 rounded-lg text-sm font-medium text-white ${license.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}>{license.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Licenses (One-Time) */}
      <section id="platform" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-black">Platform Licenses (One-Time)</h2>
          </div>
          <p className="text-gray-600 mb-8">Full platform deployment • Lifetime ownership</p>

          <div className="grid md:grid-cols-4 gap-6">
            {STORE_PRODUCTS.map((product) => (
              <div key={product.id} className={`bg-white rounded-xl p-6 border-2 ${product.licenseType === 'school' ? 'border-orange-500' : 'border-gray-200'}`}>
                {product.licenseType === 'school' && <span className="text-xs font-bold text-orange-600 mb-2 block">POPULAR</span>}
                <h3 className="font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-black mb-3">
                  ${product.price.toLocaleString()}
                  {product.billingType === 'subscription' && <span className="text-sm text-gray-500 font-normal">/mo</span>}
                </p>
                <Link href={`/store/products/${product.slug}`} className="block text-center py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Courses */}
      <section id="certifications" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-black">Professional Certifications</h2>
          </div>
          <p className="text-gray-600 mb-8">Industry-recognized credentials from Certiport, HSI, and CareerSafe</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certificationCourses.map((course, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-500 mb-1 block">{course.category}</span>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.name}</h3>
                <p className="text-lg font-bold text-green-600">${course.price}</p>
                <p className="text-xs text-gray-400">{course.provider}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/courses" className="text-green-600 font-medium hover:underline">View all courses →</Link>
          </div>
        </div>
      </section>

      {/* Tax Preparer Training */}
      <section id="tax-training" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black">Tax Preparer Training</h2>
          </div>
          <p className="text-gray-600 mb-8">Become a certified tax professional</p>

          <div className="grid md:grid-cols-3 gap-6">
            {taxTrainingCourses.map((course, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <p className="text-sm text-gray-500 mb-3">{course.hours} hours</p>
                <p className="text-2xl font-black text-emerald-600 mb-4">${course.price}</p>
                <Link href="/supersonic-fast-cash/careers/training" className="block text-center py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Licenses */}
      <section id="developer" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Code className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-black">Developer Licenses</h2>
          </div>
          <p className="text-gray-600 mb-8">Full codebase access • Self-host anywhere</p>

          <div className="grid md:grid-cols-3 gap-6">
            {CLONE_LICENSES.map((license) => (
              <div key={license.id} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="font-bold text-lg mb-2">{license.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{license.description}</p>
                <p className="text-2xl font-black mb-4">${license.price.toLocaleString()}</p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {license.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/store/products/${license.slug}`} className="block text-center py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                  Get License
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Add-ons */}
      <section id="community" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-sky-600" />
            <h2 className="text-2xl font-black">Community Add-ons</h2>
          </div>
          <p className="text-gray-600 mb-8">For existing license holders • Monthly subscription</p>

          <div className="grid md:grid-cols-3 gap-6">
            {COMMUNITY_ADDONS.map((addon) => (
              <div key={addon.id} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="font-bold text-lg mb-2">{addon.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                <p className="text-2xl font-black mb-4">${(addon.price / 100).toLocaleString()}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                <Link href={`/store/products/${addon.slug}`} className="block text-center py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700">
                  Add to License
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Products */}
      <section id="shop" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl font-black">Shop</h2>
          </div>
          <p className="text-gray-600 mb-8">Tools, apparel, and supplies for your training</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {shopProducts.map((product, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <p className="font-bold text-pink-600">${product.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/shop" className="text-pink-600 font-medium hover:underline">View full shop →</Link>
          </div>
        </div>
      </section>

      {/* Workbooks & Templates */}
      <section id="workbooks" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-black">Workbooks & Templates</h2>
          </div>
          <p className="text-gray-600 mb-8">Study guides, templates, and digital downloads</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workbooksTemplates.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                <span className="text-xs text-amber-600 font-medium">{item.type}</span>
                <h3 className="font-semibold text-sm mt-1 mb-2 line-clamp-2">{item.name}</h3>
                <p className="font-bold">{item.price === 0 ? 'Free' : `$${item.price}`}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/workbooks" className="text-amber-600 font-medium hover:underline">View all workbooks →</Link>
          </div>
        </div>
      </section>

      {/* Wellness Products */}
      <section id="wellness" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl font-black">Wellness & Healing</h2>
          </div>
          <p className="text-gray-600 mb-8">Self-care products supporting our nonprofit mission</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {wellnessProducts.map((product, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="w-full h-20 bg-rose-50 rounded-lg mb-3 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-300" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                <p className="font-bold text-rose-600">${product.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/nonprofit/healing-products" className="text-rose-600 font-medium hover:underline">View all wellness products →</Link>
          </div>
        </div>
      </section>

      {/* Platform Apps/Modules */}
      <section id="platform-apps" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Wrench className="w-6 h-6 text-slate-600" />
            <h2 className="text-2xl font-black">Platform Apps & Modules</h2>
          </div>
          <p className="text-gray-600 mb-8">What's included with each license tier</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {platformApps.map((app, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                <span className="text-2xl mb-2 block">{app.icon}</span>
                <h3 className="font-semibold text-sm mb-1">{app.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{app.description}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  app.included === 'All licenses' ? 'bg-green-100 text-green-700' :
                  app.included === 'School+' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>{app.included}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Compliance Tools */}
      <section id="ai-tools" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-violet-600" />
            <h2 className="text-2xl font-black">AI & Compliance Tools</h2>
          </div>
          <p className="text-gray-600 mb-8">AI-powered tools and compliance resources</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {aiComplianceTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{tool.description}</p>
                <p className="font-bold text-violet-600">{tool.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hub Licenses (Credentials & CRM) */}
      <section id="hub-licenses" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl font-black">Hub Licenses</h2>
          </div>
          <p className="text-gray-600 mb-8">Credential management and CRM access</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {hubLicenses.map((hub) => (
              <div key={hub.id} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="font-bold text-lg mb-2">{hub.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{hub.description}</p>
                <p className="text-2xl font-black text-teal-600 mb-4">{hub.price}</p>
                <Link href={`/store/products/${hub.id}`} className="block text-center py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700">
                  Get License
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grant & Government Tools */}
      <section id="grant-tools" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-black">Grant & Government Tools</h2>
          </div>
          <p className="text-gray-600 mb-8">Federal funding and registration assistance</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {grantTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <p className="text-2xl font-black text-blue-600 mb-4">{tool.price}</p>
                <Link href={`/store/products/${tool.id}`} className="block text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  {tool.price === 'Free' ? 'Start Free' : 'Get Tool'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Resources */}
      <section id="resources" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-black">Digital Resources</h2>
          </div>
          <p className="text-gray-600 mb-8">Guides, toolkits, and educational materials</p>

          <div className="grid md:grid-cols-3 gap-6">
            {DIGITAL_PRODUCTS.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">{resource.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.benefit}</p>
                <p className="text-2xl font-black text-indigo-600 mb-4">{resource.price}</p>
                <Link href={`/store/resources/${resource.id}`} className="block text-center py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                  Get Resource
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 border-t">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            <Shield className="w-4 h-4 inline mr-1" />
            Licenses grant access to platform functionality. Funding eligibility and compliance remain subject to applicable rules.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-slate-300 mb-6">Schedule a consultation or try our live demo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-gray-100">
              Try Live Demo
            </Link>
            <Link href="/contact" className="px-6 py-3 border-2 border-white rounded-lg font-bold hover:bg-white/10">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
