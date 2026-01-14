"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PATHWAYS, PathwayIndustry, PathwayFormat, PathwayFunding } from "@/lib/pathways/data";

const INDUSTRIES: (PathwayIndustry | "All")[] = ["All", "Healthcare", "Skilled Trades", "Technology", "Business"];
const FORMATS: (PathwayFormat | "All")[] = ["All", "Hybrid", "In-Person", "Online"];
const FUNDING: (PathwayFunding | "All")[] = ["All", "WIOA", "State Grant", "Employer Reimbursement", "Justice Impacted", "Self Pay"];

export default function PathwaysPage() {
  const [industry, setIndustry] = useState<(typeof INDUSTRIES)[number]>("All");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("All");
  const [funding, setFunding] = useState<(typeof FUNDING)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PATHWAYS.filter((p) => {
      const matchIndustry = industry === "All" ? true : p.industry === industry;
      const matchFormat = format === "All" ? true : p.format === format;
      const matchFunding = funding === "All" ? true : p.funding.includes(funding as PathwayFunding);
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.outcomes.join(" ").toLowerCase().includes(query) ||
        p.credential.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query);

      return matchIndustry && matchFormat && matchFunding && matchQuery;
    });
  }, [industry, format, funding, q]);

  return (
    <main className="w-full">
      <header className="relative min-h-[400px] flex items-center">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Workforce training pathways"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Workforce Pathways</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            Choose a pathway aligned to funding eligibility, credential outcomes, and employer demand. If you qualify,
            your training may be fully funded.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/apply" className="rounded-md bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200">
              Start an Application
            </Link>
            <Link href="/partners" className="rounded-md border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black">
              Employer / Agency Partners
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-4 md:grid-cols-4">
            <Filter label="Industry" value={industry} setValue={setIndustry} options={INDUSTRIES} />
            <Filter label="Format" value={format} setValue={setFormat} options={FORMATS} />
            <Filter label="Funding" value={funding} setValue={setFunding} options={FUNDING} />
            <div>
              <label className="block text-sm font-semibold text-gray-700">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by program, job outcome, location…"
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filtered.map((p) => (
              <div key={p.slug} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={`/media/pathways/${p.slug}.jpg`}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Tag>{p.industry}</Tag>
                    <Tag>{p.format}</Tag>
                    {p.funding.slice(0, 2).map((f) => (
                      <Tag key={f}>{f}</Tag>
                    ))}
                  </div>

                  <h2 className="mt-4 text-xl font-bold">{p.title}</h2>

                  <div className="mt-3 text-gray-700">
                    <div><span className="font-semibold">Duration:</span> {p.duration}</div>
                    <div><span className="font-semibold">Location:</span> {p.location}</div>
                    <div className="mt-2"><span className="font-semibold">Credential:</span> {p.credential}</div>
                    <div className="mt-2"><span className="font-semibold">Outcomes:</span> {p.outcomes.join(", ")}</div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`${p.ctaHref}?pathway=${encodeURIComponent(p.slug)}`} className="rounded-md bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700">
                      Apply / Check Eligibility
                    </Link>
                    <Link href={`/pathways/${p.slug}`} className="rounded-md border border-gray-300 px-5 py-2.5 font-semibold hover:bg-gray-50">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-md border border-gray-200 p-6 text-gray-700">
              No pathways match your filters. Reset filters or broaden your search.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Filter({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{children}</span>;
}
