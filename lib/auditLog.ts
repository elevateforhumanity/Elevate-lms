import { createAdminClient } from '@/lib/supabase/admin';

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'EXPORT'
  | 'LOGIN'
  | 'LOGOUT'
  | 'APPROVE'
  | 'REJECT'
  | 'SUBMIT';

export type AuditEntity =
  | 'referral'
  | 'apprentice'
  | 'employer'
  | 'funding'
  | 'rapids'
  | 'invoice'
  | 'wotc'
  | 'ojt'
  | 'user'
  | 'audit_snapshot'
  | 'employer_onboarding';

export type ActorRole = 'sponsor' | 'employer' | 'workone' | 'admin' | 'system';

export interface AuditLogParams {
  actor_user_id?: string;
  actor_role?: ActorRole;
  action: AuditAction;
  entity: AuditEntity;
  entity_id?: string;
  before?: any;
  after?: any;
  req?: Request;
  metadata?: Record<string, unknown>;
}

/**
 * Immutable audit logging for compliance and oversight
 *
 * Usage:
 * await auditLog({
 *   actor_user_id: user.id,
 *   actor_role: 'sponsor',
 *   action: 'UPDATE',
 *   entity: 'funding',
 *   entity_id: fundingCase.id,
 *   before: oldData,
 *   after: newData,
 *   req
 * })
 */
export async function auditLog({
  actor_user_id,
  actor_role = 'system',
  action,
  entity,
  entity_id,
  before,
  after,
  req,
  metadata,
}: AuditLogParams): Promise<void> {
  try {
    const supabase = createAdminClient();

    const logEntry = {
      actor_user_id,
      actor_role,
      action,
      entity,
      entity_id,
      before: before ? JSON.parse(JSON.stringify(before)) : null,
      after: after ? JSON.parse(JSON.stringify(after)) : null,
      ip_address: req?.headers.get('x-forwarded-for') || req?.headers.get('x-real-ip') || null,
      user_agent: req?.headers.get('user-agent') || null,
      metadata: metadata || null,
    };

    const { error } = await supabase.from('audit_logs').insert([logEntry]);

    if (error) {
      console.error('Failed to write audit log:', error);
      // Don't throw - audit logging should never break the main flow
    }
  } catch (error: unknown) {
    console.error('Audit log exception:', error);
    // Silent fail - audit logging is critical but shouldn't break operations
  }
}

/**
 * Query audit logs for a specific entity
 */
export async function getAuditLogs(
  entity: AuditEntity,
  entity_id?: string,
  limit = 100
) {
  const supabase = createAdminClient();

  let query = supabase
    .from('audit_logs')
    .select('*')
    .eq('entity', entity)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (entity_id) {
    query = query.eq('entity_id', entity_id);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch audit logs:', error);
    return [];
  }

  return data || [];
}

/**
 * Query audit logs by actor
 */
export async function getAuditLogsByActor(
  actor_user_id: string,
  limit = 100
) {
  const supabase = createAdminClient();

  const { data, error }: any = await supabase
    .from('audit_logs')
    .select('*')
    .eq('actor_user_id', actor_user_id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch audit logs by actor:', error);
    return [];
  }

  return data || [];
}

/**
 * Get audit log statistics
 */
export async function getAuditStats(days = 30) {
  const supabase = createAdminClient();

  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error }: any = await supabase
    .from('audit_logs')
    .select('action, entity, actor_role')
    .gte('created_at', since.toISOString());

  if (error || !data) {
    return {
      total: 0,
      byAction: {},
      byEntity: {},
      byRole: {},
    };
  }

  const stats = {
    total: data.length,
    byAction: data.reduce((acc: any, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {}),
    byEntity: data.reduce((acc: any, log) => {
      acc[log.entity] = (acc[log.entity] || 0) + 1;
      return acc;
    }, {}),
    byRole: data.reduce((acc: any, log) => {
      acc[log.actor_role] = (acc[log.actor_role] || 0) + 1;
      return acc;
    }, {}),
  };

  return stats;
}

/**
 * Helper to log before/after changes
 */
export async function auditChange(
  params: Omit<AuditLogParams, 'action'> & { action?: AuditAction }
) {
  return auditLog({
    ...params,
    action: params.action || 'UPDATE',
  });
}

/**
 * Helper to log exports (for DWD/WorkOne compliance)
 */
export async function auditExport(
  entity: AuditEntity,
  actor_user_id?: string,
  actor_role: ActorRole = 'workone',
  req?: Request
) {
  return auditLog({
    actor_user_id,
    actor_role,
    action: 'EXPORT',
    entity,
    req,
  });
}
