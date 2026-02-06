import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Managed Enterprise LMS Platform | Elevate for Humanity',
  description: 'Run your organization on an enterprise LMS operated by Elevate for Humanity. Your branding, your domain, our infrastructure.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/licenses/managed-platform',
  },
};

export default function ManagedPlatformPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Store', href: '/store' }, { label: 'Licenses', href: '/store/licenses' }, { label: 'Managed Platform' }]} />
        </div>
      </div>

      {/* Hero - Image Only */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/heroes-hq/programs-hero.jpg"
          alt="Managed Platform"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Managed Platform License</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-4xl">
            Get a fully-branded learning management system without hiring developers or managing servers. 
            We set up your platform with your logo, colors, and domain. We handle all the technical work - 
            hosting, security, updates, and backups. You focus on enrolling students and delivering training.
          </p>
          <p className="text-lg text-slate-600 mb-12 max-w-4xl">
            This is perfect for training providers, workforce boards, and nonprofits who want enterprise 
            software without enterprise IT costs. Launch in 2 weeks, not 6 months.
          </p>

          {/* What You Get Section */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Everything You Need to Run Training Programs</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/programs-hq/business-office.jpg"
                  alt="Your Branded Platform"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Your Branded Platform</h3>
              <p className="text-slate-600 mb-4">
                Your students see your organization, not ours. We configure your custom domain 
                (training.yourorg.com), upload your logo, and match your brand colors. When students 
                log in, they see a professional platform that represents your organization.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Custom domain with SSL certificate</li>
                <li>Your logo on every page</li>
                <li>Brand colors throughout the interface</li>
                <li>Custom email templates with your branding</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/programs-hq/students-learning.jpg"
                  alt="Complete LMS Features"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Complete LMS Features</h3>
              <p className="text-slate-600 mb-4">
                Everything you need to create courses, enroll students, track progress, and issue 
                certificates. Upload videos, create quizzes, set prerequisites, and automate 
                certificate generation when students complete training.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Unlimited courses and lessons</li>
                <li>Video hosting and streaming included</li>
                <li>Quizzes, assignments, and assessments</li>
                <li>Automated certificates with your signature</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/heroes-hq/success-hero.jpg"
                  alt="Enrollment and Student Management"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enrollment and Student Management</h3>
              <p className="text-slate-600 mb-4">
                Accept applications online, review eligibility, and enroll students with a few clicks. 
                Track attendance, monitor progress, and communicate with students through the platform. 
                All student data is organized and searchable.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Online application forms</li>
                <li>Eligibility screening workflows</li>
                <li>Attendance tracking</li>
                <li>Student communication tools</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/sam-gov-assistant.jpg"
                  alt="Reporting and Compliance"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reporting and Compliance</h3>
              <p className="text-slate-600 mb-4">
                Generate reports for funders, accreditors, and state agencies. Track outcomes like 
                employment rates, wage gains, and credential attainment. Export data in formats 
                required by WIOA, state workforce boards, and grant programs.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>WIOA-compliant data collection</li>
                <li>Outcome tracking dashboards</li>
                <li>Automated quarterly reports</li>
                <li>Export to Excel, PDF, or CSV</li>
              </ul>
            </div>
          </div>

          {/* Pricing Section */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Pricing Plans</h2>
          <p className="text-lg text-slate-600 mb-8">
            Choose the plan that fits your organization size. All plans include full platform features, 
            your custom branding, and our support team. Setup fee covers onboarding, configuration, 
            and training for your staff.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Growth Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Growth</h3>
              <p className="text-slate-600 mb-6">For training providers scaling operations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">$1,500</span>
                <span className="text-slate-500">/month</span>
                <p className="text-sm text-slate-500 mt-1">+ $7,500 one-time setup</p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8">
                <li>Up to 500 active learners</li>
                <li>Your custom domain</li>
                <li>Your branding and logo</li>
                <li>Full LMS features</li>
                <li>Course and enrollment management</li>
                <li>Progress tracking and certificates</li>
                <li>Analytics dashboard</li>
                <li>Email support</li>
              </ul>
              <Link
                href="/store/licenses/checkout/growth"
                className="block w-full text-center bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors"
              >
                Buy Now - $1,500/mo
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Professional</h3>
              <p className="text-slate-600 mb-6">For established organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">$2,500</span>
                <span className="text-slate-500">/month</span>
                <p className="text-sm text-slate-500 mt-1">+ $10,000 one-time setup</p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8">
                <li>Up to 2,000 active learners</li>
                <li>Your custom domain</li>
                <li>Your branding and logo</li>
                <li>Full LMS + workforce tools</li>
                <li>Partner and employer dashboards</li>
                <li>Compliance reporting</li>
                <li>API access</li>
                <li>Priority support</li>
                <li>Dedicated onboarding</li>
              </ul>
              <Link
                href="/store/licenses/checkout/professional"
                className="block w-full text-center bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Buy Now - $2,500/mo
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-slate-600 mb-6">For large organizations and agencies</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">$3,500</span>
                <span className="text-slate-500">/month</span>
                <p className="text-sm text-slate-500 mt-1">+ $15,000 one-time setup</p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8">
                <li>Unlimited learners</li>
                <li>Your custom domain</li>
                <li>Your branding and logo</li>
                <li>Full platform access</li>
                <li>Dedicated success manager</li>
                <li>Custom integrations</li>
                <li>SLA guarantee</li>
                <li>Advanced compliance reporting</li>
                <li>Credential add-ons available</li>
                <li>Multi-location support</li>
              </ul>
              <Link
                href="/store/licenses/checkout/enterprise"
                className="block w-full text-center bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors"
              >
                Buy Now - $3,500/mo
              </Link>
            </div>
          </div>

          {/* We Handle Everything Section */}
          <div className="bg-slate-50 rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">We Handle the Technical Work</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">What We Do</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Host your platform on secure, fast servers</li>
                  <li>Manage SSL certificates and security updates</li>
                  <li>Perform daily backups of all your data</li>
                  <li>Monitor uptime and fix issues before you notice</li>
                  <li>Deploy new features and improvements automatically</li>
                  <li>Provide technical support when you need help</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">What You Do</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Create and manage your training programs</li>
                  <li>Enroll and support your students</li>
                  <li>Track progress and issue certificates</li>
                  <li>Generate reports for your funders</li>
                  <li>Build relationships with employers</li>
                  <li>Focus on your mission, not IT problems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Demo Video */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Watch the Platform Demo</h2>
            <p className="text-lg text-slate-600 mb-8 text-center max-w-2xl mx-auto">
              See how the managed platform works. This demo shows the admin dashboard, student portal, 
              and automated workflows in action.
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
          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Your 14-Day Free Trial</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Full access to all features. No credit card required. Your platform will be ready 
              within 24 hours of signing up.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/store/licenses/checkout/professional"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Start Free Trial - Professional Plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
