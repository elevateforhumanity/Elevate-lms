import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Data Retention Policy | Elevate for Humanity' };
export default function DataRetentionPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Data Retention Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Retention Periods</h2>
      <ul><li>Student records: 7 years after last enrollment</li><li>Transcripts: Permanent</li><li>Financial records: 7 years</li><li>Application data: 3 years</li></ul>
      <h2>Deletion</h2>
      <p>Data securely deleted after retention period unless legally required to maintain.</p>
      <p>Contact: privacy@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
