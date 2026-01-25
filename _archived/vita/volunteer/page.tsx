import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Heart, Award, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer | VITA Free Tax Prep',
  description: 'Become a VITA volunteer and help your community with free tax preparation.',
};

export const dynamic = 'force-dynamic';

export default async function VITAVolunteerPage() {
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

  // Get volunteer stats
  const { data: stats } = await supabase
    .from('vita_volunteer_stats')
    .select('*')
    .single();

  // Get upcoming training sessions
  const { data: trainingSessions } = await supabase
    .from('vita_training')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(3);

  const defaultStats = {
    volunteers: 45,
    hours_donated: 2500,
    returns_filed: 2045,
  };

  const displayStats = stats || defaultStats;

  const benefits = [
    'Free IRS certification training',
    'Flexible scheduling',
    'Make a real difference in your community',
    'Gain valuable tax preparation experience',
    'Network with other professionals',
    'Continuing education credits available',
  ];

  const requirements = [
    'Must be 18 years or older',
    'Pass IRS certification exam (training provided)',
    'Commit to at least 4 hours per week during tax season',
    'Background check required',
    'Reliable transportation',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Become a VITA Volunteer</h1>
          <p className="text-xl text-green-100">
            Help your community by providing free tax preparation
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">{displayStats.volunteers}</div>
            <div className="text-gray-600">Active Volunteers</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Clock className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">{displayStats.hours_donated.toLocaleString()}</div>
            <div className="text-gray-600">Hours Donated</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Award className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">{displayStats.returns_filed.toLocaleString()}</div>
            <div className="text-gray-600">Returns Filed</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-green-600" />
              Volunteer Benefits
            </h2>
            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-green-600" />
              Requirements
            </h2>
            <ul className="space-y-3">
              {requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Training Sessions */}
        {trainingSessions && trainingSessions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-12">
            <h2 className="text-xl font-bold mb-6">Upcoming Training Sessions</h2>
            <div className="space-y-4">
              {trainingSessions.map((session: any) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{session.title}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString()} • {session.location}
                    </div>
                  </div>
                  <Link
                    href={`/vita/volunteer/register?session=${session.id}`}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Register
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply CTA */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-gray-600 mb-6">
            Join our team of volunteers and help families in your community keep more of their hard-earned money.
          </p>
          <Link
            href="/apply?type=vita-volunteer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Apply to Volunteer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
