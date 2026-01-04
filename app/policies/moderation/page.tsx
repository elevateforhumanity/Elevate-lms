import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Moderation Policy | Elevate for Humanity' };
export default function ModerationPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Moderation Policy</h1>
      <p className="text-gray-600">Last Updated: December 22, 2024</p>
      <h2>Moderation Process</h2>
      <ul><li>Content reviewed by moderators</li><li>Violations removed or flagged</li><li>Users notified of actions</li><li>Appeals process available</li></ul>
      <h2>Enforcement Actions</h2>
      <ul><li>Content removal</li><li>Warning</li><li>Temporary suspension</li><li>Permanent ban</li></ul>
      <p>Contact: moderation@elevateforhumanity.org | (317) 314-3757</p>
    </article>
  );
}
