import { Metadata } from 'next';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Heart, Award, Users, DollarSign, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About VITA | Free Tax Prep',
  description: 'Learn about the VITA program and how we help families with free tax preparation.',
};

export const dynamic = 'force-dynamic';

export default async function VITAAboutPage() {
  const supabase = await createClient();

  // Get VITA statistics
  const { data: stats } = await supabase
    .from('vita_statistics')
    .select('*')
    .order('year', { ascending: false })
    .limit(1)
    .single();

  // Get team members
  const { data: team } = await supabase
    .from('vita_team')
    .select('*')
    .eq('is_active', true)
    .order('order', { ascending: true });

  const defaultStats = {
    years_serving: 10,
    total_returns: 15000,
    total_saved: 3000000,
    volunteers: 200,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">About VITA</h1>
          <p className="text-xl text-green-100">
            Helping families keep more of their hard-earned money
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* Mission */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Volunteer Income Tax Assistance (VITA) program is an IRS initiative that provides 
            free tax preparation services to qualifying individuals. Our mission is to help 
            working families, seniors, and individuals with disabilities file their taxes 
            accurately and claim all the credits they deserve—at no cost.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Award className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">{displayStats.years_serving}+</div>
            <div className="text-gray-600">Years Serving</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">{displayStats.total_returns?.toLocaleString()}+</div>
            <div className="text-gray-600">Returns Filed</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">${(displayStats.total_saved / 1000000).toFixed(1)}M+</div>
            <div className="text-gray-600">Saved in Fees</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold">{displayStats.volunteers}+</div>
            <div className="text-gray-600">Volunteers</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How VITA Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">IRS-Certified Volunteers</h3>
                <p className="text-gray-600">All our volunteers complete IRS training and certification to ensure accurate tax preparation.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Quality Review</h3>
                <p className="text-gray-600">Every return is reviewed by a second certified volunteer before filing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">E-File & Direct Deposit</h3>
                <p className="text-gray-600">We electronically file your return and set up direct deposit for faster refunds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        {team && team.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member: any) => (
                <div key={member.id} className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden relative">
                    {member.photo_url && (
                      <Image src={member.photo_url} alt={member.name} fill className="object-cover" sizes="80px" />
                    )}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to File for Free?</h3>
          <p className="text-gray-600 mb-6">
            Schedule your appointment today and keep more of your refund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vita/schedule"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Schedule Appointment
            </Link>
            <Link
              href="/vita/volunteer"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
