import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Heart,
  Users,
  Award,
  Target,
  TrendingUp,
  Building2,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Elevate For Humanity',
  description: 'Learn about our mission to provide free career training and job placement for underserved communities.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const supabase = await createClient();

  // Get real stats
  const { count: studentsServed } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: graduatesPlaced } = await supabase
    .from('placements')
    .select('*', { count: 'exact', head: true });

  const { count: employerPartners } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const { count: programCount } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Get team members
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('order', { ascending: true });

  const stats = [
    { icon: Users, value: studentsServed || 500, label: 'Students Served' },
    { icon: GraduationCap, value: graduatesPlaced || 300, label: 'Graduates Placed' },
    { icon: Building2, value: employerPartners || 50, label: 'Employer Partners' },
    { icon: Award, value: programCount || 15, label: 'Training Programs' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe everyone deserves access to quality career training regardless of their background.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We maintain high standards in our training programs to ensure graduates are job-ready.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build lasting relationships with students, employers, and community partners.',
    },
    {
      icon: TrendingUp,
      title: 'Impact',
      description: 'We measure success by the positive change we create in people\'s lives and careers.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About Elevate For Humanity
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Empowering individuals through free career training and job placement services.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Elevate For Humanity is a 501(c)(3) nonprofit organization dedicated to breaking 
                the cycle of poverty through workforce development. We provide 100% free career 
                training, industry certifications, and job placement services to individuals 
                facing barriers to employment.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Through partnerships with employers, government agencies, and community organizations, 
                we connect trained graduates with meaningful employment opportunities that provide 
                living wages and career advancement potential.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                View Our Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                A world where everyone has access to the training and support they need to 
                build a successful career and achieve financial stability.
              </p>
              <h3 className="text-xl font-bold mb-4">Our Approach</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                  <span>Identify in-demand careers with living wages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                  <span>Provide free, high-quality training programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                  <span>Connect graduates with employer partners</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                  <span>Provide ongoing career support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-blue-200" />
                <div className="text-4xl font-bold mb-1">{stat.value}+</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-gray-50 rounded-xl p-6 text-center">
                <value.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          {teamMembers && teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member: any) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 overflow-hidden">
                    {member.photo_url ? (
                      <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-blue-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Team information coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're looking for training, want to hire our graduates, or support our work, 
            there's a place for you at Elevate For Humanity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Apply for Training
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 border-2 border-white"
            >
              Become a Partner
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
