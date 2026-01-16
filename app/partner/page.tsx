import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Building2, Users, Award, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Portal | Elevate For Humanity',
  description: 'Partner with Elevate for Humanity to train and hire skilled workers.',
};

export const dynamic = 'force-dynamic';

export default async function PartnerPage() {
  const supabase = await createClient();

  const { count: partnerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'partner');

  const { count: placementCount } = await supabase
    .from('placements')
    .select('*', { count: 'exact', head: true });

  const benefits = [
    'Access to trained, job-ready candidates',
    'Customized training programs for your industry',
    'Reduced hiring and training costs',
    'Tax incentives for hiring program graduates',
    'Ongoing support and retention assistance',
    'Diversity and inclusion hiring support',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner With Us</h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Join {partnerCount || 50}+ organizations building their workforce through our training programs.
          </p>
          <div className="flex gap-4">
            <Link href="/partner/apply" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Become a Partner
            </Link>
            <Link href="/partner/login" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400">
              Partner Login
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">{partnerCount || 50}+</div>
            <div className="text-gray-600">Partner Organizations</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">{placementCount || 200}+</div>
            <div className="text-gray-600">Successful Placements</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">85%</div>
            <div className="text-gray-600">Retention Rate</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-6">Partner Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/partner/apply" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              Apply to Partner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
