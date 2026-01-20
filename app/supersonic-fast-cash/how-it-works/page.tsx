import { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Send, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Upload,
  Shield,
  DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | Supersonic Fast Cash LLC',
  description: 'File your taxes in three simple steps. Prepare, review, and file with confidence.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/supersonic-fast-cash/how-it-works',
  },
};

const steps = [
  {
    number: 1,
    title: 'Prepare Your Return',
    description: 'Answer guided questions about your income, deductions, and credits. Upload your W-2s and other documents.',
    icon: FileText,
    details: [
      'Enter personal information',
      'Upload W-2s, 1099s, and other forms',
      'Answer questions about dependents',
      'Review deductions and credits',
    ],
  },
  {
    number: 2,
    title: 'Review & Verify',
    description: 'Our system checks for errors and missed credits. Review your return before filing.',
    icon: Search,
    details: [
      'Accuracy check for common errors',
      'Credit and deduction optimization',
      'Preview your refund or amount owed',
      'Make corrections if needed',
    ],
  },
  {
    number: 3,
    title: 'File & Track',
    description: 'E-file your return securely to the IRS. Track your refund status online.',
    icon: Send,
    details: [
      'Secure e-file to IRS and state',
      'Receive confirmation of acceptance',
      'Track refund status',
      'Download your return for records',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            How Tax Filing Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            File your taxes in three simple steps. We guide you through every part of the process.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-20 w-0.5 h-32 bg-gray-200" />
                )}
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className="w-6 h-6 text-blue-600" />
                      <h2 className="text-2xl font-semibold text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-4">What happens in this step:</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            How Long Does It Take?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Preparation</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">15-45 min</p>
              <p className="text-sm text-gray-500">Depending on complexity</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <Send className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">IRS Acceptance</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">24-48 hrs</p>
              <p className="text-sm text-gray-500">After e-filing</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Refund</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">10-21 days</p>
              <p className="text-sm text-gray-500">Direct deposit</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Need */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            What You'll Need
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Income Documents</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• W-2 from each employer</li>
                <li>• 1099 forms (freelance, interest, dividends)</li>
                <li>• 1099-G (unemployment)</li>
                <li>• Social Security statements (SSA-1099)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Personal Information</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Social Security numbers (you, spouse, dependents)</li>
                <li>• Date of birth for all filers</li>
                <li>• Bank account info for direct deposit</li>
                <li>• Last year's tax return (if available)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Deduction Records</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Mortgage interest (Form 1098)</li>
                <li>• Property tax statements</li>
                <li>• Charitable donation receipts</li>
                <li>• Medical expense records</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Health & Education</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Health insurance forms (1095-A, B, or C)</li>
                <li>• Tuition statements (1098-T)</li>
                <li>• Student loan interest (1098-E)</li>
                <li>• Childcare provider info</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Advance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Optional: Tax Refund Cash Advance
                </h3>
                <p className="text-gray-600 mb-4">
                  After completing your return, eligible filers may choose to receive a portion 
                  of their refund early through our banking partners. This is completely optional 
                  and not required to file.
                </p>
                <Link
                  href="/supersonic-fast-cash/cash-advance"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                >
                  Learn about refund advances
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-200 mb-8">
            File your taxes with confidence. We'll guide you through every step.
          </p>
          <Link
            href="/supersonic-fast-cash/start"
            className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Start Tax Preparation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
