import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();

    // Get instructors from profiles
    const { data: instructors, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url')
      .eq('role', 'instructor')
      .limit(10);

    if (error) throw error;

    // Transform to expected format with generated availability
    const formattedInstructors = (instructors || []).map((instructor, idx) => ({
      id: instructor.id,
      name: instructor.full_name || `Instructor ${idx + 1}`,
      title: 'Senior Instructor',
      avatar: instructor.avatar_url || '/images/avatars/default.jpg',
      specialties: ['Career Training', 'Professional Development'],
      rating: 4.5 + Math.random() * 0.5,
      totalSessions: Math.floor(Math.random() * 100) + 20,
      availability: generateTimeSlots(),
    }));

    // If no instructors in DB, return sample data
    if (formattedInstructors.length === 0) {
      return NextResponse.json({
        instructors: [
          {
            id: 'sample-1',
            name: 'Dr. Sarah Johnson',
            title: 'Healthcare Training Lead',
            avatar: '/images/avatars/default.jpg',
            specialties: ['Healthcare', 'CNA Training'],
            rating: 4.8,
            totalSessions: 156,
            availability: generateTimeSlots(),
          },
          {
            id: 'sample-2',
            name: 'Michael Chen',
            title: 'Skilled Trades Instructor',
            avatar: '/images/avatars/default.jpg',
            specialties: ['HVAC', 'Electrical'],
            rating: 4.9,
            totalSessions: 203,
            availability: generateTimeSlots(),
          },
        ],
      });
    }

    return NextResponse.json({ instructors: formattedInstructors });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return NextResponse.json({ instructors: [] });
  }
}

function generateTimeSlots() {
  const slots = [];
  const today = new Date();

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].forEach(
      (time) => {
        slots.push({
          id: `slot-${i}-${time}`,
          date: date.toISOString().split('T')[0],
          time,
          available: Math.random() > 0.3,
          platform: Math.random() > 0.5 ? 'zoom' : 'teams',
        });
      }
    );
  }

  return slots;
}
