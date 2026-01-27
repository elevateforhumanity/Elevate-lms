import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Catalog summary endpoint - coming soon',
    totalPrograms: 0,
    totalCourses: 0,
  });
}
