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
  barber: '/videos/barber-hero-final.mp4',
  barberAlt: '/videos/barber-hero.mp4',
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
export const enableAudioNarration = false;

export default heroVideos;
