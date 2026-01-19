import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    'Meet the dedicated team powering workforce development and community impact at Elevate for Humanity.',
};

// Leadership team
const leadershipTeam = [
  {
    name: 'Elizabeth Greene',
    role: 'Founder & CEO',
    image: '/images/team/elizabeth-greene.jpg',
    bio: 'Elizabeth founded and operates Elevate for Humanity, managing all aspects of workforce development, compliance, partnerships, and operations. She ensures every individual receives the guidance they need to succeed.',
    focus: [
      'Workforce development program design',
      'Government contracting & compliance',
      'Strategic partnerships',
      'Community-centered systems design',
    ],
  },
];

// Add your team members here with name, role, image path, and bio
const teamMembers: Array<{
  name: string;
  role: string;
  image: string;
  bio: string;
}> = [
  // Add team members in this format:
  // {
  //   name: 'Team Member Name',
  //   role: 'Job Title',
  //   image: '/images/team/member-photo.jpg',
  //   bio: 'Brief bio about the team member.',
  // },
];

// Instructors/Program Staff
const instructors = [
  {
    name: 'Healthcare Instructor',
    role: 'CNA & Medical Training',
    image: '/images/team/instructors/instructor-health.jpg',
    specialty: 'Healthcare Programs',
  },
  {
    name: 'Trades Instructor',
    role: 'Skilled Trades Training',
    image: '/images/team/instructors/instructor-trades.jpg',
    specialty: 'HVAC, Electrical, Plumbing',
  },
  {
    name: 'Barber Instructor',
    role: 'Barber Apprenticeship',
    image: '/images/team/instructors/instructor-barber.jpg',
    specialty: 'Barber Training',
  },
  {
    name: 'Business Instructor',
    role: 'Business & Professional Skills',
    image: '/images/team/instructors/instructor-business.jpg',
    specialty: 'Business Programs',
  },
  {
    name: 'Technology Instructor',
    role: 'IT & Tech Training',
    image: '/images/team/instructors/instructor-tech.jpg',
    specialty: 'Technology Programs',
  },
  {
    name: 'Tax Preparation Instructor',
    role: 'VITA Tax Certification',
    image: '/images/team/instructors/instructor-tax.jpg',
    specialty: 'Tax Preparation',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-slate-900">
        <Image
          src="/images/pexels/success-team.jpg"
          alt="Elevate for Humanity Team"
          fill
          className="object-cover opacity-40"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Dedicated professionals committed to transforming lives through workforce development
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The vision and direction behind Elevate for Humanity
            </p>
          </div>

          {leadershipTeam.map((leader, index) => (
            <div key={index} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-auto min-h-[400px]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-xl mb-6">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {leader.bio}
                    </p>
                    {leader.focus && (
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Areas of Focus:
                        </h4>
                        <ul className="space-y-2">
                          {leader.focus.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members Section - Only show if there are team members */}
      {teamMembers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The dedicated professionals who make it all happen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instructors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Instructors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry experts dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white text-sm font-medium">{instructor.specialty}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-blue-600 text-sm font-medium">{instructor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We are always looking for passionate individuals who want to make a difference 
            in workforce development and community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Work With Us</h2>
          <p className="text-xl text-blue-100 mb-8">
            Interested in partnering or collaborating with our team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg text-lg font-bold hover:bg-blue-800 border-2 border-white transition-colors"
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
