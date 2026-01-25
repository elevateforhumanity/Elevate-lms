/**
 * Generate Missing Media Files
 * 
 * Creates the 6 missing video/audio files using OpenAI TTS
 * Run with: npx tsx scripts/generate-missing-media.ts
 */

import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MediaSpec {
  filename: string;
  type: 'audio' | 'video';
  script: string;
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  description: string;
}

const MEDIA_SPECS: MediaSpec[] = [
  {
    filename: 'voiceover.mp3',
    type: 'audio',
    voice: 'nova',
    description: 'Welcome voiceover for homepage',
    script: `Welcome to Elevate for Humanity. We're here to help you build a career that matters. 
    
Whether you're starting fresh, changing paths, or leveling up your skills, our programs connect you with real training, real credentials, and real job opportunities.

From healthcare to skilled trades, tax preparation to business support, we partner with employers who are ready to hire.

Your next chapter starts here. Let's get you where you want to go.`,
  },
  {
    filename: 'homepage-hero-new.mp3',
    type: 'audio', 
    voice: 'onyx',
    description: 'Homepage hero background narration',
    script: `Build your future with Elevate for Humanity.

Career training that leads to real jobs. Credentials that employers recognize. Support every step of the way.

CNA certification. Barber apprenticeship. CDL training. Tax preparation. And more.

No experience required. Just the drive to succeed.

Start your journey today.`,
  },
  {
    filename: 'program-hero.mp3',
    type: 'audio',
    voice: 'shimmer', 
    description: 'Programs overview narration',
    script: `Our programs are designed for people ready to work.

Each pathway combines classroom learning with hands-on experience. You'll earn industry-recognized credentials while building skills employers actually need.

We work directly with hiring partners to create clear paths from training to employment.

Choose your program. Complete your training. Start your career.

It's that straightforward.`,
  },
  {
    filename: 'hero-video-segment-with-narration.mp3',
    type: 'audio',
    voice: 'nova',
    description: 'Supersonic Fast Cash hero narration',
    script: `Professional tax preparation, made simple.

Supersonic Fast Cash helps you file your taxes accurately and get your refund faster.

Our certified preparers handle everything from simple W-2 returns to complex filings.

After your return is complete, eligible filers may choose an optional refund advance. It's your choice, not a requirement.

File with confidence. Get your refund. Move forward.`,
  },
  {
    filename: 'elevate-overview-with-narration.mp3',
    type: 'audio',
    voice: 'echo',
    description: 'Mobile overview with full narration',
    script: `Elevate for Humanity is a workforce development platform that connects people to careers.

We offer training programs in high-demand fields: healthcare, skilled trades, business support, and tax services.

Our approach is simple. We partner with employers who need workers. We train people for those specific roles. Then we help make the connection.

You get real skills, real credentials, and real job opportunities.

Whether you're on your phone or your computer, everything you need is right here.

Browse programs. Apply online. Track your progress. Connect with employers.

Your career journey starts now.`,
  },
];

async function generateAudio(spec: MediaSpec): Promise<void> {
  console.log(`\nGenerating: ${spec.filename}`);
  console.log(`Voice: ${spec.voice}`);
  console.log(`Script length: ${spec.script.length} characters`);
  
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: spec.voice,
      input: spec.script,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const outputPath = path.join(process.cwd(), 'public', 'videos', spec.filename);
    
    await fs.writeFile(outputPath, buffer);
    
    const stats = await fs.stat(outputPath);
    console.log(`✅ Created: ${spec.filename} (${Math.round(stats.size / 1024)}KB)`);
  } catch (error) {
    console.error(`❌ Failed: ${spec.filename}`, error);
    throw error;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('GENERATING MISSING MEDIA FILES');
  console.log('='.repeat(60));
  
  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'public', 'videos');
  await fs.mkdir(outputDir, { recursive: true });
  
  let successCount = 0;
  let failCount = 0;
  
  for (const spec of MEDIA_SPECS) {
    try {
      await generateAudio(spec);
      successCount++;
      // Rate limit: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      failCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`COMPLETE: ${successCount} succeeded, ${failCount} failed`);
  console.log('='.repeat(60));
  
  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
