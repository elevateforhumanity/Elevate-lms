import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Scale, Users, Shield, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/equal-opportunity',
  },
  title: 'Equal Opportunity Employer & Provider | Elevate For Humanity',
  description:
    'Elevate for Humanity is an equal opportunity employer and provider. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or veteran status.',
};

export default async function EqualOpportunityPage() {
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
  
  // Fetch EEO policy
  const { data: policy } = await supabase
    .from('legal_documents')
    .select('*')
    .eq('type', 'equal_opportunity')
    .single();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-10 h-10 text-white" />
              <span className="text-white/80 text-lg font-medium">Federal Compliance</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Equal Opportunity Employer & Provider
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Elevate for Humanity is committed to providing equal opportunity in all programs, 
              services, and employment. We believe that diversity strengthens our organization 
              and the communities we serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Apply for Training
              </Link>
              <Link
                href="#file-complaint"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors border-2 border-white/30"
              >
                File a Complaint
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EEO Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-l-4 border-blue-600">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Equal Employment Opportunity Statement
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Elevate for Humanity is an equal opportunity employer and provider. It is our policy 
                to provide equal employment and educational opportunities to all persons regardless of 
                race, color, religion, sex (including pregnancy, sexual orientation, and gender identity), 
                national origin, age, disability, genetic information, veteran status, or any other 
                characteristic protected by federal, state, or local law.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                This policy applies to all terms and conditions of employment, including but not limited to: 
                recruitment, hiring, placement, promotion, termination, layoff, recall, transfer, leaves of 
                absence, compensation, and training. It also applies to all programs and services we provide 
                to participants, students, and the public.
              </p>
              <p className="text-lg leading-relaxed">
                We are committed to creating an inclusive environment where all individuals are treated with 
                dignity and respect. Discrimination, harassment, and retaliation are strictly prohibited and 
                will not be tolerated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protected Classes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Non-Discrimination Policy</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We do not discriminate against any individual on the basis of the following protected characteristics:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Race', description: 'Including ancestry and ethnic characteristics' },
              { title: 'Color', description: 'Skin color or complexion' },
              { title: 'Religion', description: 'Religious beliefs, practices, or observances' },
              { title: 'Sex', description: 'Including pregnancy, childbirth, and related conditions' },
              { title: 'Sexual Orientation', description: 'Heterosexual, homosexual, bisexual, or other' },
              { title: 'Gender Identity', description: 'Gender expression and transgender status' },
              { title: 'National Origin', description: 'Country of origin, ancestry, or ethnicity' },
              { title: 'Age', description: 'Individuals 40 years of age or older' },
              { title: 'Disability', description: 'Physical or mental impairment' },
              { title: 'Genetic Information', description: 'Family medical history and genetic tests' },
              { title: 'Veteran Status', description: 'Military service and veteran status' },
              { title: 'Citizenship', description: 'Citizenship or immigration status' },
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-black">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasonable Accommodations */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="text-blue-600 font-semibold">ADA Compliance</span>
              </div>
              <h2 className="text-3xl font-bold text-black mb-6">
                Reasonable Accommodations
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Elevate for Humanity is committed to providing reasonable accommodations to qualified 
                individuals with disabilities. We will work with you to identify and implement 
                appropriate accommodations that enable you to participate fully in our programs 
                and services.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Accessible facilities and equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Modified training materials and formats</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Sign language interpreters upon request</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Extended time for assessments when appropriate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Assistive technology support</span>
                </li>
              </ul>
              <p className="text-gray-600 mt-6">
                To request an accommodation, please contact us at least 5 business days before 
                your scheduled program start date.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-black mb-4">Request an Accommodation</h3>
              <p className="text-gray-600 mb-6">
                Contact our Accessibility Coordinator to discuss your accommodation needs:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+13173143757" className="text-blue-600 hover:underline">(317) 314-3757</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:accessibility@elevateforhumanity.org" className="text-blue-600 hover:underline">
                    accessibility@elevateforhumanity.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File a Complaint */}
      <section id="file-complaint" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">
              How to File a Discrimination Complaint
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you believe you have been discriminated against, you have the right to file a complaint.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Internal Complaint */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-black mb-4">File with Elevate for Humanity</h3>
              <p className="text-gray-600 mb-6">
                You may file a complaint directly with our organization within 180 days of the alleged discrimination.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-black">Submit in Writing</div>
                    <div className="text-sm text-gray-600">Email or mail your complaint with details of the incident</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-black">Investigation</div>
                    <div className="text-sm text-gray-600">We will investigate within 30 days</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-black">Resolution</div>
                    <div className="text-sm text-gray-600">You will receive a written response with findings</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2"><strong>Contact:</strong></p>
                <p className="text-sm text-gray-600">EEO Officer</p>
                <p className="text-sm text-gray-600">Elevate for Humanity</p>
                <p className="text-sm text-gray-600">Email: eeo@elevateforhumanity.org</p>
                <p className="text-sm text-gray-600">Phone: (317) 314-3757</p>
              </div>
            </div>

            {/* External Complaint */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-black mb-4">File with Federal Agencies</h3>
              <p className="text-gray-600 mb-6">
                You may also file a complaint with the appropriate federal agency within 180 days.
              </p>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-black mb-2">U.S. Department of Labor</h4>
                  <p className="text-sm text-gray-600 mb-2">Civil Rights Center (CRC)</p>
                  <p className="text-sm text-gray-600">200 Constitution Avenue NW, Room N-4123</p>
                  <p className="text-sm text-gray-600">Washington, DC 20210</p>
                  <p className="text-sm text-gray-600">Phone: 1-866-487-2365</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-black mb-2">U.S. Equal Employment Opportunity Commission</h4>
                  <p className="text-sm text-gray-600 mb-2">For employment-related complaints</p>
                  <p className="text-sm text-gray-600">Phone: 1-800-669-4000</p>
                  <p className="text-sm text-gray-600">Website: www.eeoc.gov</p>
                </div>

                <div>
                  <h4 className="font-semibold text-black mb-2">Indiana Civil Rights Commission</h4>
                  <p className="text-sm text-gray-600 mb-2">For state-level complaints</p>
                  <p className="text-sm text-gray-600">Phone: (317) 232-2600</p>
                  <p className="text-sm text-gray-600">Website: www.in.gov/icrc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WIOA Notice */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  WIOA Section 188 Notice
                </h2>
                <p className="text-gray-600">Workforce Innovation and Opportunity Act</p>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                As a recipient of federal financial assistance under the Workforce Innovation and 
                Opportunity Act (WIOA), Elevate for Humanity is required to comply with Section 188 
                of WIOA, which prohibits discrimination against all individuals in the United States 
                on the basis of race, color, religion, sex (including pregnancy, childbirth, and 
                related medical conditions, transgender status, and gender identity), national origin 
                (including limited English proficiency), age, disability, or political affiliation or 
                belief, or, against beneficiaries, applicants, and participants only, on the basis of 
                citizenship status or participation in any WIOA Title I-financially assisted program or activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Equal Opportunity?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our team is here to help answer any questions about our policies and your rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (317) 314-3757
            </a>
            <a
              href="mailto:eeo@elevateforhumanity.org"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors border-2 border-white/30"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email EEO Officer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
