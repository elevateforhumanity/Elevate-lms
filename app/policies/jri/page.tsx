import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Justice Reinvestment Initiative Policy | Elevate for Humanity',
};

export default function JRIPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Justice Reinvestment Initiative Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Overview</h2>
      <p>JRI funding supports workforce training for justice-involved individuals.</p>
      <h2>Eligibility</h2>
      <ul>
        <li>Currently or formerly incarcerated</li>
        <li>Referred by probation/parole officer</li>
        <li>Committed to program completion</li>
      </ul>
      <h2>Contact</h2>
      <p>Email: jri@elevateforhumanity.org | Phone: (317) 314-3757</p>
    </article>
  );
}
