'use client';

interface EnvironmentBadgeProps {
  label: string;
  color: string;
}

export default function EnvironmentBadge({ label, color }: EnvironmentBadgeProps) {
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${color}`}>
      {label}
    </span>
  );
}
