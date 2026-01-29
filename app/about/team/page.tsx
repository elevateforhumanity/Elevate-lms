import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    "Meet the dedicated professionals leading Elevate For Humanity's mission to transform lives through education and career training.",
};

const teamMembers = [
  {
    name: 'Elizabeth Greene',
    title: 'Founder & Chief Executive Officer',
    image: '/images/team/elizabeth-greene.jpg',
    bio: `Elizabeth Greene is a transformational leader, workforce development pioneer, and social entrepreneur who has dedicated her career to creating pathways out of poverty and into prosperity. As Founder and Chief Executive Officer of Elevate for Humanity Technical & Career Institute, she has built one of Indiana's most innovative and compliant workforce development organizations—serving justice-involved individuals, low-income families, and barrier-facing populations with dignity, excellence, and measurable results.

Elizabeth is also the owner of several businesses that directly correlate with and support the Elevate for Humanity platform:

• **Textures Institute of Cosmetology** – A licensed cosmetology school providing state board-approved training in barbering, cosmetology, esthetics, and nail technology. This school serves as the beauty industry training arm of Elevate for Humanity, allowing students to earn professional licenses while participating in apprenticeship programs.

• **Greene Staffing Solutions** – A staffing agency that connects Elevate graduates with employment opportunities, creating a direct pipeline from training to career placement.

• **Greene Property Management** – Provides transitional and supportive housing options for program participants, addressing one of the most significant barriers to workforce success.

These interconnected businesses create a holistic ecosystem that addresses training, employment, and housing—the three pillars essential for sustainable economic mobility.

**Credentials & Approvals:**

• **U.S. Department of Labor (DOL)** – Registered Apprenticeship Sponsor (RAPIDS ID: 2025-IN-132301)
• **Indiana Department of Workforce Development (DWD)** – Approved INTraining Provider (Location ID: 10004621)
• **Indiana Department of Education (DOE)** – Recognized educational institution
• **Indiana State Board of Cosmetology & Barber Examiners** – Licensed school operator
• **WIOA Eligible Training Provider** – Programs qualify for Workforce Innovation and Opportunity Act funding
• **Workforce Ready Grant (WRG) Approved** – State grant funding eligibility
• **Justice Reinvestment Initiative (JRI) Approved** – Reentry program funding eligibility
• **EmployIndy Partner** – Workforce development collaboration
• **WorkOne Center Partner** – State workforce system integration

Elizabeth's accomplishments extend far beyond credentials. She has created a fully integrated ecosystem that combines workforce training, apprenticeship programs, case management, mental health support, housing assistance, and employer partnerships—all designed to address the root causes of poverty and recidivism. Her holistic approach recognizes that career success requires more than skills training; it requires wraparound support, trauma-informed care, and genuine human connection.

A master strategist and systems builder, Elizabeth has navigated complex federal and state compliance requirements to position Elevate for Humanity as a trusted partner to WorkOne Centers, EmployIndy, community corrections, reentry programs, and employers across Indiana.

Elizabeth holds expertise in federal workforce policy, apprenticeship development, nonprofit management, compliance and accreditation, trauma-informed care, and social entrepreneurship. Her ability to envision what a community needs—and then build it with precision, integrity, and compassion—has made her a respected leader in workforce development and social impact.

Her impact is measured not just in credentials earned or jobs secured, but in lives transformed, families stabilized, and communities strengthened.`,
    email: 'elevate4humanityedu@gmail.com',
    linkedin: 'https://www.linkedin.com/in/elizabethgreene',
  },
  {
    name: 'Jozanna George',
    title: 'Director of Enrollment & Beauty Industry Programs | Site Coordinator, Textures Institute of Cosmetology',
    image: '/images/jozanna-george.jpg',
    bio: `Jozanna George is a multi-licensed beauty industry professional and educator who leads enrollment operations and oversees all beauty industry programs at Elevate for Humanity. She also serves as the Site Coordinator for the nail technology program at Textures Institute of Cosmetology.

**Professional Licenses & Credentials:**

• **Licensed Nail Technician** – Indiana State Board of Cosmetology & Barber Examiners
• **Licensed Nail Instructor** – Certified to train and supervise nail technology students
• **Licensed Esthetician** – Certified in skincare, facials, and esthetic services
• **Site Coordinator** – Textures Institute of Cosmetology, Beauty Industry Division

Jozanna brings hands-on industry experience combined with a passion for teaching and mentorship. Her role encompasses student recruitment, enrollment processing, program coordination, and ensuring students successfully complete their training and obtain state licensure.

As Site Coordinator for the beauty industry programs, Jozanna oversees daily operations, student progress tracking, state board exam preparation, and compliance with Indiana licensing requirements. She works closely with students to ensure they develop the technical skills and professional habits needed for successful careers in the beauty industry.

Her dedication to student success and her deep knowledge of cosmetology licensing requirements make her an invaluable asset to both Elevate for Humanity and Textures Institute of Cosmetology.`,
    email: 'elevate4humanityedu@gmail.com',
  },
  {
    name: 'Leslie Wafford',
    title: 'Director of Community Services',
    image: '/images/leslie-wafford.jpg',
    bio: `Leslie Wafford is deeply committed to building stable, empowered communities by promoting low-barrier housing access and strong eviction-prevention practices. Throughout her career, she has worked closely with diverse neighborhoods to remove barriers, support families, and create environments where residents can remain safely housed.

Leslie believes in the power of education and advocacy. She is dedicated to helping individuals understand their rights and responsibilities as renters, giving them the tools they need to navigate housing challenges with confidence. Guided by her personal philosophy of "reach one, teach one," Leslie approaches her work with compassion, fairness, and a genuine desire to uplift the people and communities she serves.

Her passion, experience, and community-first leadership make her a powerful asset within Elevate for Humanity's mission to support, educate, and strengthen individuals and families across Indiana.`,
    email: 'elevate4humanityedu@gmail.com',
  },
  {
    name: 'Dr. Carlina Annette Wilkes',
    title: 'Executive Director of Financial Operations & Organizational Compliance',
    image: '/images/carlina-wilkes.jpg',
    bio: `Dr. Carlina Annette Wilkes is a highly accomplished executive and retired federal professional with more than 24 years of distinguished service within the Defense Finance and Accounting Service (DFAS). Throughout her federal career, she advanced through multiple leadership and operational roles, earning recognition for her excellence in financial management, organizational compliance, workforce development, and strategic program oversight.

Dr. Wilkes holds the Department of Defense Financial Management Certification, Level II, demonstrating mastery in federal financial operations, accountability, and mission-aligned decision-making.

Her educational background reflects a deep commitment to leadership and lifelong learning. She holds a Doctorate in Ministry, a Master of Arts in Ministry, and a Bachelor of Applied Management, supported by specialized credentials in Accounting and Paralegal Studies. This diverse expertise allows her to navigate complex organizational systems, lead and develop teams, design effective operational frameworks, and improve efficiency across government, nonprofit, and community-serving environments.

Dr. Wilkes is known for her integrity, strategic insight, and results-driven leadership. She brings a powerful blend of federal experience, organizational acumen, and executive-level training to every role she undertakes. At Elevate for Humanity, she serves as a trusted leader and advisor, helping strengthen financial operations, compliance, and long-term institutional stability.`,
    email: 'elevate4humanityedu@gmail.com',
  },
  {
    name: 'Alina Smith, PMHNP',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/alina-smith.jpg',
    bio: `Alina Smith is a compassionate, board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP) dedicated to promoting emotional wellness and holistic healing across all stages of life. A graduate of Purdue University, she holds a Master's in Nursing with a concentration in mental health across the lifespan.

Alina provides comprehensive psychiatric care for individuals aged five and older, offering evidence-based mental health assessments, behavioral health interventions, and medication management for a wide range of mental health and substance use disorders. Her clinical approach combines psychopharmacology and therapeutic support, helping clients achieve balance, stability, and emotional growth.

At Elevate for Humanity, Alina plays a key role in integrating mental health awareness and wellness strategies into workforce and community programs. She believes that access to compassionate, judgment-free mental health care is the foundation of empowerment, self-sufficiency, and lasting transformation.`,
    email: 'elevate4humanityedu@gmail.com',
  },
  {
    name: 'Sharon Douglass',
    title: 'Respiratory Therapy & Health Informatics Specialist',
    image: '/images/sharon-douglas.jpg',
    bio: `Sharon Douglass is a highly skilled healthcare professional with over 30 years of dedicated experience as a Respiratory Therapist, complemented by a Master of Science degree in Health Informatics. She is deeply committed to improving patient safety, enhancing care quality, and supporting clinical teams through expert-level respiratory care and advanced healthcare data systems.

Throughout her career, Sharon has worked at the intersection of patient care, medical technology, operations management, and clinical informatics. She has supported hospitals, long-term care facilities, and healthcare organizations by implementing evidence-based respiratory practices, improving patient outcomes, and streamlining clinical workflows to increase efficiency and reduce care variations.

Sharon's extensive clinical expertise includes respiratory therapy treatments and emergency response, ventilator management (invasive & noninvasive), bronchopulmonary hygiene techniques, oxygen therapy and airway management, interpreting EKGs, ABGs, vital signs, and diagnostic results, mechanical ventilator setup and monitoring, suctioning and airway clearance procedures, patient education and disease management, and managing respiratory equipment safety, testing, and maintenance.

She has also served as an Area Supervisor, overseeing staff performance, compliance with patient safety standards, and preventive maintenance for diagnostic equipment such as bronchoscopes and respiratory devices.

At Elevate for Humanity, Sharon brings her decades of clinical experience and informatics expertise to support healthcare training, workforce readiness, and patient-centered educational programs. Her passion lies in helping individuals and healthcare organizations improve safety, streamline processes, and deliver high-quality care.

Known for her professionalism, clinical precision, and commitment to excellence, Sharon Douglass is a trusted leader and educator dedicated to elevating patient outcomes and supporting the next generation of healthcare professionals.`,
    email: 'elevate4humanityedu@gmail.com',
  },

  {
    name: 'Delores Reynolds',
    title: 'Social Media & Digital Engagement Coordinator',
    image: '/images/delores-reynolds.jpg',
    bio: `Delores Reynolds manages social media presence and digital engagement for Elevate for Humanity. She creates compelling content that shares student success stories, promotes program offerings, and builds community awareness of workforce development opportunities.

Delores brings creativity and strategic thinking to digital communications, helping Elevate for Humanity reach individuals who can benefit from free training programs. Her work amplifies the organization's mission and connects people with life-changing opportunities.`,
    email: 'elevate4humanityedu@gmail.com',
  },
];

export default function TeamPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Team' }]} />
        </div>
      </div>
      {/* Avatar Guide - handled by GlobalAvatar in layout */}
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-brand-blue-700">
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Meet Our Team
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-3xl">
                Dedicated professionals committed to transforming lives through
                education, opportunity, and community empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-start`}
              >
                {/* Photo */}
                <div className="lg:w-1/3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                    <Image
                      priority={index < 2}
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 space-y-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="block text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                    >
                      {member.email}
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                      >
                        LinkedIn Profile →
                      </a>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="lg:w-2/3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
                    {member.name}
                  </h2>
                  <p className="text-base md:text-lg text-brand-blue-600 font-semibold mb-6">
                    {member.title}
                  </p>
                  <div className="prose prose-lg max-w-none">
                    {member.bio.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className="text-black leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{
                          __html: paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/^• /gm, '&bull; ')
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Join Our Team
          </h2>
          <p className="text-base md:text-lg text-black mb-8 max-w-3xl mx-auto">
            We're always looking for passionate professionals who share our
            mission to transform lives through education and opportunity.
          </p>
          <Link
            href="/careers"
            className="inline-block px-8 py-4 bg-brand-blue-600 text-white font-bold rounded-lg hover:bg-brand-blue-700 transition-colors"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
