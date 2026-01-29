// Stripe Price ID Mapping
// Maps store product IDs to Stripe Price IDs
//
// IMPORTANT: Before going live, set these environment variables:
// - STRIPE_PRICE_CR_GUIDE: Create product "The Elevate Capital Readiness Guide" ($39) in Stripe Dashboard
// - STRIPE_PRICE_CR_ENTERPRISE: Create enterprise tier product in Stripe Dashboard
//
// All placeholder IDs (price_PLACEHOLDER_*) must be replaced with real Stripe Price IDs

export const STRIPE_PRICE_IDS: Record<string, string> = {
  // Capital Readiness Guide Products
  // TODO: Set STRIPE_PRICE_CR_GUIDE in .env with real Stripe Price ID
  "capital-readiness-guide": process.env.STRIPE_PRICE_CR_GUIDE || "price_PLACEHOLDER_CR_GUIDE",
  // TODO: Set STRIPE_PRICE_CR_ENTERPRISE in .env with real Stripe Price ID
  "capital-readiness-enterprise": process.env.STRIPE_PRICE_CR_ENTERPRISE || "price_PLACEHOLDER_CR_ENTERPRISE",
  
  // Platform Licenses
  "efh-core": process.env.STRIPE_PRICE_CORE_ONETIME || "price_1Ss3aLIRNf5vPH3AtixJXl6D",
  "efh-core-3month": process.env.STRIPE_PRICE_CORE_3MONTH || "price_1Ss3aTIRNf5vPH3A9xZN6yvH",
  "efh-core-6month": process.env.STRIPE_PRICE_CORE_6MONTH || "price_1Ss3aTIRNf5vPH3AeT9kJunL",
  "efh-core-12month": process.env.STRIPE_PRICE_CORE_12MONTH || "price_1Ss3aUIRNf5vPH3AhWYE1qyw",
  "efh-school-license": process.env.STRIPE_PRICE_SCHOOL || "price_1Ss3aaIRNf5vPH3Ai4VLJjG6",
  "efh-enterprise": process.env.STRIPE_PRICE_ENTERPRISE || "price_1Ss3ajIRNf5vPH3AZ8vgaV46",
  
  // Subscription Plans
  "starter_monthly": process.env.STRIPE_PRICE_STARTER_MONTHLY || "price_1Ss3ZWIRNf5vPH3AuVbnrr9f",
  "starter_annual": process.env.STRIPE_PRICE_STARTER_ANNUAL || "price_1Ss3ZbIRNf5vPH3A3uBdM51z",
  "professional_monthly": process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY || "price_1Ss3ZnIRNf5vPH3AO9AOYaqR",
  "professional_annual": process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL || "price_1Ss3ZxIRNf5vPH3AG1bn8tRu",
  
  // Healthcare Courses
  "cna-certification": process.env.STRIPE_PRICE_CNA || "price_1Ss3atIRNf5vPH3ANvaqAzO9",
  "phlebotomy-certification": process.env.STRIPE_PRICE_PHLEBOTOMY || "price_1Ss3atIRNf5vPH3AEbMabQOt",
  "medical-assistant": process.env.STRIPE_PRICE_MEDICAL_ASSISTANT || "price_1Ss3auIRNf5vPH3A0UcyDI5U",
  
  // Skilled Trades Courses
  "cdl-training": process.env.STRIPE_PRICE_CDL || "price_1Ss3b3IRNf5vPH3AwF1d7Lgl",
  "hvac-certification": process.env.STRIPE_PRICE_HVAC || "price_1Ss3b3IRNf5vPH3AdlqIsVRL",
  "welding-certification": process.env.STRIPE_PRICE_WELDING || "price_1Ss3b4IRNf5vPH3A2bjMtqPF",
  "electrical-fundamentals": process.env.STRIPE_PRICE_ELECTRICAL || "price_1Ss3bCIRNf5vPH3AR7AZXQeZ",
  "plumbing-basics": process.env.STRIPE_PRICE_PLUMBING || "price_1Ss3bDIRNf5vPH3AJEdKkCFc",
  
  // Professional Services Courses
  "barber-license": process.env.STRIPE_PRICE_BARBER || "price_1Ss3bDIRNf5vPH3AQh4x3gYn",
  "cosmetology-license": process.env.STRIPE_PRICE_COSMETOLOGY || "price_1Ss3bXIRNf5vPH3AdF9ISYBO",
  "tax-preparation": process.env.STRIPE_PRICE_TAX_PREP || "price_1Ss3bPIRNf5vPH3AOz1FyRZ0",
  
  // Technology Courses
  "it-support-specialist": process.env.STRIPE_PRICE_IT_SUPPORT || "price_1Ss3bOIRNf5vPH3ArNQHT9HZ",
  "cybersecurity-fundamentals": process.env.STRIPE_PRICE_CYBERSECURITY || "price_1Ss3bOIRNf5vPH3A8mAE9YWr",
  
  // Human Services Courses
  "dsp-certification": process.env.STRIPE_PRICE_DSP || "price_1Ss3bXIRNf5vPH3AxFEVmeWz",
  "drug-collector-certification": process.env.STRIPE_PRICE_DRUG_COLLECTOR || "price_1Ss3bYIRNf5vPH3APCasxzte",
};

// Helper to check if price IDs are configured (not placeholders)
export function isPriceConfigured(productId: string): boolean {
  const priceId = STRIPE_PRICE_IDS[productId];
  return priceId !== undefined && 
         priceId.startsWith('price_') && 
         !priceId.includes('PLACEHOLDER');
}

// Get price ID for a product
export function getPriceId(productId: string): string | null {
  return STRIPE_PRICE_IDS[productId] || null;
}

// Runtime guard - throws if required price IDs are not configured
export function validateRequiredPriceIds(): void {
  const requiredProducts = [
    'capital-readiness-guide',
  ];

  const missingOrPlaceholder: string[] = [];

  for (const productId of requiredProducts) {
    if (!isPriceConfigured(productId)) {
      missingOrPlaceholder.push(productId);
    }
  }

  if (missingOrPlaceholder.length > 0) {
    throw new Error(
      `Missing or placeholder Stripe Price IDs for: ${missingOrPlaceholder.join(', ')}. ` +
      `Set the following env vars: ${missingOrPlaceholder.map(p => `STRIPE_PRICE_${p.toUpperCase().replace(/-/g, '_')}`).join(', ')}`
    );
  }
}
