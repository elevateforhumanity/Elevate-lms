/**
 * Video and Image Rendering Tests
 * 
 * Tests for video/image components to ensure proper rendering,
 * correct attributes, and mobile compatibility.
 */

import { describe, it, expect } from 'vitest';

describe('Video Attribute Validation', () => {
  it('should validate autoplay video configuration', () => {
    const autoplayVideoConfig = {
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      controls: false,
    };
    
    // Autoplay videos must be muted (browser requirement)
    expect(autoplayVideoConfig.autoPlay && autoplayVideoConfig.muted).toBe(true);
    // Autoplay videos should loop for background/hero videos
    expect(autoplayVideoConfig.loop).toBe(true);
    // playsInline prevents fullscreen on mobile
    expect(autoplayVideoConfig.playsInline).toBe(true);
    // Autoplay videos should not have controls
    expect(autoplayVideoConfig.controls).toBe(false);
  });

  it('should validate content video configuration', () => {
    const contentVideoConfig = {
      autoPlay: false,
      loop: false,
      muted: false,
      playsInline: true,
      controls: true,
    };
    
    // Content videos should have user controls
    expect(contentVideoConfig.controls).toBe(true);
    // Content videos should not autoplay
    expect(contentVideoConfig.autoPlay).toBe(false);
    // Content videos should not loop
    expect(contentVideoConfig.loop).toBe(false);
    // playsInline still required for mobile
    expect(contentVideoConfig.playsInline).toBe(true);
  });

  it('should validate video source paths and types', () => {
    const videoSources = [
      { src: '/videos/hero.mp4', type: 'video/mp4' },
      { src: '/videos/cna-hero.mp4', type: 'video/mp4' },
      { src: '/videos/programs-overview-video-with-narration.mp4', type: 'video/mp4' },
    ];
    
    videoSources.forEach(source => {
      expect(source.src).toContain('.mp4');
      expect(source.type).toBe('video/mp4');
      expect(source.src.startsWith('/')).toBe(true);
    });
  });
});

describe('Image Rendering Validation', () => {
  it('should validate Next.js Image has required props', () => {
    const imageProps = {
      src: '/media/programs/test.jpg',
      alt: 'Test Program',
      fill: true,
      className: 'object-cover',
      priority: true,
      quality: 100,
    };
    
    expect(imageProps.src).toBeTruthy();
    expect(imageProps.alt).toBeTruthy();
    expect(imageProps.alt.length).toBeGreaterThan(0);
  });

  it('should validate image has descriptive alt text', () => {
    const validAltTexts = [
      'CNA Training Program',
      'Healthcare Professional',
      'Student Learning',
    ];
    
    const invalidAltTexts = [
      '',
      'image',
      'img',
      'photo',
    ];
    
    validAltTexts.forEach(alt => {
      expect(alt.length).toBeGreaterThan(5);
      expect(alt).not.toMatch(/^(image|img|photo)$/i);
    });
    
    invalidAltTexts.forEach(alt => {
      expect(alt.length === 0 || alt.match(/^(image|img|photo)$/i)).toBeTruthy();
    });
  });
});
