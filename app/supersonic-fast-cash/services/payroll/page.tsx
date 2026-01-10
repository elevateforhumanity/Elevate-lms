import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Payroll Services | Supersonic Fast Cash',
  description: 'Professional payroll processing for small businesses.',
};

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image src="/images/heroes/cash-bills.jpg" alt="Payroll" width={800} height={600} className="absolute inset-0 w-full h-full object-cover" quality={85} / loading="lazy">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Payroll Services
            </h1>
            <p className="text-xl">
              Accurate payroll processing for your business
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold mb-6">Professional Payroll Processing</h2>
            <p className="text-gray-700 mb-6">
              Let us handle your payroll so you can focus on running your business. We ensure accurate, timely payroll processing and tax compliance.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
              <h3 className="text-xl font-semibold mb-3">Services Include</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Weekly, bi-weekly, or monthly payroll processing</li>
                <li>Direct deposit setup</li>
                <li>Payroll tax calculations and filing</li>
                <li>W-2 and 1099 preparation</li>
                <li>Quarterly tax reports</li>
                <li>Year-end tax filing</li>
              </ul>
            </div>
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
