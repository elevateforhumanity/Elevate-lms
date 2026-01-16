/**
 * Hero Video Configuration
 *
 * Available hero videos in /public/videos/
 * Switch between different videos by changing the export
 */

export const heroVideos = {
  // Main homepage hero (recommended) - AVAILABLE
  home: '/videos/hero-home.mp4',

  // Program-specific heroes - AVAILABLE
  barber: 'https://cms-artifacts.artlist.io/content/generated-video-v1/video__3/video-7b329d1f-3f92-4ec5-acdf-9d2d7ff6de5f.mp4?Expires=2083752835&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=PwinNDJ~aDGbHoMI8-Hfr28QIj7s~0mwzn92P-muIHO0bW86~4gW6MzRyslLtk~TOzdfX8aTYA9OeGF-sbBPwCBUw8gTpXO6QvhwpJsFW5DiLHnEP6q6vCTvQ-jEpwV20izIuWVSpY-txGY7bDGHhkSq6-wP26b0J-lstFIMwxRHQjJ9rKmX9i4pzNruZJEQ2ILvO-LdWivm98j5TMLm09HgYzesifHFPPzUzNH7NlYwwvIO2-NtXWEuixrQFdJ2Zt4ocgdmqP9auvaeYr9hbS~F6k6CBybWLlnGoLggGkluqp1vFzt-eIslYgFKl8m4Du4UFJawNl3KmcyA9uTWtA__',
  cdl: '/videos/cdl-hero.mp4',
  cna: '/videos/cna-hero.mp4',
  hvac: '/videos/hvac-hero-final.mp4',

  // Section-specific videos - AVAILABLE
  apply: '/videos/apply-section-video.mp4',
  gettingStarted: '/videos/getting-started-hero.mp4',
  programsOverview: '/videos/programs-overview-video-with-narration.mp4',
  trainingProviders: '/videos/training-providers-video-with-narration.mp4',

  // Fallback for missing videos - use homepage hero
};

// Current homepage hero video
export const currentHomeHero = heroVideos.home;

// Enable audio narration (set to true to unmute by default)
export const enableAudioNarration = true;

export default heroVideos;
