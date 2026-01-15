import { createClient } from '@supabase/supabase-js';

export async function captureSystemError(
  errorType: string,
  errorMessage: string,
  context?: Record<string, any>,
  errorStack?: string,
  userId?: string,
  requestId?: string
): Promise<void> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[captureSystemError] Missing Supabase credentials');
      return;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    await supabase.from('system_errors').insert({
      error_type: errorType,
      error_message: errorMessage,
      error_stack: errorStack,
      context: context || {},
      user_id: userId,
      request_id: requestId,
    });
  } catch (error) {
    // Don't throw - error capture should never break the app
    console.error('[captureSystemError] Failed to capture error:', error);
  }
}
