/**
 * Avatar Configuration System
 * 
 * Rules:
 * 1. Avatars are DISABLED by default - pages must explicitly enable
 * 2. No global scripts - every message is page-scoped
 * 3. Same avatar identity, different context per page
 * 4. Marketing language never leaks into LMS
 * 5. Silence is better than repetition
 */

export type AvatarRole = 'guide' | 'system' | 'instructor' | 'assistant';
export type AvatarIntent = 'orient' | 'explain' | 'assist' | 'warn' | 'celebrate';

export interface AvatarContext {
  /** Whether avatar speaks on this page - DEFAULT: false */
  enabled: boolean;
  /** Avatar's role on this page */
  role: AvatarRole;
  /** What the avatar is trying to accomplish */
  intent: AvatarIntent;
  /** Page-specific message - NEVER reuse across pages */
  message: string;
  /** Optional follow-up if user interacts */
  followUp?: string;
  /** Max messages before avatar goes silent */
  maxMessages?: number;
}

// Default: Avatar is SILENT
export const DEFAULT_AVATAR_CONTEXT: AvatarContext = {
  enabled: false,
  role: 'guide',
  intent: 'orient',
  message: '',
  maxMessages: 0,
};

/**
 * Page-specific avatar configs
 * 
 * IMPORTANT: 
 * - If a page is not listed here, avatar is SILENT
 * - Messages must be unique per page
 * - No marketing language in LMS pages
 * - No brand introductions after homepage
 */
export const PAGE_AVATAR_CONFIGS: Record<string, AvatarContext> = {
  
  // ============================================
  // MARKETING PAGES (Contextual orientation)
  // ============================================
  
  '/': {
    enabled: true,
    role: 'guide',
    intent: 'orient',
    message: "Looking for career training? I can help you find the right program based on your goals and eligibility.",
    followUp: "Want me to walk you through the options?",
    maxMessages: 2,
  },
  
  '/programs': {
    enabled: true,
    role: 'guide',
    intent: 'explain',
    message: "This is our full program catalog. You can filter by category or check eligibility for funded training.",
    maxMessages: 1,
  },
  
  '/programs/cna': {
    enabled: true,
    role: 'guide',
    intent: 'explain',
    message: "CNA training takes 4-6 weeks. This page covers what you'll learn, certification details, and how to apply.",
    followUp: "Want to compare this with other healthcare programs?",
    maxMessages: 2,
  },
  
  '/programs/barber-apprenticeship': {
    enabled: true,
    role: 'guide',
    intent: 'explain',
    message: "This is a USDOL-registered apprenticeship. You'll train in a real shop while earning. The page explains hours, requirements, and how to find a host shop.",
    maxMessages: 1,
  },
  
  '/apply': {
    enabled: true,
    role: 'assistant',
    intent: 'assist',
    message: "This is the application. Nothing submits until you finish all steps. I'll flag anything required so you don't miss it.",
    maxMessages: 1,
  },
  
  '/wioa-eligibility': {
    enabled: true,
    role: 'guide',
    intent: 'explain',
    message: "This tool checks if you qualify for free training through WIOA funding. Answer honestly - it's confidential.",
    maxMessages: 1,
  },
  
  // ============================================
  // LMS PAGES (Functional, no marketing)
  // ============================================
  
  '/student-portal': {
    enabled: true,
    role: 'assistant',
    intent: 'orient',
    message: "Your portal shows courses, hours, and any required tasks. If something needs attention, it'll be flagged here.",
    maxMessages: 1,
  },
  
  '/student-portal/courses': {
    enabled: false, // Silent - UI is self-explanatory
    role: 'assistant',
    intent: 'orient',
    message: '',
    maxMessages: 0,
  },
  
  '/student-portal/progress': {
    enabled: true,
    role: 'assistant',
    intent: 'explain',
    message: "This tracks your completion. Green means done, yellow means in progress, red means overdue.",
    maxMessages: 1,
  },
  
  // ============================================
  // ENROLLMENT FLOW (Calm, procedural)
  // ============================================
  
  '/enroll/success': {
    enabled: true,
    role: 'guide',
    intent: 'celebrate',
    message: "You're enrolled. Next steps are listed below - orientation is usually first.",
    maxMessages: 1,
  },
  
  // ============================================
  // GOVERNANCE/POLICY (Silent by default)
  // ============================================
  
  '/policies/ferpa': {
    enabled: false,
    role: 'system',
    intent: 'explain',
    message: '',
    maxMessages: 0,
  },
  
  '/privacy': {
    enabled: false,
    role: 'system',
    intent: 'explain',
    message: '',
    maxMessages: 0,
  },
  
  // ============================================
  // STORE (Minimal assistance)
  // ============================================
  
  '/store': {
    enabled: false, // Silent - browsing doesn't need narration
    role: 'assistant',
    intent: 'assist',
    message: '',
    maxMessages: 0,
  },
  
  '/store/checkout': {
    enabled: true,
    role: 'assistant',
    intent: 'assist',
    message: "Review your order before completing. Payment is processed securely through Stripe.",
    maxMessages: 1,
  },
};

/**
 * Get avatar config for a page
 * Returns DEFAULT (disabled) if page not configured
 */
export function getAvatarConfig(pathname: string): AvatarContext {
  return PAGE_AVATAR_CONFIGS[pathname] || DEFAULT_AVATAR_CONTEXT;
}

/**
 * Check if avatar should speak on this page
 */
export function isAvatarEnabled(pathname: string): boolean {
  const config = getAvatarConfig(pathname);
  return config.enabled && config.message.length > 0;
}
