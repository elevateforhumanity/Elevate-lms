import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Credential Revocation Policy | Elevate for Humanity' };
export default function RevocationPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Credential Revocation Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Grounds for Revocation</h2>
      <ul><li>Fraud or misrepresentation</li><li>Academic dishonesty discovered post-graduation</li><li>Violation of professional standards</li></ul>
      <h2>Process</h2>
      <ol><li>Investigation of allegations</li><li>Notice to credential holder</li><li>Opportunity to respond</li><li>Final decision</li></ol>
      <p>Contact: registrar@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
