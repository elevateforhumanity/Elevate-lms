import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 60;
import { parseBody, getErrorMessage } from '@/lib/api-helpers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const courseId = searchParams.get('courseId');

  const progress = {
    userId,
    courseId,
    overallProgress: 65,
    completedLessons: 13,
    totalLessons: 20,
    timeSpent: 1250, // minutes
    lastActivity: new Date().toISOString(),
    modules: [
      {
        id: '1',
        title: 'Introduction to Patient Care',
        progress: 100,
        status: 'completed',
        lessons: 5,
        completedLessons: 5,
      },
      {
        id: '2',
        title: 'Vital Signs and Monitoring',
        progress: 80,
        status: 'in-progress',
        lessons: 6,
        completedLessons: 5,
      },
      {
        id: '3',
        title: 'Clinical Skills',
        progress: 25,
        status: 'in-progress',
        lessons: 9,
        completedLessons: 3,
      },
    ],
  };

  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const body = await parseBody<Record<string, any>>(request);

  if (!body.userId || !body.courseId || !body.lessonId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Update progress (mock)
  const updatedProgress = {
    ...body,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(updatedProgress);
}
