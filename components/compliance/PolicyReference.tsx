import Link from 'next/link';
import { Info } from 'lucide-react';

interface PolicyReferenceProps {
  policyName: string;
  policyUrl: string;
  description?: string;
  variant?: 'inline' | 'banner' | 'notice';
  className?: string;
}

export function PolicyReference({
  policyName,
  policyUrl,
  description,
  variant = 'inline',
  className = '',
}: PolicyReferenceProps) {
  if (variant === 'banner') {
    return (
      <div
        className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              {description || `This feature is governed by our ${policyName}.`}{' '}
              <Link
                href={policyUrl}
                className="font-medium underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read {policyName}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'notice') {
    return (
      <div
        className={`bg-gray-50 border border-gray-200 rounded p-3 ${className}`}
      >
        <p className="text-xs text-gray-700">
          {description || `Subject to our ${policyName}.`}{' '}
          <Link
            href={policyUrl}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </Link>
        </p>
      </div>
    );
  }

  return (
    <span className={`text-sm text-gray-600 ${className}`}>
      {description || `See our `}
      <Link
        href={policyUrl}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {policyName}
      </Link>
    </span>
  );
}
