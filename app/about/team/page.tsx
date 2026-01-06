import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/about/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    "Meet the dedicated professionals leading Elevate For Humanity's mission to transform lives through education and career training.",
};

const teamMembers = [
  {
    name: 'Elizabeth Greene',
    title: 'Founder & Chief Executive Officer',
    image: '/images/team/founder/elizabeth-greene-founder-hero-01.jpg', // 940KB - exists
    bio: "Elizabeth Greene is a transformational leader, workforce development pioneer, and social entrepreneur who has dedicated her career to creating pathways out of poverty and into prosperity. As Founder and Chief Executive Officer of Elevate for Humanity Technical & Career Institute, she has built one of Indiana's most innovative and compliant workforce development organizations—serving justice-involved individuals, low-income families, and barrier-facing populations with dignity, excellence, and measurable results.\n\nUnder Elizabeth's visionary leadership, Elevate for Humanity has achieved unprecedented recognition and approval from federal, state, and local agencies. The organization is a U.S. Department of Labor (DOL) Registered Apprenticeship Sponsor (RAPIDS ID: 2025-IN-132301), approved by the Indiana Department of Workforce Development (DWD) as an INTraining provider (Location ID: 10004621), and recognized by the Indiana Department of Education (DOE). All programs are eligible for WIOA, Workforce Ready Grant (WRG), and Justice Reinvestment Initiative (JRI) funding—making training 100% free for qualified students.\n\nElizabeth's accomplishments extend far beyond credentials. She has created a fully integrated ecosystem that combines workforce training, apprenticeship programs, case management, mental health support, housing assistance, and employer partnerships—all designed to address the root causes of poverty and recidivism. Her holistic approach recognizes that career success requires more than skills training; it requires wraparound support, trauma-informed care, and genuine human connection.\n\nA master strategist and systems builder, Elizabeth has navigated complex federal and state compliance requirements to position Elevate for Humanity as a trusted partner to WorkOne Centers, EmployIndy, community corrections, reentry programs, and employers across Indiana. She has secured state licensing board approvals for cosmetology and barber programs, established partnerships with healthcare facilities for clinical training, and created apprenticeship pathways in skilled trades—all while maintaining the highest standards of quality and accountability.\n\nElizabeth's leadership philosophy is rooted in equity, empowerment, and excellence. She believes that every person—regardless of their past—deserves access to quality education, living-wage employment, and the opportunity to build a better future. Her work is driven by a simple but powerful conviction: when you invest in people, you transform communities.\n\nBeyond her role at Elevate for Humanity, Elizabeth is a sought-after speaker, consultant, and advocate for workforce innovation and second-chance hiring. She has advised nonprofits, government agencies, and philanthropic organizations on best practices for serving justice-involved populations, building compliant training programs, and creating sustainable pathways to economic mobility.\n\nElizabeth holds expertise in federal workforce policy, apprenticeship development, nonprofit management, compliance and accreditation, trauma-informed care, and social entrepreneurship. Her ability to envision what a community needs—and then build it with precision, integrity, and compassion—has made her a respected leader in workforce development and social impact.\n\nHer impact is measured not just in credentials earned or jobs secured, but in lives transformed, families stabilized, and communities strengthened. Elizabeth Greene is proof that one person with vision, determination, and heart can change the trajectory of hundreds of lives—and she's just getting started.",
    email: 'elizabeth@elevateforhumanity.institute',
    linkedin: 'https://www.linkedin.com/in/elizabethgreene',
  },
  {
    name: 'Leslie Wafford',
    title: 'Director of Community Services',
    image: '/images/leslie-wafford.jpg', // Correct path
    bio: 'Leslie Wafford is deeply committed to building stable, empowered communities by promoting low-barrier housing access and strong eviction-prevention practices. Throughout her career, she has worked closely with diverse neighborhoods to remove barriers, support families, and create environments where residents can remain safely housed.\n\nLeslie believes in the power of education and advocacy. She is dedicated to helping individuals understand their rights and responsibilities as renters, giving them the tools they need to navigate housing challenges with confidence. Guided by her personal philosophy of "reach one, teach one," Leslie approaches her work with compassion, fairness, and a genuine desire to uplift the people and communities she serves.\n\nHer passion, experience, and community-first leadership make her a powerful asset within Elevate for Humanity\'s mission to support, educate, and strengthen individuals and families across Indiana.',
    email: 'leslie@elevateforhumanity.institute',
  },
  {
    name: 'Dr. Carlina Annette Wilkes',
    title:
      'Executive Director of Financial Operations & Organizational Compliance',
    image: '/images/carlina-wilkes.jpg', // Correct path
    bio: 'Dr. Carlina Annette Wilkes is a highly accomplished executive and retired federal professional with more than 24 years of distinguished service within the Defense Finance and Accounting Service (DFAS). Throughout her federal career, she advanced through multiple leadership and operational roles, earning recognition for her excellence in financial management, organizational compliance, workforce development, and strategic program oversight.\n\nDr. Wilkes holds the Department of Defense Financial Management Certification, Level II, demonstrating mastery in federal financial operations, accountability, and mission-aligned decision-making.\n\nHer educational background reflects a deep commitment to leadership and lifelong learning. She holds a Doctorate in Minisstart, a Master of Arts in Minisstart, and a Bachelor of Applied Management, supported by specialized credentials in Accounting and Paralegal Studies. This diverse expertise allows her to navigate complex organizational systems, lead and develop teams, design effective operational frameworks, and improve efficiency across government, nonprofit, and community-serving environments.\n\nDr. Wilkes is known for her integrity, strategic insight, and results-driven leadership. She brings a powerful blend of federal experience, organizational acumen, and executive-level training to every role she undertakes. At Elevate for Humanity, she serves as a trusted leader and advisor, helping strengthen financial operations, compliance, and long-term institutional stability.',
    email: 'carlina@elevateforhumanity.institute',
  },
  {
    name: 'Alina Smith, PMHNP',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/team/alina-smith.jpg',
    bio: "Alina Smith is a compassionate, board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP) dedicated to promoting emotional wellness and holistic healing across all stages of life. A graduate of Purdue University, she holds a Master's in Nursing with a concentration in mental health across the lifespan.\n\nAlina provides comprehensive psychiatric care for individuals aged five and older, offering evidence-based mental health assessments, behavioral health interventions, and medication management for a wide range of mental health and substance use disorders. Her clinical approach combines psychopharmacology and therapeutic support, helping clients achieve balance, stability, and emotional growth.\n\nAt Elevate for Humanity, Alina plays a key role in integrating mental health awareness and wellness strategies into workforce and community programs. She believes that access to compassionate, judgment-free mental health care is the foundation of empowerment, self-sufficiency, and lasting transformation.",
    email: 'alina@elevateforhumanity.institute',
  },
  {
    name: 'Sharon Douglass',
    title: 'Respiratory Therapy & Health Informatics Specialist',
    image: '/images/team/sharon-douglass.jpg',
    bio: "Sharon Douglass is a highly skilled healthcare professional with over 30 years of dedicated experience as a Respiratory Therapist, complemented by a Master of Science degree in Health Informatics. She is deeply committed to improving patient safety, enhancing care quality, and supporting clinical teams through expert-level respiratory care and advanced healthcare data systems.\n\nThroughout her career, Sharon has worked at the intersection of patient care, medical technology, operations management, and clinical informatics. She has supported hospitals, long-term care facilities, and healthcare organizations by implementing evidence-based respiratory practices, improving patient outcomes, and streamlining clinical workflows to increase efficiency and reduce care variations.\n\nSharon's extensive clinical expertise includes respiratory therapy treatments and emergency response, ventilator management (invasive & noninvasive), bronchopulmonary hygiene techniques, oxygen therapy and airway management, interpreting EKGs, ABGs, vital signs, and diagnostic results, mechanical ventilator setup and monitoring, suctioning and airway clearance procedures, patient education and disease management, and managing respiratory equipment safety, testing, and maintenance.\n\nShe has also served as an Area Supervisor, overseeing staff performance, compliance with patient safety standards, and preventive maintenance for diagnostic equipment such as bronchoscopes and respiratory devices.\n\nAt Elevate for Humanity, Sharon brings her decades of clinical experience and informatics expertise to support healthcare training, workforce readiness, and patient-centered educational programs. Her passion lies in helping individuals and healthcare organizations improve safety, streamline processes, and deliver high-quality care.\n\nKnown for her professionalism, clinical precision, and commitment to excellence, Sharon Douglass is a trusted leader and educator dedicated to elevating patient outcomes and supporting the next generation of healthcare professionals.",
    email: 'sharon@elevateforhumanity.institute',
  },
];

export default function TeamPage() {
  return (
    <div className="bg-white">
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
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl   ">
                    {member.image ? (
                      <Image
                        priority
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-8xl font-bold">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      </div>
                    )}
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
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-2xl md:text-3xl lg:text-4xl">
                    {member.name}
                  </h2>
                  <p className="text-base md:text-lg text-brand-blue-600 font-semibold mb-6">
                    {member.title}
                  </p>
                  <div className="prose prose-lg max-w-none">
                    {member.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-2xl md:text-3xl lg:text-4xl">
            Join Our Team
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
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
