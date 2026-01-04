import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Terms of Service | Elevate for Humanity' };
export default function TermsPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Acceptance</h2>
      <p>By using our platform, you agree to these terms.</p>
      <h2>User Accounts</h2>
      <ul><li>You must provide accurate information</li><li>Keep your password secure</li><li>You are responsible for account activity</li></ul>
      <h2>Prohibited Conduct</h2>
      <ul><li>Violating laws or policies</li><li>Interfering with platform operation</li><li>Unauthorized access</li><li>Harassment or abuse</li></ul>
      <h2>Termination</h2>
      <p>We may suspend or terminate accounts for violations.</p>
      <h2>Disclaimer</h2>
      <p>Platform provided "as is" without warranties.</p>
      <p>Contact: legal@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
