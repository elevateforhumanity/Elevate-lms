import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Admissions Policy | Elevate for Humanity' };
export default function AdmissionsPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Admissions Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Requirements</h2>
      <ul><li>18+ years old</li><li>High school diploma or equivalent</li><li>Valid ID</li><li>Funding verification</li></ul>
      <h2>Process</h2>
      <ol><li>Submit application</li><li>Interview with advisor</li><li>Funding verification</li><li>Enrollment</li></ol>
      <p>Contact: admissions@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
