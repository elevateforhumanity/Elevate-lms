import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, DollarSign, Gift, Target, HandHeart } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/philanthropy',
  },
  title: 'Philanthropy | Elevate For Humanity',
  description:
    'Support workforce development and career training through philanthropic giving. Your donation helps transform lives.',
};

export const dynamic = 'force-dynamic';

export default async function PhilanthropyPage() {
  const supabase = await createClient();

  // Get donation campaigns
  const { data: campaigns } = await supabase
    .from('donation_campaigns')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Get impact statistics
  const { data: impactStats } = await supabase
    .from('impact_statistics')
    .select('*')
    .eq('category', 'philanthropy')
    .order('order', { ascending: true });

  // Get donor testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('category', 'donor')
    .eq('is_featured', true)
    .limit(3);

  const defaultStats = [
    { label: 'Students Supported', value: '2,500+', icon: Users },
    { label: 'Scholarships Awarded', value: '$1.2M', icon: DollarSign },
    { label: 'Career Placements', value: '1,800+', icon: Target },
    { label: 'Community Partners', value: '150+', icon: HandHeart },
  ];

  const displayStats = impactStats && impactStats.length > 0 ? impactStats : defaultStats;

  const givingOptions = [
    {
      title: 'Student Scholarships',
      description: 'Fund training for individuals who need financial assistance to start their career journey.',
      amount: '$500 - $5,000',
      icon: Gift,
    },
    {
      title: 'Program Development',
      description: 'Support the creation of new training programs in high-demand career fields.',
      amount: '$10,000+',
      icon: Target,
    },
    {
      title: 'Equipment & Resources',
      description: 'Provide modern equipment and learning materials for hands-on training.',
      amount: '$1,000 - $25,000',
      icon: DollarSign,
    },
    {
      title: 'Monthly Giving',
      description: 'Join our sustaining donor program with recurring monthly contributions.',
      amount: '$25/month+',
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-5.jpg"
          alt="Philanthropy"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="w-16 h-16 text-red-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Transform Lives Through Giving
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 max-w-2xl mx-auto">
            Your philanthropic support helps individuals access career training, 
            earn certifications, and build better futures for themselves and their families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-slate-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {displayStats.map((stat: any, index: number) => {
              const IconComponent = stat.icon || Heart;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="w-10 h-10 text-red-500 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Ways to Give</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Choose how you'd like to make an impact in the lives of aspiring professionals.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {givingOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border p-8 hover:shadow-md transition">
                    <IconComponent className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <div className="text-lg font-semibold text-red-600">{option.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      {campaigns && campaigns.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Campaigns</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {campaigns.map((campaign: any) => (
                <div key={campaign.id} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  {campaign.goal && campaign.raised && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>${campaign.raised.toLocaleString()} raised</span>
                        <span>Goal: ${campaign.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <Link
                    href={`/donate?campaign=${campaign.id}`}
                    className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Support This Campaign
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Donor Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Donors Give</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  {testimonial.title && (
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tax Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Tax-Deductible Giving</h2>
            <p className="text-gray-600 mb-6">
              Elevate for Humanity is a registered 501(c)(3) nonprofit organization. 
              Your donations are tax-deductible to the fullest extent allowed by law. 
              You will receive a receipt for your records.
            </p>
            <p className="text-sm text-gray-500">
              EIN: XX-XXXXXXX | Please consult your tax advisor for specific guidance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Every donation helps someone access the training they need to build a better future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Contact Development Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
