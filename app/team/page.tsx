import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Mail, ArrowRight, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    'Meet the dedicated professionals leading Elevate For Humanity\'s mission to transform lives through education and career training.',
};

// Team data
const leadership = [
  {
    id: '1',
    name: 'Elizabeth Greene',
    title: 'Founder & Executive Director',
    image: '/images/team/elizabeth-greene.jpg',
    bio: 'Elizabeth founded Elevate for Humanity with a vision to create pathways out of poverty through workforce development. With over 15 years of experience in education and community development, she leads our mission to transform lives through career training and support services.',
    email: 'elizabeth@elevateforhumanity.org',
  },
];

const staff = [
  {
    id: '2',
    name: 'Program Director',
    title: 'Director of Programs',
    image: '/images/team/instructors/instructor-business.jpg',
    bio: 'Oversees all training programs and ensures quality delivery of workforce development services.',
  },
  {
    id: '3',
    name: 'Career Services Manager',
    title: 'Career Services',
    image: '/images/team/instructors/instructor-retail.jpg',
    bio: 'Connects graduates with employment opportunities and provides job placement support.',
  },
  {
    id: '4',
    name: 'Student Success Coordinator',
    title: 'Student Services',
    image: '/images/team/instructors/instructor-reentry.jpg',
    bio: 'Provides wraparound support services to help students overcome barriers to success.',
  },
];

const instructors = [
  {
    id: '10',
    name: 'Healthcare Instructor',
    title: 'CNA & Healthcare Programs',
    image: '/images/team/instructors/instructor-health.jpg',
    bio: 'Certified nursing professional with clinical experience training the next generation of healthcare workers.',
  },
  {
    id: '11',
    name: 'Recovery Coach Instructor',
    title: 'Peer Recovery Programs',
    image: '/images/team/instructors/instructor-recovery.jpg',
    bio: 'Certified peer recovery specialist training students to support others in recovery.',
  },
  {
    id: '12',
    name: 'Trades Instructor',
    title: 'Construction & Skilled Trades',
    image: '/images/team/instructors/instructor-trades.jpg',
    bio: 'Master tradesperson with decades of experience in construction and building trades.',
  },
  {
    id: '13',
    name: 'Technology Instructor',
    title: 'IT & Digital Skills',
    image: '/images/team/instructors/instructor-tech.jpg',
    bio: 'Technology professional teaching digital literacy and IT fundamentals.',
  },
  {
    id: '14',
    name: 'Safety Instructor',
    title: 'OSHA & Workplace Safety',
    image: '/images/team/instructors/instructor-safety.jpg',
    bio: 'Certified safety professional teaching OSHA compliance and workplace safety.',
  },
  {
    id: '15',
    name: 'Cosmetology Instructor',
    title: 'Beauty & Barbering',
    image: '/images/team/instructors/instructor-beauty.jpg',
    bio: 'Licensed cosmetologist training students in beauty services and salon management.',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Avatar Guide - handled by GlobalAvatar in layout */}
      
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="/images/heroes-hq/team-hero.jpg"
          alt="Our Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Our Team
            </h1>
            <p className="text-xl text-gray-200">
              Meet the dedicated professionals committed to transforming lives 
              through education and career training.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Leadership */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Leadership</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-2xl">
            {leadership.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-64 h-64 md:h-auto bg-gray-200 relative flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.title}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Staff */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Staff</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instructors */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Instructors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            We are always looking for passionate individuals who want to make a difference 
            in their community through workforce development.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
