import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">
            Programs
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
            About
          </Link>
          <Link href="/login" className="elevate-btn-secondary">
            Sign In
          </Link>
          <Link href="/signup" className="elevate-btn-primary">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">
            ✓ WIOA-Funded Training • 100% Free for Eligible Participants
          </div>
          <h1 className="elevate-hero-title">
            Transform Your Future with FREE Workforce Training
          </h1>
          <p className="elevate-hero-subtitle">
            Access high-quality career training programs funded by the Workforce Innovation and Opportunity Act (WIOA). Get the skills employers need—at no cost to you.
          </p>
          <div className="flex gap-4">
            <Link href="/enroll" className="elevate-btn-primary" style={{fontSize: '1.125rem', padding: '1rem 2rem'}}>
              Check Your Eligibility
            </Link>
            <Link href="/programs" className="elevate-btn-secondary" style={{fontSize: '1.125rem', padding: '1rem 2rem'}}>
              Browse Programs
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex gap-6 items-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>WIOA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Industry-Recognized Credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Job Placement Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Free Training</div>
              <div className="text-sm text-gray-500 mt-1">WIOA-Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-gray-600">Career Programs</div>
              <div className="text-sm text-gray-500 mt-1">High-Demand Fields</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">Job Placement</div>
              <div className="text-sm text-gray-500 mt-1">Within 6 Months</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">$45K+</div>
              <div className="text-gray-600">Avg. Starting Salary</div>
              <div className="text-sm text-gray-500 mt-1">For Graduates</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is WIOA Section */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is WIOA?</h2>
              <p className="text-lg text-gray-600">
                The Workforce Innovation and Opportunity Act provides FREE training to help Americans get high-quality jobs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="elevate-card elevate-card-red">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Who Qualifies?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Adults seeking career advancement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Dislocated workers needing retraining</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Youth ages 16-24 entering the workforce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Individuals with barriers to employment</span>
                  </li>
                </ul>
              </div>
              
              <div className="elevate-card elevate-card-blue">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What's Included?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>100% free tuition and training materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Job placement and career counseling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Support services (childcare, transportation)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Training Programs</h2>
            <p className="text-lg text-gray-600">
              Industry-recognized certifications in high-demand careers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="elevate-card elevate-card-red">
              <img 
                src="/course-covers/barber-apprenticeship/cover.svg" 
                alt="Barber Apprenticeship"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Barber Apprenticeship</h3>
              <p className="text-gray-600 mb-4">
                Master the art of barbering with comprehensive training in cutting, styling, and business skills.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  24 lessons • 12 weeks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  State certification prep
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  $35K-$55K starting salary
                </li>
              </ul>
              <Link href="/programs/barber" className="elevate-btn-primary w-full text-center block">
                Learn More
              </Link>
            </div>

            <div className="elevate-card elevate-card-blue">
              <img 
                src="/course-covers/cna-training/cover.svg" 
                alt="CNA Certification"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">CNA Certification</h3>
              <p className="text-gray-600 mb-4">
                Prepare for your Certified Nursing Assistant certification with expert-led training.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  30 lessons • 8 weeks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  State exam preparation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  $30K-$40K starting salary
                </li>
              </ul>
              <Link href="/programs/cna" className="elevate-btn-accent w-full text-center block">
                Learn More
              </Link>
            </div>

            <div className="elevate-card elevate-card-orange">
              <img 
                src="/course-covers/hvac-tech/cover.svg" 
                alt="HVAC Technician"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">HVAC Technician</h3>
              <p className="text-gray-600 mb-4">
                Learn heating, ventilation, and air conditioning systems from industry experts.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  28 lessons • 16 weeks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  EPA 608 certification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  $45K-$65K starting salary
                </li>
              </ul>
              <Link href="/programs/hvac-tech" className="elevate-btn-secondary w-full text-center block">
                Learn More
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/programs" className="elevate-btn-primary" style={{fontSize: '1.125rem', padding: '1rem 2rem'}}>
              View All 10 Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">
              Real people, real results—hear from graduates who transformed their careers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="elevate-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                  MJ
                </div>
                <div>
                  <div className="font-bold text-gray-900">Marcus Johnson</div>
                  <div className="text-sm text-gray-600">Barber Apprenticeship</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-orange-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "This program changed my life. I went from unemployed to owning my own barbershop in less than a year. The training was top-notch and 100% free through WIOA."
              </p>
              <div className="text-sm text-gray-600">
                Now earning: <span className="font-bold text-green-600">$52K/year</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="elevate-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  SM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Martinez</div>
                  <div className="text-sm text-gray-600">CNA Certification</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-orange-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "As a single mom, I couldn't afford training. WIOA covered everything—tuition, books, even childcare. I passed my state exam and got hired immediately."
              </p>
              <div className="text-sm text-gray-600">
                Now earning: <span className="font-bold text-green-600">$38K/year</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="elevate-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                  DW
                </div>
                <div>
                  <div className="font-bold text-gray-900">David Williams</div>
                  <div className="text-sm text-gray-600">HVAC Technician</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-orange-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "After 15 years in retail, I needed a career change. The HVAC program gave me real skills and certifications. I'm now making double what I used to earn."
              </p>
              <div className="text-sm text-gray-600">
                Now earning: <span className="font-bold text-green-600">$58K/year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos / Trust Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="elevate-container">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Trusted By Leading Organizations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder logos - replace with actual partner logos */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">WIOA</div>
                <div className="text-xs text-gray-400">Certified Provider</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">EmployIndy</div>
                <div className="text-xs text-gray-400">Partner</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">WorkOne</div>
                <div className="text-xs text-gray-400">Affiliate</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">DOL</div>
                <div className="text-xs text-gray-400">Approved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Check Eligibility</h3>
              <p className="text-sm text-gray-600">
                See if you qualify for free WIOA-funded training
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Choose Program</h3>
              <p className="text-sm text-gray-600">
                Select from 10+ high-demand career training programs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Complete Training</h3>
              <p className="text-sm text-gray-600">
                Learn from experts and earn industry certifications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Get Hired</h3>
              <p className="text-sm text-gray-600">
                Access job placement support and start your new career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-orange-600 to-blue-600 text-white">
        <div className="elevate-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Join thousands of Americans who have launched successful careers through FREE WIOA-funded training.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/enroll" className="elevate-btn-primary" style={{fontSize: '1.125rem', padding: '1rem 2.5rem', backgroundColor: 'white', color: '#dc2626'}}>
              Check Your Eligibility
            </Link>
            <Link href="/programs" className="elevate-btn-secondary" style={{fontSize: '1.125rem', padding: '1rem 2.5rem', borderColor: 'white', color: 'white'}}>
              Browse Programs
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-90">Free Training</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">10+</div>
              <div className="text-sm opacity-90">Career Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm opacity-90">Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="elevate-container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <span className="text-white font-bold">Elevate for Humanity</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering Americans through free workforce training and career development.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/programs/barber" className="hover:text-white">Barber Apprenticeship</Link></li>
                <li><Link href="/programs/cna" className="hover:text-white">CNA Certification</Link></li>
                <li><Link href="/programs/hvac-tech" className="hover:text-white">HVAC Technician</Link></li>
                <li><Link href="/programs" className="hover:text-white">View All Programs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Get Started</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/enroll" className="hover:text-white">Check Eligibility</Link></li>
                <li><Link href="/signup" className="hover:text-white">Create Account</Link></li>
                <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/apply" className="hover:text-white">Apply Now</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Elevate for Humanity. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
