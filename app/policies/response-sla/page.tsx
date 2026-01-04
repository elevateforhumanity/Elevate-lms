import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Response Time Policy | Elevate for Humanity' };
export default function ResponseSLAPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Response Time Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Response Times</h2>
      <ul><li>Email inquiries: 24-48 hours</li><li>Phone calls: Same business day</li><li>Applications: 2-3 business days</li><li>Urgent matters: 4 hours</li></ul>
      <p>Contact: info@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
