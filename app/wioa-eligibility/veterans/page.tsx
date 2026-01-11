import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'WIOA Eligibility for Veterans | Elevate for Humanity',
  description: 'Priority WIOA funding for military veterans. Free career training with expedited services.',
};

export default function VeteransPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <img
          src="/hero-images/about-hero.jpg"
          alt="Veterans Priority Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">WIOA Priority for Veterans</h1>
          <p className="text-xl">Expedited services and priority enrollment for those who served</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/wioa-eligibility" className="text-blue-600 hover:underline mb-6 inline-block">← Back to WIOA Eligibility</Link>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">Veterans Priority Services</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-black mb-6">
              As a veteran, you receive <strong>priority of service</strong> under WIOA. This means you get first access to training programs, career counseling, and job placement services.
            </p>

            <h3 className="text-2xl font-bold text-black mb-4">Who Qualifies</h3>
            <ul className="list-disc pl-6 space-y-2 text-black mb-6">
              <li>Veterans who served on active duty (not including active duty for training)</li>
              <li>Honorable or general discharge</li>
              <li>Spouses of veterans who died or are disabled due to service</li>
              <li>Spouses of active duty service members</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mb-4">What You Get</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3 text-black">
                <li><strong>✓ Priority Enrollment:</strong> First access to training programs</li>
                <li><strong>✓ Expedited Processing:</strong> Faster application review</li>
                <li><strong>✓ Dedicated Counselor:</strong> Veteran-focused career advisor</li>
                <li><strong>✓ 100% Free Training:</strong> No tuition, books, or fees</li>
                <li><strong>✓ Job Placement:</strong> Direct connections to veteran-friendly employers</li>
                <li><strong>✓ Support Services:</strong> Transportation, childcare assistance if needed</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-black mb-4">Required Documents</h3>
            <ul className="list-disc pl-6 space-y-2 text-black mb-6">
              <li>DD-214 (Certificate of Release or Discharge from Active Duty)</li>
              <li>Valid ID (driver's license or state ID)</li>
              <li>Social Security card</li>
              <li>Proof of Indiana residency</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mb-4">Available Programs</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-black mb-2">Healthcare</h4>
                <p className="text-sm text-black">CNA, Medical Assistant, Phlebotomy</p>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-black mb-2">Skilled Trades</h4>
                <p className="text-sm text-black">HVAC, Electrical, Construction</p>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-black mb-2">Technology</h4>
                <p className="text-sm text-black">IT Support, Cybersecurity</p>
              </div>
              <div className="border-2 border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-black mb-2">CDL</h4>
                <p className="text-sm text-black">Commercial Driver License</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-600 p-8 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-black mb-4">How to Apply for WIOA</h3>
          <p className="text-black mb-6">WIOA applications are processed through Indiana Career Connect, the state's official workforce system.</p>
          
          <div className="bg-white p-6 rounded-lg mb-6">
            <h4 className="font-bold text-black mb-4">Step-by-Step Instructions:</h4>
            <ol className="list-decimal pl-6 space-y-3 text-black">
              <li><strong>Visit Indiana Career Connect:</strong> Go to <a href="https://www.indianacareerconnect.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.indianacareerconnect.com</a></li>
              <li><strong>Create Account:</strong> Click "Register" and create your free account</li>
              <li><strong>Complete Profile:</strong> Fill out your work history, education, and skills</li>
              <li><strong>Find Services:</strong> Click "Services" then "WIOA Adult Program"</li>
              <li><strong>Upload Documents:</strong> Submit your DD-214, ID, Social Security card, and proof of residency</li>
              <li><strong>Schedule Appointment:</strong> Book a meeting with a WIOA counselor</li>
              <li><strong>Attend Meeting:</strong> Meet with counselor to finalize eligibility and choose program</li>
            </ol>
          </div>

          <a 
            href="https://www.indianacareerconnect.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition mb-4"
          >
            Go to Indiana Career Connect →
          </a>
          <p className="text-sm text-black">You'll be redirected to the official Indiana state website</p>
        </div>

        <div className="bg-gray-900 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Applying?</h3>
          <p className="mb-6">We can guide you through the Indiana Career Connect application process</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition">
              Contact Us for Help
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition">
              Call: 317-314-3757
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
