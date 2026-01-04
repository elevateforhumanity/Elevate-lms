import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workforce Ready Grant Policy | Elevate for Humanity',
};

export default function WRGPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Workforce Ready Grant Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Overview</h2>
      <p>Indiana Workforce Ready Grant provides tuition assistance for high-value certificates in high-demand fields.</p>
      <h2>Eligibility</h2>
      <ul>
        <li>Indiana resident</li>
        <li>U.S. citizen or eligible non-citizen</li>
        <li>High school diploma or equivalent</li>
        <li>Enrolled in eligible program</li>
      </ul>
      <h2>Award Amount</h2>
      <p>Up to $7,500 per year for tuition and fees.</p>
      <h2>Contact</h2>
      <p>Email: financialaid@elevateforhumanity.org | Phone: (317) 314-3757</p>
    </article>
  );
}
