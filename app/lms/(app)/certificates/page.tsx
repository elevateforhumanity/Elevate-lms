import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ArrowRight, Download, Award, Share2 } from 'lucide-react';
import { CertificatePreview } from '@/components/lms/CertificateTemplate';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/certificates',
  },
  title: 'Certificates | Elevate For Humanity',
  description: 'View and download your earned certificates and credentials.',
};

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: certificates } = await supabase
    .from('certificates')
    .select(`
      *,
      courses (
        id,
        title,
        thumbnail_url
      )
    `)
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false });

  const availableCertifications = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'CNA Certification',
      description: 'Certified Nursing Assistant credential recognized nationwide',
      href: '/programs/healthcare',
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'HVAC Technician',
      description: 'EPA 608 certification for HVAC professionals',
      href: '/programs/hvac-technician',
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'CompTIA IT Fundamentals',
      description: 'Entry-level IT certification for tech careers',
      href: '/programs/technology',
    },
    {
      image: '/hero-images/cdl-cat-new.jpg',
      title: 'Commercial Driver License',
      description: 'CDL Class A or B for transportation careers',
      href: '/programs/cdl-transportation',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-3.jpg"
        >
          <source src="/videos/student-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/85 to-orange-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-amber-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Certificates</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            View, download, and share your earned credentials
          </p>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {certificates && certificates.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Earned Certificates</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {certificates.map((cert: any) => (
                  <div key={cert.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={cert.courses?.thumbnail_url || '/hero-images/how-it-works-hero.jpg'}
                        alt={cert.courses?.title || 'Certificate'}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {cert.courses?.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Issued: {new Date(cert.issued_at).toLocaleDateString()} • #{cert.certificate_number}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <CertificatePreview
                        studentName={`${profile?.first_name || ''} ${profile?.last_name || ''}`}
                        courseName={cert.courses?.title || 'Course'}
                        completionDate={cert.issued_at}
                        certificateNumber={cert.certificate_number}
                      />
                      <div className="flex gap-3 mt-4">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center mb-12">
              <Image
                src="/hero-images/how-it-works-hero.jpg"
                alt="Earn certificates"
                width={300}
                height={200}
                className="mx-auto rounded-lg mb-6 opacity-80"
              />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Certificates Yet</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Complete a course to earn your first certificate. Certificates are automatically generated when you finish all course requirements.
              </p>
              <Link
                href="/lms/courses"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                View My Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* Available Certifications */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableCertifications.map((cert) => (
              <Link
                key={cert.title}
                href={cert.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white">
                    {cert.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{cert.description}</p>
                  <span className="inline-flex items-center gap-1 text-amber-600 font-medium text-sm mt-2 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
