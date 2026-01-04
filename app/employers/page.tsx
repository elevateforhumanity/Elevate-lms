import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Hire Job-Ready Talent | Elevate for Humanity',
  description:
    'Connect with skilled, certified candidates ready to join your workforce. Post jobs, build apprenticeships, and grow your team.',
};

export default function EmployersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[70vh] w-full overflow-hidden">
          <Image
            src="/media/programs/workforce-readiness-hero.jpg"
            alt="Workforce Training"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-orange-700/90" />
          
          <div className="relative z-10 flex items-center justify-center min-h-[70vh]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Hire Job-Ready Talent
                </h1>
                <p className="text-xl md:text-2xl text-orange-100 mb-8">
                  Connect with skilled, certified candidates who have completed
                  industry-recognized training programs. Build your workforce with
                  confidence.
                </p>
                <div className="flex gap-4">
                  <Link href="/employers/post-job">
                    <Button size="lg" variant="secondary">
                      Post a Job
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Real Images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Partner With Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/media/programs/cpr-group-training-hd.jpg"
                  alt="Pre-Screened Candidates"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-Screened Candidates</h3>
              <p className="text-gray-600">
                All candidates have completed rigorous training and passed
                industry certifications.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/media/programs/cpr-certification-group-hd.jpg"
                  alt="Industry Certifications"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Certifications</h3>
              <p className="text-gray-600">
                Candidates hold recognized credentials in healthcare, skilled
                trades, technology, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/media/programs/cpr-individual-practice-hd.jpg"
                  alt="Ongoing Support"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide continued support to ensure successful placements and
                long-term retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Real Images */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="/media/programs/efh-business-startup-marketing-hero.jpg"
                  alt="Job Postings"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Job Postings</h3>
                <p className="text-gray-600 mb-4">
                  Post your open positions and connect directly with qualified
                  candidates from our talent pool.
                </p>
                <Link href="/employers/post-job" className="text-orange-600 font-semibold hover:underline">
                  Post a Job →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="/media/programs/efh-barber-hero.jpg"
                  alt="Apprenticeships"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Apprenticeships</h3>
                <p className="text-gray-600 mb-4">
                  Build your workforce through DOL-registered apprenticeship
                  programs with our support.
                </p>
                <Link href="/employers/apprenticeships" className="text-orange-600 font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/programs/cna-hd.jpg"
            alt="Join Our Platform"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-orange-600/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Team?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of employers who have found qualified talent through
            our platform.
          </p>
          <Link href="/employers/post-job">
            <Button size="lg" variant="secondary">
              Post Your First Job
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
