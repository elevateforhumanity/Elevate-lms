import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy Notice | Elevate for Humanity' };
export default function PrivacyNoticePage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Privacy Notice</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Data Collection</h2>
      <p>We collect: name, email, phone, address, education history, and program data.</p>
      <h2>Use</h2>
      <p>Data used for: enrollment, instruction, compliance, and communication.</p>
      <h2>Sharing</h2>
      <p>Shared only as required by law or with your consent.</p>
      <p>Contact: privacy@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
