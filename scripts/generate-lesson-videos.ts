/**
 * Generate Videos for All Lessons
 * 
 * This script generates videos for each lesson using the AI video generator
 * and updates the database with video URLs.
 * 
 * Usage: npx ts-node scripts/generate-lesson-videos.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface Lesson {
  id: string;
  course_id: string;
  lesson_number: number;
  title: string;
  content: string;
  duration_minutes: number;
  video_url: string | null;
}

interface Course {
  id: string;
  course_name: string;
  course_code: string;
}

async function generateVideoForLesson(lesson: Lesson, courseName: string): Promise<string | null> {
  try {
    const prompt = `Educational video for "${courseName}" - Lesson ${lesson.lesson_number}: ${lesson.title}. ${lesson.content.substring(0, 200)}`;
    
    const response = await fetch(`${API_URL}/api/ai-studio/generate-video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        duration: Math.min(lesson.duration_minutes * 60, 300), // Max 5 min per video
        aspectRatio: '16:9',
        style: 'educational',
      }),
    });

    if (!response.ok) {
      console.error(`Failed to generate video for lesson ${lesson.id}`);
      return null;
    }

    const data = await response.json();
    return data.videoUrl;
  } catch (error) {
    console.error(`Error generating video for lesson ${lesson.id}:`, error);
    return null;
  }
}

async function updateLessonVideo(lessonId: string, videoUrl: string): Promise<boolean> {
  const { error } = await supabase
    .from('training_lessons')
    .update({ video_url: videoUrl })
    .eq('id', lessonId);

  return !error;
}

async function main() {
  console.log('=== Lesson Video Generator ===\n');

  // Get all courses
  const { data: courses, error: coursesError } = await supabase
    .from('training_courses')
    .select('id, course_name, course_code')
    .eq('is_active', true);

  if (coursesError || !courses) {
    console.error('Failed to fetch courses:', coursesError);
    return;
  }

  console.log(`Found ${courses.length} courses\n`);

  let totalGenerated = 0;
  let totalFailed = 0;

  for (const course of courses) {
    console.log(`\nProcessing: ${course.course_name}`);

    // Get lessons for this course
    const { data: lessons, error: lessonsError } = await supabase
      .from('training_lessons')
      .select('*')
      .eq('course_id', course.id)
      .is('video_url', null) // Only lessons without videos
      .order('lesson_number');

    if (lessonsError || !lessons) {
      console.error(`Failed to fetch lessons for ${course.course_name}`);
      continue;
    }

    console.log(`  ${lessons.length} lessons need videos`);

    for (const lesson of lessons) {
      process.stdout.write(`  Generating Lesson ${lesson.lesson_number}... `);

      const videoUrl = await generateVideoForLesson(lesson, course.course_name);

      if (videoUrl) {
        const updated = await updateLessonVideo(lesson.id, videoUrl);
        if (updated) {
          console.log('✅');
          totalGenerated++;
        } else {
          console.log('❌ (DB update failed)');
          totalFailed++;
        }
      } else {
        console.log('❌ (Generation failed)');
        totalFailed++;
      }

      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Videos generated: ${totalGenerated}`);
  console.log(`Failed: ${totalFailed}`);
}

// For now, assign placeholder videos from Artlist to lessons
// These are high-quality educational videos already in use
async function assignExistingVideos() {
  console.log('=== Assigning Existing Videos to Lessons ===\n');

  const artlistVideos = [
    'https://cms-artifacts.artlist.io/content/generated-video-v1/video__2/generated-video-acfed647-8bb1-44ed-8505-876b1d573896.mp4?Expires=2083808563&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=BO~IkvikD0UAyMYmWQoBNskXM7I8fMAXUJW3T-zgJh1jg78q3LhNDpFOLhVcCpTBW1Rscp0c0YXEi-CQ29NDjSUKoclWTKq4q-bPLNxXgOpKLYxr5B5X3LzzDQQYnq5ilkgAvEZ~VzT3P8HEixv9WPRLFnAd5V3f~829SadfMPddUPxQZDZc29hrBn-Kxv-EKfugudcZ3depV1X-T1F5UxzvRMqFCXxjfT658RlSt0IupI0LxtywFYkChqJQmH6A~2JBncMUPerBqqt0Gdyp4ettIltCFvBX70ai6784jneJJrWcBJ0l7GyJPx1WBPAqjAdnCeJwyPC2Spp3~u93pQ__',
    'https://cms-artifacts.artlist.io/content/generated-video-v1/video__3/generated-video-0ce1b0b1-bda4-4d15-9273-07ecb6c6db95.mp4?Expires=2083815719&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=IMGjXRJiwqTkyQS3i4UNDu0UAOjebfNis2X16LclsmXfwscpriVKt~zchpsBDR~fJrsn4FagVcLksow2iEi4DJ7y9CpM~S12SrapFt7GibaN33FKfbFqz7DdZNlJo-6wc2kuF4jx5xPuqVFR4Njvt1qKjHnWR6w08W4yKGGIvwrWmDEy6K~tOaMVh95owTYZVxtvUIQKda5afYZK9J0pjlBNUqVQnQaz3HyDONNn9Vx9D6EdSHStO-jL1l5r6u4VZ1sr5fhrr5Rqd7I9u3hXMGMrUgukmYvcRJeLjgzeXK0QvfBsFvFZ~qLEMDxdOFudRXqWKpjmwtTOJ57UHzNXTQ__',
    'https://cms-artifacts.artlist.io/content/generated-video-v1/video__4/generated-video-9491ff2d-bd5a-4570-83e7-05d99663557f.mp4?Expires=2083815524&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=QrhRT-F1esgs7xBiA0V1HdpuLcyOjHOEUqzMq1fHh4Iw5aSjKZaJ3jLIk24K0YTtDZ7bpfV0eSDfR2NVj5MxkspUBgM3hiYbKaqf-rjhwHgzr-7HSccYB~Bc~Xnx~ThA3qLiUjwDkQnsOZrRBkHA7qLUdW~rCcWxdPC9v4gmODoUA9~Py0nHAIApwN8EGUHvCKuLLIO8kALgdCZfGFyCkqX8inUNi5JLb3IpAgjyeln~y3UvS~M~OJ729cO12JFcI98baFH90uayae4~TVAPpkgRl3IjHJ40b86gPOUfvOvw6vkM8nxLivsa7nzpe5Uz6tWlKaiL~hFu4SK3WiTTPw__',
    'https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-c913a513-dde0-4ac7-ae3c-53a453b8b83d.mp4?Expires=2083815719&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=OXubeStSFGiDeF3SU9CQ6JrV2wpxCGlBIwtaznCzrLxiU40aP3onFcEjjtoXpgeUpDrcYE8pktArkwkDCKhrMOTl47Xn9Em3wjkxKxKNkYBcMV4Yw8l1TmvJkIrrhjThOLNLTnlXULArDYVRaIz8YtyycHzUhSELydq8S0xs7SNurTMpEP1PqnrDEp2QmEK2bYPTJQGu90Lftpb3GA4dV2BOby0yCfW-opetSwQcDxfUIn~UgKzBgCyEWW2YdwVbicUPFl895Q01iJQMh1p0Ba7ordWrKjcdQSXfu2uzYzfifCaYLhQNo-23MmMRcPw28rfaea5A-r6K34pQZzRZtg__',
  ];

  // Get all lessons without videos
  const { data: lessons, error } = await supabase
    .from('training_lessons')
    .select('id, lesson_number')
    .is('video_url', null);

  if (error || !lessons) {
    console.error('Failed to fetch lessons:', error);
    return;
  }

  console.log(`Assigning videos to ${lessons.length} lessons...`);

  let updated = 0;
  for (const lesson of lessons) {
    // Rotate through available videos
    const videoUrl = artlistVideos[lesson.lesson_number % artlistVideos.length];
    
    const { error: updateError } = await supabase
      .from('training_lessons')
      .update({ video_url: videoUrl })
      .eq('id', lesson.id);

    if (!updateError) updated++;
  }

  console.log(`Updated ${updated} lessons with video URLs`);
}

// Run the assignment
assignExistingVideos().catch(console.error);
