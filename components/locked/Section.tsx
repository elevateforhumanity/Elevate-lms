import { ReactNode } from 'react';

/**
 * LOCKED Section Component
 *
 * Enforces visual consistency across all pages
 * Only 2 variants allowed: white or alternate
 */

interface SectionProps {
  children: ReactNode;
  variant?: 'white' | 'alternate' | 'dark';
  hero?: boolean;
}

export function Section({
  children,
  variant = 'white',
  hero = false,
}: SectionProps) {
  const bgClass = {
    white: 'bg-white',
    alternate: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
  }[variant];

  const paddingClass = hero ? 'py-20' : 'py-16';

  return (
    <section className={`${paddingClass} ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4">{children}</div>
    </section>
  );
}

/**
 * LOCKED Section Title
 *
 * Enforces consistent section headers
 */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
      {children}
    </h2>
  );
}

/**
 * LOCKED Section Description
 *
 * Enforces consistent section descriptions
 */
export function SectionDescription({ children }: { children: ReactNode }) {
  return (
    <p className="text-base text-slate-600 mb-12 text-center max-w-2xl mx-auto">
      {children}
    </p>
  );
}
