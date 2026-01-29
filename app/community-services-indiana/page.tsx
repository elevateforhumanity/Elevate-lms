import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { STATES } from '@/config/states';
import { StateCommunityServicesPage } from '@/components/templates';

const state = STATES.indiana;

export const metadata: Metadata = {
  title: `${state.communityServices.headline} | Elevate for Humanity`,
  description: state.communityServices.description,
  keywords: [
    `community services ${state.name}`,
    `job placement ${state.name}`,
    `family services ${state.majorCities[0]}`,
    `housing assistance ${state.name}`,
  ],
};

export default function Page() {
  return <StateCommunityServicesPage state={state} />;
}
