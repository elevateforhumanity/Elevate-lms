/**
 * AI Course Create Edge Function
 * Generates course content using AI based on topic and requirements
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface CourseRequest {
  topic: string;
  description?: string;
  targetAudience?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in hours
  moduleCount?: number;
  includeQuizzes?: boolean;
  includeAssignments?: boolean;
  orgId: string;
  userId: string;
}

interface CourseOutline {
  title: string;
  description: string;
  objectives: string[];
  modules: Module[];
  estimatedDuration: number;
}

interface Module {
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz?: Quiz;
}

interface Lesson {
  title: string;
  content: string;
  order: number;
  duration: number;
  type: 'video' | 'text' | 'interactive';
}

interface Quiz {
  title: string;
  questions: Question[];
}

interface Question {
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert course designer and educator. Generate comprehensive, engaging course content in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateWithAnthropic(prompt: string): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Anthropic API key not configured');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function generateCourseOutline(
  request: CourseRequest
): Promise<CourseOutline> {
  const prompt = `
Generate a comprehensive course outline for the following:

Topic: ${request.topic}
${request.description ? `Description: ${request.description}` : ''}
Target Audience: ${request.targetAudience || 'General learners'}
Difficulty Level: ${request.difficulty || 'intermediate'}
Desired Duration: ${request.duration || 10} hours
Number of Modules: ${request.moduleCount || 5}
Include Quizzes: ${request.includeQuizzes !== false}
Include Assignments: ${request.includeAssignments !== false}

Generate a detailed course outline with the following structure:
{
  "title": "Course title",
  "description": "Comprehensive course description",
  "objectives": ["Learning objective 1", "Learning objective 2", ...],
  "estimatedDuration": total_hours,
  "modules": [
    {
      "title": "Module title",
      "description": "Module description",
      "order": 1,
      "lessons": [
        {
          "title": "Lesson title",
          "content": "Detailed lesson content in markdown format",
          "order": 1,
          "duration": minutes,
          "type": "text"
        }
      ],
      "quiz": {
        "title": "Module quiz title",
        "questions": [
          {
            "question": "Question text",
            "type": "multiple_choice",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correctAnswer": 0,
            "explanation": "Why this is correct"
          }
        ]
      }
    }
  ]
}

Make the content engaging, practical, and well-structured. Include real-world examples and actionable insights.
Return ONLY valid JSON, no additional text.
`;

  let responseText: string;

  // Try Anthropic first, fallback to OpenAI
  if (ANTHROPIC_API_KEY) {
    responseText = await generateWithAnthropic(prompt);
  } else if (OPENAI_API_KEY) {
    responseText = await generateWithOpenAI(prompt);
  } else {
    throw new Error('No AI provider configured');
  }

  // Parse JSON response
  try {
    // Extract JSON if wrapped in markdown code blocks
    const jsonMatch =
      responseText.match(/```json\n([\s\S]*?)\n```/) ||
      responseText.match(/```\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : responseText;

    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Failed to parse AI response:', responseText);
    throw new Error('Failed to parse AI-generated course outline');
  }
}

async function createCourseInDatabase(
  outline: CourseOutline,
  request: CourseRequest
): Promise<string> {
  try {
    // Create course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        org_id: request.orgId,
        title: outline.title,
        description: outline.description,
        objectives: outline.objectives,
        difficulty: request.difficulty || 'intermediate',
        estimated_duration: outline.estimatedDuration,
        status: 'draft',
        created_by: request.userId,
      })
      .select()
      .single();

    if (courseError) throw courseError;

    // Create modules and lessons
    for (const module of outline.modules) {
      const { data: dbModule, error: moduleError } = await supabase
        .from('modules')
        .insert({
          course_id: course.id,
          title: module.title,
          description: module.description,
          order: module.order,
        })
        .select()
        .single();

      if (moduleError) throw moduleError;

      // Create lessons
      for (const lesson of module.lessons) {
        const { error: lessonError } = await supabase.from('lessons').insert({
          module_id: dbModule.id,
          title: lesson.title,
          content: lesson.content,
          order: lesson.order,
          duration: lesson.duration,
          type: lesson.type,
        });

        if (lessonError) throw lessonError;
      }

      // Create quiz if present
      if (module.quiz && request.includeQuizzes !== false) {
        const { error: quizError } = await supabase.from('assessments').insert({
          org_id: request.orgId,
          course_id: course.id,
          module_id: dbModule.id,
          title: module.quiz.title,
          type: 'quiz',
          questions: module.quiz.questions,
          passing_score: 70,
        });

        if (quizError) throw quizError;
      }
    }

    // Log AI generation
    await supabase.from('ai_generations').insert({
      org_id: request.orgId,
      user_id: request.userId,
      type: 'course',
      entity_id: course.id,
      prompt: request.topic,
      metadata: {
        difficulty: request.difficulty,
        moduleCount: outline.modules.length,
        lessonCount: outline.modules.reduce(
          (sum, m) => sum + m.lessons.length,
          0
        ),
      },
    });

    return course.id;
  } catch (error: any) {
    console.error('Database creation error:', error);
    throw new Error(`Failed to create course in database: ${error.message}`);
  }
}

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const request: CourseRequest = await req.json();

    // Validate request
    if (!request.topic || !request.orgId || !request.userId) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: topic, orgId, userId',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if AI provider is configured
    if (!OPENAI_API_KEY && !ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'No AI provider configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate course outline
    console.log('Generating course outline for:', request.topic);
    const outline = await generateCourseOutline(request);

    // Create course in database
    console.log('Creating course in database...');
    const courseId = await createCourseInDatabase(outline, request);

    return new Response(
      JSON.stringify({
        success: true,
        courseId,
        outline,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('AI course creation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
