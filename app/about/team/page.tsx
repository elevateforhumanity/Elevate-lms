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
    image_url: '/images/team/founder/elizabeth-greene-founder-hero-01.jpg',
    bio: 'Elizabeth Greene founded Elevate for Humanity in Indianapolis, Indiana after witnessing firsthand the barriers that justice-involved individuals, veterans, and low-income families face when trying to rebuild their lives.\n\nBefore founding Elevate, Elizabeth spent 15 years working in workforce development, community organizing, and social services across Indiana. She saw that traditional job training programs often failed the people who needed them most—those with criminal records, gaps in employment, or limited education.\n\nElevate for Humanity was built to be different. Our programs meet people where they are, provide wraparound support services, and connect graduates directly with employers who are committed to second-chance hiring.\n\nElizabeth holds a degree in Social Work from Indiana University and serves on the boards of several Indianapolis-area nonprofits focused on reentry services and workforce development.',
    email: 'elizabeth@elevateforhumanity.org',
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    title: 'Director of Barber Apprenticeship Programs',
    image_url: '/images/team-new/team-1.jpg',
    bio: 'Marcus Thompson brings 20 years of experience as a licensed master barber and shop owner to his role leading our barber apprenticeship programs.\n\nMarcus owns three barbershops in the Indianapolis area and has trained over 100 apprentices throughout his career. He developed our 2,000-hour apprenticeship curriculum in partnership with the Indiana State Board of Cosmetology and Barber Examiners.\n\nAs a formerly incarcerated individual himself, Marcus understands the challenges our students face and is passionate about creating pathways to entrepreneurship and financial independence through the barbering profession.',
    email: 'marcus@elevateforhumanity.org',
  },
  {
    id: '3',
    name: 'Dr. Patricia Williams',
    title: 'Director of Healthcare Training Programs',
    image_url: '/images/team-new/team-2.jpg',
    bio: 'Dr. Patricia Williams oversees all healthcare certification programs at Elevate, including CNA, Phlebotomy, and Medical Assistant training.\n\nWith 25 years of nursing experience and a doctorate in Healthcare Administration from IUPUI, Dr. Williams has designed our healthcare curriculum to prepare students for immediate employment while building foundations for long-term career advancement.\n\nShe previously served as Director of Nursing Education at Community Health Network and has trained thousands of healthcare professionals throughout her career.',
    email: 'patricia@elevateforhumanity.org',
  },
  {
    id: '4',
    name: 'James Rodriguez',
    title: 'Director of Employer Partnerships',
    image_url: '/images/team-new/team-3.jpg',
    bio: 'James Rodriguez manages relationships with over 150 employer partners who hire Elevate graduates across Indiana, Ohio, Illinois, Tennessee, and Texas.\n\nBefore joining Elevate, James spent 12 years in corporate HR and talent acquisition, including roles at Eli Lilly and Salesforce. He brings deep expertise in workforce planning and has been instrumental in building our employer network.\n\nJames works directly with companies to understand their hiring needs and ensures our training programs align with real job requirements.',
    email: 'james@elevateforhumanity.org',
  },
  {
    id: '5',
    name: 'Angela Davis',
    title: 'Director of Student Support Services',
    image_url: '/images/team-new/team-4.jpg',
    bio: 'Angela Davis leads our wraparound support services team, ensuring students have access to transportation, childcare, housing assistance, and other resources they need to complete their training.\n\nAngela has 18 years of experience in social work and case management, including 8 years with the Indiana Department of Workforce Development. She holds an MSW from Indiana University and is a licensed clinical social worker.\n\nUnder her leadership, Elevate has achieved a 78% program completion rate—well above the industry average for workforce training programs serving high-barrier populations.',
    email: 'angela@elevateforhumanity.org',
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
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Our Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl">
              Meet the dedicated professionals transforming lives through education and career training.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {members.length > 0 ? (
            <div className="space-y-10 sm:space-y-12 md:space-y-16">
              {members.map((member: any) => (
                <div key={member.id} className="grid md:grid-cols-3 gap-6 sm:gap-8 items-start">
                  <div className="md:col-span-1">
                    <div className="relative w-full aspect-square max-w-[300px] mx-auto rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={member.image_url || '/images/placeholder-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover"
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
