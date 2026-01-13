import Link from 'next/link';
import { Metadata } from 'next';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';
import { Heart, DollarSign, FileText, CheckCircle, Users, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VITA Tax Prep - Free Tax Preparation | Elevate for Humanity',
  description: 'Free IRS-certified tax preparation for qualifying individuals through the Volunteer Income Tax Assistance program',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/vita',
  },
  openGraph: {
    title: 'VITA - Free Tax Preparation',
    description: 'Free IRS-certified tax preparation for income under $64K. Average refund: $2,847.',
    url: 'https://elevateforhumanity.institute/vita',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'VITA Free Tax Prep' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VITA - Free Tax Preparation',
    description: 'Free IRS-certified tax preparation. Average refund: $2,847.',
    images: ['/og-default.jpg'],
  },
};

export default function VITAPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="💚 100% FREE Tax Prep - Save $200+"
        headline="File Your Taxes"
        accentText="For $0"
        subheadline="Free VITA Tax Preparation - Income Under $64K"
        description="We filed 2,045 FREE returns last year. Average refund: $2,847. Total saved in tax prep fees: $408,000. If you earn under $64K, you qualify. IRS-certified volunteers. E-file included. Direct deposit setup. Zero cost to you."
        imageSrc="/images/business/tax-prep-certification.jpg"
        imageAlt="Free VITA Tax Preparation"
        primaryCTA={{ text: "Book Free Appointment", href: "/tax/rise-up-foundation/site-locator" }}
        secondaryCTA={{ text: "Check If You Qualify", href: "/tax/free" }}
        features={[
          "2,045 free returns in 2025 • $408K saved in tax prep fees",
          "Average refund: $2,847 • Qualify if income under $64K",
          "IRS-certified volunteers • E-file • Direct deposit - all FREE"
        ]}
        imageOnRight={true}
      />

      <ModernFeatures
        title="Why 2,045 People Chose Free VITA"
        subtitle="What you get at zero cost"
        features={[
          {
            icon: DollarSign,
            title: "Save $200+ in Fees",
            description: "H&R Block charges $200+. TurboTax charges $120+. VITA is $0. Same quality. IRS-certified preparers. Zero cost.",
            color: "green"
          },
          {
            icon: Users,
            title: "IRS-Certified Volunteers",
            description: "All volunteers pass IRS competency exam. Average 8 years experience. They know the tax code. They find every deduction.",
            color: "blue"
          },
          {
            icon: FileText,
            title: "E-File Included",
            description: "Electronic filing included. Refund in 7-14 days. Direct deposit setup. Track your refund online. No paper, no waiting.",
            color: "orange"
          },
          {
            icon: CheckCircle,
            title: "Maximum Refund",
            description: "EITC specialists. Child Tax Credit experts. Education credits. We find every dollar you deserve. Average refund: $2,847.",
            color: "purple"
          },
          {
            icon: Clock,
            title: "Same-Day Service",
            description: "Most returns done same day. Bring documents, leave with confirmation. No appointments needed at most sites. Walk-ins welcome.",
            color: "teal"
          },
          {
            icon: Shield,
            title: "Audit Support",
            description: "If IRS audits you, we help. Free assistance. We stand behind our work. Zero additional cost. You're protected.",
            color: "red"
          }
        ]}
        columns={3}
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What is VITA?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Heart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Free Tax Help</h3>
              <p className="text-black">
                The Volunteer Income Tax Assistance (VITA) program offers free tax help to people who generally make $64,000 or less, persons with disabilities, and limited English-speaking taxpayers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">IRS Certified</h3>
              <p className="text-black">
                All VITA volunteers are IRS-certified and trained to help you prepare your taxes accurately and get the maximum refund you deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Who Qualifies?</h2>
          <div className="bg-blue-50 p-8 rounded-lg">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Individuals and families earning $64,000 or less per year</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Persons with disabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Limited English-speaking taxpayers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Seniors needing assistance with tax preparation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Schedule your free tax preparation appointment today
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Schedule Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
