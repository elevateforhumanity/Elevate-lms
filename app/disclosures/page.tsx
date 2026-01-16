import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Consumer Information | Elevate for Humanity',
  description: 'Required disclosures and consumer information for prospective and current students at Elevate for Humanity.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/disclosures',
  },
};

export default function DisclosuresPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Student Consumer Information</h1>
          <p className="text-xl text-gray-300">
            Required disclosures for prospective and current students
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Institution Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Institution Information
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Legal Entity</h3>
            <p className="text-gray-700 mb-2"><strong>Name:</strong> 2EXCLUSIVE LLC-S, doing business as Elevate for Humanity</p>
            <p className="text-gray-700 mb-2"><strong>Address:</strong> 7009 East 56th Street, Suite EE1, Indianapolis, IN 46226</p>
            <p className="text-gray-700 mb-2"><strong>Phone:</strong> (317) 314-3757</p>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> info@elevateforhumanity.org</p>
            <p className="text-gray-700"><strong>Website:</strong> www.elevateforhumanity.org</p>
          </div>
        </section>

        {/* Program Delivery */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Program Delivery Method
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Hybrid Delivery Disclosure</h3>
            <p className="text-gray-700 mb-4">
              Elevate for Humanity offers programs through <strong>hybrid delivery</strong>, which combines:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Online coursework and learning modules accessible through our Learning Management System (LMS)</li>
              <li>In-person instruction, labs, and hands-on training at approved training sites</li>
              <li>Supervised practical experience and/or apprenticeship hours where applicable</li>
            </ul>
            <p className="text-gray-700">
              Students are required to complete both online and in-person components to successfully finish their program. 
              Specific delivery requirements vary by program and are detailed in each program's enrollment materials.
            </p>
          </div>
        </section>

        {/* Transferability */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Transferability of Credits
          </h2>
          
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Important Notice</h3>
            <p className="text-gray-700 mb-4">
              Credits earned at Elevate for Humanity are <strong>not guaranteed to transfer</strong> to other institutions. 
              The decision to accept credits is made solely by the receiving institution.
            </p>
            <p className="text-gray-700 mb-4">
              Our programs award <strong>Certificates of Completion</strong>, not academic degrees. These certificates 
              document successful completion of vocational training and may be used to demonstrate skills to employers.
            </p>
            <p className="text-gray-700">
              Students planning to continue their education at another institution should contact that institution 
              directly to determine credit transfer policies before enrolling.
            </p>
          </div>
        </section>

        {/* Complaint Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Complaint Process
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Internal Grievance Process</h3>
              <p className="text-gray-700 mb-4">
                Students with complaints or grievances should first attempt to resolve the issue through our internal process:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>Contact your instructor or program coordinator directly</li>
                <li>If unresolved, submit a written complaint to the Student Services department</li>
                <li>A response will be provided within 10 business days</li>
                <li>Appeals may be submitted to the Director within 5 business days of the response</li>
              </ol>
              <p className="text-gray-700">
                For complete details, see our <Link href="/grievance" className="text-orange-600 hover:underline">Grievance Policy</Link>.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">State Complaint Process</h3>
              <p className="text-gray-700 mb-4">
                If you are unable to resolve a complaint through our internal process, you may file a complaint with:
              </p>
              <div className="bg-white border border-gray-200 rounded p-4">
                <p className="text-gray-700 mb-1"><strong>Indiana Commission for Higher Education</strong></p>
                <p className="text-gray-700 mb-1">101 West Ohio Street, Suite 300</p>
                <p className="text-gray-700 mb-1">Indianapolis, IN 46204</p>
                <p className="text-gray-700 mb-1">Phone: (317) 464-4400</p>
                <p className="text-gray-700">Website: www.in.gov/che</p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Outcomes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Program Outcomes Disclaimer
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Elevate for Humanity does not guarantee employment, salary levels, or career advancement 
              upon completion of any program. Outcomes vary based on individual effort, market conditions, 
              and other factors outside our control.
            </p>
            <p className="text-gray-700 mb-4">
              Some programs prepare students for third-party certification exams (such as EPA 608, CDL, or 
              state licensing exams). Passing these exams is the responsibility of the student, and 
              Elevate for Humanity does not guarantee exam passage.
            </p>
            <p className="text-gray-700">
              Career services and job placement assistance are provided as a support service, not a guarantee of employment.
            </p>
          </div>
        </section>

        {/* Required Policies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Required Policies & Documents
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tuition-fees" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Tuition & Fees</h3>
              <p className="text-sm text-gray-600">Program costs and payment information</p>
            </Link>
            
            <Link href="/enrollment-agreement" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Enrollment Agreement</h3>
              <p className="text-sm text-gray-600">Student and institution obligations</p>
            </Link>
            
            <Link href="/refund-policy" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Refund Policy</h3>
              <p className="text-sm text-gray-600">Cancellation and refund procedures</p>
            </Link>
            
            <Link href="/attendance-policy" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Attendance Policy</h3>
              <p className="text-sm text-gray-600">Attendance requirements for hybrid programs</p>
            </Link>
            
            <Link href="/satisfactory-academic-progress" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Satisfactory Academic Progress</h3>
              <p className="text-sm text-gray-600">Academic standards and progress requirements</p>
            </Link>
            
            <Link href="/grievance" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Grievance Policy</h3>
              <p className="text-sm text-gray-600">Complaint resolution process</p>
            </Link>
            
            <Link href="/privacy-policy" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Privacy Policy</h3>
              <p className="text-sm text-gray-600">How we protect your information</p>
            </Link>
            
            <Link href="/accessibility" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
              <h3 className="font-bold text-gray-900 mb-1">Accessibility Statement</h3>
              <p className="text-sm text-gray-600">Our commitment to accessibility</p>
            </Link>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t">
          <p>Last Updated: January 2026</p>
          <p>Questions? Contact us at info@elevateforhumanity.org or (317) 314-3757</p>
        </div>
      </div>
    </div>
  );
}
