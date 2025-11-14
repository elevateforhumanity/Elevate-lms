import Link from 'next/link';
import { Check, X } from 'lucide-react';

export const metadata = {
  title: 'Pricing | Elevate for Humanity',
  description: '100% free WIOA-funded training programs for eligible participants',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Home</Link>
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">Programs</Link>
          <Link href="/pricing" className="text-red-600 font-semibold">Pricing</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">About</Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/login" className="elevate-btn-secondary">Sign In</Link>
          <Link href="/enroll" className="elevate-btn-primary">Get Started</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content text-center">
          <div className="elevate-hero-kicker mx-auto">100% Free Training</div>
          <h1 className="elevate-hero-title">No Hidden Costs. Ever.</h1>
          <p className="elevate-hero-subtitle mx-auto">
            All our training programs are 100% FREE for eligible participants through WIOA funding
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="elevate-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* WIOA Funded */}
            <div className="elevate-card elevate-card-red relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="elevate-pill elevate-pill--success px-4 py-2">Most Popular</span>
              </div>
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">WIOA Funded</h3>
                <div className="text-5xl font-bold text-red-600 mb-2">$0</div>
                <p className="text-gray-600">100% Free Training</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">All course materials included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Industry certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Job placement assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Support services (childcare, transportation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Career counseling</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lifetime access to materials</span>
                </li>
              </ul>

              <Link href="/enroll" className="elevate-btn-primary w-full text-center block">
                Check Eligibility
              </Link>
            </div>

            {/* Self-Pay */}
            <div className="elevate-card">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Self-Pay</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">$2,500</div>
                <p className="text-gray-600">Per course</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">All course materials included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Industry certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Job placement assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Support services</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Career counseling</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lifetime access to materials</span>
                </li>
              </ul>

              <Link href="/signup" className="elevate-btn-secondary w-full text-center block">
                Enroll Now
              </Link>
            </div>

            {/* Employer Sponsored */}
            <div className="elevate-card elevate-card-blue">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Employer Sponsored</h3>
                <div className="text-5xl font-bold text-blue-600 mb-2">Custom</div>
                <p className="text-gray-600">Contact for pricing</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Bulk enrollment discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom training programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Progress reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Flexible payment terms</span>
                </li>
              </ul>

              <Link href="/contact" className="elevate-btn-accent w-full text-center block">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="elevate-container max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-2">Who qualifies for free WIOA training?</h3>
              <p className="text-gray-600">
                WIOA funding is available to adults, dislocated workers, and youth ages 16-24 who meet eligibility requirements. 
                This includes individuals with barriers to employment, those seeking career advancement, and workers needing retraining.
              </p>
            </div>

            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-2">What does "100% free" really mean?</h3>
              <p className="text-gray-600">
                When funded through WIOA, there are absolutely no costs to you—no tuition, no fees for materials, no hidden charges. 
                You may even qualify for support services like childcare and transportation assistance.
              </p>
            </div>

            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-2">How do I check my eligibility?</h3>
              <p className="text-gray-600">
                Click "Check Eligibility" above to complete a quick assessment. We'll review your information and connect you with 
                your local workforce development board to confirm eligibility and start the enrollment process.
              </p>
            </div>

            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-2">Can I pay out of pocket if I don't qualify for WIOA?</h3>
              <p className="text-gray-600">
                Yes! Our self-pay option allows anyone to enroll in our programs. While WIOA funding covers most participants, 
                we offer competitive pricing for those who prefer to pay directly or are sponsored by their employer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
