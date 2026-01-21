import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ArrowRight, Mail, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    'Meet the dedicated professionals leading Elevate For Humanity\'s mission to transform lives through education and career training.',
};

const teamMembers = [
  {
    name: 'Elizabeth Greene',
    title: 'Founder & Chief Executive Officer',
    image: '/images/team/elizabeth-greene.jpg',
    bio: "Elizabeth Greene is a transformational leader, workforce development pioneer, and social entrepreneur who has dedicated her career to creating pathways out of poverty and into prosperity. As Founder and Chief Executive Officer of Elevate for Humanity Technical & Career Institute, she has built one of Indiana's most innovative and compliant workforce development organizations—serving justice-involved individuals, low-income families, and barrier-facing populations with dignity, excellence, and measurable results.\n\nUnder Elizabeth's visionary leadership, Elevate for Humanity has achieved unprecedented recognition and approval from federal, state, and local agencies. The organization is a U.S. Department of Labor (DOL) Registered Apprenticeship Sponsor, approved by the Indiana Department of Workforce Development (DWD) as an INTraining provider, and recognized by the Indiana Department of Education (DOE). All programs are eligible for WIOA, Workforce Ready Grant (WRG), and Justice Reinvestment Initiative (JRI) funding—making training 100% free for qualified students.\n\nElizabeth's accomplishments extend far beyond credentials. She has created a fully integrated ecosystem that combines workforce training, apprenticeship programs, case management, mental health support, housing assistance, and employer partnerships—all designed to address the root causes of poverty and recidivism.",
    email: 'elizabeth@elevateforhumanity.org',
    linkedin: 'https://www.linkedin.com/in/elizabethgreene',
    focusAreas: [
      'Workforce development program design',
      'Government contracting & compliance',
      'Strategic partnerships',
      'Community-centered systems design',
    ],
  },
  {
    name: 'Johanna George',
    title: 'Director of Operations',
    image: '/images/jozanna-george.jpg',
    bio: "Johanna George serves as the Director of Operations at Elevate for Humanity, where she oversees the day-to-day functions that keep the organization running smoothly and efficiently. With a strong background in organizational management and a passion for community service, Johanna ensures that all programs, staff, and resources are aligned to support the mission of transforming lives through education and career training.\n\nJohanna brings extensive experience in operations management, process improvement, and team coordination. She excels at creating systems that enhance productivity while maintaining the human-centered approach that defines Elevate for Humanity's work. Her attention to detail and commitment to excellence help ensure that students, staff, and partners receive the support they need to succeed.\n\nAs a key member of the leadership team, Johanna works closely with department heads to streamline workflows, manage resources effectively, and implement best practices across the organization. Her dedication to operational excellence directly supports Elevate for Humanity's ability to serve more students and expand its impact throughout Indiana.",
    email: 'johanna@elevateforhumanity.org',
    focusAreas: [
      'Operations management',
      'Process improvement',
      'Team coordination',
      'Resource allocation',
    ],
  },
  {
    name: 'Delores Reynolds',
    title: 'Student Success Coordinator',
    image: '/images/delores-reynolds.jpg',
    bio: "Delores Reynolds serves as the Student Success Coordinator at Elevate for Humanity, where she plays a vital role in ensuring that every student has the support, resources, and guidance they need to complete their training and achieve their career goals. With a deep commitment to student advocacy and a warm, encouraging approach, Delores helps students navigate challenges and stay on track throughout their educational journey.\n\nDelores brings years of experience in student services, case management, and community outreach. She understands the unique barriers that many students face—including transportation, childcare, housing instability, and personal challenges—and works tirelessly to connect them with the resources and support systems that can help them succeed.\n\nAt Elevate for Humanity, Delores serves as a trusted point of contact for students, providing encouragement, accountability, and practical assistance. She monitors student progress, coordinates with instructors and support staff, and celebrates every milestone along the way. Her genuine care for each student's success makes her an invaluable member of the team.",
    email: 'delores@elevateforhumanity.org',
    focusAreas: [
      'Student advocacy',
      'Case management',
      'Retention support',
      'Resource coordination',
    ],
  },
  {
    name: 'Leslie Wafford',
    title: 'Director of Community Services',
    image: '/images/leslie-wafford.jpg',
    bio: 'Leslie Wafford is deeply committed to building stable, empowered communities by promoting low-barrier housing access and strong eviction-prevention practices. Throughout her career, she has worked closely with diverse neighborhoods to remove barriers, support families, and create environments where residents can remain safely housed.\n\nLeslie believes in the power of education and advocacy. She is dedicated to helping individuals understand their rights and responsibilities as renters, giving them the tools they need to navigate housing challenges with confidence. Guided by her personal philosophy of "reach one, teach one," Leslie approaches her work with compassion, fairness, and a genuine desire to uplift the people and communities she serves.\n\nHer passion, experience, and community-first leadership make her a powerful asset within Elevate for Humanity\'s mission to support, educate, and strengthen individuals and families across Indiana.',
    email: 'leslie@elevateforhumanity.org',
    focusAreas: [
      'Housing access & eviction prevention',
      'Community advocacy',
      'Tenant rights education',
      'Family support services',
    ],
  },
  {
    name: 'Dr. Carlina Annette Wilkes',
    title: 'Executive Director of Financial Operations & Organizational Compliance',
    image: '/images/carlina-wilkes.jpg',
    bio: 'Dr. Carlina Annette Wilkes is a highly accomplished executive and retired federal professional with more than 24 years of distinguished service within the Defense Finance and Accounting Service (DFAS). Throughout her federal career, she advanced through multiple leadership and operational roles, earning recognition for her excellence in financial management, organizational compliance, workforce development, and strategic program oversight.\n\nDr. Wilkes holds the Department of Defense Financial Management Certification, Level II, demonstrating mastery in federal financial operations, accountability, and mission-aligned decision-making.\n\nHer educational background reflects a deep commitment to leadership and lifelong learning. She holds a Doctorate in Ministry, a Master of Arts in Ministry, and a Bachelor of Applied Management, supported by specialized credentials in Accounting and Paralegal Studies. This diverse expertise allows her to navigate complex organizational systems, lead and develop teams, design effective operational frameworks, and improve efficiency across government, nonprofit, and community-serving environments.',
    email: 'carlina@elevateforhumanity.org',
    focusAreas: [
      'Federal financial management',
      'Organizational compliance',
      'Strategic program oversight',
      'Workforce development',
    ],
  },
  {
    name: 'Alina Smith, PMHNP',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/alina-smith.jpg',
    bio: "Alina Smith is a compassionate, board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP) dedicated to promoting emotional wellness and holistic healing across all stages of life. A graduate of Purdue University, she holds a Master's in Nursing with a concentration in mental health across the lifespan.\n\nAlina provides comprehensive psychiatric care for individuals aged five and older, offering evidence-based mental health assessments, behavioral health interventions, and medication management for a wide range of mental health and substance use disorders. Her clinical approach combines psychopharmacology and therapeutic support, helping clients achieve balance, stability, and emotional growth.\n\nAt Elevate for Humanity, Alina plays a key role in integrating mental health awareness and wellness strategies into workforce and community programs. She believes that access to compassionate, judgment-free mental health care is the foundation of empowerment, self-sufficiency, and lasting transformation.",
    email: 'alina@elevateforhumanity.org',
    focusAreas: [
      'Psychiatric assessments',
      'Medication management',
      'Behavioral health interventions',
      'Mental health integration',
    ],
  },
  {
    name: 'Sharon Douglass',
    title: 'Respiratory Therapy & Health Informatics Specialist',
    image: '/images/sharon-douglas.jpg',
    bio: "Sharon Douglass is a highly skilled healthcare professional with over 30 years of dedicated experience as a Respiratory Therapist, complemented by a Master of Science degree in Health Informatics. She is deeply committed to improving patient safety, enhancing care quality, and supporting clinical teams through expert-level respiratory care and advanced healthcare data systems.\n\nThroughout her career, Sharon has worked at the intersection of patient care, medical technology, operations management, and clinical informatics. She has supported hospitals, long-term care facilities, and healthcare organizations by implementing evidence-based respiratory practices, improving patient outcomes, and streamlining clinical workflows to increase efficiency and reduce care variations.\n\nAt Elevate for Humanity, Sharon brings her decades of clinical experience and informatics expertise to support healthcare training, workforce readiness, and patient-centered educational programs. Her passion lies in helping individuals and healthcare organizations improve safety, streamline processes, and deliver high-quality care.",
    email: 'sharon@elevateforhumanity.org',
    focusAreas: [
      'Respiratory therapy',
      'Health informatics',
      'Clinical workflow optimization',
      'Healthcare training',
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden bg-brand-blue-700">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Dedicated professionals committed to transforming lives through
            education, opportunity, and community empowerment.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-start`}
              >
                {/* Photo */}
                <div className="lg:w-1/3 w-full">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index < 2}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-blue-600 flex items-center justify-center">
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
                      className="flex items-center gap-2 text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>

                  {/* Focus Areas */}
                  {member.focusAreas && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-black mb-3">Areas of Focus:</h4>
                      <ul className="space-y-2">
                        {member.focusAreas.map((area) => (
                          <li key={area} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-black">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="lg:w-2/3">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                    {member.name}
                  </h2>
                  <p className="text-lg text-brand-blue-600 font-semibold mb-6">
                    {member.title}
                  </p>
                  <div className="prose prose-lg max-w-none">
                    {member.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-black leading-relaxed mb-4">
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

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work With Us</h2>
          <p className="text-xl text-blue-100 mb-8">
            Interested in partnering or joining our team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg text-lg font-bold hover:bg-blue-600 border-2 border-white transition-colors"
            >
              Contact Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
