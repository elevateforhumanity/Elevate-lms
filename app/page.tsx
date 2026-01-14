import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full">

      {/* HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-6xl px-6 text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Workforce Infrastructure That Turns Public Funding Into Jobs
            </h1>

            <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200">
              Elevate for Humanity connects government funding, employer demand,
              and credential-backed training through a single workforce
              infrastructure system.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/pathways"
                className="rounded-md bg-white px-8 py-4 text-black font-semibold hover:bg-gray-200"
              >
                Explore Workforce Pathways
              </Link>

              <Link
                href="/partners"
                className="rounded-md border border-white px-8 py-4 font-semibold hover:bg-white hover:text-black"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Not a School. Not Just an LMS. Workforce Infrastructure.
          </h2>

          <p className="mt-6 text-lg text-gray-700">
            Elevate for Humanity operates the infrastructure behind modern
            workforce development—aligning funding, training delivery,
            credential partners, and employer pipelines into one coordinated
            system.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-3">
          <Feature
            title="Funded Pathways"
            text="We operationalize WIOA, state grants, justice-impacted funding,
            and employer reimbursement programs into real, completable pathways."
            img="/media/workforce-1.jpg"
          />

          <Feature
            title="Credentialed Training"
            text="Hybrid and in-person programs aligned with recognized
            credential partners and industry standards."
            img="/media/workforce-2.jpg"
          />

          <Feature
            title="Employer Alignment"
            text="Employers plug into ready-made pipelines with hiring incentives
            and job-ready candidates."
            img="/media/workforce-3.jpg"
          />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-3 text-center">
          <Audience
            title="Jobseekers"
            text="Access funded, credential-backed training that leads to real jobs."
          />
          <Audience
            title="Employers"
            text="Build reliable talent pipelines and reduce hiring risk."
          />
          <Audience
            title="Workforce & Government"
            text="Deploy funding through a compliant, auditable, scalable system."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Enter the Workforce Infrastructure
        </h2>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/apply"
            className="rounded-md bg-white px-8 py-4 text-black font-semibold"
          >
            Start a Workforce Pathway
          </Link>

          <Link
            href="/contact"
            className="rounded-md border border-white px-8 py-4 font-semibold"
          >
            Connect as a Partner
          </Link>
        </div>
      </section>

    </main>
  );
}

/* Components */

function Feature({ title, text, img }: { title: string; text: string; img: string }) {
  return (
    <div className="text-center">
      <Image
        src={img}
        alt={title}
        width={400}
        height={260}
        className="mx-auto rounded-lg object-cover"
      />
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-4 text-gray-700">{text}</p>
    </div>
  );
}

function Audience({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-4 text-gray-700">{text}</p>
    </div>
  );
}
