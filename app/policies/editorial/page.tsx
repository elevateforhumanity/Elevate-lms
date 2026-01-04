import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Editorial Guidelines | Elevate for Humanity' };
export default function EditorialPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Editorial Guidelines</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Standards</h2>
      <ul><li>Accuracy and fact-checking</li><li>Clear and accessible writing</li><li>Proper attribution</li><li>Editorial review before publication</li></ul>
      <p>Contact: editorial@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
