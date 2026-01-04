import Link from "next/link";
import pricing from "@/config/pricing.json";

type Tier = {
  key: string;
  label: string;
  price: number;
  summary: string;
  highlights: string[];
  cta: { label: string; href: string };
  badge?: string;
  accent?: boolean;
  perLearnerAt?: number;
};

type AddOn = {
  key: string;
  label: string;
  price: number;
  summary: string;
  details?: string[];
};

type AppPricing = {
  key: string;
  label: string;
  basePrice: number;
  summary: string;
  exampleLearners?: number;
  highlights?: string[];
};

function format(currency: string, amount: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  } catch {
    return `$${amount.toLocaleString()}`;
  }
}

function perLearnerLabel(currency: string, total: number, learners?: number) {
  if (!learners || learners <= 0) return null;
  const per = total / learners;
  return `≈ ${format(currency, per)} per learner at ${learners.toLocaleString()} learners (year one)`;
}

export default function PricingTable() {
  const currency = (pricing as string).currency || "USD";
  const tiers: Tier[] = (pricing as string).tiers || [];
  const addOns: AddOn[] = (pricing as string).addOns || [];
  const notes: string[] = (pricing as string).notes || [];
  const apps: AppPricing[] = (pricing as string).apps || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Pricing Models</h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-700">
        Choose a license that fits your organization, or price out individual apps if you&apos;re
        piloting a smaller slice of the ecosystem.
      </p>

      {/* License tiers */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <article
            key={t.key}
            className={`flex h-full flex-col rounded-2xl p-6 ring-1 ring-slate-200 shadow-sm ${
              t.accent ? "bg-white ring-2 ring-orange-400" : "bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{t.label}</h3>
              {t.badge ? (
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
                  {t.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{format(currency, t.price)}</p>
            {t.perLearnerAt ? (
              <p className="mt-1 text-xs text-slate-500">
                {perLearnerLabel(currency, t.price, t.perLearnerAt)}
              </p>
            ) : null}
            <p className="mt-2 text-sm text-slate-700">{t.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-600">
              {t.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href={t.cta.href}
                className={`inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition ${
                  t.accent
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {t.cta.label}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* App-level pricing */}
      {apps.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900">App-Level Pricing (if purchased separately)</h3>
          <p className="mt-1 max-w-3xl text-sm text-slate-700">
            Most partners license the full platform, but you can also price individual apps—for
            example, starting with just the Learner app, Provider app, or Workforce Board dashboard.
            Per-learner numbers below are simple illustrations based on the sample learner counts.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            {apps.map((app) => {
              const perLabel = perLearnerLabel(currency, app.basePrice, app.exampleLearners);
              return (
                <article
                  key={app.key}
                  className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm"
                >
                  <h4 className="text-base font-semibold text-slate-900">{app.label}</h4>
                  <p className="mt-1 text-sm text-slate-700">{app.summary}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {format(currency, app.basePrice)}
                  </p>
                  {perLabel && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {perLabel}
                    </p>
                  )}
                  {app.highlights && app.highlights.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
                      {app.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3">
                    <Link
                      href={`/contact?topic=app-pricing&app=${encodeURIComponent(app.key)}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      Talk about {app.label.toLowerCase()}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {addOns.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900">Optional Add-Ons</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {addOns.map((a) => (
              <div key={a.key} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-slate-900">{a.label}</p>
                  <p className="text-sm font-bold text-slate-900">{format(currency, a.price)}</p>
                </div>
                <p className="mt-1 text-sm text-slate-700">{a.summary}</p>
                {a.details && a.details.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
                    {a.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="mt-8 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
