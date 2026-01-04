#!/usr/bin/env node
/**
 * 🎬 Generate CNA Lesson Videos
 * Uses existing videos from /public/videos/ as placeholders
 * Creates video metadata for all 5 CNA Module 1 lessons
 */

import fs from 'fs';
import path from 'path';

console.log('🎬 Generating CNA Lesson Videos');
console.log('================================\n');

// Map CNA lessons to existing videos
const videoMappings = [
  {
    lessonId: 'cna-lesson-1',
    lessonTitle: 'Program Orientation & Introduction',
    videoFile: 'cna-training-video.mp4',
    duration: 600, // 10 minutes
  },
  {
    lessonId: 'cna-lesson-2',
    lessonTitle: 'Healthcare Basics & Medical Terminology',
    videoFile: 'healthcare-overview.mp4',
    duration: 720, // 12 minutes
  },
  {
    lessonId: 'cna-lesson-3',
    lessonTitle: 'Patient Safety & Infection Control',
    videoFile: 'patient-care-video.mp4',
    duration: 900, // 15 minutes
  },
  {
    lessonId: 'cna-lesson-4',
    lessonTitle: 'Infection Control Procedures',
    videoFile: 'healthcare-training.mp4',
    duration: 720, // 12 minutes
  },
  {
    lessonId: 'cna-lesson-5',
    lessonTitle: 'Communication Skills in Healthcare',
    videoFile: 'professional-development.mp4',
    duration: 600, // 10 minutes
  },
];

// Check which videos exist
const videosDir = './public/videos';
const availableVideos = fs.existsSync(videosDir) 
  ? fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'))
  : [];

console.log(`📁 Found ${availableVideos.length} videos in /public/videos/\n`);

// Generate video URLs
const videoUrls = videoMappings.map(mapping => {
  // Try to find exact match
  let videoUrl = `/videos/${mapping.videoFile}`;
  
  // If exact file doesn't exist, use first available video as fallback
  if (!availableVideos.includes(mapping.videoFile) && availableVideos.length > 0) {
    const fallbackVideo = availableVideos[0];
    videoUrl = `/videos/${fallbackVideo}`;
    console.log(`⚠️  ${mapping.videoFile} not found, using ${fallbackVideo} as fallback`);
  }
  
  return {
    ...mapping,
    videoUrl,
  };
});

// Generate SQL for inserting lessons
const generateSQL = () => {
  const sql = videoUrls.map((video, index) => {
    return `
-- Lesson ${index + 1}: ${video.lessonTitle}
INSERT INTO lessons (id, course_id, title, "order", duration, video_url, content, created_at)
VALUES (
  '${video.lessonId}',
  'cna-module-1',
  '${video.lessonTitle}',
  ${index + 1},
  ${video.duration},
  '${video.videoUrl}',
  '<h2>${video.lessonTitle}</h2><p>This lesson covers essential ${video.lessonTitle.toLowerCase()} concepts for CNAs.</p>',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration;
`;
  }).join('\n');

  return sql;
};

// Generate TypeScript/JSON for seeding
const generateJSON = () => {
  return JSON.stringify(videoUrls, null, 2);
};

// Write SQL file
const sqlContent = `
-- CNA Module 1 Lesson Videos
-- Generated: ${new Date().toISOString()}
-- This script inserts/updates video URLs for CNA Module 1 lessons

${generateSQL()}

-- Verify insertion
SELECT id, title, video_url, duration FROM lessons WHERE course_id = 'cna-module-1' ORDER BY "order";
`;

fs.writeFileSync('./scripts/cna-lesson-videos.sql', sqlContent);
console.log('\n✅ Generated: scripts/cna-lesson-videos.sql');

// Write JSON file
const jsonContent = {
  generated: new Date().toISOString(),
  course: 'CNA Module 1',
  lessons: videoUrls,
};

fs.writeFileSync('./scripts/cna-lesson-videos.json', JSON.stringify(jsonContent, null, 2));
console.log('✅ Generated: scripts/cna-lesson-videos.json');

// Summary
console.log('\n📊 Summary:');
console.log(`   Lessons: ${videoUrls.length}`);
console.log(`   Total Duration: ${videoUrls.reduce((sum, v) => sum + v.duration, 0) / 60} minutes`);
console.log(`   Videos Mapped: ${videoUrls.length}`);

console.log('\n🚀 Next Steps:');
console.log('   1. Review generated SQL: scripts/cna-lesson-videos.sql');
console.log('   2. Run SQL in Supabase dashboard or via psql');
console.log('   3. Or use the JSON file for programmatic seeding');
console.log('   4. Test video playback in course player\n');

console.log('💡 To run SQL:');
console.log('   psql $DATABASE_URL -f scripts/cna-lesson-videos.sql\n');
