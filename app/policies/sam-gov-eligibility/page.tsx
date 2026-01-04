import { Metadata } from 'next';
export const metadata: Metadata = { title: 'SAM.gov Eligibility Criteria | Elevate for Humanity' };
export default function SAMGovEligibilityPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>SAM.gov Eligibility Criteria</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Federal Opportunities</h2>
      <p>We track federal grant and contract opportunities via SAM.gov.</p>
      <h2>Eligibility</h2>
      <ul><li>Registered in SAM.gov</li><li>Meet opportunity requirements</li><li>Compliance with federal regulations</li><li>Financial capability</li></ul>
      <p>Contact: grants@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
