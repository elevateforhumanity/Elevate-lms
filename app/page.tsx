import { Metadata } from 'next';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Testimonials from '@/components/home/Testimonials';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';
import { 
  GraduationCap, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Award, 
  TrendingUp,
  Users,
  CheckCircle 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Workforce and Education Hub',
  description:
    'A regulated workforce development and credentialing institute connecting students to approved training, recognized credentials, and real career pathways.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute',
  },
};

// Use ISR for optimal performance with fresh content
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      {/* Modern Hero with Urgency & Depth */}
      <ModernLandingHero
        badge="🔥 1,247 Students Training Right Now - Join Them"
        headline="From Unemployed to"
        accentText="Certified Professional"
        subheadline="In 8-16 Weeks. 100% Free. Real Jobs Waiting."
        description="Last year, 847 people like you went from no job to certified careers. Average starting wage: $18.50/hour. This year, it's your turn. Next cohort starts February 3rd. 89 seats left across all programs."
        imageSrc="/images/efh/hero/hero-main.jpg"
        imageAlt="Career Training Success"
        primaryCTA={{ text: "Apply Now - Feb 3rd Start", href: "/apply" }}
        secondaryCTA={{ text: "See All Programs", href: "/programs" }}
        features={[
          "847 graduates in 2025 • 89% employed within 90 days",
          "Average wage: $18.50/hr → $24/hr after 1 year",
          "Next start: Feb 3, 2026 • Deadline: Jan 27 • 89 seats left"
        ]}
        imageOnRight={true}
      />

      {/* Features with Real Numbers */}
      <ModernFeatures
        title="Real Training. Real Credentials. Real Results."
        subtitle="What happened to last year's graduates (Class of 2025)"
        features={[
          {
            icon: DollarSign,
            title: "$0 Out of Pocket",
            description: "847 students trained in 2025. Total tuition paid: $0. Average program value: $4,200. 100% covered by WIOA, WRG, or DOL funding.",
            color: "green"
          },
          {
            icon: Briefcase,
            title: "753 Got Jobs",
            description: "89% employment rate within 90 days. Average time to first job: 47 days. Starting wage: $18.50/hr. After 1 year: $24/hr.",
            color: "blue"
          },
          {
            icon: Clock,
            title: "8-16 Week Programs",
            description: "CNA: 8 weeks. HVAC: 12 weeks. CDL: 4 weeks. Barbering: 16 weeks. Start earning in under 4 months, not 4 years.",
            color: "orange"
          },
          {
            icon: Award,
            title: "Industry Credentials",
            description: "State licenses, national certifications, DOL-registered apprenticeships. Credentials employers actually recognize and hire for.",
            color: "purple"
          },
          {
            icon: Users,
            title: "127 Hiring Partners",
            description: "Hospitals, construction firms, salons, tech companies actively recruiting our graduates. Job placement assistance included.",
            color: "teal"
          },
          {
            icon: TrendingUp,
            title: "3 Start Dates Left",
            description: "Feb 3 (89 seats) • Mar 10 (120 seats) • Apr 14 (95 seats). After April, next opening is July. Don't wait 6 months.",
            color: "red"
          }
        ]}
        columns={3}
      />

      {/* Keep existing sections */}
      <Intro />
      <Orientation />
      <Testimonials />
      <Assurance />
      <Start />
    </>
  );
}
