import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'WIOA Eligibility for Low-Income Individuals | Elevate for Humanity',
  description: 'Income-based WIOA eligibility. Free career training for low-income individuals and families.',
};

export default function LowIncomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <img
          src="/hero-images/services-hero.jpg"
          alt="Low-Income Eligibility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Low-Income Eligibility</h1>
          <p className="text-xl">Free training for individuals and families meeting income guidelines</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/wioa-eligibility" className="text-blue-600 hover:underline mb-6 inline-block">← Back to WIOA Eligibility</Link>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Low-Income Individual Eligibility</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              If your household income falls below federal poverty guidelines, you qualify for <strong>100% free training</strong> through WIOA funding.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Income Guidelines (2024)</h3>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-green-200">
                    <th className="py-2 font-bold text-gray-900">Family Size</th>
                    <th className="py-2 font-bold text-gray-900">Annual Income Limit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-green-100">
                    <td className="py-2">1 person</td>
                    <td className="py-2 font-semibold">$15,060</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-2">2 people</td>
                    <td className="py-2 font-semibold">$20,440</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-2">3 people</td>
                    <td className="py-2 font-semibold">$25,820</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-2">4 people</td>
                    <td className="py-2 font-semibold">$31,200</td>
                  </tr>
                  <tr>
                    <td className="py-2">Each additional</td>
                    <td className="py-2 font-semibold">+$5,380</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-4">*Guidelines updated annually. Some programs use 70% of Lower Living Standard Income Level (LLSIL).</p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Qualifies</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Household income at or below poverty level</li>
              <li>Homeless individuals</li>
              <li>Foster youth or aged out of foster care</li>
              <li>Individuals with disabilities receiving SSI or SSDI</li>
              <li>Single parents with income below guidelines</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3 text-gray-800">
                <li><strong>✓ Free Tuition:</strong> 100% covered training costs</li>
                <li><strong>✓ Books & Materials:</strong> All course materials provided</li>
                <li><strong>✓ Certification Exams:</strong> Testing fees paid</li>
                <li><strong>✓ Support Services:</strong> Transportation, childcare assistance</li>
                <li><strong>✓ Career Counseling:</strong> One-on-one guidance</li>
                <li><strong>✓ Job Placement:</strong> Help finding employment after graduation</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Required Documents</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Valid ID (driver's license or state ID)</li>
              <li>Social Security card</li>
              <li>Proof of Indiana residency (utility bill, lease)</li>
              <li>Income verification (pay stubs, tax returns, or benefit letters)</li>
              <li>Proof of household size (birth certificates, custody papers)</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
              <li>Complete online application</li>
              <li>Gather required documents</li>
              <li>Meet with WIOA counselor (we'll schedule this)</li>
              <li>Get approved and choose your program</li>
              <li>Start training within 2-4 weeks</li>
            </ol>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-600 p-8 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-700 mb-6">Visit Indiana Career Connect to check your eligibility and apply for WIOA funding.</p>
          
          <div className="bg-white p-6 rounded-lg mb-6">
            <h4 className="font-bold text-gray-900 mb-4">Application Instructions:</h4>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li><strong>Go to Indiana Career Connect:</strong> Visit <a href="https://www.indianacareerconnect.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.indianacareerconnect.com</a></li>
              <li><strong>Register:</strong> Create your free account with email and password</li>
              <li><strong>Complete Your Profile:</strong> Add work history, education, and income information</li>
              <li><strong>Apply for WIOA:</strong> Navigate to Services → WIOA Adult Program</li>
              <li><strong>Upload Income Documents:</strong> Pay stubs, tax returns, or benefit letters</li>
              <li><strong>Submit Application:</strong> Review and submit for counselor review</li>
              <li><strong>Schedule Meeting:</strong> Book appointment with WIOA counselor (usually within 3-5 days)</li>
              <li><strong>Attend Orientation:</strong> Meet counselor, verify documents, choose training program</li>
            </ol>
          </div>

          <a 
            href="https://www.indianacareerconnect.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition mb-4"
          >
            Apply at Indiana Career Connect →
          </a>
          <p className="text-sm text-gray-600">Official Indiana state workforce system</p>
        </div>

        <div className="bg-gray-900 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help with Your Application?</h3>
          <p className="mb-6">We can assist you with the Indiana Career Connect application process</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition">
              Get Application Help
            </Link>
            <Link href="tel:317-314-3757" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition">
              Call: 317-314-3757
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
