import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PATHWAYS } from "@/lib/pathways/data";

export default async function PathwayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pathway = PATHWAYS.find((p) => p.slug === slug);
  if (!pathway) return notFound();

  return (
    <main className="w-full">
      <header className="relative min-h-[350px] flex items-center">
        <Image
          src={`/media/pathways/${pathway.slug}.jpg`}
          alt={pathway.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 text-white">
          <p className="text-white/80">
            <Link href="/pathways" className="underline hover:text-white">Workforce Pathways</Link> / {pathway.title}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">{pathway.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            Credential-backed training aligned to employer demand and funding pathways.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/apply?pathway=${encodeURIComponent(pathway.slug)}`} className="rounded-md bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200">
              Apply / Check Eligibility
            </Link>
            <Link href="/partners" className="rounded-md border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black">
              Employer Partner Interest
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-2">
          <div className="relative h-[320px] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            <Image
              src={`/media/pathways/${pathway.slug}.jpg`}
              alt={pathway.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="text-gray-800">
            <div className="text-sm text-gray-600">Industry</div>
            <div className="text-xl font-semibold">{pathway.industry}</div>

            <div className="mt-6 grid gap-4">
              <div><span className="font-semibold">Format:</span> {pathway.format}</div>
              <div><span className="font-semibold">Duration:</span> {pathway.duration}</div>
              <div><span className="font-semibold">Location:</span> {pathway.location}</div>
              <div><span className="font-semibold">Funding:</span> {pathway.funding.join(", ")}</div>
              <div><span className="font-semibold">Credential:</span> {pathway.credential}</div>
              <div><span className="font-semibold">Outcomes:</span> {pathway.outcomes.join(", ")}</div>
            </div>

            <div className="mt-8 rounded-md border border-gray-200 p-5 bg-gray-50">
              <div className="font-semibold">What happens next</div>
              <ol className="mt-3 list-decimal pl-5 text-gray-700">
                <li>Start your application (or partner intake).</li>
                <li>Complete eligibility screening and document upload if required.</li>
                <li>Get routed to the correct funding/workforce process.</li>
                <li>Begin training and move toward placement.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return PATHWAYS.map((p) => ({ slug: p.slug }));
}
