import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { COURSES, COURSE_CATEGORIES } from '@/app/data/courses';
import { Clock, Award, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/courses',
  },
  title: 'Course Catalog | Professional Certifications | Elevate For Humanity',
  description:
    'Browse our catalog of professional certification courses. Microsoft Office, Adobe Creative, IT & Cybersecurity, Healthcare Safety, and more. Pay online and start learning today.',
  openGraph: {
    title: 'Course Catalog - Professional Certifications',
    description: 'Industry certifications in Microsoft Office, Adobe, IT, Healthcare, and more.',
    url: 'https://www.elevateforhumanity.org/courses',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Course Catalog' }],
    type: 'website',
  },
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Video Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-c913a513-dde0-4ac7-ae3c-53a453b8b83d.mp4?Expires=2083815719&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=OXubeStSFGiDeF3SU9CQ6JrV2wpxCGlBIwtaznCzrLxiU40aP3onFcEjjtoXpgeUpDrcYE8pktArkwkDCKhrMOTl47Xn9Em3wjkxKxKNkYBcMV4Yw8l1TmvJkIrrhjThOLNLTnlXULArDYVRaIz8YtyycHzUhSELydq8S0xs7SNurTMpEP1PqnrDEp2QmEK2bYPTJQGu90Lftpb3GA4dV2BOby0yCfW-opetSwQcDxfUIn~UgKzBgCyEWW2YdwVbicUPFl895Q01iJQMh1p0Ba7ordWrKjcdQSXfu2uzYzfifCaYLhQNo-23MmMRcPw28rfaea5A-r6K34pQZzRZtg__" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Course Catalog
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              Professional Certifications That Get You Hired
            </p>
            <p className="text-lg text-white/90 mb-8">
              Microsoft Office • Adobe Creative • IT & Cybersecurity • Healthcare Safety • Business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#courses"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Browse Courses
              </a>
              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Apply for Free Training
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {COURSES.length} Professional Certification Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry-recognized certifications from Microsoft, Adobe, OSHA, and more. 
              Pay online and start learning immediately.
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <div className="text-sm font-medium opacity-90 mb-1">{course.provider}</div>
                      <div className="text-lg font-bold">{course.category}</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white text-blue-600 px-3 py-2 rounded-full text-sm font-bold">
                    ${course.price}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{course.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.shortDescription}</p>

                  {/* Course Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.hours} hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>Certificate</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 text-center px-4 py-2 border border-gray-300 text-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/courses/${course.slug}#checkout`}
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Courses</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Official Certifications</h3>
              <p className="text-gray-600">Industry-recognized credentials from Microsoft, Adobe, OSHA, and more</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Self-Paced Learning</h3>
              <p className="text-gray-600">Learn on your schedule with 24/7 access to course materials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Exam Included</h3>
              <p className="text-gray-600">Certification exam voucher included with every course</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Career Support</h3>
              <p className="text-gray-600">Resume help and job placement assistance included</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl text-white/90 mb-8">
            Not sure which certification is right for you? Talk to an advisor about your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Call (317) 314-3757
            </a>
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Apply for Free Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
