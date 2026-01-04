// Mock admin data - replace with Supabase queries in production

export interface AdminStats {
  totalStudents: number;
  activePrograms: number;
  employerPartners: number;
  placementRate: number;
  totalRevenue: number;
  avgSalary: number;
}

export interface ProgramStats {
  name: string;
  students: number;
  completion: number;
  placement: number;
}

export interface ActivityLog {
  id: string;
  type: 'enrollment' | 'placement' | 'application' | 'employer';
  message: string;
  time: string;
  userId?: string;
}

export async function getAdminStats(): Promise<AdminStats> {
  // Note: Replace with actual Supabase query when database is connected
  // Example: const { data }: any = await supabase.from('admin_stats').select('*').single();
  return {
    totalStudents: 2547,
    activePrograms: 12,
    employerPartners: 52,
    placementRate: 85,
    totalRevenue: 1250000,
    avgSalary: 45000,
  };
}

export async function getProgramStats(): Promise<ProgramStats[]> {
  // Note: Replace with actual Supabase query when database is connected
  // Example: const { data }: any = await supabase.from('program_stats').select('*');
  return [
    { name: 'HVAC Technician', students: 450, completion: 92, placement: 88 },
    { name: 'CNA Training', students: 380, completion: 88, placement: 92 },
    { name: 'Web Development', students: 320, completion: 85, placement: 85 },
    { name: 'Electrical Systems', students: 290, completion: 90, placement: 87 },
  ];
}

export async function getRecentActivity(): Promise<ActivityLog[]> {
  // Note: Replace with actual Supabase query when database is connected
  // Example: const { data }: any = await supabase.from('activity_logs').select('*').order('time', { ascending: false }).limit(10);
  return [
    {
      id: '1',
      type: 'enrollment',
      message: 'New student enrolled in HVAC program',
      time: '5 min ago',
    },
    {
      id: '2',
      type: 'placement',
      message: 'Student placed at ABC Manufacturing',
      time: '1 hour ago',
    },
    {
      id: '3',
      type: 'application',
      message: '15 new WIOA applications pending review',
      time: '2 hours ago',
    },
  ];
}
