import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Award,
  Users,
  CheckCircle,
  TrendingUp,
  MapPin,
  Calendar,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs | Elevate For Humanity',
  description: '100% free training programs in healthcare, skilled trades, IT, and business. Funded by WIOA.',
};

export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const supabase = await createClient();

  // Get all active programs
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  // Get program categories
  const { data: categories } = await supabase
    .from('program_categories')
    .select('*')
    .order('name', { ascending: true });

  // Get stats
  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: totalGraduates } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'alumni');

  const { count: employerPartners } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const stats = [
    { label: 'Training Programs', value: totalPrograms || 15, icon: BookOpen },
    { label: 'Students Trained', value: totalEnrollments || 500, icon: Users },
    { label: 'Graduates Placed', value: totalGraduates || 300, icon: TrendingUp },
    { label: 'Employer Partners', value: employerPartners || 50, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Free Career Training Programs
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            100% free training in healthcare, skilled trades, IT, and business. 
            Funded by WIOA and Indiana Career Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600"
            >
              Apply Now - It's Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold">{stat.value}+</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Free */}
      <section className="py-12 bg-green-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-green-600" />
              <div>
                <h3 className="font-bold text-lg">100% Free Training</h3>
                <p className="text-gray-600">No tuition, no fees, no debt</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-green-600" />
              <div>
                <h3 className="font-bold text-lg">WIOA Funded</h3>
                <p className="text-gray-600">Federal workforce funding</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
              <div>
                <h3 className="font-bold text-lg">Job Placement</h3>
                <p className="text-gray-600">Career services included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/programs"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
            >
              All Programs
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/programs?category=${cat.slug}`}
                className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Programs Grid */}
        <h2 className="text-3xl font-bold mb-8">Available Programs</h2>
        {programs && programs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program: any) => (
              <div
                key={program.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative">
                  {program.image_url ? (
                    <img
                      src={program.image_url}
                      alt={program.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  {program.is_featured && (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{program.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                    {program.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </span>
                    )}
                    {program.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {program.location}
                      </span>
                    )}
                    {program.start_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(program.start_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {program.salary_range && (
                    <p className="text-green-600 font-medium text-sm mb-4">
                      Avg. Salary: {program.salary_range}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">FREE</span>
                    <Link
                      href={`/programs/${program.slug || program.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2">Programs coming soon</h3>
            <p className="text-gray-600 mb-6">
              We're adding new training programs. Check back soon!
            </p>
            <Link href="/contact" className="text-blue-600 font-medium hover:underline">
              Contact us for more information
            </Link>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Apply today and begin your journey to a better future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
