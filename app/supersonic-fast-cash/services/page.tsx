import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  DollarSign,
  Building,
  Calculator,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Tax Services | Supersonic Fast Cash',
  description:
    'Professional tax preparation, refund advances, business returns, and more. IRS-certified preparers serving Indianapolis and all 50 states.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/supersonic-fast-cash/services',
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      name: 'Individual Tax Preparation',
      price: 'Starting at $89',
      description: 'Personal tax returns filed accurately and on time',
      features: [
        'W-2 and 1099 income',
        'Itemized deductions',
        'Investment income',
        'Rental property',
        'Self-employment income',
        'E-file included',
      ],
    },
    {
      icon: DollarSign,
      name: 'Tax Refund Advance',
      price: 'Up to $7,500',
      description: 'Get your refund faster with our advance program',
      features: [
        'Same-day funding',
        'No credit check',
        'Simple approval',
        'Tax prep included',
        'Direct deposit or check',
        'Fees paid from refund',
      ],
    },
    {
      icon: Building,
      name: 'Business Tax Returns',
      price: 'Starting at $299',
      description: 'Complete business tax solutions for all entity types',
      features: [
        'LLC, S-Corp, C-Corp',
        'Partnership returns',
        'Sole proprietor',
        'Quarterly estimates',
        'Bookkeeping services',
        'Payroll tax filing',
      ],
    },
    {
      icon: Calculator,
      name: 'Bookkeeping Services',
      price: 'Starting at $199/month',
      description: 'Professional bookkeeping to keep your business organized',
      features: [
        'Monthly reconciliation',
        'Financial statements',
        'Expense tracking',
        'Invoice management',
        'QuickBooks setup',
        'Year-end reports',
      ],
    },
    {
      icon: Shield,
      name: 'IRS Audit Protection',
      price: '$49/year',
      description: 'Licensed Enrolled Agent representation before the IRS',
      features: [
        'Licensed EA representation',
        'IRS audit defense',
        'State audit support',
        'Document preparation',
        'Direct IRS communication',
        'Resolution assistance',
        'Unlimited consultations',
        'Appeals representation',
      ],
    },
    {
      icon: Clock,
      name: 'Prior Year Returns',
      price: 'Starting at $149',
      description: 'Catch up on unfiled tax returns from previous years',
      features: [
        'Any tax year',
        'Penalty reduction help',
        'Payment plan setup',
        'IRS negotiation',
        'State returns included',
        'Fast turnaround',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img
          src="/images/heroes/cash-bills.jpg"
          alt="Tax Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-900/65"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Professional Tax Services
              </h1>
              <p className="text-xl text-white mb-8">
                From simple returns to complex business taxes, we provide expert
                service at competitive prices
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/book-appointment"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="tel:+13173143757"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Call (317) 314-3757
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {service.price}
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/supersonic-fast-cash/book-appointment"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Supersonic Fast Cash?
            </h2>
            <p className="text-xl text-gray-600">
              Professional service, competitive pricing, and personalized
              attention
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                IRS Certified
              </h3>
              <p className="text-gray-600">
                All preparers are IRS-certified with years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Maximum Refund
              </h3>
              <p className="text-gray-600">
                We find every deduction and credit you deserve
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Service
              </h3>
              <p className="text-gray-600">
                Most returns completed within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-lg text-white mb-8">
            Schedule your appointment today or call us for immediate assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded hover:bg-gray-100 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              href="tel:+13173143757"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded hover:bg-orange-600 transition-colors border-2 border-white"
            >
              Call (317) 314-3757
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
