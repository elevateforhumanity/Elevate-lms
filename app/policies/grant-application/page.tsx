import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Grant Application Policy | Elevate for Humanity' };
export default function GrantApplicationPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Grant Application Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Process</h2>
      <ol><li>Review grant opportunities</li><li>Assess eligibility</li><li>Prepare application materials</li><li>Submit by deadline</li></ol>
      <h2>Requirements</h2>
      <ul><li>Complete application</li><li>Supporting documentation</li><li>Budget justification</li><li>Compliance certifications</li></ul>
      <p>Contact: grants@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
