/**
 * Generate Real Demo Assets
 * Creates actual voiceovers and images for demo videos
 */

import * as fs from 'fs';
import * as path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY required');
  process.exit(1);
}

const OUTPUT_DIR = path.join(process.cwd(), 'public');

// Demo configurations with real scripts
const DEMOS = [
  {
    id: 'lms-overview',
    title: 'LMS Platform Overview',
    voice: 'nova',
    script: `Welcome to the Elevate Learning Management System. 

I'm going to walk you through our platform that helps thousands of students achieve their career goals every year.

When students log in, they see their personalized dashboard showing enrolled courses, upcoming deadlines, and progress tracking. The interface is clean and intuitive, designed for learners of all technical backgrounds.

Let's look at the course catalog. Students can browse programs by category - Healthcare, Skilled Trades, Technology, Business, and Transportation. Each course shows duration, certification details, and funding eligibility.

Once enrolled, students access interactive lessons with video content, reading materials, and hands-on exercises. Our AI tutor is available 24/7 to answer questions and provide personalized guidance.

The assessment system includes quizzes, practical evaluations, and proctored exams. Students receive immediate feedback and can track their mastery of each topic.

Upon completion, students earn industry-recognized certificates that can be shared with employers directly through our platform.

The Elevate LMS - where careers begin.`,
    imagePrompt: 'Professional screenshot of a modern learning management system dashboard showing course progress, student metrics, and clean UI design, blue and white color scheme, corporate software interface',
  },
  {
    id: 'employer-portal',
    title: 'Employer Portal Demo',
    voice: 'onyx',
    script: `Welcome to the Elevate Employer Portal - your gateway to a pipeline of trained, certified talent.

As an employer partner, you have access to powerful tools for workforce development.

The dashboard shows your sponsored employees, their training progress, and upcoming completions. You can see exactly when candidates will be job-ready.

Our candidate search lets you filter by certification, location, availability, and skills. Each candidate profile includes their training history, certifications earned, and assessment scores.

The job posting feature connects you directly with our graduate network. Post positions and receive applications from pre-screened, qualified candidates - no recruiting fees.

For On-the-Job Training programs, we handle the paperwork. Track wage reimbursements, training hours, and compliance documentation all in one place.

The analytics dashboard shows your hiring metrics, retention rates, and return on investment for training partnerships.

Partner with Elevate and build your workforce with confidence.`,
    imagePrompt: 'Professional employer HR dashboard interface showing candidate profiles, hiring metrics, and workforce analytics, modern corporate software design, purple and white color scheme',
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard Tour',
    voice: 'alloy',
    script: `Welcome to the Elevate Administration Dashboard - the command center for your training organization.

This tour covers the key features administrators use daily to manage programs and students.

The main dashboard provides real-time metrics: active enrollments, completion rates, revenue, and compliance status. Alerts highlight items requiring attention.

Student management gives you complete visibility into every learner's journey. View applications, track progress, manage documents, and communicate directly through the platform.

The course builder lets you create and modify training content. Add lessons, upload videos, create assessments, and set completion requirements. Our AI assistant can generate course outlines and quiz questions automatically.

Financial tools handle payments, scholarships, and funding source tracking. Generate invoices, process refunds, and reconcile accounts with integrated reporting.

Compliance management ensures your programs meet regulatory requirements. Track certifications, audit documentation, and generate reports for accrediting bodies.

The Elevate Admin Dashboard - powerful tools for program excellence.`,
    imagePrompt: 'Professional admin dashboard interface showing student management, analytics charts, and administrative controls, modern SaaS design, dark blue and orange accents, data visualization',
  },
  {
    id: 'course-builder',
    title: 'AI Course Builder',
    voice: 'shimmer',
    script: `Welcome to the Elevate AI Course Builder - create professional training content in minutes, not months.

Let me show you how easy it is to build a complete course.

Start by entering your course topic and target audience. Our AI analyzes industry standards and generates a comprehensive curriculum outline with modules, lessons, and learning objectives.

Review and customize the structure. Drag and drop to reorder lessons, add or remove topics, and adjust the scope to match your needs.

For each lesson, the AI generates detailed content including explanations, examples, and key takeaways. You can edit, expand, or regenerate any section.

Add assessments with one click. The system creates quiz questions, practical exercises, and evaluation rubrics aligned with your learning objectives.

Upload existing materials - videos, documents, or SCORM packages - and the AI integrates them seamlessly into your course structure.

Preview your course exactly as students will experience it. Make final adjustments and publish when ready.

The Elevate Course Builder - professional training content, powered by AI.`,
    imagePrompt: 'Professional course authoring tool interface showing drag-and-drop lesson builder, AI content generation panel, and course preview, modern educational software design, green and white theme',
  },
];

async function generateVoiceover(demo: typeof DEMOS[0]): Promise<string> {
  console.log(`🎙️  Generating voiceover for: ${demo.title}`);
  
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      input: demo.script,
      voice: demo.voice,
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'TTS API error');
  }

  const audioBuffer = await response.arrayBuffer();
  const outputPath = path.join(OUTPUT_DIR, 'videos', 'demos', `${demo.id}-voiceover.mp3`);
  
  fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
  console.log(`   ✅ Saved: ${outputPath} (${(audioBuffer.byteLength / 1024).toFixed(1)} KB)`);
  
  return outputPath;
}

async function generateThumbnail(demo: typeof DEMOS[0]): Promise<string> {
  console.log(`🖼️  Generating thumbnail for: ${demo.title}`);
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: demo.imagePrompt,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Image API error');
  }

  const data = await response.json();
  const imageUrl = data.data[0].url;
  
  // Download the image
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  
  const outputPath = path.join(OUTPUT_DIR, 'images', 'demos', `${demo.id}-thumb.jpg`);
  fs.writeFileSync(outputPath, Buffer.from(imageBuffer));
  console.log(`   ✅ Saved: ${outputPath} (${(imageBuffer.byteLength / 1024).toFixed(1)} KB)`);
  
  return outputPath;
}

async function generateAllAssets() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('       GENERATING REAL DEMO ASSETS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  // Ensure directories exist
  fs.mkdirSync(path.join(OUTPUT_DIR, 'videos', 'demos'), { recursive: true });
  fs.mkdirSync(path.join(OUTPUT_DIR, 'images', 'demos'), { recursive: true });

  const results: { demo: string; voiceover: boolean; thumbnail: boolean }[] = [];

  for (const demo of DEMOS) {
    console.log('');
    console.log(`━━━ ${demo.title} ━━━`);
    
    let voiceoverSuccess = false;
    let thumbnailSuccess = false;

    try {
      await generateVoiceover(demo);
      voiceoverSuccess = true;
    } catch (error) {
      console.log(`   ❌ Voiceover failed: ${error}`);
    }

    try {
      await generateThumbnail(demo);
      thumbnailSuccess = true;
    } catch (error) {
      console.log(`   ❌ Thumbnail failed: ${error}`);
    }

    results.push({ demo: demo.id, voiceover: voiceoverSuccess, thumbnail: thumbnailSuccess });
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save scripts for video production
  const scriptsPath = path.join(OUTPUT_DIR, 'videos', 'demos', 'scripts.json');
  fs.writeFileSync(scriptsPath, JSON.stringify(DEMOS.map(d => ({
    id: d.id,
    title: d.title,
    script: d.script,
    voiceoverFile: `${d.id}-voiceover.mp3`,
    thumbnailFile: `${d.id}-thumb.jpg`,
  })), null, 2));

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('       RESULTS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  for (const result of results) {
    const voiceStatus = result.voiceover ? '✅' : '❌';
    const thumbStatus = result.thumbnail ? '✅' : '❌';
    console.log(`${result.demo}: Voiceover ${voiceStatus} | Thumbnail ${thumbStatus}`);
  }

  const totalVoiceovers = results.filter(r => r.voiceover).length;
  const totalThumbnails = results.filter(r => r.thumbnail).length;

  console.log('');
  console.log(`Total: ${totalVoiceovers}/${DEMOS.length} voiceovers, ${totalThumbnails}/${DEMOS.length} thumbnails`);
  console.log('');
  console.log('Scripts saved to: public/videos/demos/scripts.json');
  console.log('');
  console.log('Next steps:');
  console.log('1. Use voiceovers + screen recordings to create full demo videos');
  console.log('2. Or use HeyGen/Synthesia API to generate AI avatar videos');
}

generateAllAssets().catch(console.error);
