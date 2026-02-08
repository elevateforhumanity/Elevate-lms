/**
 * Payment Options Calculator
 * 
 * Provides all payment options for barber apprenticeship:
 * 1. Standard Setup Fee (35%) + Weekly Payments
 * 2. Higher Setup Fee (50%, 75%) + Lower Weekly Payments
 * 3. Pay in Full (with discount)
 * 4. BNPL via Sezzle (4 payments)
 * 
 * All calculations account for transfer hours.
 */

import { BARBER_PRICING, calculateWeeklyPayment } from '@/lib/programs/pricing';

export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  setupFee: number;
  setupFeePercent: number;
  weeklyPayment: number;
  totalWeeks: number;
  totalCost: number;
  savings: number;
  recommended?: boolean;
  badge?: string;
}

export interface CustomSetupFeeResult {
  setupFee: number;
  setupFeePercent: number;
  remainingBalance: number;
  weeklyPayment: number;
  totalWeeks: number;
  miladyPortion: number; // $295 goes to Milady
  elevatePortion: number; // Rest stays with Elevate
  isValid: boolean;
  error?: string;
}

const MILADY_COST = 295;

/**
 * Calculate payment plan based on custom setup fee amount
 * 
 * Setup fee split:
 * - $295 → Milady (for RTI courses)
 * - Remainder → Elevate's Stripe balance
 * 
 * Weekly payment = (Total Price - Setup Fee) / Weeks Remaining
 * Weeks Remaining = Hours Remaining / Hours Per Week
 * 
 * Minimum setup fee is 35% of total (must cover Milady + some for Elevate)
 */
export function calculateCustomSetupFee(
  customSetupFee: number,
  programPrice: number,
  weeksRemaining: number
): CustomSetupFeeResult {
  const minSetupFee = Math.round(programPrice * 0.35);
  
  // Validate minimum
  if (customSetupFee < minSetupFee) {
    return {
      setupFee: customSetupFee,
      setupFeePercent: (customSetupFee / programPrice) * 100,
      remainingBalance: programPrice - customSetupFee,
      weeklyPayment: 0,
      totalWeeks: weeksRemaining,
      miladyPortion: MILADY_COST,
      elevatePortion: customSetupFee - MILADY_COST,
      isValid: false,
      error: `Minimum setup fee is ${formatCurrency(minSetupFee)} (35%)`,
    };
  }

  // Validate maximum (can't exceed total)
  if (customSetupFee >= programPrice) {
    return {
      setupFee: programPrice,
      setupFeePercent: 100,
      remainingBalance: 0,
      weeklyPayment: 0,
      totalWeeks: 0,
      miladyPortion: MILADY_COST,
      elevatePortion: programPrice - MILADY_COST,
      isValid: true, // Paying in full is valid
    };
  }

  const remainingBalance = programPrice - customSetupFee;
  const weeklyPayment = weeksRemaining > 0 
    ? Math.round((remainingBalance / weeksRemaining) * 100) / 100 
    : 0;

  return {
    setupFee: customSetupFee,
    setupFeePercent: Math.round((customSetupFee / programPrice) * 100),
    remainingBalance,
    weeklyPayment,
    totalWeeks: weeksRemaining,
    miladyPortion: MILADY_COST,
    elevatePortion: customSetupFee - MILADY_COST,
    isValid: true,
  };
}

export interface BNPLOption {
  id: string;
  provider: 'sezzle' | 'affirm' | 'klarna' | 'afterpay' | 'cashapp';
  name: string;
  description: string;
  totalAmount: number;
  numberOfPayments?: number;
  paymentAmount?: number;
  frequency?: string;
  interestFree: boolean;
  minAmount?: number;
  maxAmount?: number;
  terms?: string;
  logo?: string;
}

export interface PaymentOptionsResult {
  // Program price (FIXED, never changes)
  programPrice: number;
  // Amount already paid
  amountPaid: number;
  // Current remaining balance (programPrice - amountPaid)
  remainingBalance: number;
  // Transfer hours (affects weeks, not price)
  transferHours: number;
  // Hours info
  hoursRemaining: number;
  hoursPerWeek: number;
  weeksRemaining: number;
  // Minimum setup fee (35% of total) - only for new enrollments
  minSetupFee: number;
  // Weekly payment amount (fixed based on initial calculation)
  weeklyPayment: number;
  // Weeks left to pay
  weeksLeftToPay: number;
  
  // Standard payment plans (for new enrollments)
  paymentPlans: PaymentOption[];
  
  // Pay in full option
  payInFull: {
    amount: number;
    discount: number;
    discountPercent: number;
    savings: number;
  };
  
  // BNPL options
  bnplOptions: BNPLOption[];
}

/**
 * Calculate all payment options based on student's situation
 * 
 * IMPORTANT: Program price is FIXED ($4,980) - never changes
 * After payments, the REMAINING BALANCE decreases
 * Weekly payment amount is calculated once at enrollment and stays fixed
 * 
 * For NEW enrollment:
 * - Weekly = (Program Price - Setup Fee) / Weeks
 * - Weeks = Hours Remaining / Hours Per Week
 * 
 * For EXISTING student:
 * - Remaining Balance = Program Price - Amount Paid
 * - Weekly payment stays the same as originally calculated
 * - Weeks left = Remaining Balance / Weekly Payment
 */
export function calculatePaymentOptions(
  hoursPerWeek: number = 40,
  transferHours: number = 0,
  amountPaid: number = 0, // For existing students
  existingWeeklyPayment: number = 0 // If already enrolled
): PaymentOptionsResult {
  const { fullPrice: programPrice, totalHoursRequired } = BARBER_PRICING;
  const hoursRemaining = Math.max(0, totalHoursRequired - transferHours);
  
  // Calculate weeks remaining based on hours per week
  const weeksRemaining = hoursRemaining > 0 ? Math.ceil(hoursRemaining / hoursPerWeek) : 0;
  
  // Current remaining balance
  const remainingBalance = programPrice - amountPaid;
  
  // Minimum setup fee is 35% of program price (for new enrollments)
  const minSetupFee = Math.round(programPrice * 0.35);
  
  // Calculate weekly payment
  // For new enrollment: Weekly = (Program Price - Setup Fee) / Weeks
  // For existing student: Use their existing weekly payment
  const defaultSetupFee = minSetupFee;
  const balanceAfterSetup = programPrice - defaultSetupFee;
  const calculatedWeeklyPayment = weeksRemaining > 0 
    ? Math.round((balanceAfterSetup / weeksRemaining) * 100) / 100 
    : 0;
  
  // Use existing weekly payment if student already enrolled, otherwise calculate new
  const weeklyPayment = existingWeeklyPayment > 0 ? existingWeeklyPayment : calculatedWeeklyPayment;
  
  // Calculate weeks left to pay based on remaining balance
  const weeksLeftToPay = weeklyPayment > 0 
    ? Math.ceil(remainingBalance / weeklyPayment) 
    : 0;

  const defaultPlan: PaymentOption = {
    id: 'custom',
    name: 'Payment Plan',
    description: `${formatCurrency(calculatedWeeklyPayment)}/week for ${weeksRemaining} weeks after setup fee`,
    setupFee: defaultSetupFee,
    setupFeePercent: 35,
    weeklyPayment: calculatedWeeklyPayment,
    totalWeeks: weeksRemaining,
    totalCost: programPrice,
    savings: 0,
    recommended: true,
  };

  const paymentPlans: PaymentOption[] = [defaultPlan];

  // Pay in full discount (5% off)
  const payInFullDiscount = 0.05;
  const payInFullAmount = Math.round(programPrice * (1 - payInFullDiscount));
  const payInFullSavings = programPrice - payInFullAmount;

  // BNPL options - All available providers
  const bnplOptions: BNPLOption[] = [
    // Sezzle (external integration)
    {
      id: 'sezzle',
      provider: 'sezzle',
      name: 'Sezzle',
      description: '4 interest-free payments, every 2 weeks',
      totalAmount: programPrice,
      numberOfPayments: 4,
      paymentAmount: Math.round(programPrice / 4 * 100) / 100,
      frequency: 'bi-weekly',
      interestFree: true,
      minAmount: 35,
      maxAmount: 17500,
      logo: 'https://d34uoa9py2cgca.cloudfront.net/sezzle-logos/sezzle-logo-purple.svg',
    },
    // Affirm (Stripe integrated)
    {
      id: 'affirm',
      provider: 'affirm',
      name: 'Affirm',
      description: 'Pay over 3-36 months. Rates from 0% APR.',
      totalAmount: programPrice,
      interestFree: false, // May have interest depending on terms
      minAmount: 50,
      maxAmount: 30000,
      terms: '3-36 months financing',
      logo: 'https://cdn.affirm.com/brand/buttons/checkout/affirm-logo.svg',
    },
    // Klarna (Stripe integrated)
    {
      id: 'klarna',
      provider: 'klarna',
      name: 'Klarna',
      description: '4 interest-free payments or monthly financing',
      totalAmount: programPrice,
      numberOfPayments: 4,
      paymentAmount: Math.round(programPrice / 4 * 100) / 100,
      frequency: 'bi-weekly',
      interestFree: true,
      minAmount: 35,
      maxAmount: 10000,
      terms: 'Pay in 4 or monthly financing',
      logo: 'https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg',
    },
    // Afterpay (Stripe integrated)
    {
      id: 'afterpay',
      provider: 'afterpay',
      name: 'Afterpay',
      description: '4 interest-free payments, every 2 weeks',
      totalAmount: programPrice,
      numberOfPayments: 4,
      paymentAmount: Math.round(programPrice / 4 * 100) / 100,
      frequency: 'bi-weekly',
      interestFree: true,
      minAmount: 35,
      maxAmount: 4000,
      logo: 'https://static.afterpay.com/app/icon-128x128.png',
    },
    // Cash App Pay (Stripe integrated)
    {
      id: 'cashapp',
      provider: 'cashapp',
      name: 'Cash App Pay',
      description: 'Pay instantly with Cash App',
      totalAmount: programPrice,
      interestFree: true,
      logo: 'https://cash.app/icon-196.png',
    },
  ];

  return {
    programPrice,
    amountPaid,
    remainingBalance,
    transferHours,
    hoursRemaining,
    hoursPerWeek,
    weeksRemaining,
    minSetupFee,
    weeklyPayment,
    weeksLeftToPay,
    paymentPlans,
    payInFull: {
      amount: payInFullAmount,
      discount: payInFullSavings,
      discountPercent: payInFullDiscount * 100,
      savings: payInFullSavings,
    },
    bnplOptions,
  };
}

/**
 * Generate a single payment plan option
 */
function generatePaymentPlan(params: {
  id: string;
  name: string;
  description: string;
  setupFeePercent: number;
  programPrice: number;
  weeksRemaining: number;
  recommended?: boolean;
  badge?: string;
}): PaymentOption {
  const { id, name, description, setupFeePercent, programPrice, weeksRemaining, recommended, badge } = params;
  
  const setupFee = Math.round(programPrice * setupFeePercent);
  const remainingBalance = programPrice - setupFee;
  const weeklyPayment = weeksRemaining > 0 
    ? Math.round((remainingBalance / weeksRemaining) * 100) / 100 
    : 0;
  
  return {
    id,
    name,
    description,
    setupFee,
    setupFeePercent: setupFeePercent * 100,
    weeklyPayment,
    totalWeeks: weeksRemaining,
    totalCost: programPrice,
    savings: 0, // No savings on payment plans
    recommended,
    badge,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get payment summary text
 */
export function getPaymentSummary(option: PaymentOption): string {
  if (option.weeklyPayment === 0) {
    return `${formatCurrency(option.setupFee)} one-time payment`;
  }
  return `${formatCurrency(option.setupFee)} today, then ${formatCurrency(option.weeklyPayment)}/week for ${option.totalWeeks} weeks`;
}
