import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Credential Verification Policy | Elevate for Humanity' };
export default function VerificationPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Credential Verification Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Verification Process</h2>
      <p>Employers and institutions may verify credentials by contacting our registrar with certificate number.</p>
      <h2>Information Provided</h2>
      <ul><li>Student name</li><li>Program completed</li><li>Completion date</li><li>Certificate number</li></ul>
      <p>Contact: registrar@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
