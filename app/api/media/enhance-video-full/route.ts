// @ts-nocheck
export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export const dynamic = 'force-dynamic';


const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const voiceoverFile = formData.get('voiceover') as File | null;
    const musicFile = formData.get('music') as File | null;
    const voiceoverText = formData.get('voiceoverText') as string | null;
    const musicVolume = parseFloat(
      (formData.get('musicVolume') as string) || '0.3'
    );
    const voiceoverVolume = parseFloat(
      (formData.get('voiceoverVolume') as string) || '1.0'
    );

    if (!videoFile) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'videos');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const timestamp = Date.now();

    // Save video file
    const videoBytes = await videoFile.arrayBuffer();
    const videoBuffer = Buffer.from(videoBytes);
    const videoFilename = `video-${timestamp}.mp4`;
    const videoPath = path.join(uploadsDir, videoFilename);
    await writeFile(videoPath, videoBuffer);

    let voiceoverPath = '';
    let musicPath = '';
    let generatedVoiceover = false;

    // Save or generate voiceover
    if (voiceoverFile) {
      const voiceoverBytes = await voiceoverFile.arrayBuffer();
      const voiceoverBuffer = Buffer.from(voiceoverBytes);
      const voiceoverFilename = `voiceover-${timestamp}.mp3`;
      voiceoverPath = path.join(uploadsDir, voiceoverFilename);
      await writeFile(voiceoverPath, voiceoverBuffer);
    } else if (voiceoverText) {
      // Generate voiceover using text-to-speech
      const voiceoverFilename = `voiceover-${timestamp}.mp3`;
      voiceoverPath = path.join(uploadsDir, voiceoverFilename);

      try {
        // Using edge-tts for text-to-speech (free, high quality)
        await execAsync(
          `edge-tts --text "${voiceoverText.replace(/"/g, '\\"')}" --write-media "${voiceoverPath}" --voice en-US-GuyNeural`
        );
        generatedVoiceover = true;
      } catch (ttsError) {
        logger.error('TTS generation failed:', ttsError);
        // Continue without voiceover
      }
    }

    // Save music file
    if (musicFile) {
      const musicBytes = await musicFile.arrayBuffer();
      const musicBuffer = Buffer.from(musicBytes);
      const musicFilename = `music-${timestamp}.mp3`;
      musicPath = path.join(uploadsDir, musicFilename);
      await writeFile(musicPath, musicBuffer);
    }

    // Enhanced output filename
    const enhancedFilename = `enhanced-full-${timestamp}.mp4`;
    const enhancedPath = path.join(uploadsDir, enhancedFilename);

    // Build FFmpeg command
    let ffmpegCommand = `ffmpeg -i "${videoPath}"`;
    let filterComplex = '';
    let audioInputs = 0;

    // Add voiceover input
    if (voiceoverPath && existsSync(voiceoverPath)) {
      ffmpegCommand += ` -i "${voiceoverPath}"`;
      audioInputs++;
    }

    // Add music input
    if (musicPath && existsSync(musicPath)) {
      ffmpegCommand += ` -i "${musicPath}"`;
      audioInputs++;
    }

    // Video enhancement filters
    const videoFilters = [
      'scale=1920:1080:force_original_aspect_ratio=decrease',
      'pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
      'hqdn3d=4:3:6:4.5', // Denoise
      'eq=contrast=1.1:brightness=0.05:saturation=1.2', // Color enhancement
      'unsharp=5:5:1.0:5:5:0.0', // Sharpen
    ].join(',');

    filterComplex = `[0:v]${videoFilters}[v]`;

    // Audio mixing
    if (audioInputs > 0) {
      let audioMix = '';

      if (
        voiceoverPath &&
        existsSync(voiceoverPath) &&
        musicPath &&
        existsSync(musicPath)
      ) {
        // Both voiceover and music
        audioMix = `[1:a]volume=${voiceoverVolume}[vo];[2:a]volume=${musicVolume},aloop=loop=-1:size=2e+09[music];[vo][music]amix=inputs=2:duration=first:dropout_transition=2[a]`;
      } else if (voiceoverPath && existsSync(voiceoverPath)) {
        // Only voiceover
        audioMix = `[1:a]volume=${voiceoverVolume}[a]`;
      } else if (musicPath && existsSync(musicPath)) {
        // Only music
        audioMix = `[1:a]volume=${musicVolume},aloop=loop=-1:size=2e+09[a]`;
      }

      if (audioMix) {
        filterComplex += `;${audioMix}`;
      }
    }

    // Complete FFmpeg command
    if (filterComplex) {
      ffmpegCommand += ` -filter_complex "${filterComplex}"`;
      ffmpegCommand += ` -map "[v]"`;
      if (audioInputs > 0) {
        ffmpegCommand += ` -map "[a]"`;
      }
    } else {
      ffmpegCommand += ` -vf "${videoFilters}"`;
    }

    // Output settings
    ffmpegCommand += ` -c:v libx264 -preset slow -crf 18 -b:v 8M -maxrate 10M -bufsize 16M`;
    if (audioInputs > 0) {
      ffmpegCommand += ` -c:a aac -b:a 192k`;
    }
    ffmpegCommand += ` -movflags +faststart -shortest "${enhancedPath}"`;

    logger.info('Processing video with full enhancement...');
    logger.info('Command:', ffmpegCommand);

    try {
      const { stdout, stderr } = await execAsync(ffmpegCommand, {
        maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      });

      logger.info('Video processed successfully');
      logger.info('FFmpeg output:', stderr);

      return NextResponse.json({
        success: true,
        originalUrl: `/uploads/videos/${videoFilename}`,
        enhancedUrl: `/uploads/videos/${enhancedFilename}`,
        hasVoiceover: !!voiceoverPath && existsSync(voiceoverPath),
        hasMusic: !!musicPath && existsSync(musicPath),
        generatedVoiceover,
        message: 'Video fully enhanced with audio!',
        details: {
          videoEnhancement:
            'Upscaled to 1080p, denoised, color-corrected, sharpened',
          audio: audioInputs > 0 ? 'Voiceover and/or music added' : 'No audio',
          voiceoverVolume: voiceoverVolume,
          musicVolume: musicVolume,
        },
      });
    } catch (err: any) {
      logger.error('FFmpeg error:', ffmpegError);

      return NextResponse.json(
        {
          success: false,
          error: 'Video processing failed',
          details: ffmpegError.message,
          originalUrl: `/uploads/videos/${videoFilename}`,
        },
        { status: 500 }
      );
    }
  } catch { /* Error handled silently */ 
    logger.error(
      'Video processing error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { error: 'Failed to process video', details: toErrorMessage(error) },
      { status: 500 }
    );
  }
}
