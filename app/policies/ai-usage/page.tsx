import { Metadata } from 'next';
export const metadata: Metadata = { title: 'AI Usage Policy | Elevate for Humanity' };
export default function AIUsagePage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>AI Usage Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>AI Tutor</h2>
      <p>Our AI tutor provides educational support. Use responsibly and verify information.</p>
      <h2>Acceptable Use</h2>
      <ul><li>Learning assistance</li><li>Study support</li><li>Concept clarification</li></ul>
      <h2>Prohibited Use</h2>
      <ul><li>Cheating on assessments</li><li>Generating assignment submissions</li><li>Harassment or abuse</li></ul>
      <p>Contact: ai@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
