import { CheckCircle } from 'lucide-react';

interface WhoThisIsForSectionProps {
  items: string[];
  title?: string;
}

export function WhoThisIsForSection({
  items,
  title = 'Who This Program Is For',
}: WhoThisIsForSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl font-bold text-black mb-6">{title}</h2>
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
