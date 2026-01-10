import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'WIOA Eligibility for Public Assistance Recipients | Elevate for Humanity',
  description: 'WIOA eligibility for SNAP, TANF, SSI, and other public assistance recipients. Free career training.',
};

export default function PublicAssistancePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <img
          src="/hero-images/pathways-hero.jpg"
          alt="Public Assistance Recipients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Public Assistance Recipients</h1>
          <p className="text-xl">Automatic WIOA eligibility for those receiving government assistance</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/wioa-eligibility" className="text-blue-600 hover:underline mb-6 inline-block">← Back to WIOA Eligibility</Link>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Public Assistance Eligibility</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              If you currently receive public assistance, you <strong>automatically qualify</strong> for WIOA-funded training. No additional income verification needed.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualifying Programs</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h4 className="text-xl font-bold text-gray-900 mb-2">SNAP (Food Stamps)</h4>
                <p className="text-gray-700 mb-2">Supplemental Nutrition Assistance Program</p>
                <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                  <li>Must have active SNAP benefits</li>
                  <li>Bring current EBT card or benefit letter</li>
                  <li>Letter must be dated within last 6 months</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="text-xl font-bold text-gray-900 mb-2">TANF (Temporary Assistance)</h4>
                <p className="text-gray-700 mb-2">Temporary Assistance for Needy Families</p>
                <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                  <li>Cash assistance recipients</li>
                  <li>Must be currently receiving benefits</li>
                  <li>Bring TANF approval letter or case number</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h4 className="text-xl font-bold text-gray-900 mb-2">SSI (Supplemental Security Income)</h4>
                <p className="text-gray-700 mb-2">For individuals with disabilities or seniors</p>
                <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                  <li>Must be receiving SSI payments</li>
                  <li>Bring SSI award letter or benefit statement</li>
                  <li>Different from Social Security retirement</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                <h4 className="text-xl font-bold text-gray-900 mb-2">General Assistance</h4>
                <p className="text-gray-700 mb-2">State or local cash assistance programs</p>
                <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                  <li>County-level assistance programs</li>
                  <li>Emergency assistance recipients</li>
                  <li>Bring documentation from assistance office</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Other Qualifying Programs</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Medicaid (income-based, not disability-based)</li>
                  <li>WIC (Women, Infants, and Children)</li>
                  <li>Free or Reduced School Lunch (for your children)</li>
                  <li>Housing Assistance (Section 8, public housing)</li>
                  <li>LIHEAP (Energy assistance)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3 text-gray-800">
                <li><strong>✓ 100% Free Training:</strong> No tuition, fees, or hidden costs</li>
                <li><strong>✓ Books & Supplies:</strong> All materials provided at no cost</li>
                <li><strong>✓ Certification Exams:</strong> Testing fees covered</li>
                <li><strong>✓ Transportation Help:</strong> Gas cards or bus passes available</li>
                <li><strong>✓ Childcare Assistance:</strong> Help with childcare costs during training</li>
                <li><strong>✓ Work Clothing:</strong> Uniforms or work attire if needed</li>
                <li><strong>✓ Job Placement:</strong> Direct connections to employers</li>
                <li><strong>✓ Career Counseling:</strong> One-on-one support throughout</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Required Documents</h3>
            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <p className="font-bold text-gray-900 mb-3">Bring ALL of the following:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Valid ID:</strong> Driver's license or state-issued ID</li>
                <li><strong>Social Security Card:</strong> Original or certified copy</li>
                <li><strong>Proof of Residency:</strong> Utility bill, lease, or mail dated within 30 days</li>
                <li><strong>Benefit Verification:</strong> Current benefit letter, EBT card, or case documentation</li>
                <li><strong>Work Authorization:</strong> Birth certificate, passport, or naturalization papers</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h3>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-900">Submit Online Application</h4>
                  <p className="text-gray-600 text-sm">Takes 10 minutes. We'll review within 2-3 days.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-900">Gather Your Documents</h4>
                  <p className="text-gray-600 text-sm">Collect ID, Social Security card, benefit letter, and proof of address.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-900">Meet with WIOA Counselor</h4>
                  <p className="text-gray-600 text-sm">We schedule this for you. Bring your documents. Takes about 1 hour.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-900">Get Approved & Choose Program</h4>
                  <p className="text-gray-600 text-sm">Usually approved same day. Pick your training program.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-bold text-gray-900">Start Training</h4>
                  <p className="text-gray-600 text-sm">Begin classes within 2-4 weeks. Everything is covered.</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Available Training Programs</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Healthcare</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CNA (4-6 weeks)</li>
                  <li>• Medical Assistant</li>
                  <li>• Phlebotomy</li>
                  <li>• Home Health Aide</li>
                </ul>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Skilled Trades</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• HVAC Technician</li>
                  <li>• Electrical</li>
                  <li>• Plumbing</li>
                  <li>• Construction</li>
                </ul>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Technology</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• IT Support</li>
                  <li>• Cybersecurity</li>
                  <li>• Web Development</li>
                </ul>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Business</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Accounting</li>
                  <li>• Management</li>
                  <li>• Customer Service</li>
                </ul>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">CDL</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Commercial Driver</li>
                  <li>• Class A License</li>
                  <li>• Job placement help</li>
                </ul>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Barber & Beauty</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Barbering</li>
                  <li>• Cosmetology</li>
                  <li>• Esthetics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">You Already Qualify!</h3>
          <p className="mb-6">If you receive public assistance, you're eligible for free training. Apply today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition">
              Apply Now
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition">
              Have Questions?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
