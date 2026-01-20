import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Career Training Programs in Indiana | Elevate for Humanity',
  description: 'Free workforce development and career training programs in Indiana. Get certified in healthcare, IT, skilled trades, and more. Start your new career today.',
  keywords: ['career training Indiana', 'workforce development Indiana', 'free job training Indianapolis', 'certification programs Indiana'],
}

export default function CareerTrainingIndianaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Career Training Programs in Indiana
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Launch your new career with free workforce development programs across Indiana.
          From Indianapolis to Fort Wayne, we help Hoosiers build in-demand skills.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Healthcare Careers', desc: 'CNA, Medical Assistant, Phlebotomy certifications' },
            { title: 'Information Technology', desc: 'CompTIA A+, Network+, Security+ training' },
            { title: 'Skilled Trades', desc: 'HVAC, Electrical, Plumbing apprenticeships' },
            { title: 'Commercial Driving', desc: 'CDL Class A & B license preparation' },
            { title: 'Business & Office', desc: 'Administrative, bookkeeping, customer service' },
            { title: 'Manufacturing', desc: 'CNC machining, welding, quality control' },
          ].map((program) => (
            <div key={program.title} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
              <p className="text-gray-600">{program.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="mb-6">Join thousands of Indiana residents who have transformed their careers.</p>
          <Link href="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Browse Programs
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Also in Indiana</h3>
            <Link href="/community-services-indiana" className="text-green-600 hover:underline block">
              Community Services & Support →
            </Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Other States</h3>
            <div className="space-y-1">
              <Link href="/career-training-ohio" className="text-blue-600 hover:underline block">Ohio</Link>
              <Link href="/career-training-illinois" className="text-blue-600 hover:underline block">Illinois</Link>
              <Link href="/career-training-tennessee" className="text-blue-600 hover:underline block">Tennessee</Link>
              <Link href="/career-training-texas" className="text-blue-600 hover:underline block">Texas</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Serving: Indianapolis, Fort Wayne, Evansville, South Bend, Carmel, Fishers, Bloomington</p>
          <div className="mt-4 space-x-4">
            <Link href="/locations" className="text-blue-600 hover:underline">All Locations</Link>
            <Link href="/programs" className="text-blue-600 hover:underline">All Programs</Link>
            <Link href="/apply" className="text-blue-600 hover:underline">Apply Now</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
