import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Platform Licensing | Workforce Operating System | Elevate for Humanity',
  description: 'License the Workforce Operating System to run funded training pathways end-to-end. Managed platform or enterprise source-use options available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/licenses',
  },
};

export default function StoreLicensesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Store', href: '/store' }, { label: 'Licenses' }]} />
        </div>
      </div>

      {/* Hero - Image Only */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/store/platform-hero.jpg"
          alt="Workforce Operating System"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">License the Workforce Operating System</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl">
            Run your funded training programs on proven infrastructure. We handle the technology 
            so you can focus on helping people build careers. From enrollment to employment tracking, 
            everything is included.
          </p>

          {/* Two License Options */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            
            {/* Managed Platform */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border">
              <div className="relative h-64">
                <Image
                  src="/images/store/ai-studio-pro.jpg"
                  alt="Managed Platform"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Managed Platform</h2>
                <p className="text-slate-600 mb-4">
                  We operate the infrastructure. You manage your organization. Your branding, 
                  your domain, your programs - backed by our technology and operations team.
                </p>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  $1,500 - $3,500<span className="text-lg font-normal text-slate-500">/month</span>
                </div>
                <p className="text-slate-500 mb-6">Plus $7,500 - $15,000 one-time setup</p>
                
                <p className="font-semibold text-slate-900 mb-3">Perfect for:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
                  <li>Training providers scaling operations</li>
                  <li>Workforce boards managing multiple programs</li>
                  <li>Organizations without dedicated IT staff</li>
                  <li>Teams that want to launch fast</li>
                </ul>
                
                <Link
                  href="/store/licenses/managed-platform"
                  className="block w-full text-center bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  View Plans and Pricing
                </Link>
              </div>
            </div>

            {/* Source-Use License */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border">
              <div className="relative h-64">
                <Image
                  src="/images/store/grants-navigator.jpg"
                  alt="Source-Use License"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Source-Use License</h2>
                <p className="text-slate-600 mb-4">
                  Restricted code access for internal deployment. You operate the infrastructure 
                  with your own DevOps team.
                </p>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  Starting at $75,000
                </div>
                <p className="text-slate-500 mb-6">One-time license fee</p>
                
                <p className="font-semibold text-slate-900 mb-3">Designed for:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
                  <li>Large agencies with compliance requirements</li>
                  <li>Organizations with dedicated DevOps teams</li>
                  <li>Entities requiring on-premise deployment</li>
                  <li>Government contracts with data residency rules</li>
                </ul>
                
                <Link
                  href="/store/licenses/source-use"
                  className="block w-full text-center bg-slate-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What Every License Includes</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/ai-tutor.jpg"
                  alt="Complete LMS"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Complete Learning Management System</h3>
              <p className="text-slate-600 mb-4">
                Everything you need to deliver training programs online and in-person. Course creation, 
                student enrollment, progress tracking, assessments, and certificate generation.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Unlimited courses and students</li>
                <li>Video hosting and streaming</li>
                <li>Quizzes, assignments, and grading</li>
                <li>Automated certificate generation</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/community-hub.jpg"
                  alt="Multi-Stakeholder Portals"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Portals for Everyone</h3>
              <p className="text-slate-600 mb-4">
                Separate dashboards for students, instructors, employers, and partners. Each role 
                sees exactly what they need - nothing more, nothing less.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Student portal with progress tracking</li>
                <li>Instructor tools for grading and attendance</li>
                <li>Employer dashboard for hiring</li>
                <li>Partner portal for referrals</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/sam-gov-assistant.jpg"
                  alt="Compliance and Reporting"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compliance and Reporting</h3>
              <p className="text-slate-600 mb-4">
                Built-in WIOA compliance, audit trails, and outcome tracking. Generate reports 
                for funders, accreditors, and state agencies with one click.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>WIOA-compliant data collection</li>
                <li>Automated quarterly reports</li>
                <li>Employment outcome tracking</li>
                <li>Audit-ready documentation</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/ai-instructors.jpg"
                  alt="Support and Training"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Support and Training</h3>
              <p className="text-slate-600 mb-4">
                We train your team and provide ongoing support. When you have questions, 
                we respond within hours - not days. Platform updates are automatic.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Live onboarding sessions</li>
                <li>Video tutorials and documentation</li>
                <li>Priority email and chat support</li>
                <li>Automatic security updates</li>
              </ul>
            </div>
          </div>

          {/* Demo Video */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">See the Platform in Action</h2>
            <p className="text-lg text-slate-600 mb-8 text-center max-w-2xl mx-auto">
              Watch how the platform automates enrollment, tracking, reporting, and more. 
              No scheduling required - the demo plays right here.
            </p>
            <div className="bg-black rounded-2xl overflow-hidden">
              <video
                className="w-full aspect-video"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src="/videos/store-demo-narrated.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Choose your license and start your 14-day free trial. Full access to all features. 
              No credit card required to try.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/store/licenses/managed-platform"
                className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors"
              >
                View Managed Platform Plans
              </Link>
              <Link
                href="/store/licenses/source-use"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                View Source-Use License
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
