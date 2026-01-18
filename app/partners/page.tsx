import Link from "next/link";
import { Metadata } from 'next';
import Image from "next/image";


export const metadata: Metadata = {
  title: 'Partner With Elevate for Humanity',
  alternates: { canonical: 'https://www.elevateforhumanity.org/partners' },
};

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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
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
