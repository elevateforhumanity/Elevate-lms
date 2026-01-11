import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Content Policy | Elevate for Humanity',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/policies/content',
  },
};
export default function ContentPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Content Policy</h1>
      <p className="text-black">Last Updated: December 22, 2024</p>
      <h2>Acceptable Content</h2>
      <ul><li>Educational and informative</li><li>Respectful and professional</li><li>Relevant to community</li><li>Original or properly attributed</li></ul>
      <h2>Prohibited Content</h2>
      <ul><li>Illegal content</li><li>Copyrighted material without permission</li><li>Explicit or offensive material</li><li>Spam or commercial solicitation</li></ul>
      <p>Contact: content@elevateforhumanity.institute | (317) 314-3757</p>
    </article>
  );
}
