/**
 * Shop Routing Automation
 * 
 * Automated apprentice-to-shop placement that:
 * 1. Scores eligible shops by distance, capacity, and compatibility
 * 2. Persists recommendations
 * 3. Auto-assigns when confidence threshold met
 * 4. Routes to review when ambiguous
 * 
 * GUARDRAILS:
 * - Only routes to approved shops with signed MOUs
 * - Respects shop capacity limits
 * - Considers program compatibility
 * - All decisions logged to automated_decisions table
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { logger } from '@/lib/logger';

// ============================================
// TYPES
// ============================================

export interface ShopScore {
  shopId: string;
  shopName: string;
  score: number;
  distance: number | null;
  capacity: number;
  currentApprentices: number;
  availableSlots: number;
  programCompatible: boolean;
  mouValid: boolean;
  factors: {
    distanceScore: number;
    capacityScore: number;
    compatibilityScore: number;
    reputationScore: number;
  };
}

export interface RoutingResult {
  success: boolean;
  applicationId: string;
  outcome: 'auto_assigned' | 'recommendations_generated' | 'routed_to_review' | 'no_eligible_shops';
  assignedShopId?: string;
  recommendations: ShopScore[];
  decisionId?: string;
  reviewQueueId?: string;
  error?: string;
}

export interface RoutingContext {
  applicationId: string;
  apprenticeId: string;
  programId: string;
  apprenticeLocation?: {
    lat: number;
    lng: number;
  };
  preferredShopId?: string;
  maxDistance?: number; // miles
}

// ============================================
// CONFIGURATION
// ============================================

const RULESET_VERSION = '1.0.0';

// Scoring weights
const WEIGHTS = {
  distance: 0.35,
  capacity: 0.25,
  compatibility: 0.25,
  reputation: 0.15,
};

// Thresholds
const AUTO_ASSIGN_THRESHOLD = 0.85; // Score above this = auto-assign
const MIN_SCORE_FOR_RECOMMENDATION = 0.5;
const DEFAULT_MAX_DISTANCE = 25; // miles

// ============================================
// CORE ROUTING FUNCTIONS
// ============================================

/**
 * Route an apprentice application to eligible shops.
 * Called automatically when an application is submitted.
 */
export async function routeApplication(context: RoutingContext): Promise<RoutingResult> {
  const supabase = createAdminClient();
  const startTime = Date.now();

  try {
    logger.info('[ShopRouting] Starting routing', {
      applicationId: context.applicationId,
      programId: context.programId,
    });

    // Step 1: Get eligible shops
    const eligibleShops = await getEligibleShops(context.programId);

    if (eligibleShops.length === 0) {
      return await handleNoEligibleShops(supabase, context, startTime);
    }

    // Step 2: Score each shop
    const scoredShops = await scoreShops(eligibleShops, context);

    // Step 3: Filter by minimum score
    const recommendations = scoredShops
      .filter(s => s.score >= MIN_SCORE_FOR_RECOMMENDATION)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 recommendations

    if (recommendations.length === 0) {
      return await handleNoEligibleShops(supabase, context, startTime);
    }

    // Step 4: Persist recommendations
    await persistRecommendations(supabase, context.applicationId, recommendations);

    // Step 5: Determine outcome
    const topShop = recommendations[0];

    // Check if preferred shop is available and eligible
    if (context.preferredShopId) {
      const preferredShop = recommendations.find(s => s.shopId === context.preferredShopId);
      if (preferredShop && preferredShop.score >= MIN_SCORE_FOR_RECOMMENDATION) {
        return await autoAssign(supabase, context, preferredShop, recommendations, startTime, 'preferred_shop_available');
      }
    }

    // Auto-assign if top score exceeds threshold
    if (topShop.score >= AUTO_ASSIGN_THRESHOLD) {
      return await autoAssign(supabase, context, topShop, recommendations, startTime, 'high_confidence_match');
    }

    // Otherwise, generate recommendations for manual review
    return await generateRecommendations(supabase, context, recommendations, startTime);

  } catch (error) {
    logger.error('[ShopRouting] Routing failed', { applicationId: context.applicationId, error });
    return {
      success: false,
      applicationId: context.applicationId,
      outcome: 'routed_to_review',
      recommendations: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get shops eligible for a program.
 */
async function getEligibleShops(programId: string): Promise<Array<{
  id: string;
  name: string;
  lat: number | null;
  lng: number | null;
  capacity: number;
  current_apprentices: number;
  status: string;
  mou_valid: boolean;
  rating: number | null;
}>> {
  const supabase = createAdminClient();

  // Get shops with program access and valid MOU
  const { data: shops } = await supabase
    .from('partners')
    .select(`
      id,
      name,
      lat,
      lng,
      apprentice_capacity,
      status,
      partner_program_access!inner (
        program_id
      ),
      partner_mous (
        status,
        signed_at,
        expires_at
      )
    `)
    .eq('status', 'active')
    .eq('partner_program_access.program_id', programId);

  if (!shops) return [];

  // Get current apprentice counts
  const shopIds = shops.map(s => s.id);
  const { data: apprenticeCounts } = await supabase
    .from('apprentice_placements')
    .select('shop_id')
    .in('shop_id', shopIds)
    .eq('status', 'active');

  const countByShop = (apprenticeCounts || []).reduce((acc, p) => {
    acc[p.shop_id] = (acc[p.shop_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return shops.map(shop => {
    const mous = shop.partner_mous as any[] || [];
    const validMou = mous.some(m => 
      m.status === 'signed' && 
      (!m.expires_at || new Date(m.expires_at) > new Date())
    );

    return {
      id: shop.id,
      name: shop.name,
      lat: shop.lat,
      lng: shop.lng,
      capacity: shop.apprentice_capacity || 0,
      current_apprentices: countByShop[shop.id] || 0,
      status: shop.status,
      mou_valid: validMou,
      rating: null, // Could be populated from reviews
    };
  }).filter(shop => 
    shop.mou_valid && 
    shop.capacity > shop.current_apprentices
  );
}

/**
 * Score shops based on multiple factors.
 */
async function scoreShops(
  shops: Awaited<ReturnType<typeof getEligibleShops>>,
  context: RoutingContext
): Promise<ShopScore[]> {
  return shops.map(shop => {
    // Distance score (0-1, higher is better = closer)
    let distanceScore = 1;
    let distance: number | null = null;
    
    if (context.apprenticeLocation && shop.lat && shop.lng) {
      distance = calculateDistance(
        context.apprenticeLocation.lat,
        context.apprenticeLocation.lng,
        shop.lat,
        shop.lng
      );
      const maxDist = context.maxDistance || DEFAULT_MAX_DISTANCE;
      distanceScore = Math.max(0, 1 - (distance / maxDist));
    }

    // Capacity score (0-1, higher is better = more available slots)
    const availableSlots = shop.capacity - shop.current_apprentices;
    const capacityScore = Math.min(1, availableSlots / Math.max(1, shop.capacity));

    // Compatibility score (1 if program compatible, 0 otherwise)
    const compatibilityScore = 1; // Already filtered by program

    // Reputation score (based on rating, default to 0.7 if no rating)
    const reputationScore = shop.rating ? shop.rating / 5 : 0.7;

    // Calculate weighted score
    const score = 
      WEIGHTS.distance * distanceScore +
      WEIGHTS.capacity * capacityScore +
      WEIGHTS.compatibility * compatibilityScore +
      WEIGHTS.reputation * reputationScore;

    return {
      shopId: shop.id,
      shopName: shop.name,
      score,
      distance,
      capacity: shop.capacity,
      currentApprentices: shop.current_apprentices,
      availableSlots,
      programCompatible: true,
      mouValid: shop.mou_valid,
      factors: {
        distanceScore,
        capacityScore,
        compatibilityScore,
        reputationScore,
      },
    };
  });
}

/**
 * Calculate distance between two points using Haversine formula.
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Persist shop recommendations to database.
 */
async function persistRecommendations(
  supabase: ReturnType<typeof createAdminClient>,
  applicationId: string,
  recommendations: ShopScore[]
): Promise<void> {
  // Delete existing recommendations
  await supabase
    .from('shop_recommendations')
    .delete()
    .eq('application_id', applicationId);

  // Insert new recommendations
  const records = recommendations.map((rec, index) => ({
    application_id: applicationId,
    shop_id: rec.shopId,
    rank: index + 1,
    score: rec.score,
    distance_miles: rec.distance,
    factors: rec.factors,
    created_at: new Date().toISOString(),
  }));

  await supabase.from('shop_recommendations').insert(records);
}

/**
 * Auto-assign apprentice to a shop.
 */
async function autoAssign(
  supabase: ReturnType<typeof createAdminClient>,
  context: RoutingContext,
  shop: ShopScore,
  recommendations: ShopScore[],
  startTime: number,
  reason: string
): Promise<RoutingResult> {
  const processingTimeMs = Date.now() - startTime;

  // Create placement
  await supabase.from('apprentice_placements').insert({
    application_id: context.applicationId,
    apprentice_id: context.apprenticeId,
    shop_id: shop.shopId,
    program_id: context.programId,
    status: 'active',
    assigned_at: new Date().toISOString(),
    assigned_by: 'system',
    created_at: new Date().toISOString(),
  });

  // Update application status
  await supabase
    .from('applications')
    .update({
      status: 'placed',
      assigned_shop_id: shop.shopId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', context.applicationId);

  // Record automated decision
  const { data: decision } = await supabase
    .from('automated_decisions')
    .insert({
      entity_type: 'application',
      entity_id: context.applicationId,
      decision_type: 'shop_assignment',
      outcome: 'approved',
      actor: 'system',
      ruleset_version: RULESET_VERSION,
      confidence_score: shop.score,
      reason_codes: [reason, `score_${shop.score.toFixed(2)}`],
      input_snapshot: {
        assigned_shop: shop,
        all_recommendations: recommendations,
        context,
      },
      processing_time_ms: processingTimeMs,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Write audit log
  await supabase.from('audit_logs').insert({
    action: 'apprentice_auto_assigned',
    target_type: 'application',
    target_id: context.applicationId,
    actor_id: null, // System
    metadata: {
      shop_id: shop.shopId,
      shop_name: shop.shopName,
      score: shop.score,
      distance: shop.distance,
      reason,
      ruleset_version: RULESET_VERSION,
      processing_time_ms: processingTimeMs,
    },
    created_at: new Date().toISOString(),
  });

  logger.info('[ShopRouting] Apprentice auto-assigned', {
    applicationId: context.applicationId,
    shopId: shop.shopId,
    score: shop.score,
    reason,
    processingTimeMs,
  });

  return {
    success: true,
    applicationId: context.applicationId,
    outcome: 'auto_assigned',
    assignedShopId: shop.shopId,
    recommendations,
    decisionId: decision?.id,
  };
}

/**
 * Generate recommendations without auto-assigning.
 */
async function generateRecommendations(
  supabase: ReturnType<typeof createAdminClient>,
  context: RoutingContext,
  recommendations: ShopScore[],
  startTime: number
): Promise<RoutingResult> {
  const processingTimeMs = Date.now() - startTime;

  // Update application status
  await supabase
    .from('applications')
    .update({
      status: 'pending_placement',
      updated_at: new Date().toISOString(),
    })
    .eq('id', context.applicationId);

  // Create review queue item
  const { data: reviewItem } = await supabase
    .from('review_queue')
    .insert({
      entity_type: 'application',
      entity_id: context.applicationId,
      review_type: 'shop_assignment',
      priority: 3,
      status: 'pending',
      extracted_data: { recommendations },
      system_recommendation: `Top recommendation: ${recommendations[0].shopName} (score: ${recommendations[0].score.toFixed(2)})`,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Record automated decision
  const { data: decision } = await supabase
    .from('automated_decisions')
    .insert({
      entity_type: 'application',
      entity_id: context.applicationId,
      decision_type: 'shop_routing',
      outcome: 'routed_to_review',
      actor: 'system',
      ruleset_version: RULESET_VERSION,
      confidence_score: recommendations[0].score,
      reason_codes: ['below_auto_assign_threshold', `top_score_${recommendations[0].score.toFixed(2)}`],
      input_snapshot: {
        recommendations,
        context,
      },
      processing_time_ms: processingTimeMs,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Write audit log
  await supabase.from('audit_logs').insert({
    action: 'shop_recommendations_generated',
    target_type: 'application',
    target_id: context.applicationId,
    actor_id: null, // System
    metadata: {
      recommendation_count: recommendations.length,
      top_score: recommendations[0].score,
      review_queue_id: reviewItem?.id,
      ruleset_version: RULESET_VERSION,
      processing_time_ms: processingTimeMs,
    },
    created_at: new Date().toISOString(),
  });

  logger.info('[ShopRouting] Recommendations generated', {
    applicationId: context.applicationId,
    recommendationCount: recommendations.length,
    topScore: recommendations[0].score,
    reviewQueueId: reviewItem?.id,
    processingTimeMs,
  });

  return {
    success: true,
    applicationId: context.applicationId,
    outcome: 'recommendations_generated',
    recommendations,
    decisionId: decision?.id,
    reviewQueueId: reviewItem?.id,
  };
}

/**
 * Handle case when no eligible shops are found.
 */
async function handleNoEligibleShops(
  supabase: ReturnType<typeof createAdminClient>,
  context: RoutingContext,
  startTime: number
): Promise<RoutingResult> {
  const processingTimeMs = Date.now() - startTime;

  // Create review queue item
  const { data: reviewItem } = await supabase
    .from('review_queue')
    .insert({
      entity_type: 'application',
      entity_id: context.applicationId,
      review_type: 'shop_assignment',
      priority: 1, // High priority - no shops available
      status: 'pending',
      failed_rules: ['no_eligible_shops'],
      system_recommendation: 'No eligible shops found. Manual intervention required.',
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Record automated decision
  const { data: decision } = await supabase
    .from('automated_decisions')
    .insert({
      entity_type: 'application',
      entity_id: context.applicationId,
      decision_type: 'shop_routing',
      outcome: 'routed_to_review',
      actor: 'system',
      ruleset_version: RULESET_VERSION,
      reason_codes: ['no_eligible_shops'],
      input_snapshot: { context },
      processing_time_ms: processingTimeMs,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Write audit log
  await supabase.from('audit_logs').insert({
    action: 'no_eligible_shops',
    target_type: 'application',
    target_id: context.applicationId,
    actor_id: null,
    metadata: {
      program_id: context.programId,
      review_queue_id: reviewItem?.id,
      processing_time_ms: processingTimeMs,
    },
    created_at: new Date().toISOString(),
  });

  logger.warn('[ShopRouting] No eligible shops found', {
    applicationId: context.applicationId,
    programId: context.programId,
  });

  return {
    success: true,
    applicationId: context.applicationId,
    outcome: 'no_eligible_shops',
    recommendations: [],
    decisionId: decision?.id,
    reviewQueueId: reviewItem?.id,
  };
}

// ============================================
// TRIGGER FUNCTION
// ============================================

/**
 * Called when an apprentice application is submitted.
 * Triggers the routing process.
 */
export async function onApplicationSubmitted(
  applicationId: string,
  apprenticeId: string,
  programId: string,
  apprenticeLocation?: { lat: number; lng: number },
  preferredShopId?: string
): Promise<RoutingResult> {
  return routeApplication({
    applicationId,
    apprenticeId,
    programId,
    apprenticeLocation,
    preferredShopId,
  });
}

// ============================================
// EXPORTS
// ============================================

export {
  RULESET_VERSION,
  WEIGHTS,
  AUTO_ASSIGN_THRESHOLD,
  MIN_SCORE_FOR_RECOMMENDATION,
  DEFAULT_MAX_DISTANCE,
};
