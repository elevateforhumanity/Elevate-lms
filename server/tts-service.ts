/**
 * Text-to-Speech Service
 * Uses espeak-ng (free, open-source TTS)
 * No API key required, completely free, runs locally
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export interface TTSOptions {
  voice?: string; // Edge TTS voice name
  speed?: number; // 0.25 to 4.0 (converted to rate)
  model?: string; // Not used for Edge TTS
}

// Map OpenAI-style voice names to espeak-ng voices
const VOICE_MAP: Record<string, string> = {
  alloy: 'en-us',
  echo: 'en-us+m3',
  fable: 'en-gb',
  onyx: 'en-us+m7',
  nova: 'en-us+f3',
  shimmer: 'en-us+f4',
};

/**
 * Generate speech from text using espeak-ng
 */
export async function generateTextToSpeech(
  text: string,
  voice: string = 'alloy',
  speed: number = 1.0
): Promise<Buffer> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error('Text is required for TTS generation');
    }

    // Validate speed
    if (speed < 0.25 || speed > 4.0) {
      throw new Error('Speed must be between 0.25 and 4.0');
    }

    // Map voice name to espeak-ng voice
    const espeakVoice = VOICE_MAP[voice] || 'en-us';

    // Convert speed to words per minute (espeak uses WPM)
    // Normal speed is 175 WPM, adjust based on speed multiplier
    const wpm = Math.round(175 * speed);

    console.log(`Generating TTS: "${text.substring(0, 50)}..." with voice: ${espeakVoice}, speed: ${wpm} WPM`
    );

    // Create temp file for output
    const tempWav = path.join('/tmp', `tts-${Date.now()}.wav`);
    const tempMp3 = path.join('/tmp', `tts-${Date.now()}.mp3`);

    // Escape text for shell
    const escapedText = text.replace(/'/g, "'\\''");

    // Generate WAV with espeak-ng
    await execAsync(
      `espeak-ng -v "${espeakVoice}" -s ${wpm} -w "${tempWav}" '${escapedText}'`,
      {
        maxBuffer: 10 * 1024 * 1024,
      }
    );

    // Convert WAV to MP3 with FFmpeg
    await execAsync(
      `ffmpeg -i "${tempWav}" -ar 44100 -ac 2 -b:a 192k "${tempMp3}" -y 2>/dev/null`,
      {
        maxBuffer: 10 * 1024 * 1024,
      }
    );

    // Read the generated MP3
    const buffer = await fs.readFile(tempMp3);

    // Clean up temp files
    await fs.unlink(tempWav).catch(() => {});
    await fs.unlink(tempMp3).catch(() => {});


    return buffer;
  } catch (error) {
    console.error('TTS generation error:', error);
    throw new Error(
      `Failed to generate speech: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Generate speech and save to file
 */
export async function generateAndSaveAudio(
  text: string,
  outputPath: string,
  options: TTSOptions = {}
): Promise<string> {
  try {
    const { voice = 'alloy', speed = 1.0 } = options;

    const audioBuffer = await generateTextToSpeech(text, voice, speed);

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });

    // Write file
    await fs.writeFile(outputPath, audioBuffer);


    return outputPath;
  } catch (error) {
    console.error('Error saving audio:', error);
    throw error;
  }
}

/**
 * Generate speech for multiple text segments
 */
export async function generateMultipleAudio(
  segments: Array<{
    text: string;
    voice?: TTSOptions['voice'];
    speed?: number;
  }>,
  outputDir: string
): Promise<string[]> {
  try {
    const audioPaths: string[] = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const outputPath = path.join(outputDir, `segment-${i + 1}.mp3`);

      await generateAndSaveAudio(segment.text, outputPath, {
        voice: segment.voice,
        speed: segment.speed,
      });

      audioPaths.push(outputPath);
    }

    return audioPaths;
  } catch (error) {
    console.error('Error generating multiple audio files:', error);
    throw error;
  }
}

/**
 * Get estimated audio duration (rough estimate based on text length)
 */
export function estimateAudioDuration(
  text: string,
  speed: number = 1.0
): number {
  // Average speaking rate: ~150 words per minute
  // Adjust for speed
  const words = text.split(/\s+/).length;
  const baseMinutes = words / 150;
  const adjustedMinutes = baseMinutes / speed;
  const seconds = adjustedMinutes * 60;

  return Math.ceil(seconds);
}

/**
 * Voice options with descriptions (espeak-ng)
 */
export const VOICE_OPTIONS = {
  alloy: {
    name: 'US English',
    description: 'Neutral US English voice',
    gender: 'neutral',
    espeakVoice: 'en-us',
  },
  echo: {
    name: 'US Male 3',
    description: 'Male US English voice',
    gender: 'male',
    espeakVoice: 'en-us+m3',
  },
  fable: {
    name: 'British English',
    description: 'British English voice',
    gender: 'neutral',
    espeakVoice: 'en-gb',
  },
  onyx: {
    name: 'US Male 7',
    description: 'Deep male US English voice',
    gender: 'male',
    espeakVoice: 'en-us+m7',
  },
  nova: {
    name: 'US Female 3',
    description: 'Female US English voice',
    gender: 'female',
    espeakVoice: 'en-us+f3',
  },
  shimmer: {
    name: 'US Female 4',
    description: 'Soft female US English voice',
    gender: 'female',
    espeakVoice: 'en-us+f4',
  },
};

/**
 * Validate TTS configuration
 */
export function validateTTSConfig(): { valid: boolean; error?: string } {
  // espeak-ng doesn't require any API keys, just needs to be installed
  return { valid: true };
}

/**
 * Test TTS service
 */
export async function testTTSService(): Promise<boolean> {
  try {
    const validation = validateTTSConfig();
    if (!validation.valid) {
      console.error('TTS validation failed:', validation.error);
      return false;
    }

    const testText = 'This is a test of the text to speech service.';
    const buffer = await generateTextToSpeech(testText, 'alloy', 1.0);

    if (buffer.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('❌ espeak-ng TTS service test failed:', error);
    return false;
  }
}
