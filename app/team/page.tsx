import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    'Meet the dedicated professionals leading Elevate For Humanity\'s mission to transform lives through education and career training.',
};

export const dynamic = 'force-dynamic';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  display_order: number;
}

export default async function TeamPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { data: teamMembers, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error || !teamMembers || teamMembers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-gray-600 mb-6">Team information is being updated.</p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    );
  }

  // Group by department
  const leadership = teamMembers.filter((m: TeamMember) => m.department === 'leadership');
  const staff = teamMembers.filter((m: TeamMember) => m.department === 'staff');
  const instructors = teamMembers.filter((m: TeamMember) => m.department === 'instructors');

  return (
    <div className="min-h-screen bg-gray-50">
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
        {leadership.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Leadership</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.map((member: TeamMember) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="h-64 bg-gray-200 relative">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                    {member.bio && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{member.bio}</p>
                    )}
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
              ))}
            </div>
          </section>
        )}

        {/* Staff */}
        {staff.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Staff</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {staff.map((member: TeamMember) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 relative overflow-hidden">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.title}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-gray-500 hover:text-blue-600"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Instructors */}
        {instructors.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Instructors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructors.map((member: TeamMember) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 relative overflow-hidden">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.title}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-xs line-clamp-2">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

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
