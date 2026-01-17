import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Users, Clock, Award, ArrowRight, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer Opportunities | Elevate For Humanity',
  description: 'Make a difference in your community. Volunteer with Elevate to help others achieve their career goals.',
};

const opportunities = [
  {
    title: 'VITA Tax Preparation',
    description: 'Help low-income families file their taxes for free. IRS certification provided.',
    commitment: '4-8 hours/week during tax season',
    location: 'Indianapolis area sites',
    icon: '📊',
  },
  {
    title: 'Career Mentorship',
    description: 'Guide students through their career journey with your professional experience.',
    commitment: '2-4 hours/month',
    location: 'Virtual or in-person',
    icon: '🎯',
  },
  {
    title: 'Mock Interviews',
    description: 'Conduct practice interviews to help students prepare for job opportunities.',
    commitment: '2-3 hours/month',
    location: 'Virtual',
    icon: '💼',
  },
  {
    title: 'Resume Review',
    description: 'Review and provide feedback on student resumes to improve their job prospects.',
    commitment: 'Flexible',
    location: 'Virtual',
    icon: '📝',
  },
  {
    title: 'Guest Speaker',
    description: 'Share your industry expertise and career journey with our students.',
    commitment: '1-2 hours per session',
    location: 'Virtual or in-person',
    icon: '🎤',
  },
  {
    title: 'Event Support',
    description: 'Help organize and run career fairs, graduation ceremonies, and community events.',
    commitment: 'As needed',
    location: 'Indianapolis area',
    icon: '🎉',
  },
];

const benefits = [
  { icon: Heart, title: 'Make an Impact', description: 'Help transform lives in your community' },
  { icon: Users, title: 'Network', description: 'Connect with professionals and community leaders' },
  { icon: Clock, title: 'Flexible Hours', description: 'Volunteer on your own schedule' },
  { icon: Award, title: 'Recognition', description: 'Receive certificates and letters of recommendation' },
];

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Make a Difference
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Volunteer With Us
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Share your skills and experience to help others achieve their career goals. Every hour you give creates lasting change in someone's life.
            </p>
            <Link
              href="/apply?type=volunteer"
              className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Apply to Volunteer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-purple-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <benefit.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold mb-1">{benefit.title}</div>
                <div className="text-gray-600 text-sm">{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Volunteer Opportunities</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Choose from a variety of ways to contribute based on your skills, interests, and availability.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div key={opp.title} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{opp.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{opp.title}</h3>
                <p className="text-gray-600 mb-4">{opp.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {opp.commitment}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {opp.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our community of volunteers and help transform lives through education and career development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply?type=volunteer"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
