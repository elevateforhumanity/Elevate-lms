'use client';

export function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
    >
      <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/barber-hero.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
