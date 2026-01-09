import { Metadata } from 'next';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import ModernFeatures from '@/components/landing/ModernFeatures';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Testimonials from '@/components/home/Testimonials';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';
import { 
  DollarSign, 
  Briefcase, 
  Clock, 
  Award, 
  Users, 
  TrendingUp 
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
      {/* Video Hero Banner */}
      <VideoHeroBanner
        videoSrc="/videos/hero-home.mp4"
        headline="Free Career Training"
        subheadline="100% funded workforce training. No tuition. No debt. Real credentials."
        primaryCTA={{ text: "Apply Now", href: "/apply" }}
        secondaryCTA={{ text: "View Programs", href: "/programs" }}
        imageOnRight={true}
      />

      {/* Features with Real Numbers */}
      <ModernFeatures
        title="Why Choose Our Programs"
        subtitle="Real training, real credentials, real careers"
        features={[
          {
            icon: DollarSign,
            title: "100% Free Training",
            description: "No tuition costs with WIOA, WRG, or DOL funding. Training is completely free for eligible students.",
            color: "green"
          },
          {
            icon: Briefcase,
            title: "Job Placement Support",
            description: "Connect with employers hiring our graduates. Resume help, interview prep, and job search assistance included.",
            color: "blue"
          },
          {
            icon: Clock,
            title: "Fast-Track Programs",
            description: "Complete programs in weeks or months, not years. Get certified and start earning sooner.",
            color: "orange"
          },
          {
            icon: Award,
            title: "Industry Credentials",
            description: "State licenses, national certifications, DOL-registered apprenticeships. Credentials employers recognize.",
            color: "purple"
          },
          {
            icon: Users,
            title: "Career Support",
            description: "Resume building, interview coaching, job matching, and ongoing career counseling throughout your journey.",
            color: "teal"
          },
          {
            icon: TrendingUp,
            title: "Multiple Start Dates",
            description: "Rolling enrollment throughout the year. Apply now to secure your spot in the next available cohort.",
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
