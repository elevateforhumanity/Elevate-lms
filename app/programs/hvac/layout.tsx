import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HVAC Training Program | Elevate for Humanity',
  description: 'HVAC technician training program. Learn heating, ventilation, and air conditioning. EPA certification included. WIOA funding available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/hvac',
  },
};

export default function HVACLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
