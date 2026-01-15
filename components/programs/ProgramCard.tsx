import Link from "next/link";
import Image from "next/image";
import type { Program } from "@/lib/programs/programs.data";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50">
        <Image
          src={program.cardImage || program.heroImage || "/images/programs/default.jpg"}
          alt={program.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4 text-lg font-black text-zinc-900">{program.title}</div>
      <div className="mt-2 text-sm text-zinc-700">{program.tagline}</div>

      <div className="mt-3 text-xs text-zinc-600 flex flex-wrap gap-2">
        {program.duration ? <span className="rounded-full border px-3 py-2">{program.duration}</span> : null}
        {program.format ? <span className="rounded-full border px-3 py-2">{program.format}</span> : null}
        {program.level ? <span className="rounded-full border px-3 py-2">{program.level}</span> : null}
      </div>

      <div className="mt-4 font-extrabold text-zinc-900">View program →</div>
    </Link>
  );
}
