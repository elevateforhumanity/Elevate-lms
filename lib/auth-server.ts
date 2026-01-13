// lib/auth-server.ts
// Real Supabase auth implementation

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export interface AuthUser {
  id: string;
  email: string | null;
  role: "admin" | "staff" | "student" | "employer" | "guest";
}

async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Get role from user metadata or profile table
    // Assuming you store role in user_metadata
    const role =
      (user.user_metadata?.role as AuthUser["role"]) || "student";

    return {
      id: user.id,
      email: user.email ?? null,
      role,
    };
  } catch (error: any) {
    // Error: $1
    return null;
  }
}

export async function requireStaff(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login if not authenticated
    redirect("/login?redirect=/admin/internal-docs");
  }

  if (user.role !== "admin" && user.role !== "staff") {
    // Redirect to unauthorized page or home
    redirect("/?error=unauthorized");
  }

  return user;
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
