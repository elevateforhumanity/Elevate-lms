import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Funding Impact',
  alternates: { canonical: 'https://www.elevateforhumanity.org/funding-impact' },
};

export default function FundingImpactRedirect() {
  redirect('/fundingimpact');
}
