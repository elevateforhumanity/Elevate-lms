import Link from 'next/link';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import { Heart, DollarSign, FileText, CheckCircle, Users, Clock, MapPin, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VITA Tax Prep - Free Tax Preparation | Elevate for Humanity',
  description: 'Free IRS-certified tax preparation for qualifying individuals through the Volunteer Income Tax Assistance program',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita',
  },
};

export const dynamic = 'force-dynamic';

export default async function VITAPage() {
  const supabase = await createClient();

  // Get VITA statistics
  const { data: stats } = await supabase
    .from('vita_statistics')
    .select('*')
    .eq('year', new Date().getFullYear())
    .single();

  // Get VITA locations
  const { data: locations } = await supabase
    .from('vita_locations')
    .select('*')
    .eq('is_active', true)
    .limit(4);

  // Get upcoming availability
  const { data: availability } = await supabase
    .from('vita_availability')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(5);

  const defaultStats = {
    returns_filed: 2045,
    average_refund: 2847,
    total_saved: 408000,
    income_limit: 64000,
  };

  const displayStats = stats || defaultStats;

  const features = [
    { icon: DollarSign, title: '100% Free', description: 'No hidden fees. Save $200+ in tax prep costs.' },
    { icon: CheckCircle, title: 'IRS Certified', description: 'All volunteers are IRS-certified tax preparers.' },
    { icon: FileText, title: 'E-File Included', description: 'Electronic filing and direct deposit setup.' },
    { icon: Users, title: 'Expert Help', description: 'Get help with credits like EITC and Child Tax Credit.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="💚 100% FREE Tax Prep - Save $200+"
        headline="File Your Taxes"
        accentText="For $0"
        subheadline="Free VITA Tax Preparation - Income Under $64K"
        description={`We filed ${displayStats.returns_filed.toLocaleString()} FREE returns last year. Average refund: $${displayStats.average_refund.toLocaleString()}. Total saved in tax prep fees: $${displayStats.total_saved.toLocaleString()}. If you earn under $${displayStats.income_limit.toLocaleString()}, you qualify.`}
        imageSrc="/images/business/tax-prep-certification-optimized.jpg"
        imageAlt="Free VITA Tax Preparation"
        primaryCTA={{ text: "Book Free Appointment", href: "/vita/schedule" }}
        secondaryCTA={{ text: "Check If You Qualify", href: "/vita/eligibility" }}
        features={[
          `${displayStats.returns_filed.toLocaleString()} free returns • $${displayStats.total_saved.toLocaleString()} saved`,
          `Average refund: $${displayStats.average_refund.toLocaleString()} • Income under $${displayStats.income_limit.toLocaleString()}`,
          "IRS-certified volunteers • E-file • Direct deposit - all FREE"
        ]}
        imageOnRight={true}
      />

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VITA?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Find a Location</h2>
          <p className="text-gray-600 text-center mb-12">
            Visit one of our VITA sites for free tax preparation
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {locations && locations.length > 0 ? (
              locations.map((location: any) => (
                <div key={location.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg">{location.name}</h3>
                      <p className="text-gray-600">{location.address}</p>
                      <p className="text-gray-600">{location.city}, {location.state} {location.zip}</p>
                      {location.hours && (
                        <p className="text-sm text-green-600 mt-2">{location.hours}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">VITA Tax Preparation Site</h3>
                    <p className="text-gray-600">8888 Keystone Crossing, Suite 1300</p>
                    <p className="text-gray-600">Indianapolis, IN 46240</p>
                    <p className="text-sm text-black mt-2">Call (317) 314-3757 for appointment</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/vita/locations"
              className="text-green-600 font-medium hover:underline"
            >
              View all locations →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/vita/eligibility" className="bg-white rounded-xl p-6 hover:shadow-md transition">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">Check Eligibility</h3>
              <p className="text-gray-600 text-sm">See if you qualify for free tax prep</p>
            </Link>
            <Link href="/vita/what-to-bring" className="bg-white rounded-xl p-6 hover:shadow-md transition">
              <FileText className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">What to Bring</h3>
              <p className="text-gray-600 text-sm">Documents needed for your appointment</p>
            </Link>
            <Link href="/vita/schedule" className="bg-white rounded-xl p-6 hover:shadow-md transition">
              <Calendar className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">Schedule</h3>
              <p className="text-gray-600 text-sm">Book your free appointment</p>
            </Link>
            <Link href="/vita/volunteer" className="bg-white rounded-xl p-6 hover:shadow-md transition">
              <Heart className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">Volunteer</h3>
              <p className="text-gray-600 text-sm">Help your community as a tax preparer</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to File for Free?
          </h2>
          <p className="text-green-100 mb-8">
            Schedule your free appointment today and keep more of your refund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vita/schedule"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Book Free Appointment
            </Link>
            <Link
              href="/vita/faq"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
