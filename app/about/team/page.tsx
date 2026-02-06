import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    "Meet the dedicated professionals leading Elevate For Humanity's mission to transform lives through education and career training.",
};

// Fallback team data when database is empty
const fallbackTeam = [
  {
    id: '1',
    name: 'Elizabeth Greene',
    title: 'Founder & Chief Executive Officer',
    image_url: '/images/team/elizabeth-greene.jpg',
    bio: 'Elizabeth Greene is a transformational leader, workforce development pioneer, and social entrepreneur who has dedicated her career to creating pathways out of poverty and into prosperity. She founded Elevate for Humanity with a mission to connect everyday people to free workforce training.\n\nAs Founder and CEO, she has built one of Indiana\'s most innovative workforce development organizations—serving justice-involved individuals, low-income families, and barrier-facing populations with dignity, excellence, and measurable results. She also owns Textures Institute of Cosmetology, Greene Staffing Solutions, and Greene Property Management—creating a holistic ecosystem for training, employment, and housing.\n\nUnder Elizabeth\'s leadership, Elevate for Humanity has achieved recognition as a U.S. Department of Labor Registered Apprenticeship Sponsor and approved by the Indiana Department of Workforce Development as an INTraining provider. The organization is a registered government contractor, 501(c)(3) nonprofit, Indiana State Bidder, ITAP certified, Indiana Department of Revenue registered, and ByBlack certified.',
    email: 'elizabeth@elevateforhumanity.org',
  },
  {
    id: '2',
    name: 'Jozanna George',
    title: 'Director of Enrollment & Beauty Industry Programs | Site Coordinator, Textures Institute of Cosmetology',
    image_url: '/images/jozanna-george.jpg',
    bio: 'Jozanna George is a multi-licensed beauty professional holding Nail Technician, Nail Instructor, and Esthetician licenses. With extensive experience in the beauty industry, she brings both technical expertise and a passion for education to her role.\n\nAs Director of Enrollment & Beauty Industry Programs, Jozanna oversees the nail program at Textures Institute of Cosmetology and manages enrollment operations for Elevate for Humanity. She works directly with prospective students to guide them through the enrollment process and connect them with funding opportunities.\n\nHer dedication to student success and her hands-on approach to education have helped countless individuals launch careers in the beauty industry.',
  },
  {
    id: '3',
    name: 'Dr. Carlina Wilkes',
    title: 'Executive Director of Financial Operations & Organizational Compliance',
    image_url: '/images/carlina-wilkes.jpg',
    bio: 'Dr. Carlina Wilkes brings over 24 years of federal experience with the Defense Finance and Accounting Service (DFAS), where she developed expertise in financial management, compliance, and organizational operations.\n\nShe holds the Department of Defense Financial Management Certification Level II, demonstrating her advanced knowledge of federal financial regulations and best practices. At Elevate for Humanity, Dr. Wilkes oversees all financial operations and ensures organizational compliance with federal, state, and local requirements.\n\nHer extensive background in federal financial management ensures that Elevate for Humanity maintains the highest standards of fiscal responsibility and regulatory compliance.',
  },
  {
    id: '4',
    name: 'Sharon Douglass',
    title: 'Respiratory Therapy & Health Informatics Specialist',
    image_url: '/images/sharon-douglas.jpg',
    bio: 'Sharon Douglass brings over 30 years of experience as a Respiratory Therapist, combined with advanced education including a Master\'s degree in Health Informatics. Her unique combination of clinical expertise and health information technology knowledge makes her invaluable to Elevate for Humanity\'s healthcare training programs.\n\nAs Respiratory Therapy & Health Informatics Specialist, Sharon supports healthcare training programs and workforce readiness initiatives. She helps develop curriculum, mentors students, and ensures that training programs meet industry standards and prepare graduates for successful careers in healthcare.\n\nHer decades of hands-on clinical experience provide students with real-world insights into healthcare careers.',
  },
  {
    id: '5',
    name: 'Leslie Wafford',
    title: 'Director of Community Services',
    image_url: '/images/leslie-wafford.jpg',
    bio: 'Leslie Wafford serves as Director of Community Services at Elevate for Humanity, where she leads initiatives focused on housing stability and community support. Her work is guided by her personal philosophy of "reach one, teach one"—believing that helping one person creates a ripple effect throughout the community.\n\nLeslie promotes low-barrier housing access and eviction prevention, helping families navigate housing challenges and connect with resources. She understands that stable housing is foundational to successful workforce development outcomes.\n\nHer compassionate approach and deep community connections have helped countless families achieve housing stability while pursuing career training opportunities.',
  },
  {
    id: '6',
    name: 'Alina Smith, PMHNP',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image_url: '/images/alina-smith.jpg',
    bio: 'Alina Smith is a board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP) who earned her advanced degree from Purdue University. Her specialized training enables her to provide comprehensive mental health services to program participants.\n\nAt Elevate for Humanity, Alina provides mental health assessments, therapeutic interventions, and medication management for program participants. She understands that mental health support is essential for individuals facing barriers to employment, particularly those with histories of trauma or justice involvement.\n\nHer integrated approach to mental health care helps participants address underlying challenges while pursuing their career goals, leading to better outcomes and sustained success.',
  },
  {
    id: '7',
    name: 'Delores Reynolds',
    title: 'Social Media & Digital Engagement Coordinator',
    image_url: '/images/delores-reynolds.jpg',
    bio: 'Delores Reynolds serves as Social Media & Digital Engagement Coordinator at Elevate for Humanity, where she manages the organization\'s digital presence and communications strategy. Her work helps spread awareness of free training opportunities to those who need them most.\n\nDelores manages digital communications across multiple platforms, sharing student success stories and promoting program offerings. She creates compelling content that resonates with potential students and community partners alike.\n\nHer strategic approach to digital engagement has expanded Elevate for Humanity\'s reach, connecting more individuals with life-changing career training opportunities throughout Indiana.',
  },
];

export default async function TeamPage() {
  const supabase = await createClient();

  // Fetch team members from database
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  // Use fallback if no data from database
  const members = (teamMembers && teamMembers.length > 0) ? teamMembers : fallbackTeam;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs
            items={[
              { label: 'About', href: '/about' },
              { label: 'Our Team' },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/heroes/about-team.jpg"
          alt="Our Team"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {members.length > 0 ? (
            <div className="space-y-16">
              {members.map((member: any) => (
                <div key={member.id} className="grid md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-1">
                    <div className="relative w-full aspect-[3/4] max-w-[300px] mx-auto rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={member.image_url || '/images/placeholder-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                      {member.name}
                    </h2>
                    <p className="text-lg text-blue-600 font-medium mb-4">
                      {member.title}
                    </p>
                    {member.bio && (
                      <div className="prose prose-slate max-w-none">
                        {member.bio.split('\n\n').map((paragraph: string, idx: number) => (
                          <p key={idx} className="text-slate-600 mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                    {member.email && (
                      <p className="mt-4">
                        <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                          {member.email}
                        </a>
                      </p>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">Contact us to learn more about our team.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We are always looking for passionate individuals to join our team.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
