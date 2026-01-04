import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funding Verification Policy | Elevate for Humanity',
};

export default function FundingVerificationPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Funding Verification Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Overview</h2>
      <p>All students must verify funding source before enrollment.</p>
      <h2>Acceptable Funding Sources</h2>
      <ul>
        <li>WIOA voucher</li>
        <li>Workforce Ready Grant</li>
        <li>JRI funding</li>
        <li>Employer sponsorship</li>
        <li>Self-pay</li>
      </ul>
      <h2>Verification Process</h2>
      <ol>
        <li>Submit funding documentation</li>
        <li>Financial aid review (2-3 business days)</li>
        <li>Approval notification</li>
        <li>Enrollment confirmation</li>
      </ol>
      <h2>Contact</h2>
      <p>Email: financialaid@elevateforhumanity.org | Phone: (317) 314-3757</p>
    </article>
  );
}
