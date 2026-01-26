import { Metadata } from 'next';
import Link from 'next/link';
import { Scissors, Clock, DollarSign, Award, MapPin, CheckCircle, Play, Users, Building2, GraduationCap, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Elevate For Humanity',
  description: 'Become a licensed barber through our USDOL Registered Apprenticeship. Learn from master barbers, earn while you learn.',
};

export default function BarberProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] flex items-center"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(/images/beauty/program-barber-training.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-16 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              USDOL Registered Apprenticeship
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Become a Licensed Barber
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Learn from master barbers in real shops. Earn money while you train. Get your Indiana Barber License in 15-24 months.
            </p>
            
            {/* 3 Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/apply?program=barber"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors"
              >
                <GraduationCap className="w-6 h-6" />
                Enroll Now
              </Link>
              <Link
                href="/partners/barber-shop"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                <Building2 className="w-6 h-6" />
                Partner Shop Sign-Up
              </Link>
              <Link
                href="/contact?type=barber"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="w-6 h-6" />
                Inquiry
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>15-24 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span>Earn While You Learn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Indianapolis, IN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Explainer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="relative">
              <div 
                className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                style={{ 
                  backgroundImage: 'url(/images/beauty/program-barber-training.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <a 
                  href="https://www.youtube.com/watch?v=barber-program-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </a>
              </div>
              <p className="text-center text-gray-500 mt-4 text-sm">Watch: How the Barber Apprenticeship Works</p>
            </div>

            {/* Process Steps */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Apply Online</h3>
                    <p className="text-gray-600">Fill out a quick application. We'll contact you within 1-2 days.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Get Matched with a Shop</h3>
                    <p className="text-gray-600">We pair you with a licensed barbershop that fits your goals and location.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Train & Earn</h3>
                    <p className="text-gray-600">Work alongside master barbers. Learn real skills. Get paid from day one.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Get Licensed</h3>
                    <p className="text-gray-600">Complete 2,000 hours and pass the state exam. You're a licensed barber!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You'll Learn</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Cutting & Styling</h3>
              <p className="text-gray-600">Fades, tapers, lineups, beard trims, and all modern styles.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Client Relations</h3>
              <p className="text-gray-600">Build your clientele, consultations, and customer service.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Business Skills</h3>
              <p className="text-gray-600">Pricing, marketing, and how to run your own shop someday.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements - Simple */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Requirements</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">18 years or older</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">High school diploma or GED</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Valid ID</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Passion for barbering</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                <strong>Tuition:</strong> $4,980 (payment plans available) • <strong>Duration:</strong> 2,000 hours (15-24 months)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Owner Section */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                For Shop Owners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Host an Apprentice at Your Shop
              </h2>
              <p className="text-xl text-orange-100 mb-6">
                Train the next generation of barbers. No cost to you — we handle the paperwork and compliance.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span>Develop talent trained in YOUR style</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span>USDOL registered program</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span>We handle all paperwork</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span>Ongoing support & resources</span>
                </li>
              </ul>
              <Link
                href="/partners/barber-shop"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                <Building2 className="w-6 h-6" />
                Become a Partner Shop
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="font-bold text-gray-900 text-xl mb-6">Shop Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Licensed barbershop in Indiana</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">At least one licensed barber on staff</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Willingness to mentor apprentices</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Safe, professional environment</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Questions? Call <a href="tel:+13173143757" className="text-orange-600 font-semibold">(317) 314-3757</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Barber Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our apprenticeship program and become a licensed barber.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply?program=barber"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600"
            >
              <GraduationCap className="w-6 h-6" />
              Enroll Now
            </Link>
            <Link
              href="/partners/barber-shop"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100"
            >
              <Building2 className="w-6 h-6" />
              Partner Shop Sign-Up
            </Link>
            <Link
              href="/contact?type=barber"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10"
            >
              <Phone className="w-6 h-6" />
              Inquiry
            </Link>
          </div>
          <p className="mt-8 text-gray-400">
            Or call us: <a href="tel:+13173143757" className="text-orange-400 font-semibold">(317) 314-3757</a>
          </p>
        </div>
      </section>
    </div>
  );
}
