import Link from "next/link";
import { Metadata } from 'next';
import Image from "next/image";
import { Building, GraduationCap, Briefcase, Shield, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partners | Elevate for Humanity',
  description: 'Our partners in workforce development including EmployIndy, WorkOne, Certiport, Milady, NRF, and more.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/partners' },
};

const governmentPartners = [
  {
    name: 'EmployIndy',
    description: 'Marion County workforce development board providing WIOA funding and career services.',
    type: 'Workforce Board',
  },
  {
    name: 'WorkOne Centers',
    description: 'Indiana\'s one-stop career centers providing employment services and training referrals.',
    type: 'Career Services',
  },
  {
    name: 'Indiana Department of Workforce Development (DWD)',
    description: 'State agency overseeing workforce programs, INTraining, and Workforce Ready Grant.',
    type: 'State Agency',
  },
  {
    name: 'Indiana Department of Education (DOE)',
    description: 'State education agency providing program recognition and oversight.',
    type: 'State Agency',
  },
  {
    name: 'Marion County Community Corrections',
    description: 'Partner for justice-involved individuals seeking career training and employment.',
    type: 'Corrections',
  },
  {
    name: 'Justice Reinvestment Initiative (JRI)',
    description: 'Funding partner for reentry and second-chance employment programs.',
    type: 'Funding Partner',
  },
];

const credentialPartners = [
  {
    name: 'Certiport',
    description: 'Authorized Testing Center for Microsoft Office Specialist, IC3 Digital Literacy, and Adobe certifications.',
    type: 'Certification Provider',
  },
  {
    name: 'Milady',
    description: 'Industry-standard curriculum and certification for cosmetology and beauty professionals.',
    type: 'Curriculum Partner',
  },
  {
    name: 'National Retail Federation (NRF)',
    description: 'Customer service and retail industry certifications.',
    type: 'Certification Provider',
  },
  {
    name: 'CareerSafe',
    description: 'OSHA safety training and certification programs.',
    type: 'Safety Training',
  },
  {
    name: 'Health & Safety Institute (HSI)',
    description: 'CPR, First Aid, and healthcare safety certifications.',
    type: 'Healthcare Training',
  },
];

const industryPartners = [
  {
    name: 'Healthcare Employers',
    description: 'Clinical training sites and hiring partners for CNA, Medical Assistant, and healthcare programs.',
    type: 'Employer Network',
  },
  {
    name: 'Skilled Trades Employers',
    description: 'Apprenticeship sponsors and hiring partners for HVAC, electrical, and construction trades.',
    type: 'Employer Network',
  },
  {
    name: 'Beauty & Cosmetology Salons',
    description: 'Apprenticeship sites and employment partners for barber and cosmetology graduates.',
    type: 'Employer Network',
  },
];

export default function PartnersPage() {
  return (
    <main className="w-full">
      <header className="relative min-h-[400px] flex items-center">
        <Image
          src="/images/heroes/partner-hero.jpg"
          alt="Partner with Elevate for Humanity"
          fill
          className="object-cover"
          priority
        />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Partner With Elevate for Humanity</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            Plug into workforce infrastructure that reduces hiring risk, improves training completion, and supports
            funding and reimbursement pathways.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-md bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200">
              Partner Intake
            </Link>
            <Link href="/pathways" className="rounded-md border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black">
              View Workforce Pathways
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-2">
          <div className="relative h-[340px] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            <Image
              src="/images/heroes/partner-hero.jpg"
              alt="Employer and workforce partners"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="text-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold">Two partner tracks. One system.</h2>
            <p className="mt-4 text-gray-700">
              We support both employer partners and workforce/government partners with a single operating model:
              aligned pathways, auditable processes, and measurable outcomes.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-md border border-gray-200 p-5">
                <div className="text-xl font-semibold">Employer Partners</div>
                <ul className="mt-3 list-disc pl-5 text-gray-700">
                  <li>Pre-aligned training pathways matched to your roles</li>
                  <li>Reduced time-to-hire with job-ready candidates</li>
                  <li>Support for reimbursement pathways (where applicable)</li>
                  <li>Structured onboarding and retention support</li>
                </ul>
                <div className="mt-5">
                  <Link href="/contact?type=employer" className="rounded-md bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700">
                    Employer Intake
                  </Link>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 p-5">
                <div className="text-xl font-semibold">Workforce & Government Partners</div>
                <ul className="mt-3 list-disc pl-5 text-gray-700">
                  <li>Compliant, auditable pathway operations</li>
                  <li>Scalable delivery model across regions and cohorts</li>
                  <li>Outcome tracking (enrollment → completion → placement)</li>
                  <li>Alignment with employer demand and credential standards</li>
                </ul>
                <div className="mt-5">
                  <Link href="/contact?type=agency" className="rounded-md border border-gray-300 px-5 py-2.5 font-semibold hover:bg-gray-50">
                    Agency Intake
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center">What partners get</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Benefit title="Structured Intake" text="Clear partner onboarding, expectations, and workflow alignment." />
            <Benefit title="Program Alignment" text="Pathways designed around real hiring demand and credential outcomes." />
            <Benefit title="Operational Visibility" text="Partners can see progress through the pipeline and reduce surprises." />
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="rounded-md bg-blue-600 px-7 py-3 text-white font-semibold hover:bg-blue-700">
              Start Partner Intake
            </Link>
          </div>
        </div>
      </section>

      {/* Government & Workforce Partners */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Government & Workforce Partners</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {governmentPartners.map((partner) => (
              <div key={partner.name} className="rounded-lg border-2 border-gray-200 bg-white p-6 hover:border-blue-500 transition-colors">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                  {partner.type}
                </span>
                <h3 className="text-lg font-bold text-black mb-2">{partner.name}</h3>
                <p className="text-sm text-black">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credential & Certification Partners */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Credential & Certification Partners</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {credentialPartners.map((partner) => (
              <div key={partner.name} className="rounded-lg border-2 border-gray-200 bg-white p-6 hover:border-green-500 transition-colors">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
                  {partner.type}
                </span>
                <h3 className="text-lg font-bold text-black mb-2">{partner.name}</h3>
                <p className="text-sm text-black">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry & Employer Partners */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Industry & Employer Partners</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {industryPartners.map((partner) => (
              <div key={partner.name} className="rounded-lg border-2 border-gray-200 bg-white p-6 hover:border-orange-500 transition-colors">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full mb-3">
                  {partner.type}
                </span>
                <h3 className="text-lg font-bold text-black mb-2">{partner.name}</h3>
                <p className="text-sm text-black">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="bg-brand-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Partner</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our network of employers, training providers, and workforce organizations 
            committed to creating pathways to sustainable careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact?type=employer" 
              className="rounded-md bg-white px-8 py-4 text-blue-700 font-bold hover:bg-gray-100"
            >
              Employer Partnership
            </Link>
            <Link 
              href="/contact?type=agency" 
              className="rounded-md border-2 border-white px-8 py-4 font-bold hover:bg-white hover:text-blue-700"
            >
              Agency Partnership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Benefit({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="text-xl font-semibold">{title}</div>
      <p className="mt-3 text-gray-700">{text}</p>
    </div>
  );
}
