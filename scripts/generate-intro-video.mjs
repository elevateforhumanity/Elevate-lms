#!/usr/bin/env node
/**
 * Generate Intro Video with TTS
 * Creates an engaging intro video for Elevate for Humanity
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Engaging script for Elevate for Humanity
const SCRIPT = `Welcome to Elevate for Humanity.

We're more than a training provider. We're a community-based workforce philanthropy, transforming lives through education and opportunity.

From Marion County to communities across Indiana, we connect people to 100% funded career training. No tuition. No debt. Just real pathways to meaningful careers.

Whether you're starting fresh, making a change, or getting a second chance, we're here to elevate your future.

Because when you rise, we all rise.

Elevate for Humanity. Your partner in career transformation.`;

async function generateTTS() {
  console.log('🎙️  Generating voiceover with edge-tts...\n');
  
  const outputDir = path.join(__dirname, '..', 'public', 'videos');
  const audioPath = path.join(outputDir, 'intro-voiceover.mp3');
  
  // Ensure directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Use edge-tts to generate audio
  // Using a professional, warm voice
  const voice = 'en-US-GuyNeural'; // Professional male voice
  // Alternative voices:
  // 'en-US-JennyNeural' - Professional female
  // 'en-US-AriaNeural' - Warm female
  
  console.log(`Voice: ${voice}`);
  console.log(`Script length: ${SCRIPT.length} characters\n`);
  
  try {
    // Generate TTS using edge-tts CLI
    const command = `npx edge-tts --voice "${voice}" --text "${SCRIPT.replace(/"/g, '\\"')}" --write-media "${audioPath}"`;
    
    console.log('Generating audio...');
    await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024,
      cwd: path.join(__dirname, '..')
    });
    
    console.log(`✅ Audio generated: ${audioPath}\n`);
    
    // Get audio duration
    const { stdout } = await execAsync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`);
    const duration = parseFloat(stdout.trim());
    
    console.log(`Audio duration: ${duration.toFixed(2)} seconds\n`);
    
    return { audioPath, duration };
  } catch (error) {
    console.error('Error generating TTS:', error);
    throw error;
  }
}

async function combineWithVideo(audioPath, duration) {
  console.log('🎬 Combining audio with logo video...\n');
  
  const videoDir = path.join(__dirname, '..', 'public', 'videos');
  const inputVideo = path.join(videoDir, 'logo-animation.mp4');
  const outputVideo = path.join(videoDir, 'intro-with-audio.mp4');
  
  // Check if input video exists
  try {
    await fs.access(inputVideo);
  } catch {
    console.log('⚠️  Logo animation not found, skipping video combination');
    return null;
  }
  
  // Get video duration
  const { stdout } = await execAsync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputVideo}"`);
  const videoDuration = parseFloat(stdout.trim());
  
  console.log(`Video duration: ${videoDuration.toFixed(2)} seconds`);
  console.log(`Audio duration: ${duration.toFixed(2)} seconds\n`);
  
  // Loop video if audio is longer, or trim audio if video is longer
  let ffmpegCommand;
  
  if (duration > videoDuration) {
    // Loop video to match audio length
    const loops = Math.ceil(duration / videoDuration);
    console.log(`Looping video ${loops} times to match audio length...`);
    
    ffmpegCommand = `ffmpeg -stream_loop ${loops - 1} -i "${inputVideo}" -i "${audioPath}" -c:v copy -c:a aac -b:a 192k -shortest "${outputVideo}" -y`;
  } else {
    // Trim audio to match video length
    console.log('Trimming audio to match video length...');
    
    ffmpegCommand = `ffmpeg -i "${inputVideo}" -i "${audioPath}" -c:v copy -c:a aac -b:a 192k -t ${videoDuration} "${outputVideo}" -y`;
  }
  
  try {
    await execAsync(ffmpegCommand, {
      maxBuffer: 50 * 1024 * 1024
    });
    
    console.log(`✅ Video with audio created: ${outputVideo}\n`);
    return outputVideo;
  } catch (error) {
    console.error('Error combining video:', error);
    throw error;
  }
}

async function main() {
  console.log('🎥 Elevate for Humanity - Intro Video Generator\n');
  console.log('Script:');
  console.log('─'.repeat(60));
  console.log(SCRIPT);
  console.log('─'.repeat(60));
  console.log('\n');
  
  try {
    // Generate TTS
    const { audioPath, duration } = await generateTTS();
    
    // Combine with video
    const videoPath = await combineWithVideo(audioPath, duration);
    
    if (videoPath) {
      console.log('✅ Complete! Video ready at:', videoPath);
      console.log('\nNext steps:');
      console.log('1. Add background music (optional)');
      console.log('2. Add the video to your website homepage');
      console.log('3. Set it to autoplay on page load');
    } else {
      console.log('✅ Audio generated successfully!');
      console.log('\nAudio file:', audioPath);
      console.log('\nYou can use this audio with your logo video.');
    }
    
    console.log('\n📝 Script used:');
    console.log(SCRIPT);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
