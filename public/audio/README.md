# Audio Files for Elevate LMS

## Required Files

### 1. `welcome-voiceover.mp3`
Professional voiceover for homepage with background music.

**Recommended approach:**
1. Write script (see below)
2. Generate voice with ElevenLabs (elevenlabs.io) - use "Rachel" or "Josh" voice
3. Add soft background music in Audacity or similar
4. Export as MP3 at 128kbps

**Script example:**
> "Hey, welcome to Elevate! We help people launch careers in healthcare, skilled trades, and technology. The best part? If you qualify, your training is completely free through state and federal programs. No loans, no debt—just real skills and a real job. Ready to get started?"

### 2. `ambient-soft.mp3`
Soft, looping background music for pages without video.

**Recommended:**
- Lo-fi beats or soft piano
- 60-90 seconds, seamless loop
- No vocals
- Calm, professional tone

**Free sources:**
- YouTube Audio Library (free)
- Pixabay Music (free)
- Artlist.io (paid, high quality)

### Audio Settings
- Format: MP3
- Bitrate: 128kbps
- Sample rate: 44.1kHz
- Voiceover volume: Mix voice at -6dB, music at -18dB
- Ambient music: Keep file under 500KB for fast loading

## Usage in Code

```tsx
// Homepage with voiceover
<PageAudio voiceoverSrc="/audio/welcome-voiceover.mp3" />

// Program pages (auto-plays ambient if no video)
<PageAudio />

// Disable audio
<PageAudio disabled />
```
