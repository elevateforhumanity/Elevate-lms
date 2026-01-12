import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { Target, TrendingUp, Users, ArrowRight, Calendar, CheckCircle, MessageCircle, Briefcase } from 'lucide-react';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

export const metadata: Metadata = {
  title: 'Career Counseling Services | One-on-One Career Guidance | Elevate for Humanity',
  description:
    'Professional career counseling for long-term success. Get personalized guidance, goal setting, career pathway planning, and ongoing support from experienced counselors.',
  keywords: 'career counseling, career guidance, career planning, professional development, career coach, job counseling',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/career-services/career-counseling',
  },
};

export default function CareerCounselingPage() {
  return (
    <>
      <ModernLandingHero
        badge="💼 Career Services"
        headline="Professional Career"
        accentText="Counseling"
        subheadline="One-on-One Guidance for Your Career Success"
        description="Work with experienced career counselors to define your goals, explore opportunities, and create a personalized plan for long-term career success. Available to all students and alumni."
        imageSrc="/images/services/career-counseling.jpg"
        imageAlt="Career counselor meeting with student"
        primaryCTA={{ text: "Schedule Counseling", href: "/contact" }}
        secondaryCTA={{ text: "View All Services", href: "/career-services" }}
        features={[
          "One-on-one sessions • Personalized career plans",
          "Goal setting and pathway planning • Skills assessment",
          "Ongoing support • Available to students and alumni"
        ]}
        imageOnRight={true}
      />

      {/* Quick Facts */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-black mb-4">Session Length</h3>
            <p className="text-3xl font-black text-purple-600 mb-2">45-60 min</p>
            <p className="text-black">Per counseling session</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-black mb-4">Availability</h3>
            <p className="text-3xl font-black text-blue-600 mb-2">Free</p>
            <p className="text-black">For students and alumni</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-black mb-4">Format</h3>
            <p className="text-3xl font-black text-green-600 mb-2">Flexible</p>
            <p className="text-black">In-person, phone, or video</p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Goal Setting & Planning</h3>
              <ul className="space-y-2 text-black">
                <li>• Define short-term and long-term career goals</li>
                <li>• Create actionable career development plans</li>
                <li>• Identify skills and experience needed for advancement</li>
                <li>• Set realistic timelines and milestones</li>
                <li>• Develop strategies to overcome obstacles</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Career Pathway Exploration</h3>
              <ul className="space-y-2 text-black">
                <li>• Explore career options in your field</li>
                <li>• Understand advancement opportunities</li>
                <li>• Research salary expectations and job outlook</li>
                <li>• Identify transferable skills</li>
                <li>• Plan career transitions and pivots</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Skills Assessment</h3>
              <ul className="space-y-2 text-black">
                <li>• Evaluate your current skills and strengths</li>
                <li>• Identify areas for professional development</li>
                <li>• Discover hidden talents and interests</li>
                <li>• Match skills to career opportunities</li>
                <li>• Create personalized development plans</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Ongoing Support</h3>
              <ul className="space-y-2 text-black">
                <li>• Regular check-ins and progress reviews</li>
                <li>• Accountability and motivation</li>
                <li>• Guidance through career transitions</li>
                <li>• Support during job searches</li>
                <li>• Lifetime access for alumni</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8">How Career Counseling Works</h2>
          <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Schedule Your Session</h3>
                  <p className="text-black">
                    Book an appointment online, by phone, or in person. Choose a time that works for your schedule.
                    Sessions available weekdays and select evenings.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Initial Assessment</h3>
                  <p className="text-black">
                    Your counselor will learn about your background, interests, goals, and challenges. We'll discuss
                    your current situation and where you want to be in your career.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Create Your Plan</h3>
                  <p className="text-black">
                    Together, we'll develop a personalized career action plan with specific goals, timelines, and
                    steps. You'll leave with clear direction and actionable next steps.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Ongoing Support</h3>
                  <p className="text-black">
                    Schedule follow-up sessions as needed. Your counselor is available for check-ins, questions,
                    and support as you progress toward your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Who Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8">Who Benefits from Career Counseling</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">Current Students</h3>
              <p className="text-black">
                Plan your career path while in training. Understand job opportunities and prepare for your
                first role in your new field.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">Recent Graduates</h3>
              <p className="text-black">
                Navigate your first job search, negotiate offers, and successfully transition into your
                new career with confidence.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">Alumni</h3>
              <p className="text-black">
                Advance in your current role, explore new opportunities, or make a career change with
                ongoing support from your counselor.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  M
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Maria Rodriguez</h3>
                  <p className="text-sm text-gray-600">CNA Graduate → LPN Student</p>
                </div>
              </div>
              <p className="text-black italic mb-4">
                "My career counselor helped me see that I could advance beyond CNA. We created a plan for
                me to become an LPN, and now I'm enrolled in nursing school while working full-time."
              </p>
              <p className="text-sm text-gray-600">Salary increase: $16/hr → $24/hr (projected)</p>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  J
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">James Thompson</h3>
                  <p className="text-sm text-gray-600">CDL Graduate → Fleet Manager</p>
                </div>
              </div>
              <p className="text-black italic mb-4">
                "I thought driving was my only option. Career counseling showed me a path to management.
                Three years later, I'm managing a fleet of 20 drivers."
              </p>
              <p className="text-sm text-gray-600">Salary increase: $45K → $72K annually</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">How often should I meet with a career counselor?</h3>
              <p className="text-black">
                It varies by individual needs. Most students benefit from monthly sessions during training and
                quarterly check-ins after graduation. You can schedule as often as needed.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">Is career counseling really free?</h3>
              <p className="text-black">
                Yes! Career counseling is included as part of our commitment to your success. There are no
                additional fees for students or alumni.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">Can I switch counselors if needed?</h3>
              <p className="text-black">
                Absolutely. We want you to work with someone you're comfortable with. Just let us know and
                we'll match you with a different counselor.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-black mb-2">What if I'm not sure what I want to do?</h3>
              <p className="text-black">
                That's exactly what career counseling is for! We'll help you explore options, assess your
                interests and skills, and discover career paths you may not have considered.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Career Success?</h2>
          <p className="text-xl mb-8">
            Schedule your first career counseling session today and take control of your professional future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Schedule Counseling
            </Link>
            <Link
              href="/career-services"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              <Briefcase className="w-5 h-5" />
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
