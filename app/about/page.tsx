import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, ArrowRight, Users, Target, Heart, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description:
    'A workforce development ecosystem helping individuals access training, funding, and employment pathways.',
  alternates: {
    canonical: 'https://elevateforhumanity.org/about',
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'People First',
      description: 'Every decision we make starts with how it impacts the people we serve.',
      href: '/about/people-first',
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: '85% job placement rate. We measure success by student outcomes.',
      href: '/about/results-driven',
    },
    {
      icon: Award,
      title: 'Barrier Removal',
      description: 'We eliminate obstacles that prevent people from succeeding in training.',
      href: '/about/barrier-removal',
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Transforming lives strengthens families, neighborhoods, and our entire community.',
      href: '/about/community-impact',
    },
  ];

  const links = [
    {
      title: 'Our Founder',
      description: 'Meet Elizabeth Greene, founder and CEO of Elevate for Humanity.',
      href: '/founder',
      image: '/media/programs/efh-business-startup-marketing-hero.jpg',
    },
    {
      title: 'Our Team',
      description: 'Meet the dedicated people behind Elevate for Humanity.',
      href: '/team',
      image: '/media/programs/cpr-certification-group-hd.jpg',
    },
    {
      title: 'Philanthropy',
      description: 'Our charitable giving and community impact initiatives.',
      href: '/philanthropy',
      image: '/media/programs/efh-public-safety-reentry-hero.jpg',
    },
    {
      title: 'Blog',
      description: 'Stories, updates, and insights from our team.',
      href: '/blog',
      image: '/media/programs/workforce-readiness-hero.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              About Elevate for Humanity
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              A workforce development ecosystem helping individuals access training, funding, and employment pathways.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">85%</div>
                <div className="text-sm sm:text-base text-white/80">Job Placement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">100%</div>
                <div className="text-sm sm:text-base text-white/80">Free Training</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">20+</div>
                <div className="text-sm sm:text-base text-white/80">Programs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">1000+</div>
                <div className="text-sm sm:text-base text-white/80">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            We connect individuals to free career training, remove barriers to success, and create pathways to sustainable employment. 
            Through partnerships with workforce boards, employers, and community organizations, we're building a more inclusive economy.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Link key={idx} href={value.href} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-blue-500 hover:shadow-xl transition-all group">
                  <Icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{value.title}</h3>
                  <p className="text-gray-600 mb-4">{value.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learn More Links */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center">Learn More</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 aspect-square flex flex-col"
              >
                <div className="relative h-2/3 overflow-hidden">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 sm:p-6 h-1/3 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Join thousands of students who have transformed their careers through our programs.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
