import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Attendance Policy | Elevate for Humanity' };
export default function AttendancePage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Attendance Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Requirements</h2>
      <p>Students must attend 80% of scheduled classes to maintain good standing.</p>
      <h2>Absences</h2>
      <ul><li>Notify instructor before class</li><li>Provide documentation for extended absences</li><li>Make up missed work within 1 week</li></ul>
      <h2>Consequences</h2>
      <p>Excessive absences may result in dismissal and loss of funding.</p>
      <p>Contact: attendance@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
