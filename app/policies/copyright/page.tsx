import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Copyright Policy | Elevate for Humanity' };
export default function CopyrightPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Copyright Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Our Content</h2>
      <p>All content © Elevate for Humanity. All rights reserved.</p>
      <h2>User Content</h2>
      <p>You retain copyright but grant us license to use, display, and distribute your content.</p>
      <h2>DMCA</h2>
      <p>Report copyright infringement to: dmca@elevateforhumanity.org</p>
    </article>
  );
}
