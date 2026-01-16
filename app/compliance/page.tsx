import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Shield, FileText, CheckCircle, AlertTriangle, Lock, Eye, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compliance | Elevate For Humanity',
  description: 'Our commitment to regulatory compliance, data privacy, and ethical operations.',
};

export const dynamic = 'force-dynamic';

export default async function CompliancePage() {
  const supabase = await createClient();

  // Get compliance documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('category', 'compliance')
    .eq('is_public', true)
    .order('title', { ascending: true });

  // Get certifications
  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('type', 'organizational')
    .eq('is_active', true);

  const complianceAreas = [
    {
      icon: Shield,
      title: 'WIOA Compliance',
      description: 'We maintain full compliance with Workforce Innovation and Opportunity Act requirements as an Eligible Training Provider.',
      items: ['Performance reporting', 'Eligibility verification', 'Equal opportunity', 'Participant records'],
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'We protect student and partner data in accordance with federal and state privacy regulations.',
      items: ['FERPA compliance', 'Data encryption', 'Access controls', 'Breach notification'],
    },
    {
      icon: Eye,
      title: 'Accessibility',
      description: 'Our programs and facilities are accessible to individuals with disabilities.',
      items: ['ADA compliance', 'WCAG 2.1 AA web standards', 'Reasonable accommodations', 'Assistive technology'],
    },
    {
      icon: FileText,
      title: 'Financial Compliance',
      description: 'We maintain transparent financial practices and undergo regular audits.',
      items: ['Annual independent audit', 'Grant compliance', 'IRS Form 990', 'Financial controls'],
    },
  ];

  const policies = [
    { title: 'Privacy Policy', href: '/policies/privacy', description: 'How we collect, use, and protect your data' },
    { title: 'Terms of Service', href: '/policies/terms', description: 'Terms governing use of our services' },
    { title: 'Non-Discrimination Policy', href: '/policies/non-discrimination', description: 'Our commitment to equal opportunity' },
    { title: 'Grievance Procedure', href: '/policies/grievance', description: 'How to file a complaint or concern' },
    { title: 'Data Retention Policy', href: '/policies/data-retention', description: 'How long we keep your information' },
    { title: 'Accessibility Statement', href: '/policies/accessibility', description: 'Our accessibility commitments' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Compliance</h1>
          <p className="text-xl text-slate-200 max-w-2xl">
            Our commitment to regulatory compliance, data privacy, and ethical operations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Compliance Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Compliance Areas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceAreas.map((area) => (
              <div key={area.title} className="bg-white rounded-xl shadow-sm border p-6">
                <area.icon className="w-10 h-10 text-slate-700 mb-4" />
                <h3 className="font-semibold text-xl mb-2">{area.title}</h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Policies & Procedures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {policies.map((policy) => (
              <Link
                key={policy.title}
                href={policy.href}
                className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-1">{policy.title}</h3>
                <p className="text-sm text-gray-600">{policy.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Compliance Documents</h2>
          {documents && documents.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {documents.map((doc: any) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <FileText className="w-8 h-8 text-slate-600 mb-3" />
                  <h3 className="font-semibold mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                  {doc.file_url && (
                    <a
                      href={doc.file_url}
                      className="inline-flex items-center gap-2 text-slate-700 font-medium hover:underline"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Compliance documents available upon request.</p>
              <Link href="/contact" className="text-slate-700 font-medium hover:underline mt-2 inline-block">
                Contact Us
              </Link>
            </div>
          )}
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Certifications & Accreditations</h2>
          <div className="bg-white rounded-xl shadow-sm border p-8">
            {certifications && certifications.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert: any) => (
                  <div key={cert.id} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="font-medium">{cert.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">WIOA Eligible Training Provider</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">501(c)(3) Tax-Exempt Status</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">Indiana Career Connect Partner</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">Equal Opportunity Employer</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">ADA Compliant Facilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">FERPA Compliant</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Report Concern */}
        <section>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Report a Compliance Concern</h3>
                <p className="text-gray-600 mb-4">
                  If you have concerns about compliance, ethics, or misconduct, we encourage you to report them. 
                  All reports are taken seriously and investigated thoroughly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/compliance/report"
                    className="inline-flex items-center justify-center bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700"
                  >
                    Submit a Report
                  </Link>
                  <Link
                    href="/policies/grievance"
                    className="inline-flex items-center justify-center border border-yellow-600 text-yellow-700 px-6 py-2 rounded-lg font-medium hover:bg-yellow-100"
                  >
                    View Grievance Procedure
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
