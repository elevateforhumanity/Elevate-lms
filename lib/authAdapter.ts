// @ts-nocheck
import { cookies, headers } from 'next/headers';
import { createSupabaseServerClient } from './supabaseServer';
import integrations from '../config/integrations.json';

export type AuthProviderType = 'supabase' | 'oidc' | 'azure-ad' | 'custom-jwt';

export type AuthUser = {
  id: string;
  email: string | null;
  name?: string | null;
  roles: string[];
  raw?: any;
};

export type AuthAdapter = {
  getCurrentUser(): Promise<AuthUser | null>;
  requireUser(): Promise<AuthUser>;
  signInRedirectUrl(params?: { returnTo?: string }): string;
  signOutRedirectUrl(params?: { returnTo?: string }): string;
};

function getAuthProviderType(): AuthProviderType {
  const t = (integrations.authProvider || 'supabase') as AuthProviderType;
  return t;
}

/**
 * Default Supabase-backed Auth Adapter
 */
async function getSupabaseUser(): Promise<AuthUser | null> {
  const supabase = createSupabaseServerClient();
  const { data, error }: any = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const roles =
    (user.user_metadata?.roles as string[]) ||
    (user.user_metadata?.role ? [user.user_metadata.role] : []);

  return {
    id: user.id,
    email: user.email,
    name:
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      undefined,
    roles,
    raw: user,
  };
}

const supabaseAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    return getSupabaseUser();
  },
  async requireUser() {
    const user = await getSupabaseUser();
    if (!user) {
      throw new Error('Not authenticated');
    }
    return user;
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/sign-in?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/sign-out?returnTo=${encodeURIComponent(returnTo)}`;
  },
};

/**
 * OIDC / OpenID Connect Auth Adapter
 */
const oidcAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    // Check for OIDC session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('oidc_session');

    if (!sessionCookie) {
      return null;
    }

    try {
      // Parse session data (in production, verify JWT signature)
      const sessionData = JSON.parse(sessionCookie.value);

      return {
        id: sessionData.sub || sessionData.id,
        email: sessionData.email,
        name: sessionData.name || sessionData.preferred_username,
        roles: sessionData.roles || ['user'],
        raw: sessionData,
      };
    } catch (error) {
      return null;
    }
  },
  async requireUser() {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('OIDC authentication required');
    }
    return user;
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/oidc/login?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/oidc/logout?returnTo=${encodeURIComponent(returnTo)}`;
  },
};

/**
 * Azure AD / Microsoft Entra ID Auth Adapter
 */
const azureAdAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    // Check for Azure AD session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('azure_ad_session');

    if (!sessionCookie) {
      return null;
    }

    try {
      // Parse Azure AD session data
      const sessionData = JSON.parse(sessionCookie.value);

      return {
        id: sessionData.oid || sessionData.sub,
        email: sessionData.email || sessionData.upn,
        name: sessionData.name,
        roles: sessionData.roles || sessionData.groups || ['user'],
        raw: sessionData,
      };
    } catch (error) {
      return null;
    }
  },
  async requireUser() {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Azure AD authentication required');
    }
    return user;
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/azure/login?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/azure/logout?returnTo=${encodeURIComponent(returnTo)}`;
  },
};

/**
 * Custom JWT Auth Adapter
 */
const customJwtAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    const h = await headers();
    const authHeader = h.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    try {
      const token = authHeader.substring(7);

      // Decode JWT (in production, verify signature with secret key)
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64').toString('utf-8')
      );

      // Check expiration
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return null;
      }

      return {
        id: payload.sub || payload.userId || payload.id,
        email: payload.email,
        name: payload.name || payload.username,
        roles: payload.roles || payload.permissions || ['user'],
        raw: payload,
      };
    } catch (error) {
      return null;
    }
  },
  async requireUser() {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('JWT authentication required');
    }
    return user;
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || '/';
    return `/auth/logout?returnTo=${encodeURIComponent(returnTo)}`;
  },
};

export function getAuthAdapter(): AuthAdapter {
  const type = getAuthProviderType();
  switch (type) {
    case 'supabase':
      return supabaseAuthAdapter;
    case 'oidc':
      return oidcAuthAdapter;
    case 'azure-ad':
      return azureAdAuthAdapter;
    case 'custom-jwt':
      return customJwtAuthAdapter;
    default:
      return supabaseAuthAdapter;
  }
}
