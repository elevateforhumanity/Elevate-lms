import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BARBER_PROGRAM, 
  COSMETOLOGY_PROGRAM, 
  ESTHETICIAN_PROGRAM, 
  NAIL_TECH_PROGRAM,
  TUITION_EFFECTIVE_DATE 
} from '@/lib/program-constants';

export const metadata: Metadata = {
  title: 'Tuition & Fees | Elevate for Humanity',
  description: 'Complete tuition and fee schedule for all programs at Elevate for Humanity. Transparent pricing with no hidden costs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tuition-fees',
  },
};

const programs = [
  {
    name: BARBER_PROGRAM.name,
    duration: `${BARBER_PROGRAM.durationFormatted} (${BARBER_PROGRAM.totalHoursFormatted} hours)`,
    tuition: BARBER_PROGRAM.tuitionDollars,
    examFees: BARBER_PROGRAM.examFeeDollars,
    examFeesNote: 'Indiana State Board of Barber Examiners licensing exam',
    materials: BARBER_PROGRAM.materialsDollars,
    materialsNote: 'Included in tuition',
    total: BARBER_PROGRAM.totalCostDollars,
    fundingType: 'Self-Pay / WIOA Eligible',
  },
  {
    name: 'HVAC Technician',
    duration: '4-9 months',
    tuition: 5500,
    examFees: 150,
    examFeesNote: 'EPA 608 certification exam (third-party)',
    materials: 200,
    materialsNote: 'Tools and safety equipment',
    total: 5850,
    fundingType: 'WIOA / WRG Eligible',
  },
  {
    name: 'Medical Assistant',
    duration: '12 weeks',
    tuition: 4200,
    examFees: 0,
    examFeesNote: 'No third-party exam required',
    materials: 150,
    materialsNote: 'Scrubs, supplies',
    total: 4350,
    fundingType: 'WIOA / WRG Eligible',
  },
  {
    name: 'CNA (Certified Nursing Assistant)',
    duration: '4-6 weeks',
    tuition: 1200,
    examFees: 105,
    examFeesNote: 'Indiana State CNA competency exam (third-party)',
    materials: 75,
    materialsNote: 'Scrubs, supplies',
    total: 1380,
    fundingType: 'Self-Pay',
  },
  {
    name: 'CDL (Commercial Driver\'s License)',
    duration: '4-6 weeks',
    tuition: 5000,
    examFees: 150,
    examFeesNote: 'Indiana BMV CDL testing fees (third-party)',
    materials: 0,
    materialsNote: 'Included in tuition',
    total: 5150,
    fundingType: 'WIOA / WRG Eligible',
  },
  {
    name: 'Building Maintenance Technician',
    duration: '16 weeks',
    tuition: 3800,
    examFees: 0,
    examFeesNote: 'No third-party exam required',
    materials: 200,
    materialsNote: 'Tools',
    total: 4000,
    fundingType: 'WIOA / WRG Eligible',
  },
  {
    name: 'Peer Recovery Specialist',
    duration: '8 weeks',
    tuition: 2500,
    examFees: 50,
    examFeesNote: 'Indiana DMHA certification application fee',
    materials: 0,
    materialsNote: 'Included in tuition',
    total: 2550,
    fundingType: 'WIOA Eligible',
  },
  {
    name: 'Tax Preparation',
    duration: '6 weeks',
    tuition: 1500,
    examFees: 0,
    examFeesNote: 'No third-party exam required',
    materials: 50,
    materialsNote: 'Study materials',
    total: 1550,
    fundingType: 'Self-Pay',
  },
];

export default function TuitionFeesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Tuition & Fees Schedule</h1>
          <p className="text-xl text-gray-300">
            Transparent pricing for all programs. Effective January 2026.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-2">Important Information</h2>
          <ul className="text-gray-700 space-y-2">
            <li>• All tuition amounts are fixed and not subject to change during your enrollment period</li>
            <li>• Third-party exam fees are paid directly to the certifying body and are subject to change</li>
            <li>• Funding eligibility (WIOA/WRG) is determined by your local workforce agency, not by Elevate for Humanity</li>
            <li>• See our <Link href="/refund-policy" className="text-orange-600 hover:underline">Refund Policy</Link> for cancellation terms</li>
          </ul>
        </div>

        {/* Program Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-4 font-bold">Program</th>
                <th className="text-left p-4 font-bold">Duration</th>
                <th className="text-right p-4 font-bold">Tuition</th>
                <th className="text-right p-4 font-bold">Exam Fees*</th>
                <th className="text-right p-4 font-bold">Materials</th>
                <th className="text-right p-4 font-bold">Total Cost</th>
                <th className="text-left p-4 font-bold">Funding</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={program.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-medium text-gray-900">{program.name}</td>
                  <td className="p-4 text-gray-700">{program.duration}</td>
                  <td className="p-4 text-right text-gray-900">${program.tuition.toLocaleString()}</td>
                  <td className="p-4 text-right text-gray-700">
                    {program.examFees > 0 ? `$${program.examFees}` : '—'}
                  </td>
                  <td className="p-4 text-right text-gray-700">
                    {program.materials > 0 ? `$${program.materials}` : '—'}
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">${program.total.toLocaleString()}</td>
                  <td className="p-4 text-gray-700 text-sm">{program.fundingType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exam Fees Explanation */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4">*Third-Party Exam Fees</h3>
          <p className="text-gray-700 mb-4">
            Some programs prepare students for industry certification exams administered by third parties. 
            These fees are paid directly to the certifying organization and are not collected by Elevate for Humanity.
          </p>
          <ul className="text-gray-700 space-y-2 text-sm">
            {programs.filter(p => p.examFees > 0).map(program => (
              <li key={program.name}>
                <strong>{program.name}:</strong> {program.examFeesNote} — ${program.examFees}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Options */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Options</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Pay in Full</h3>
              <p className="text-gray-700 text-sm">
                Pay the full tuition amount at enrollment. No additional fees.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Payment Plan</h3>
              <p className="text-gray-700 text-sm">
                Split your tuition into monthly payments. Down payment required at enrollment. 
                No interest charged.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Workforce Funding</h3>
              <p className="text-gray-700 text-sm">
                Eligible programs may be funded through WIOA or WRG. Contact your local 
                WorkOne office to determine eligibility.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Fees */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">What's Included in Tuition</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• All instruction (online and in-person)</li>
              <li>• Access to Learning Management System (LMS)</li>
              <li>• Course materials and handouts</li>
              <li>• Career services and job placement assistance</li>
              <li>• Certificate of Completion upon successful program completion</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-4">Not Included in Tuition</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Third-party certification exam fees (listed above)</li>
              <li>• Background checks required by employers (varies)</li>
              <li>• Drug screening required by employers (varies)</li>
              <li>• Transportation to training sites</li>
              <li>• Personal protective equipment beyond program-provided items</li>
            </ul>
          </div>
        </section>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-gray-600 mb-4">
            Questions about tuition or payment options? Contact us at (317) 314-3757 or elevate4humanityedu@gmail.com
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/disclosures" className="text-orange-600 hover:underline">Student Disclosures</Link>
            <Link href="/refund-policy" className="text-orange-600 hover:underline">Refund Policy</Link>
            <Link href="/enrollment-agreement" className="text-orange-600 hover:underline">Enrollment Agreement</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
