import React from 'react';
import Link from 'next/link';
import { AlertCircle, Lock, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * STATE-AWARE DASHBOARD COMPONENT
 *
 * This component enforces progression and makes dashboards act like staff.
 *
 * Rules:
 * - ONE dominant action (cannot be missed)
 * - Locked sections (greyed out, not clickable)
 * - Progress banner (you are here)
 * - Alerts surfaced prominently
 */

interface DominantAction {
  label: string;
  href: string;
  description: string;
}

interface LockedSection {
  id: string;
  label: string;
  reason: string;
}

interface Alert {
  type: 'error' | 'warning' | 'info';
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

interface StateAwareDashboardProps {
  dominantAction: DominantAction;
  availableSections: string[];
  lockedSections: LockedSection[];
  progressPercentage?: number;
  alerts: Alert[];
  children?: React.ReactNode;
}

export function StateAwareDashboard({
  dominantAction,
  availableSections,
  lockedSections,
  progressPercentage,
  alerts,
  children,
}: StateAwareDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* DOMINANT ACTION BANNER - Cannot Be Missed */}
      <section className="bg-zinc-900   text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-semibold text-blue-100 mb-1">
                NEXT STEP
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {dominantAction.label}
              </h2>
              <p className="text-blue-100 text-lg">
                {dominantAction.description}
              </p>
            </div>
            <Link
              href={dominantAction.href}
              className="flex-shrink-0 ml-6 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition shadow-xl flex items-center gap-2"
            >
              <span>{dominantAction.label}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Progress Bar */}
          {progressPercentage !== undefined && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                <span>Your Progress</span>
                <span className="font-bold">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-blue-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ALERTS - Surfaced Prominently */}
      {alerts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 flex items-start gap-4 ${
                  alert.type === 'error'
                    ? 'bg-red-50 border-2 border-red-600'
                    : alert.type === 'warning'
                      ? 'bg-yellow-50 border-2 border-yellow-600'
                      : 'bg-blue-50 border-2 border-blue-600'
                }`}
              >
                <AlertCircle
                  className={`h-6 w-6 flex-shrink-0 mt-0.5 ${
                    alert.type === 'error'
                      ? 'text-red-600'
                      : alert.type === 'warning'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                  }`}
                />
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      alert.type === 'error'
                        ? 'text-red-900'
                        : alert.type === 'warning'
                          ? 'text-yellow-900'
                          : 'text-blue-900'
                    }`}
                  >
                    {alert.message}
                  </p>
                </div>
                {alert.actionLabel && alert.actionHref && (
                  <Link
                    href={alert.actionHref}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold transition ${
                      alert.type === 'error'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : alert.type === 'warning'
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {alert.actionLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-8">{children}</section>

      {/* LOCKED SECTIONS - Visible But Not Accessible */}
      {lockedSections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Locked Until Prerequisites Complete
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedSections.map((section) => (
              <div
                key={section.id}
                className="bg-slate-100 border-2 border-slate-300 rounded-lg p-6 opacity-60 cursor-not-allowed"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Lock className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <h4 className="font-bold text-slate-700">{section.label}</h4>
                </div>
                <p className="text-sm text-slate-600">{section.reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * SECTION CARD - For Available Sections
 */
interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

export function SectionCard({
  title,
  description,
  href,
  icon,
  badge,
}: SectionCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
            {title}
          </h4>
        </div>
        {badge && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-slate-600 text-sm mb-4">{description}</p>
      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
        <span>View</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

/**
 * PROGRESS INDICATOR - Shows Where User Is
 */
interface ProgressIndicatorProps {
  steps: Array<{
    label: string;
    status: 'completed' | 'current' | 'locked';
  }>;
}

export function ProgressIndicator({ steps }: ProgressIndicatorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Your Journey</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                step.status === 'completed'
                  ? 'bg-green-600 text-white'
                  : step.status === 'current'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircle className="h-6 w-6" />
              ) : step.status === 'locked' ? (
                <Lock className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <div className="flex-1">
              <div
                className={`font-semibold ${
                  step.status === 'completed'
                    ? 'text-green-900'
                    : step.status === 'current'
                      ? 'text-blue-900'
                      : 'text-slate-500'
                }`}
              >
                {step.label}
              </div>
              {step.status === 'current' && (
                <div className="text-sm text-blue-600 font-semibold">
                  Current Step
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
