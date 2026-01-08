import Image from 'next/image';
import Link from 'next/link';

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link href="/" aria-label="Link" className={className ?? ''}>
      <Image
        src="/logo-small.png"
        alt="Elevate for Humanity – Building Success Stories"
        width={96}
        height={96}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
