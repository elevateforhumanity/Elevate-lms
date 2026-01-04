/**
 * Test Video Generation
 * Test script for the complete video generation workflow
 */

import {
  generateVideo,
  processTimeline,
  VideoGenerationRequest,
} from './video-generator-v2';
import { testTTSService, validateTTSConfig } from './tts-service';
import { defaultStorage } from './video-storage';

async function testVideoGeneration() {

  // Test 1: Validate TTS Configuration
  const ttsValidation = validateTTSConfig();
  if (!ttsValidation.valid) {
    console.error('❌ TTS validation failed:', ttsValidation.error);
    return;
  }

  // Test 2: Test TTS Service
  const ttsTest = await testTTSService();
  if (!ttsTest) {
    console.error('❌ TTS service test failed\n');
    return;
  }

  // Test 3: Test Timeline Validation
  const testScenes = [
    {
      id: 'scene-1',
      type: 'title' as const,
      duration: 5,
      script: 'Test Video',
      voiceOver: true,
      background: '#2563EB',
      textPosition: 'center' as const,
      animation: 'fade' as const,
    },
    {
      id: 'scene-2',
      type: 'content' as const,
      duration: 10,
      script: 'This is a test of the video generation system',
      voiceOver: true,
      background: '#FFFFFF',
      textPosition: 'bottom' as const,
      animation: 'slide' as const,
    },
  ];

  const timelineValidation = processTimeline(testScenes);
  if (!timelineValidation.valid) {
    console.error('❌ Timeline validation failed:', timelineValidation.errors);
    return;
  }
    `✅ Timeline valid (${timelineValidation.totalDuration}s total)\n`
  );

  // Test 4: Test Storage Initialization
  try {
    await defaultStorage.initialize();
  } catch (error) {
    console.error('❌ Storage initialization failed:', error);
    return;
  }

  // Test 5: Generate Test Video

  const videoRequest: VideoGenerationRequest = {
    title: 'Test Video',
    scenes: testScenes,
    settings: {
      format: '16:9',
      resolution: '720p',
      voiceOver: true,
      backgroundMusic: false,
      voice: 'alloy',
    },
    userId: 'test-user',
  };

  try {
    const result = await generateVideo(videoRequest);

    if (result.status === 'completed') {

      // Test 6: Verify Video File
      const videoPath = await defaultStorage.getVideo(result.jobId);
      if (videoPath) {
      } else {
      }

      // Test 7: Get Video Metadata
      const metadata = await defaultStorage.getVideoMetadata(result.jobId);
      if (metadata) {
          `   File Size: ${(metadata.fileSize / 1024 / 1024).toFixed(2)} MB\n`
        );
      } else {
      }

      // Test 8: List Videos
      const videos = await defaultStorage.listVideos('test-user');

    } else {
      console.error('❌ Video generation failed');
      console.error(`   Error: ${result.error}`);
    }
  } catch (error) {
    console.error('❌ Video generation error:', error);
  }
}

// Run tests

testVideoGeneration()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('');
    console.error('Test failed with error:', error);
    process.exit(1);
  });
