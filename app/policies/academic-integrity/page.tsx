import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Academic Integrity Policy | Elevate for Humanity' };
export default function AcademicIntegrityPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Academic Integrity Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Standards</h2>
      <p>All work must be your own. Prohibited: cheating, plagiarism, unauthorized collaboration.</p>
      <h2>Violations</h2>
      <ul><li>First offense: Warning and grade penalty</li><li>Second offense: Course failure</li><li>Third offense: Dismissal</li></ul>
      <p>Contact: academicintegrity@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
