export type UserRole = 
  | 'student'
  | 'instructor'
  | 'program_holder'
  | 'employer'
  | 'staff'
  | 'admin'
  | 'super_admin';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}
