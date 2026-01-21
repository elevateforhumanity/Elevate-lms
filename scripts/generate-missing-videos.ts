/**
 * Generate Missing Video Voiceovers
 */

import * as fs from 'fs';
import * as path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY required');
  process.exit(1);
}

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'videos');

const MISSING_VIDEOS = [
  {
    filename: 'hero-video-segment-with-narration.mp3',
    voice: 'nova',
    script: `Your future starts here at Elevate for Humanity.

We believe everyone deserves access to quality career training, regardless of their background or financial situation.

Our programs are 100% funded through WIOA and other workforce development grants. That means no tuition, no debt, just opportunity.

From healthcare to skilled trades, technology to transportation, we offer industry-recognized certifications that employers actually want.

Join thousands of graduates who have transformed their lives through career training.

Elevate for Humanity. Where careers begin.`,
  },
  {
    filename: 'program-hero.mp3',
    voice: 'onyx',
    script: `Discover your path to a rewarding career.

At Elevate for Humanity, we offer comprehensive training programs designed to get you job-ready in weeks, not years.

Healthcare programs including CNA, Medical Assistant, and Phlebotomy.

Skilled trades training in HVAC, Welding, Electrical, and Plumbing.

Technology certifications for IT Support and Cybersecurity.

Commercial Driver License training for Class A, B, and C.

Barber and Cosmetology apprenticeships with hands-on experience.

All programs include career coaching, job placement assistance, and industry-recognized certifications.

Find your program today and start building your future.`,
  },
];

async function generateVoiceover(video: typeof MISSING_VIDEOS[0]): Promise<void> {
  console.log(`🎙️  Generating: ${video.filename}`);
  
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      input: video.script,
      voice: video.voice,
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'TTS API error');
  }

  const audioBuffer = await response.arrayBuffer();
  const outputPath = path.join(OUTPUT_DIR, video.filename);
  
  fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
  console.log(`   ✅ Saved: ${outputPath} (${(audioBuffer.byteLength / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('       GENERATING MISSING VIDEO VOICEOVERS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  for (const video of MISSING_VIDEOS) {
    try {
      await generateVoiceover(video);
    } catch (error) {
      console.log(`   ❌ Failed: ${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('');
  console.log('✅ Done!');
}

main().catch(console.error);
