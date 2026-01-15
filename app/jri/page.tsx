import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JRI Program',
  description: 'Justice Reinvestment Initiative program providing career training and support for justice-involved individuals.',
  path: '/jri',
});

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Heart,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Shield,
  Target,
} from 'lucide-react';


export default function JRIPage() {
  return (
    <div className="min-h-screen bg-zinc-900  to-white">
      {/* Hero Section with Image */}
      <section className="relative h-[600px] bg-white">
        <div className="absolute inset-0">
          <Image
            src="/images/funding/funding-jri-program-v2.jpg"
            alt="JRI Program - Transforming Lives Through Education"
            fill
          sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-brand-green-600 text-white rounded-full text-sm font-bold mb-6">
              Justice Reinvestment Initiative Partner
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Breaking Barriers.
              <br />
              Building Futures.
            </h1>
            <p className="text-base md:text-lg mb-8 text-blue-100 leading-relaxed">
              The Justice Reinvestment Initiative transforms lives by providing
              fully-funded workforce training and career pathways for
              individuals reentering society.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link href="/programs">
                  Explore Programs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8 py-6"
                asChild
              >
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Your Second Chance Starts Here
              </h2>
              <p className="text-base md:text-lg text-black">
                Every person deserves the opportunity to rebuild their life with
                dignity and purpose.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/learners/reentry-coaching.jpg"
                  alt="Career coaching and mentorship"
                  fill
          sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-4">
                  From Incarceration to Career Success
                </h3>
                <p className="text-black mb-4 leading-relaxed">
                  The Justice Reinvestment Initiative recognizes that successful
                  reentry requires more than just release—it requires
                  opportunity. Through JRI funding, we provide comprehensive
                  workforce training that opens doors to stable, well-paying
                  careers.
                </p>
                <p className="text-black leading-relaxed">
                  Our programs are designed specifically for individuals with
                  justice involvement, addressing the unique challenges you face
                  while building the skills employers demand.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-lg md:text-lg font-bold mb-4">
                  100% Funded Training
                </h3>
                <p className="text-black mb-4 leading-relaxed">
                  Through JRI funding, your entire training program is
                  covered—no tuition, no fees, no barriers. This includes
                  industry-recognized certifications, hands-on training, and
                  ongoing support services.
                </p>
                <p className="text-black leading-relaxed">
                  We believe financial constraints should never prevent someone
                  from accessing the education they need to succeed. JRI makes
                  that belief a reality.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
                <Image
                  src="/images/programs/workforce-readiness-hero.jpg"
                  alt="Workforce development training"
                  fill
          sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Real Impact, Real Results
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-brand-blue-600" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-brand-blue-600 text-2xl md:text-3xl lg:text-4xl">
                    85%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black">
                    Employment rate within 6 months of program completion
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-brand-green-600" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-brand-green-600 text-2xl md:text-3xl lg:text-4xl">
                    $18+
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black">
                    Average starting hourly wage for graduates
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-purple-600 text-2xl md:text-3xl lg:text-4xl">
                    92%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black">
                    Program completion rate with dedicated support
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-brand-orange-600" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-brand-orange-600 text-2xl md:text-3xl lg:text-4xl">
                    73%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black">
                    Reduction in recidivism for program participants
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What JRI Funding Covers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-brand-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Complete Training Programs</CardTitle>
                      <CardDescription className="mt-2">
                        Full tuition coverage for industry-recognized
                        certification programs including materials, equipment,
                        and all required coursework.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-brand-green-600" />
                    </div>
                    <div>
                      <CardTitle>Certification Exams</CardTitle>
                      <CardDescription className="mt-2">
                        All certification exam fees covered, including retakes
                        if needed. We're invested in your success.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>Career Coaching</CardTitle>
                      <CardDescription className="mt-2">
                        One-on-one career coaching, resume building, interview
                        preparation, and job placement assistance.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-brand-orange-600" />
                    </div>
                    <div>
                      <CardTitle>Support Services</CardTitle>
                      <CardDescription className="mt-2">
                        Access to wraparound support services including
                        transportation assistance, childcare resources, and
                        ongoing mentorship.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-brand-orange-600" />
                    </div>
                    <div>
                      <CardTitle>Job Placement</CardTitle>
                      <CardDescription className="mt-2">
                        Direct connections to employers who value second chances
                        and offer competitive wages and benefits.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle>Long-term Success</CardTitle>
                      <CardDescription className="mt-2">
                        Post-graduation support for up to 12 months to ensure
                        you stay on track and advance in your career.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Available Programs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              JRI-Funded Programs
            </h2>
            <p className="text-base md:text-lg text-black text-center mb-12">
              Choose from high-demand career pathways with proven employment
              outcomes
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/programs/efh-public-safety-reentry-hero.jpg"
                    alt="Public Safety & Reentry Specialist"
                    fill
          sizes="100vw"
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Public Safety & Reentry Specialist</CardTitle>
                  <CardDescription>
                    Turn your lived experience into a rewarding career helping
                    others successfully reintegrate into society.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        National certification included
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        $45,000+ average starting salary
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        High demand in corrections and social services
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/programs/peer-recovery-coach">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/heroes/workforce-partner-1.jpg"
                    alt="Commercial Driver License CDL"
                    fill
          sizes="100vw"
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Commercial Driver&apos;s License (CDL)</CardTitle>
                  <CardDescription>
                    Enter the transportation industry with a career that offers
                    independence, stability, and excellent pay.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Class A CDL certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        $50,000-$70,000 first-year earnings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Nationwide job opportunities
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/programs">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/heroes/workforce-partner-3.jpg"
                    alt="Manufacturing & Skilled Trades"
                    fill
          sizes="100vw"
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Manufacturing & Skilled Trades</CardTitle>
                  <CardDescription>
                    Build a career in advanced manufacturing with hands-on
                    training in high-tech production environments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Industry-recognized certifications
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        $40,000-$55,000 starting salary
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Clear advancement pathways
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/programs">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Am I Eligible?
            </h2>
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl">
                  JRI Funding Eligibility Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Justice System Involvement</p>
                    <p className="text-black">
                      Currently or previously involved with the criminal justice
                      system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Indiana Resident</p>
                    <p className="text-black">
                      Must be a current resident of Indiana
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Commitment to Success</p>
                    <p className="text-black">
                      Dedicated to completing training and securing employment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Referral or Self-Enrollment</p>
                    <p className="text-black">
                      Can be referred by case manager or self-enroll through our
                      application process
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 bg-white text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-base md:text-lg mb-8 text-blue-100">
              Your past doesn&apos;t define your future. Take the first step
              toward a new career today.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <h3 className="text-lg md:text-lg font-bold mb-6">
                Three Simple Steps to Get Started
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="w-12 h-12 bg-white text-brand-blue-600 rounded-full flex items-center justify-center font-bold text-base mb-4">
                    1
                  </div>
                  <h4 className="font-bold mb-2">Contact Us</h4>
                  <p className="text-blue-100">
                    Reach out via phone, email, or our online form. We&apos;ll
                    schedule your initial consultation.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white text-brand-blue-600 rounded-full flex items-center justify-center font-bold text-base mb-4">
                    2
                  </div>
                  <h4 className="font-bold mb-2">Meet Your Coach</h4>
                  <p className="text-blue-100">
                    Discuss your goals, explore program options, and complete
                    your enrollment paperwork.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white text-brand-blue-600 rounded-full flex items-center justify-center font-bold text-base mb-4">
                    3
                  </div>
                  <h4 className="font-bold mb-2">Start Training</h4>
                  <p className="text-blue-100">
                    Begin your fully-funded training program and start building
                    your new career.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link href="/contact">
                  Contact Us Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8 py-6"
                asChild
              >
                <Link href="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Success Stories
            </h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-10 h-10 text-brand-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg text-black italic mb-4 leading-relaxed">
                      &quot;After 8 years of incarceration, I didn&apos;t think
                      anyone would give me a chance. The JRI program not only
                      gave me the training I needed, but they believed in me
                      when I didn&apos;t believe in myself. Today, I&apos;m a
                      certified reentry specialist helping others find their
                      path, just like someone helped me find mine.&quot;
                    </p>
                    <p className="font-bold">— Marcus T.</p>
                    <p className="text-black">
                      Public Safety & Reentry Specialist Graduate, 2023
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
