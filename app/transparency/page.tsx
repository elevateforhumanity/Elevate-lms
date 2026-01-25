import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Download, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparency | Elevate For Humanity',
  description: 'Our commitment to transparency. View our outcomes, financials, and impact data.',
};

export const dynamic = 'force-dynamic';

export default async function TransparencyPage() {
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

  // Get real stats
  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: totalGraduates } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'alumni');

  const { count: totalPlacements } = await supabase
    .from('placements')
    .select('*', { count: 'exact', head: true });

  const { count: employerPartners } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  // Get annual reports
  const { data: reports } = await supabase
    .from('documents')
    .select('*')
    .eq('type', 'annual-report')
    .order('year', { ascending: false })
    .limit(3);

  // Calculate placement rate
  const placementRate = totalGraduates && totalPlacements 
    ? Math.round((totalPlacements / totalGraduates) * 100) 
    : null;

  const outcomes = [
    { label: 'Students Enrolled', value: totalEnrollments || 'Active', image: '/images/programs-hq/students-learning.jpg' },
    { label: 'Graduates', value: totalGraduates || 'Growing', image: '/images/programs-hq/career-success.jpg' },
    { label: 'Job Placements', value: totalPlacements || 'Ongoing', image: '/images/programs-hq/business-training.jpg' },
    { label: 'Placement Rate', value: placementRate ? `${placementRate}%` : 'Tracked', image: '/images/programs-hq/training-classroom.jpg' },
    { label: 'Employer Partners', value: employerPartners || 'Active', image: '/images/programs-hq/skilled-trades-hero.jpg' },
    { label: 'Programs', value: '20+', image: '/images/programs-hq/healthcare-hero.jpg' },
  ];

  const financials = [
    { category: 'Program Delivery', percentage: 75, description: 'Training, instruction, and student support' },
    { category: 'Career Services', percentage: 15, description: 'Job placement and career counseling' },
    { category: 'Administration', percentage: 10, description: 'Operations and overhead' },
  ];

  const accreditations = [
    'WIOA Eligible Training Provider',
    'Indiana Career Connect Partner',
    '501(c)(3) Nonprofit Organization',
    'BBB Accredited Charity',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <Image
          src="/images/pexels/office-work.jpg"
          alt="Transparency"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Transparency</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              We believe in complete transparency. Here's how we measure our impact and use our resources.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Outcomes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="relative h-20">
                  <Image src={outcome.image} alt={outcome.label} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold">
                    {typeof outcome.value === 'number' ? `${outcome.value}+` : outcome.value}
                  </div>
                  <div className="text-gray-600 text-sm">{outcome.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Breakdown */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How We Use Funds</h2>
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {financials.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{item.category}</span>
                    <span className="text-blue-600 font-bold">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t">
              <p className="text-gray-600 text-center">
                The majority of funds go directly to program delivery and student services.
              </p>
            </div>
          </div>
        </section>

        {/* Annual Reports */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Annual Reports</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reports && reports.length > 0 ? reports.map((report: any) => (
              <div key={report.id} className="bg-white rounded-xl shadow-sm border p-6">
                <FileText className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{report.year} Annual Report</h3>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                {report.file_url && (
                  <a
                    href={report.file_url}
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                )}
              </div>
            )) : (
              <>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <FileText className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">2023 Annual Report</h3>
                  <p className="text-gray-600 text-sm mb-4">Complete overview of our programs, outcomes, and financials.</p>
                  <span className="text-blue-600 font-medium">Available on Request</span>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <FileText className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">2022 Annual Report</h3>
                  <p className="text-gray-600 text-sm mb-4">Our growth and impact in the second year of operations.</p>
                  <span className="text-blue-600 font-medium">Available on Request</span>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <FileText className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Form 990</h3>
                  <p className="text-gray-600 text-sm mb-4">IRS Form 990 nonprofit tax return.</p>
                  <span className="text-blue-600 font-medium">Available on Request</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Accreditations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Accreditations & Partnerships</h2>
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accreditations.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section>
          <h2 className="text-3xl font-bold mb-8">How We Measure Success</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Outcome Tracking</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Enrollment and completion rates tracked in real-time</li>
                  <li>• Job placement verified through employer confirmation</li>
                  <li>• Salary data collected at 30, 90, and 180 days post-placement</li>
                  <li>• Long-term retention tracked at 6 and 12 months</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Third-Party Verification</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Annual independent financial audit</li>
                  <li>• WIOA performance reporting to state agencies</li>
                  <li>• Student satisfaction surveys</li>
                  <li>• Employer feedback collection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Data?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We're happy to provide additional information about our outcomes and operations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
