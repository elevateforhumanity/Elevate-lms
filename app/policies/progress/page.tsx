import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Academic Progress Policy | Elevate for Humanity' };
export default function ProgressPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Academic Progress Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Requirements</h2>
      <ul><li>Maintain 2.0 GPA minimum</li><li>Complete 67% of attempted coursework</li><li>Finish program within maximum timeframe</li></ul>
      <h2>Academic Probation</h2>
      <p>Students below standards placed on probation. Must improve within one term or face dismissal.</p>
      <p>Contact: registrar@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
