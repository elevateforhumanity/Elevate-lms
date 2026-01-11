import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Community Guidelines | Elevate for Humanity',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/policies/community-guidelines',
  },
};
export default function CommunityGuidelinesPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <h1>Community Guidelines</h1>
      <p className="text-black">Last Updated: December 22, 2024</p>
      <h2>Our Values</h2>
      <ul><li>Respect and inclusivity</li><li>Constructive dialogue</li><li>Support and encouragement</li><li>Professional conduct</li></ul>
      <h2>Prohibited Content</h2>
      <ul><li>Harassment or hate speech</li><li>Spam or advertising</li><li>Personal attacks</li><li>Misinformation</li></ul>
      <h2>Moderation</h2>
      <p>Violations may result in content removal, warnings, or account suspension.</p>
      <p>Contact: community@elevateforhumanity.institute | (317) 314-3757</p>
    </article>
  );
}
