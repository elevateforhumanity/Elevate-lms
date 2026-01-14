import Link from 'next/link';
import {
  Award,
  CheckCircle,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Phone,
  Mail,
  Download,
} from 'lucide-react';

export const metadata = {
  title: 'WorkOne Partner Packet | Elevate for Humanity',
  description:
    'Registered Apprenticeship Sponsor | ETPL | WIOA | WRG Eligible. Complete partner packet for WorkOne regions.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/workone-partner-packet',
  },
};

export default function WorkOnePartnerPacketPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-zinc-900   text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full">
              <span className="text-sm font-bold text-green-400">
                Registered Apprenticeship Sponsor
              </span>
            </div>
            <div className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full">
              <span className="text-sm font-bold text-blue-400">ETPL</span>
            </div>
            <div className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full">
              <span className="text-sm font-bold text-purple-400">
                WIOA | WRG Eligible
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            WorkOne Partner Packet
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Registered Apprenticeship Sponsor & Workforce Intermediary
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="font-bold mb-1">Organization Type</div>
              <div className="text-white/80">
                Registered Apprenticeship Sponsor & Workforce Intermediary
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="font-bold mb-1">Oversight</div>
              <div className="text-white/80">U.S. Department of Labor</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="font-bold mb-1">State Alignment</div>
              <div className="text-white/80">
                Indiana Department of Workforce Development
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Who We Are */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  1. Who We Are
                </h2>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-black leading-relaxed">
                We are a registered apprenticeship sponsor and ETPL-approved
                workforce intermediary that helps Indiana employers implement
                earn-and-learn apprenticeship programs aligned with WIOA and WRG
                funding.
              </p>
              <p className="text-black leading-relaxed">
                We are not a staffing agency and not a traditional school. We
                provide infrastructure, compliance, and training coordination so
                employers can hire, train, and retain talent with reduced cost
                and risk.
              </p>
            </div>
          </div>

          {/* 2. Programs Offered */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  2. Programs Offered
                </h2>
                <p className="text-sm text-black">
                  Currently active; additional trades available upon request
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-black mb-2">
                  Barber Apprenticeship
                </h3>
                <p className="text-sm text-black">
                  Indiana licensed pathway
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-black mb-2">
                  Skilled Trades
                </h3>
                <p className="text-sm text-black">
                  Expandable: HVAC, Construction, Facilities, etc.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-black">
                <strong className="text-black">
                  All listed programs are:
                </strong>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Registered apprenticeships
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  ETPL-approved (where applicable)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Eligible for WIOA and WRG funding through WorkOne regions
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Who We Serve */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  3. Who We Serve
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900   rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-black mb-4">Participants</h3>
                <ul className="space-y-2 text-sm text-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>WIOA-eligible individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>WRG-eligible individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Priority populations (justice-involved, SNAP, TANF,
                      veterans, etc.)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900   rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-black mb-4">Employers</h3>
                <ul className="space-y-2 text-sm text-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Licensed barber shops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Small and mid-sized employers seeking earn-and-learn
                      models
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Employers open to apprenticeships but needing
                      administrative support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. How the Model Works */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  4. How the Model Works (Simple)
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {[
                'Employer agrees to host an apprentice',
                'Apprentice is hired and paid by the employer',
                'Training is delivered through approved RTI providers',
                'We handle: Apprenticeship registration, Compliance and reporting, RTI coordination, Progress tracking',
                'WorkOne coordinates funding where the participant is eligible',
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200"
                >
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-black pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Funding Compatibility */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              5. Funding Compatibility
            </h2>
            <div className="bg-zinc-900   rounded-xl p-8 border border-green-200">
              <p className="text-black mb-4">
                Our programs are compatible with:
              </p>
              <ul className="space-y-2 text-black mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>WIOA Individual Training Accounts (ITA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Workforce Ready Grant (WRG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>On-the-Job Training (OJT) wage reimbursement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Supportive services (kits, tools, books, exams)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Work Opportunity Tax Credit (WOTC) for employers</span>
                </li>
              </ul>
              <p className="text-sm text-black italic">
                Funding decisions remain with the WorkOne region and case
                manager.
              </p>
            </div>
          </div>

          {/* 6. Employer Value */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              6. Employer Value (Why WorkOne Uses Us)
            </h2>
            <div className="bg-zinc-900   rounded-xl p-8 border border-blue-200">
              <p className="text-black mb-4">Employers benefit from:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Paid apprentices',
                  'Reduced training costs',
                  'Possible wage reimbursement',
                  'Possible tax credits',
                  'Full compliance support',
                  'One point of contact',
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-black">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-black mt-6 italic">
                This reduces employer hesitation and increases placement
                success.
              </p>
            </div>
          </div>

          {/* 7. Referral & Intake Flow */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              7. Referral & Intake Flow
            </h2>
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="text-center mb-6">
                <p className="text-lg font-bold text-black">
                  WorkOne → Participant → Employer → Sponsor
                </p>
              </div>
              <ol className="space-y-3 text-black">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>WorkOne identifies eligible participant</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Referral sent via intake form or direct contact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Employer onboarding completed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Apprentice registered in RAPIDS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">5.</span>
                  <span>Training and funding coordination begins</span>
                </li>
              </ol>
              <p className="text-sm text-black mt-6 font-bold">
                We respond to referrals within 1–2 business days.
              </p>
            </div>
          </div>

          {/* 8. Compliance & Reporting */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              8. Compliance & Reporting
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900   rounded-xl p-6 border border-purple-200">
                <h3 className="font-bold text-black mb-4">We maintain:</h3>
                <ul className="space-y-2 text-sm text-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>RAPIDS registrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Wage progression schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>RTI outlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Employer agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Apprentice progress tracking</span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900   rounded-xl p-6 border border-orange-200">
                <h3 className="font-bold text-black mb-4">
                  We close the loop with WorkOne on:
                </h3>
                <ul className="space-y-2 text-sm text-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Completions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Employment outcomes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 9. What We Ask From WorkOne */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              9. What We Ask From WorkOne
            </h2>
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Referral of eligible participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Coordination on funding eligibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Ongoing communication on participant status</span>
                </li>
              </ul>
              <p className="text-sm text-black mt-6 font-bold italic">
                We are built to reduce staff workload, not increase it.
              </p>
            </div>
          </div>

          {/* 10. Contact & Next Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              10. Contact & Next Steps
            </h2>
            <div className="bg-zinc-900   rounded-xl p-8 border border-slate-200">
              <p className="text-black mb-4">Available for:</p>
              <ul className="space-y-2 text-black mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Regional alignment meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Employer pilots</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Sector strategy participation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Expansion into additional trades</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+13173143757"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  <Phone className="w-5 h-5" />
                  (317) 314-3757
                </a>
                <a
                  href="mailto:elevate4humanityedu@gmail.com"
                  className="inline-flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* One-Line Summary */}
          <div className="bg-zinc-900   text-white rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              One-Line Summary for Advisors
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/30">
              <p className="text-xl md:text-2xl leading-relaxed text-center font-medium">
                "This is an ETPL-approved apprenticeship sponsor that helps
                employers hire and train workers using WIOA and WRG funding with
                full compliance support."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
