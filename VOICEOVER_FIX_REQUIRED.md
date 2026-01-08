# Voiceover Fix Required - Critical Issue

## Problem Identified

❌ **CRITICAL:** The homepage voiceover file is corrupted and playing HTML content instead of audio.

**File:** `public/videos/voiceover.mp3`
**Issue:** File contains HTML document instead of MP3 audio
**Impact:** Voiceover plays garbled noise/music instead of text-to-speech narration

## Verification

```bash
$ file public/videos/voiceover.mp3
public/videos/voiceover.mp3: HTML document, Unicode text, UTF-8 text, with very long lines (17428)
```

This should be:
```bash
public/videos/voiceover.mp3: MPEG ADTS, layer III, v2, 64 kbps, 24 kHz, Monaural
```

## Root Cause

The voiceover.mp3 file was likely corrupted during a git operation or file upload. The file contains HTML content from what appears to be a LimeWire application page.

## Solution Options

### Option 1: Generate New Text-to-Speech Audio (Recommended)

Use a text-to-speech service to generate proper audio from the script:

**Script Location:** `public/videos/homepage-voiceover-script.txt`

**Script Content:**
```
Welcome to Elevate For Humanity—where opportunity, training, and community come together to change lives. 

Step into a modern, inspiring environment built for growth, learning, and real career advancement. 

Experience hands-on training, supportive instructors, and a pathway to meaningful careers in barbering, healthcare, trades, and beyond. 

Approved for WIOA, WRG, Registered Apprenticeship, and industry-recognized credentials, we prepare you for the future with purpose and professionalism. 

Whether you're starting fresh, leveling up, or reinventing your path, Elevate For Humanity is where your journey begins. 

Empower your potential. Build your skills. Transform your life. 

Enroll today at ElevateForHumanity.org.
```

**Recommended TTS Services:**

1. **ElevenLabs** (Best Quality)
   - URL: https://elevenlabs.io
   - Voice: Professional, natural-sounding
   - Cost: ~$1 for this length
   - Steps:
     1. Sign up for free account
     2. Paste script
     3. Select professional voice (e.g., "Adam" or "Rachel")
     4. Generate and download MP3
     5. Replace `public/videos/voiceover.mp3`

2. **Google Cloud Text-to-Speech**
   - URL: https://cloud.google.com/text-to-speech
   - Voice: WaveNet voices (high quality)
   - Cost: Free tier available
   - Steps:
     1. Enable API in Google Cloud Console
     2. Use gcloud CLI or API
     3. Generate audio file
     4. Replace `public/videos/voiceover.mp3`

3. **Amazon Polly**
   - URL: https://aws.amazon.com/polly
   - Voice: Neural voices (high quality)
   - Cost: Free tier available
   - Steps:
     1. Access AWS Console
     2. Navigate to Polly
     3. Paste script
     4. Select neural voice (e.g., "Joanna" or "Matthew")
     5. Download MP3
     6. Replace `public/videos/voiceover.mp3`

4. **Edge TTS (Free, Command Line)**
   ```bash
   # Install edge-tts
   npm install -g edge-tts
   
   # Generate voiceover
   edge-tts \
     --voice en-US-GuyNeural \
     --text "$(cat public/videos/homepage-voiceover-script.txt)" \
     --write-media public/videos/voiceover-new.mp3
   
   # Replace old file
   mv public/videos/voiceover-new.mp3 public/videos/voiceover.mp3
   ```

### Option 2: Use Existing Barber Voiceover as Template

The barber voiceover is working correctly:

```bash
$ file public/videos/barber-voiceover.mp3
public/videos/barber-voiceover.mp3: MPEG ADTS, layer III, v2, 64 kbps, 24 kHz, Monaural
```

You could temporarily use this as a placeholder while generating the proper homepage voiceover.

### Option 3: Disable Voiceover Temporarily

Update the configuration to disable voiceover until fixed:

```typescript
// config/hero-videos.ts
export const enableAudioNarration = false; // Changed from true
```

## Implementation Steps

### Quick Fix (5 minutes)
```bash
# Disable voiceover temporarily
# Edit config/hero-videos.ts
export const enableAudioNarration = false;

# Commit and deploy
git add config/hero-videos.ts
git commit -m "Disable voiceover temporarily due to corrupted audio file"
git push
```

### Proper Fix (15-30 minutes)

1. **Generate TTS Audio:**
   ```bash
   # Using edge-tts (free)
   npm install -g edge-tts
   
   edge-tts \
     --voice en-US-GuyNeural \
     --text "$(cat public/videos/homepage-voiceover-script.txt)" \
     --write-media public/videos/voiceover-new.mp3
   ```

2. **Verify Audio File:**
   ```bash
   file public/videos/voiceover-new.mp3
   # Should show: MPEG ADTS, layer III...
   ```

3. **Test Locally:**
   ```bash
   # Play audio to verify
   afplay public/videos/voiceover-new.mp3  # macOS
   # or
   mpg123 public/videos/voiceover-new.mp3  # Linux
   ```

4. **Replace Corrupted File:**
   ```bash
   # Backup corrupted file
   mv public/videos/voiceover.mp3 public/videos/voiceover-corrupted.mp3
   
   # Use new file
   mv public/videos/voiceover-new.mp3 public/videos/voiceover.mp3
   ```

5. **Re-enable Voiceover:**
   ```typescript
   // config/hero-videos.ts
   export const enableAudioNarration = true;
   ```

6. **Commit and Deploy:**
   ```bash
   git add public/videos/voiceover.mp3 config/hero-videos.ts
   git commit -m "Fix homepage voiceover - replace corrupted file with proper TTS audio"
   git push
   ```

## Voice Recommendations

For professional, trustworthy narration:

**Male Voices:**
- ElevenLabs: "Adam" (professional, authoritative)
- Google: "en-US-Neural2-D" (warm, trustworthy)
- Amazon Polly: "Matthew" (clear, professional)
- Edge TTS: "en-US-GuyNeural" (natural, friendly)

**Female Voices:**
- ElevenLabs: "Rachel" (warm, professional)
- Google: "en-US-Neural2-F" (clear, friendly)
- Amazon Polly: "Joanna" (professional, clear)
- Edge TTS: "en-US-JennyNeural" (natural, warm)

## Audio Specifications

Target specifications for the voiceover:

```
Format: MP3
Bitrate: 64 kbps (sufficient for voice)
Sample Rate: 24 kHz or 44.1 kHz
Channels: Mono (Monaural)
Duration: ~60 seconds
File Size: ~500 KB (target)
```

## Testing Checklist

After replacing the file:

- [ ] File is proper MP3 audio (verify with `file` command)
- [ ] Audio plays correctly in browser
- [ ] Voiceover syncs with video
- [ ] Volume is appropriate (not too loud/quiet)
- [ ] Speech is clear and understandable
- [ ] No background noise or artifacts
- [ ] Works on mobile devices
- [ ] Works with mute/unmute controls

## Current Workaround

Until fixed, the VideoHeroBanner component will:
1. Attempt to load the voiceover
2. Fail silently (error handling in place)
3. Video will play without audio narration
4. User can still interact with video controls

This is not ideal but won't break the site.

## Priority

**Priority:** HIGH
**Impact:** User Experience
**Effort:** 15-30 minutes
**Status:** Requires Action

## Related Files

- `public/videos/voiceover.mp3` - Corrupted file (needs replacement)
- `public/videos/homepage-voiceover-script.txt` - Script for TTS
- `config/hero-videos.ts` - Enable/disable voiceover
- `components/home/VideoHeroBanner.tsx` - Component that plays voiceover
- `VOICEOVER_AUDIT.md` - Full voiceover audit documentation

## Contact

If you need help generating the TTS audio, please provide:
1. Preferred voice gender (male/female)
2. Preferred voice style (professional/friendly/authoritative)
3. TTS service preference (or use free edge-tts)

---

**Created:** 2026-01-08
**Status:** REQUIRES IMMEDIATE ACTION
**Next Step:** Generate proper TTS audio file
