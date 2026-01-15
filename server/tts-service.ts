/**
 * Text-to-Speech Service
 * Uses OpenAI TTS API for high-quality voice generation
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export interface TTSOptions {
  voice?: string;
  speed?: number;
  model?: string;
}

// OpenAI TTS voices
const VALID_VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

/**
 * Generate speech from text using OpenAI TTS API
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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Validate voice
    const selectedVoice = VALID_VOICES.includes(voice) ? voice : 'alloy';

    // Validate speed (0.25 to 4.0)
    const selectedSpeed = Math.max(0.25, Math.min(4.0, speed));

    // Call OpenAI TTS API
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text.substring(0, 4096), // Max 4096 chars
        voice: selectedVoice,
        speed: selectedSpeed,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI TTS API error: ${error}`);
    }

    // Get audio buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
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
    throw new Error(`TTS generation failed: ${error}`);
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
    throw new Error(`Multiple audio generation failed: ${error}`);
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
      return false;
    }

    const testText = 'This is a test of the text to speech service.';
    const buffer = await generateTextToSpeech(testText, 'alloy', 1.0);

    if (buffer.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
