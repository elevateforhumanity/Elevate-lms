import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Credential Policy | Elevate for Humanity' };
export default function CredentialsPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Credential Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Issuance Requirements</h2>
      <ul><li>Complete all program requirements</li><li>Pass all assessments</li><li>Meet attendance standards</li><li>Clear financial obligations</li></ul>
      <h2>Certificate Types</h2>
      <ul><li>Program completion certificates</li><li>Industry certifications</li><li>Continuing education units</li></ul>
      <p>Contact: registrar@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
