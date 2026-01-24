import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Building2, Globe, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/directory',
  },
  title: 'Partner Directory | Elevate For Humanity',
  description:
    'Find employer partners, training sites, and workforce development organizations in our network.',
};

interface Partner {
  id: string;
  name: string;
  partner_type: string;
  description: string | null;
  website_url: string | null;
  featured: boolean;
  display_order: number;
}

export default async function DirectoryPage() {
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

  const { data: partners, error } = await supabase
    .from('partners')
    .select('id, name, partner_type, description, website_url, featured, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error || !partners || partners.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Partner Directory</h1>
          <p className="text-gray-600 mb-6">Our partner directory is being updated.</p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact us about partnerships
          </Link>
        </div>
      </div>
    );
  }

  const partnerTypes = [...new Set(partners.map((p: Partner) => p.partner_type))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-blue-300" />
            <span className="text-blue-300 font-medium">Network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner Directory</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Explore our network of employer partners, training sites, and workforce 
            development organizations committed to career success.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-700">{partners.length}</div>
              <div className="text-gray-600">Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">{partnerTypes.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">Indiana</div>
              <div className="text-gray-600">Service Area</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">Growing</div>
              <div className="text-gray-600">Network</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Partner Types */}
        {partnerTypes.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {partnerTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        )}

        {/* Directory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner: Partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                  {partner.partner_type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {partner.name}
              </h3>
              
              {partner.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {partner.description}
                </p>
              )}
              
              {partner.website_url && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" />
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 truncate"
                  >
                    Visit Website
                  </a>
                </div>
              )}

              {partner.featured && (
                <div className="mt-4 pt-4 border-t">
                  <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    Featured Partner
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Join our network of employers and organizations committed to workforce 
            development. Partner with us to access trained, certified candidates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/employers"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              For Employers
            </Link>
            <Link
              href="/contact?type=partner"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
