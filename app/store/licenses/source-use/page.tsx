'use client';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function SourceUseLicensePage() {
  const [activeDemo, setActiveDemo] = useState('admin');

  const demos = [
    { id: 'admin', title: 'Admin Dashboard', video: '/videos/dashboard-admin.mp4', description: 'Complete control over your entire platform. Manage users, courses, enrollments, and reports from one central dashboard.' },
    { id: 'student', title: 'Student Portal', video: '/videos/dashboard-student.mp4', description: 'Students access their courses, track progress, view certificates, and communicate with instructors.' },
    { id: 'instructor', title: 'Instructor Tools', video: '/videos/dashboard-instructor.mp4', description: 'Instructors manage their classes, grade assignments, take attendance, and communicate with students.' },
    { id: 'employer', title: 'Employer Dashboard', video: '/videos/dashboard-employer.mp4', description: 'Employers browse qualified graduates, post job openings, and connect directly with candidates.' },
    { id: 'analytics', title: 'Analytics & Reports', video: '/videos/dashboard-analytics.mp4', description: 'Real-time analytics on enrollment, completion rates, employment outcomes, and program performance.' },
  ];

  const activeVideo = demos.find(d => d.id === activeDemo);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Store', href: '/store' }, { label: 'Licenses', href: '/store/licenses' }, { label: 'Source-Use License' }]} />
        </div>
      </div>

      {/* Hero - Image Only */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/store/platform-hero.jpg"
          alt="Source-Use License - Automate Your Entire Operation"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Replace 5 Staff Members with One Platform</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-4xl">
            The Workforce Operating System automates enrollment, student tracking, compliance reporting, 
            employer connections, and certificate generation. Work that used to require a full team now 
            runs automatically 24/7. Your staff focuses on students, not paperwork.
          </p>

          {/* ROI Calculator Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Math is Simple</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">$250,000+</div>
                <p className="text-slate-600">Annual cost of 5 staff members (enrollment coordinator, data entry, compliance officer, career services, admin)</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-400 mb-2">vs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">$75,000</div>
                <p className="text-slate-600">One-time license fee. Platform runs forever. No salaries, no benefits, no turnover, no training.</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-slate-700 font-semibold">
                The platform pays for itself in 4 months. After that, you save $250,000+ every single year.
              </p>
            </div>
          </div>

          {/* What Gets Automated */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything Runs Automatically</h2>
          <p className="text-lg text-slate-600 mb-8">
            These tasks used to require staff. Now they happen instantly, 24 hours a day, 7 days a week, 
            with zero errors and complete audit trails.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/hero-program-data-analytics.jpg"
                  alt="Automated Enrollment"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Enrollment Processing</h3>
              <p className="text-slate-700 mb-4 font-medium">Replaces: Enrollment Coordinator ($45,000/year)</p>
              <p className="text-slate-600 mb-4">
                Students apply online at 2am on a Sunday. The system checks eligibility, verifies documents, 
                sends confirmation emails, and enrolls them in the right program. By Monday morning, they are 
                already accessing their first course. No staff touched anything.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Online applications with document upload</li>
                <li>Automatic eligibility verification</li>
                <li>Instant enrollment confirmation</li>
                <li>Automated welcome emails and orientation</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/hero-program-web-dev.jpg"
                  alt="Automated Progress Tracking"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Progress Tracking</h3>
              <p className="text-slate-700 mb-4 font-medium">Replaces: Data Entry Staff ($35,000/year)</p>
              <p className="text-slate-600 mb-4">
                Every quiz score, video watched, assignment submitted, and attendance record is captured 
                automatically. No one enters data manually. No spreadsheets. No errors. Real-time dashboards 
                show exactly where every student stands.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Automatic attendance from login data</li>
                <li>Real-time progress dashboards</li>
                <li>Automated alerts for at-risk students</li>
                <li>Complete audit trail of all activity</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/cybersecurity-hero.jpg"
                  alt="Automated Compliance Reporting"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Compliance Reporting</h3>
              <p className="text-slate-700 mb-4 font-medium">Replaces: Compliance Officer ($55,000/year)</p>
              <p className="text-slate-600 mb-4">
                WIOA reports that used to take a week now generate in seconds. The system collects required 
                data points automatically as students progress. Quarterly reports, annual reports, audit 
                documentation - all one click away, always accurate.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>WIOA-compliant data collection built-in</li>
                <li>One-click quarterly and annual reports</li>
                <li>Automatic outcome tracking</li>
                <li>Audit-ready documentation always available</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/hero-program-it-support.jpg"
                  alt="Automated Career Services"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Career Services</h3>
              <p className="text-slate-700 mb-4 font-medium">Replaces: Career Services Coordinator ($50,000/year)</p>
              <p className="text-slate-600 mb-4">
                Employers post jobs directly to the platform. Graduates get matched automatically based on 
                their credentials and location. The system tracks job placements and wage data for your 
                outcome reports. Employers and students connect without staff involvement.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Employer job posting portal</li>
                <li>Automatic candidate matching</li>
                <li>Direct employer-student messaging</li>
                <li>Automated placement tracking</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/programs-hq/business-office.jpg"
                  alt="Automated Certificates"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Certificate Generation</h3>
              <p className="text-slate-700 mb-4 font-medium">Replaces: Administrative Staff ($40,000/year)</p>
              <p className="text-slate-600 mb-4">
                Student completes their final exam at 11pm. Certificate generates instantly with their name, 
                completion date, and credential details. PDF downloads immediately. Verification link works 
                forever. No one had to create it, sign it, or mail it.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Instant certificate generation</li>
                <li>Digital signatures included</li>
                <li>Permanent verification links</li>
                <li>Bulk certificate printing available</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/programs-hq/students-learning.jpg"
                  alt="Automated Communications"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Communications</h3>
              <p className="text-slate-700 mb-4 font-medium">Replaces: Hours of Manual Outreach</p>
              <p className="text-slate-600 mb-4">
                Welcome emails, assignment reminders, deadline alerts, completion congratulations, 
                employer introductions - all sent automatically at the right time. Students stay engaged. 
                Employers stay informed. You never write the same email twice.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Automated email sequences</li>
                <li>SMS notifications available</li>
                <li>Personalized messaging at scale</li>
                <li>Engagement tracking and analytics</li>
              </ul>
            </div>
          </div>

          {/* AI-Powered Course Builder */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4">AI-Powered Course Builder</h2>
          <p className="text-lg text-slate-600 mb-8">
            Create professional courses in minutes, not weeks. The AI course builder generates complete 
            course outlines, lesson content, quizzes, and assessments from a simple description.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/web-dev.jpg"
                  alt="AI Course Builder"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Generate Complete Courses</h3>
              <p className="text-slate-600 mb-4">
                Type "Create a 40-hour CNA training course" and the AI generates a complete course 
                structure with modules, lessons, learning objectives, and assessments. Review, edit, 
                and publish. What used to take curriculum developers weeks now takes hours.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>AI-generated course outlines</li>
                <li>Automatic lesson content creation</li>
                <li>Quiz and assessment generation</li>
                <li>Learning objective alignment</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/it-support.jpg"
                  alt="Drag and Drop Editor"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Drag-and-Drop Course Editor</h3>
              <p className="text-slate-600 mb-4">
                No technical skills required. Drag lessons into modules, reorder content, add videos 
                and documents, set prerequisites and due dates. Preview exactly what students will see. 
                Publish instantly or schedule for later.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Visual course builder</li>
                <li>Drag-and-drop content organization</li>
                <li>Real-time preview</li>
                <li>Version control and rollback</li>
              </ul>
            </div>
          </div>

          {/* AI Video Generator */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4">AI Video Generator</h2>
          <p className="text-lg text-slate-600 mb-8">
            Turn text into professional training videos automatically. No cameras, no studios, no video 
            editing skills required. The AI creates narrated videos with visuals from your course content.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/ai-studio-pro.jpg"
                  alt="AI Video Generation"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Text-to-Video Generation</h3>
              <p className="text-slate-600 mb-4">
                Paste your lesson content and the AI generates a narrated video with professional 
                voiceover, relevant visuals, and on-screen text. Choose from multiple AI voices and 
                styles. Generate videos in minutes instead of days.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>AI-generated narration</li>
                <li>Automatic visual selection</li>
                <li>Multiple voice options</li>
                <li>Captions and transcripts included</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/ai-tutor.jpg"
                  alt="AI Avatar Instructors"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Avatar Instructors</h3>
              <p className="text-slate-600 mb-4">
                Create videos with realistic AI avatars that present your content. Choose from diverse 
                avatar options. The avatar speaks your script naturally, making eye contact and using 
                appropriate gestures. Professional training videos without hiring actors.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Realistic AI presenters</li>
                <li>Multiple avatar choices</li>
                <li>Natural speech and gestures</li>
                <li>Consistent branding across videos</li>
              </ul>
            </div>
          </div>

          {/* Automated Reporting */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Automated Reporting That Writes Itself</h2>
          <p className="text-lg text-slate-600 mb-8">
            Every report your funders, accreditors, and state agencies require - generated automatically 
            from data the system collects as students progress. No manual data entry. No spreadsheets. 
            No last-minute scrambling before deadlines.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/heroes-hq/funding-hero.jpg"
                  alt="WIOA Reports"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">WIOA Compliance Reports</h3>
              <p className="text-slate-600 mb-4">
                Quarterly and annual WIOA reports generate automatically. All required data points 
                are collected as students enroll, train, and find employment. Export in the exact 
                format your state workforce board requires.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Automatic PIRL data collection</li>
                <li>Quarterly performance reports</li>
                <li>Annual outcome reports</li>
                <li>State-specific formatting</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/hero-program-data-analytics.jpg"
                  alt="Real-Time Dashboards"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Dashboards</h3>
              <p className="text-slate-600 mb-4">
                See enrollment numbers, completion rates, employment outcomes, and program performance 
                in real-time. No waiting for reports. No asking staff for updates. The data is always 
                current and always accurate.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Live enrollment tracking</li>
                <li>Completion rate monitoring</li>
                <li>Employment outcome tracking</li>
                <li>Program comparison views</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/programs-hq/business-office.jpg"
                  alt="Custom Reports"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Report Builder</h3>
              <p className="text-slate-600 mb-4">
                Need a report that does not exist? Build it yourself with the drag-and-drop report 
                builder. Select data fields, add filters, choose visualization types, and save for 
                future use. Schedule automatic delivery to stakeholders.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Drag-and-drop report builder</li>
                <li>Custom data field selection</li>
                <li>Scheduled report delivery</li>
                <li>Export to PDF, Excel, CSV</li>
              </ul>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4">See the Full Platform in Action</h2>
          <p className="text-lg text-slate-600 mb-8">
            Click each tab to see how different parts of the platform work. Every feature shown here 
            is included in your license.
          </p>

          <div className="bg-slate-50 rounded-2xl p-8 mb-16">
            {/* Demo Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeDemo === demo.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {demo.title}
                </button>
              ))}
            </div>

            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden mb-6">
              <video
                key={activeVideo?.video}
                className="w-full aspect-video"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src={activeVideo?.video} type="video/mp4" />
              </video>
            </div>

            {/* Demo Description */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{activeVideo?.title}</h3>
              <p className="text-slate-600">{activeVideo?.description}</p>
            </div>
          </div>

          {/* Free Trial */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Try It Free for 14 Days</h2>
                <p className="text-slate-600">
                  Get full access to a demo environment with sample data. Test every automated workflow. 
                  See exactly how much time you will save. No credit card required.
                </p>
              </div>
              <Link
                href="/store/licenses/source-use/trial"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-slate-900 rounded-2xl p-12 mb-16 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">One Investment. Permanent Savings.</h2>
                <div className="text-5xl font-bold mb-2">$75,000</div>
                <p className="text-slate-300 text-xl mb-6">One-time license fee</p>
                <p className="text-slate-400 mb-4">
                  Compare this to $250,000+ per year in staff costs. The platform pays for itself in 
                  4 months. After that, every dollar saved goes straight to your mission.
                </p>
                <p className="text-slate-400 mb-8">
                  No per-user fees. No transaction fees. No surprise costs. You own the license forever.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/store/licenses/checkout/source-use"
                    className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors"
                  >
                    Buy Now - $75,000
                  </Link>
                  <Link
                    href="/store/licenses/source-use/trial"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
                  >
                    Try Free for 14 Days
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Everything Included:</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>Complete source code access</li>
                  <li>All automated workflows described above</li>
                  <li>Unlimited users - no per-seat fees</li>
                  <li>Unlimited courses and programs</li>
                  <li>All portals (admin, student, instructor, employer)</li>
                  <li>Compliance reporting tools</li>
                  <li>90 days implementation support</li>
                  <li>IT team training</li>
                  <li>Deployment documentation</li>
                  <li>API access for integrations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-green-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Stop Paying for Work a Computer Can Do</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Your staff should be helping students succeed, not entering data into spreadsheets. 
              Let the platform handle the repetitive work while your team focuses on what matters.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/store/licenses/checkout/source-use"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
              >
                Buy Now - $75,000
              </Link>
              <Link
                href="/store/licenses/source-use/trial"
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors"
              >
                Start Free 14-Day Trial First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
