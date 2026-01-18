import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Rocket, Target, TrendingUp, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Supersonic Program | Elevate LMS' };

export default function SupersonicPage() {
  const features = [
    { icon: Rocket, title: 'Accelerated Learning', description: 'Complete programs 50% faster with intensive study tracks' },
    { icon: Target, title: 'Focused Curriculum', description: 'Streamlined content targeting essential skills' },
    { icon: Clock, title: 'Flexible Scheduling', description: 'Evening and weekend options for working professionals' },
    { icon: Award, title: 'Priority Certification', description: 'Fast-track certification exam scheduling' },
  ];

  const programs = [
    { name: 'HVAC Technician', duration: '8 weeks', regular: '16 weeks', price: '$2,499' },
    { name: 'Medical Assistant', duration: '10 weeks', regular: '20 weeks', price: '$2,999' },
    { name: 'Barber License', duration: '6 weeks', regular: '12 weeks', price: '$1,999' },
    { name: 'CDL Training', duration: '4 weeks', regular: '8 weeks', price: '$3,499' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative bg-gray-900 py-20">
        <Image
          src="/images/artlist/hero-training-3.jpg"
          alt="Supersonic Program"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-10 h-10 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-xl">SUPERSONIC</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Accelerate Your Career</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our intensive fast-track programs get you certified and job-ready in half the time.
          </p>
          <Link href="/supersonic/apply" className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Supersonic?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Available Programs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{program.name}</h3>
                  <p className="text-purple-400 font-semibold">{program.duration} intensive</p>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{program.price}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>Regular program: {program.regular}</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Full curriculum coverage
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Hands-on training included
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Job placement assistance
                </li>
              </ul>
              <Link href={`/supersonic/programs/${program.name.toLowerCase().replace(' ', '-')}`} className="block text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
