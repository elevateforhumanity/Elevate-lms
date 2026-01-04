# Video Hero Banner

## Required Video Files

Place your hero banner video files in this directory:

- `hero-banner.mp4` - MP4 format (recommended for broad compatibility)
- `hero-banner.webm` - WebM format (optional, for better compression)

## Video Specifications

### Recommended Settings:

- **Resolution:** 1920x1080 (Full HD) or 3840x2160 (4K)
- **Aspect Ratio:** 16:9
- **Duration:** 10-30 seconds (loops automatically)
- **File Size:** Under 10MB for optimal loading
- **Frame Rate:** 30fps or 60fps
- **Codec:** H.264 for MP4, VP9 for WebM

### Optimization Tips:

1. **Compress your video** using tools like HandBrake or FFmpeg
2. **Remove audio track** if not needed (reduces file size)
3. **Use lower bitrate** for web delivery (3-5 Mbps is usually sufficient)
4. **Consider using a CDN** for faster delivery

## FFmpeg Compression Example

```bash
# Compress MP4 for web
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -an hero-banner.mp4

# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:1080 -an hero-banner.webm
```

## Fallback Image

The component uses `/images/heroes/hero-homepage.jpg` as a poster image.
This displays while the video loads or if video playback fails.

## Current Status

⚠️ **Video files not yet added**

To activate the video hero:

1. Add `hero-banner.mp4` to this directory
2. Optionally add `hero-banner.webm` for better compression
3. Video will auto-play on page load (muted by default)

## Features

The VideoHeroBanner component includes:

- ✅ Auto-play (muted)
- ✅ Loop playback
- ✅ Play/Pause control
- ✅ Mute/Unmute control
- ✅ Fullscreen control
- ✅ Responsive sizing
- ✅ Fallback poster image
- ✅ Smooth overlay gradient
- ✅ Content overlay with CTAs

## Alternative: YouTube/Vimeo Embed

If you prefer to use YouTube or Vimeo instead of self-hosted video,
update the VideoHeroBanner component to use an iframe embed.
