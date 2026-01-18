import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  MessageSquare,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join Our Community | Elevate for Humanity',
  description:
    'Become part of the Elevate community. Connect with fellow learners, access exclusive resources, and accelerate your career growth.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/community/join',
  },
};

export default function JoinCommunityPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Connect with Peers',
      description: 'Network with students and professionals in your field',
    },
    {
      icon: MessageSquare,
      title: 'Discussion Forums',
      description: 'Ask questions, share knowledge, and get support',
    },
    {
      icon: BookOpen,
      title: 'Exclusive Resources',
      description: 'Access study guides, templates, and career tools',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Earn badges and recognition for your contributions',
    },
  ];

  const testimonials = [
    {
      quote: 'The community helped me stay motivated throughout my training. I made connections that led to my first job.',
      author: 'Marcus J.',
      role: 'HVAC Graduate',
      image: '/images/testimonials/student-marcus.jpg',
    },
    {
      quote: 'Being able to ask questions and get answers from people who have been through the program was invaluable.',
      author: 'Sarah M.',
      role: 'Medical Assistant Student',
      image: '/images/testimonials/student-sarah.jpg',
    },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/community" className="hover:text-blue-600">Community</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Join</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Elevate Community
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with thousands of learners, share experiences, and accelerate your career journey together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition inline-flex items-center justify-center"
            >
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-bold transition border-2 border-white/30"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Why Join Our Community?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Being part of the Elevate community gives you access to resources, connections, and support that can make all the difference in your career.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Discussion Forums</p>
                    <p className="text-gray-600">Ask questions and get answers from peers and mentors</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Study Groups</p>
                    <p className="text-gray-600">Join or create groups for your program or certification</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Resource Library</p>
                    <p className="text-gray-600">Access templates, guides, and study materials</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Networking Events</p>
                    <p className="text-gray-600">Virtual and in-person events to expand your network</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Job Board Access</p>
                    <p className="text-gray-600">Exclusive job postings from employer partners</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Community Stats
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">5,000+</p>
                  <p className="text-gray-600">Active Members</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">150+</p>
                  <p className="text-gray-600">Discussion Topics</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">24</p>
                  <p className="text-gray-600">Active Groups</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">92%</p>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What Members Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Create your free account and start connecting with the community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition inline-flex items-center justify-center"
            >
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/community"
              className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition border-2 border-white/30"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
