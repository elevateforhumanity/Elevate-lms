/**
 * Apply flow context management
 * Persists pathway selection across page navigations
 */

export type ApplyPathwayContext = {
  slug: string;
  program: string;
  source: 'pathway' | 'direct' | 'partner' | 'referral';
};

const STORAGE_KEY = 'efh_apply_pathway';

export function getApplyPathwayContext(): ApplyPathwayContext | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ApplyPathwayContext;
  } catch {
    return null;
  }
}

export function setApplyPathwayContext(ctx: ApplyPathwayContext): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // ignore storage errors
  }
}

export function clearApplyPathwayContext(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
