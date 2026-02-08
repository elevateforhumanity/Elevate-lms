/**
 * Enrollment Enforcement Middleware
 * 
 * This wrapper ensures every protected route goes through permission checks.
 * If a dev forgets this wrapper, the route fails review. Period.
 * 
 * Usage:
 * 
 * export const POST = withEnrollmentEnforcement(
 *   EnrollmentAction.CLOCK_IN,
 *   async (request, { user, permission }) => {
 *     // Your handler code here
 *     // permission.data contains enrollment, apprentice, etc.
 *   }
 * );
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { EnrollmentAction } from './actions';
import { 
  assertEnrollmentPermission, 
  logPermissionCheck,
  PermissionContext,
  PermissionResult,
} from './assert-permission';

/**
 * Context passed to the handler after permission check
 */
export interface EnforcementContext {
  user: {
    id: string;
    email?: string;
  };
  permission: PermissionResult;
  supabase: any;
}

/**
 * Handler function type
 */
export type EnforcedHandler = (
  request: NextRequest,
  context: EnforcementContext
) => Promise<NextResponse>;

/**
 * Options for the enforcement wrapper
 */
export interface EnforcementOptions {
  /** Extract partner ID from request for timeclock actions */
  getPartnerId?: (request: NextRequest, body: any) => string | undefined;
  /** Extract program slug from request */
  getProgramSlug?: (request: NextRequest, body: any) => string | undefined;
  /** Whether to log all permission checks (default: true for denials only) */
  logAllChecks?: boolean;
  /** Custom error response */
  customErrorResponse?: (result: PermissionResult) => NextResponse;
}

/**
 * Wrap an API route handler with enrollment enforcement.
 * 
 * This is THE LOCK. No protected route ships without this wrapper.
 * 
 * @param action - The action being performed (from EnrollmentAction enum)
 * @param handler - The actual handler function
 * @param options - Optional configuration
 */
export function withEnrollmentEnforcement(
  action: EnrollmentAction,
  handler: EnforcedHandler,
  options: EnforcementOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // ═══════════════════════════════════════════════════════════════════
      // STEP 1: Authenticate user
      // ═══════════════════════════════════════════════════════════════════
      
      const supabase = await createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json(
          { error: 'Unauthorized', code: 'UNAUTHORIZED' },
          { status: 401 }
        );
      }

      // ═══════════════════════════════════════════════════════════════════
      // STEP 2: Parse request body (if applicable)
      // ═══════════════════════════════════════════════════════════════════
      
      let body: any = {};
      try {
        const clonedRequest = request.clone();
        body = await clonedRequest.json();
      } catch {
        // No body or not JSON - that's fine for GET requests
      }

      // ═══════════════════════════════════════════════════════════════════
      // STEP 3: Build permission context
      // ═══════════════════════════════════════════════════════════════════
      
      const permissionContext: PermissionContext = {
        partnerId: options.getPartnerId?.(request, body) || body.partner_id,
        programSlug: options.getProgramSlug?.(request, body) || body.program_slug || 'barber-apprenticeship',
        metadata: {
          action,
          path: request.nextUrl.pathname,
          method: request.method,
        },
      };

      // ═══════════════════════════════════════════════════════════════════
      // STEP 4: Assert permission
      // ═══════════════════════════════════════════════════════════════════
      
      const permission = await assertEnrollmentPermission(
        user.id,
        action,
        permissionContext
      );

      // ═══════════════════════════════════════════════════════════════════
      // STEP 5: Log the check (always log denials, optionally log allows)
      // ═══════════════════════════════════════════════════════════════════
      
      if (!permission.allowed || options.logAllChecks) {
        await logPermissionCheck(user.id, action, permission, permissionContext);
      }

      // ═══════════════════════════════════════════════════════════════════
      // STEP 6: If denied, return 403 with reason
      // ═══════════════════════════════════════════════════════════════════
      
      if (!permission.allowed) {
        if (options.customErrorResponse) {
          return options.customErrorResponse(permission);
        }

        return NextResponse.json(
          {
            error: permission.message,
            code: permission.reason,
            state: permission.state,
            action,
          },
          { status: 403 }
        );
      }

      // ═══════════════════════════════════════════════════════════════════
      // STEP 7: Permission granted - call the handler
      // ═══════════════════════════════════════════════════════════════════
      
      return handler(request, {
        user: {
          id: user.id,
          email: user.email,
        },
        permission,
        supabase,
      });

    } catch (error) {
      console.error(`[Enforcement] Error in ${action}:`, error);
      return NextResponse.json(
        { error: 'Internal server error', code: 'INTERNAL_ERROR' },
        { status: 500 }
      );
    }
  };
}

/**
 * Quick check function for use in server components or actions
 * Returns the permission result without wrapping a handler
 */
export async function checkEnrollmentPermission(
  userId: string,
  action: EnrollmentAction,
  context?: PermissionContext
): Promise<PermissionResult> {
  const result = await assertEnrollmentPermission(userId, action, context);
  
  // Always log denials
  if (!result.allowed) {
    await logPermissionCheck(userId, action, result, context);
  }
  
  return result;
}

/**
 * Assert permission and throw if denied (for use in server actions)
 */
export async function requireEnrollmentPermission(
  userId: string,
  action: EnrollmentAction,
  context?: PermissionContext
): Promise<PermissionResult> {
  const result = await assertEnrollmentPermission(userId, action, context);
  
  if (!result.allowed) {
    await logPermissionCheck(userId, action, result, context);
    throw new EnrollmentPermissionError(result);
  }
  
  return result;
}

/**
 * Error class for permission denials
 */
export class EnrollmentPermissionError extends Error {
  public readonly code: string;
  public readonly httpStatus = 403;
  public readonly result: PermissionResult;

  constructor(result: PermissionResult) {
    super(result.message || 'Permission denied');
    this.name = 'EnrollmentPermissionError';
    this.code = result.reason || 'PERMISSION_DENIED';
    this.result = result;
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
      state: this.result.state,
    };
  }
}
