// types/auth.ts - Proper TypeScript types for auth

import { NextRequest } from 'next/server';

export type UserRole = 'student' | 'admin' | 'super_admin' | 'program_holder' | 'staff' | 'partner';

export interface AuthedUser {
  id: string;
  email: string | null;
  role: UserRole | null;
}

export interface RouteContext<TParams = Record<string, string>> {
  params: TParams;
}

export interface AuthedContext<TParams = Record<string, string>> extends RouteContext<TParams> {
  user: AuthedUser;
}

export type AuthHandler<TParams = Record<string, string>> = (
  req: NextRequest,
  context: AuthedContext<TParams>
) => Promise<Response> | Response;

export interface WithAuthOptions {
  roles?: UserRole[];
}
