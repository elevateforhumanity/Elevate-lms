import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy Policy | Elevate for Humanity' };
export default function PrivacyPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Information We Collect</h2>
      <ul><li>Personal information (name, email, phone)</li><li>Education records</li><li>Usage data</li><li>Cookies and tracking</li></ul>
      <h2>How We Use It</h2>
      <ul><li>Provide services</li><li>Improve platform</li><li>Communicate with you</li><li>Comply with regulations</li></ul>
      <h2>Your Rights</h2>
      <ul><li>Access your data</li><li>Request corrections</li><li>Request deletion</li><li>Opt out of communications</li></ul>
      <p>Contact: privacy@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
