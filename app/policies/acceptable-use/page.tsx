import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Acceptable Use Policy | Elevate for Humanity' };
export default function AcceptableUsePage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Acceptable Use Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Acceptable Use</h2>
      <ul><li>Educational purposes</li><li>Professional development</li><li>Authorized activities</li></ul>
      <h2>Prohibited Use</h2>
      <ul><li>Illegal activities</li><li>Unauthorized access</li><li>System disruption</li><li>Malicious software</li></ul>
      <p>Contact: security@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
