import Link from 'next/link';

export default function DIYStartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Start Your DIY Tax Return</h1>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-6">Let's Get Started</h2>
          
          <div className="space-y-6 mb-8">
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 1: Gather Your Documents</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>W-2 forms from all employers</li>
                <li>1099 forms (if self-employed or freelance)</li>
                <li>Social Security card or ITIN</li>
                <li>Photo ID (driver's license or state ID)</li>
                <li>Bank account information for direct deposit</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 2: Choose Your Filing Method</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">DIY Online</h4>
                  <p className="text-sm text-gray-600 mb-3">File yourself with our guided software</p>
                  <Link
                    href="/supersonic-fast-cash/diy/interview"
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                  >
                    Start Filing
                  </Link>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Professional Help</h4>
                  <p className="text-sm text-gray-600 mb-3">Work with a tax professional</p>
                  <Link
                    href="/supersonic-fast-cash/book-appointment"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 3: Review & Submit</h3>
              <p className="text-gray-700">
                We'll review your return for accuracy and help you get the maximum refund you deserve.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              Our tax professionals are available to answer questions and help you file.
            </p>
            <Link
              href="/contact"
              className="inline-block text-orange-600 hover:text-orange-700 font-semibold"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
