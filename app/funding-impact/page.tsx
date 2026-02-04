import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Funding Impact | Elevate for Humanity',
  description: 'See the impact of workforce development funding. Track outcomes, job placements, and community benefits from our training programs.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/fundingimpact' },
};

export default function FundingImpactRedirect() {
  redirect('/fundingimpact');
}
