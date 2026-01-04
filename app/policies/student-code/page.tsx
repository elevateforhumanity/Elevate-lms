import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Student Code of Conduct | Elevate for Humanity' };
export default function StudentCodePage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Student Code of Conduct</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Expected Behavior</h2>
      <ul><li>Respect for others</li><li>Professional conduct</li><li>Honesty and integrity</li><li>Compliance with policies</li></ul>
      <h2>Prohibited Conduct</h2>
      <ul><li>Harassment or discrimination</li><li>Violence or threats</li><li>Substance abuse</li><li>Theft or vandalism</li></ul>
      <h2>Disciplinary Process</h2>
      <p>Violations investigated and may result in warning, probation, suspension, or dismissal.</p>
      <p>Contact: studentconduct@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
