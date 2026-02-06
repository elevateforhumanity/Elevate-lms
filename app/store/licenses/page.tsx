import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Server, 
  Code, 
  ArrowRight, 
  Shield, 
  CheckCircle,
  Users,
  Building2,
  Zap,
  Clock,
  HeartHandshake,
  GraduationCap,
  BarChart3,
  Lock,
  Play
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Platform Licensing | Workforce Operating System | Elevate for Humanity',
  description: 'License the Workforce Operating System to run funded training pathways end-to-end. Managed platform or enterprise source-use options available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/licenses',
  },
};

const journeySteps = [
  {
    step: 1,
    title: 'Choose Your Path',
    description: 'Select managed platform or enterprise source-use based on your needs',
    icon: Users,
  },
  {
    step: 2,
    title: 'Configure Your Instance',
    description: 'Set up your branding, domain, and organization structure',
    icon: Building2,
  },
  {
    step: 3,
    title: 'Launch & Train',
    description: 'Go live with your workforce programs and start enrolling students',
    icon: GraduationCap,
  },
  {
    step: 4,
    title: 'Scale & Report',
    description: 'Grow your programs while we handle compliance and infrastructure',
    icon: BarChart3,
  },
];

const platformCapabilities = [
  {
    icon: GraduationCap,
    title: 'Complete LMS',
    description: 'Courses, assessments, certificates, and progress tracking',
  },
  {
    icon: Users,
    title: 'Multi-Stakeholder',
    description: 'Student, instructor, employer, and partner portals',
  },
  {
    icon: BarChart3,
    title: 'Compliance Ready',
    description: 'WIOA reporting, audit trails, and outcome tracking',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Enrollment workflows, notifications, and certificate generation',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Role-based access, data encryption, and FERPA compliance',
  },
  {
    icon: HeartHandshake,
    title: 'Support Included',
    description: 'Dedicated onboarding and ongoing technical support',
  },
];

const successStories = [
  {
    quote: "We went from spreadsheets to a fully automated enrollment system in 30 days.",
    author: "Training Director",
    org: "Regional Workforce Board",
  },
  {
    quote: "The compliance reporting alone saves us 20 hours per month.",
    author: "Program Manager",
    org: "Community College",
  },
];

export default function StoreLicensesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumbs items={[
            { label: 'Store', href: '/store' }, 
            { label: 'Licenses' }
          ]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/images/store/platform-hero.jpg"
          alt="Workforce Operating System"
          fill
          className="object-cover"
          priority
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Server className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Workforce Operating System</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Run Your Workforce Programs on Proven Infrastructure
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Stop building from scratch. License a complete platform that handles enrollment, 
              training delivery, compliance reporting, and outcome tracking—so you can focus 
              on what matters: helping people build careers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#choose-license"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Choose Your License
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/store/demo"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem / Solution Story */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                You Shouldn&apos;t Have to Build a Tech Company to Run Training Programs
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Workforce organizations spend months (or years) cobbling together spreadsheets, 
                  multiple software tools, and manual processes. The result? Staff burnout, 
                  compliance headaches, and students falling through the cracks.
                </p>
                <p>
                  <strong className="text-slate-900">There&apos;s a better way.</strong> The Workforce Operating System 
                  is purpose-built for funded training programs. It handles the complexity so your 
                  team can focus on student success.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h3 className="font-bold text-slate-900 mb-4">What You Get</h3>
              <ul className="space-y-3">
                {[
                  'Complete LMS with courses, assessments, and certificates',
                  'Student, instructor, employer, and partner portals',
                  'WIOA-compliant reporting and audit trails',
                  'Automated enrollment and notification workflows',
                  'Your branding, your domain, your data',
                  'Ongoing updates and security patches',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Path to Launch</h2>
            <p className="text-lg text-slate-600">From signup to go-live in as little as 2 weeks</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {journeySteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200" />
                )}
                <div className="relative bg-white rounded-xl p-6 border shadow-sm text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-blue-600 mb-2">Step {step.step}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License Options */}
      <section id="choose-license" className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your License</h2>
            <p className="text-lg text-slate-400">Two paths based on your organization&apos;s needs</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Managed Platform */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-700 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Managed Platform</h3>
                <p className="text-blue-100">We operate the infrastructure. You manage your organization.</p>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <div className="text-4xl font-black text-slate-900">
                    $1,500–$3,500
                    <span className="text-lg font-normal text-slate-500">/month</span>
                  </div>
                  <div className="text-slate-500">+ $7,500–$15,000 one-time setup</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="font-semibold text-slate-900 mb-2">Perfect for:</div>
                  <ul className="space-y-2">
                    {[
                      'Training providers scaling operations',
                      'Workforce boards managing multiple programs',
                      'Organizations without dedicated IT staff',
                      'Teams that want to launch fast',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href="/store/licenses/managed-platform"
                  className="block w-full text-center bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  View Plans & Pricing
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </Link>
              </div>
            </div>

            {/* Source-Use */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-700 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ENTERPRISE ONLY
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Source-Use License</h3>
                <p className="text-slate-300">Restricted code access for internal deployment.</p>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <div className="text-4xl font-black text-slate-900">
                    Starting at $75,000
                  </div>
                  <div className="text-slate-500">Enterprise approval required</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="font-semibold text-slate-900 mb-2">Designed for:</div>
                  <ul className="space-y-2">
                    {[
                      'Large agencies with compliance requirements',
                      'Organizations with dedicated DevOps teams',
                      'Entities requiring on-premise deployment',
                      'Government contracts with data residency rules',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-600">
                        <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href="/store/licenses/source-use"
                  className="block w-full text-center bg-slate-200 text-slate-700 py-4 rounded-lg font-bold text-lg hover:bg-slate-300 transition-colors"
                >
                  Learn About Requirements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What&apos;s Included in Every License</h2>
            <p className="text-lg text-slate-600">A complete workforce development platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformCapabilities.map((cap) => (
              <div key={cap.title} className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <cap.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{cap.title}</h3>
                <p className="text-slate-600 text-sm">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by Workforce Organizations</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <p className="text-white text-lg mb-4">&ldquo;{story.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-white">{story.author}</div>
                  <div className="text-blue-200 text-sm">{story.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/store/demo" 
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all text-center group"
            >
              <Play className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Demo Center</h3>
              <p className="text-slate-600 text-sm">Explore the platform before you commit</p>
            </Link>
            <Link 
              href="/store/guides/licensing" 
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all text-center group"
            >
              <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Licensing Guide</h3>
              <p className="text-slate-600 text-sm">Step-by-step setup walkthrough</p>
            </Link>
            <Link 
              href="/contact?topic=licensing" 
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all text-center group"
            >
              <HeartHandshake className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Talk to Us</h3>
              <p className="text-slate-600 text-sm">Get answers to your questions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Workforce Programs?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join organizations that have streamlined operations and improved student outcomes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/store/licenses/managed-platform"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?topic=licensing"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
