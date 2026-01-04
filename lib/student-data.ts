// Mock student data - replace with Supabase queries in production

export interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  enrollmentDate: string;
  completionProgress: number;
  gpa: number;
  attendance: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  grade: number | null;
  status: 'completed' | 'in-progress' | 'not-started';
  credits: number;
  nextLesson: string | null;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate?: string;
  submittedDate?: string;
  status: 'pending' | 'submitted' | 'graded';
  points: number;
  grade?: number;
  type: string;
}

export async function getStudentData(userId: string): Promise<StudentData> {
  // Note: Replace with actual Supabase query when database is connected
  // Example: const { data }: any = await supabase.from('students').select('*').eq('user_id', userId).single();
  return {
    id: userId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    program: 'HVAC Technician Training',
    enrollmentDate: '2024-01-15',
    completionProgress: 65,
    gpa: 3.8,
    attendance: 98,
  };
}

export async function getStudentCourses(userId: string): Promise<Course[]> {
  // Note: Replace with actual Supabase query when database is connected
  // Example: const { data }: any = await supabase.from('enrollments').select('*, courses(*)').eq('student_id', userId);
  return [
    {
      id: '1',
      title: 'HVAC Fundamentals',
      instructor: 'Mike Johnson',
      progress: 100,
      grade: 92,
      status: 'completed',
      credits: 3,
      nextLesson: null,
    },
    {
      id: '2',
      title: 'Electrical Systems',
      instructor: 'Sarah Williams',
      progress: 85,
      grade: 88,
      status: 'in-progress',
      credits: 4,
      nextLesson: 'Advanced Wiring Techniques',
    },
  ];
}

export async function getStudentAssignments(userId: string): Promise<Assignment[]> {
  // Note: Replace with actual Supabase query
  return [
    {
      id: '1',
      title: 'Refrigeration Quiz',
      course: 'HVAC Systems II',
      dueDate: '2024-02-18',
      status: 'pending',
      points: 50,
      type: 'quiz',
    },
    {
      id: '2',
      title: 'Safety Procedures Essay',
      course: 'Workplace Safety',
      dueDate: '2024-02-22',
      status: 'pending',
      points: 100,
      type: 'essay',
    },
  ];
}
