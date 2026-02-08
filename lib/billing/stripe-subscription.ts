/**
 * Stripe Subscription System for Weekly Payments
 * 
 * After student pays setup fee, they are enrolled in a Stripe subscription
 * that automatically charges their card every Friday.
 * 
 * Flow:
 * 1. Student pays setup fee ($1,743) via Stripe Checkout
 * 2. After payment, create Stripe subscription for weekly payments
 * 3. Stripe automatically charges every Friday
 * 4. If payment fails, student cannot clock in
 * 5. Stripe handles dunning (retry logic, emails)
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { BARBER_PRICING, calculateWeeklyPayment } from '@/lib/programs/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export interface SubscriptionResult {
  success: boolean;
  subscriptionId?: string;
  customerId?: string;
  weeklyAmount?: number;
  nextBillingDate?: string;
  error?: string;
}

/**
 * Create or get Stripe customer for student
 */
async function getOrCreateStripeCustomer(
  email: string,
  name: string,
  studentId: string,
  paymentMethodId?: string
): Promise<string> {
  // Check if customer exists
  const customers = await stripe.customers.list({
    email: email.toLowerCase(),
    limit: 1,
  });

  if (customers.data.length > 0) {
    const customer = customers.data[0];
    
    // Attach payment method if provided
    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
    }
    
    return customer.id;
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email: email.toLowerCase(),
    name,
    metadata: {
      student_id: studentId,
      program: 'barber-apprenticeship',
    },
  });

  // Attach payment method if provided
  if (paymentMethodId) {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  }

  return customer.id;
}

/**
 * Create weekly subscription after setup fee is paid
 * Called from Stripe webhook after checkout.session.completed
 */
export async function createWeeklySubscription(params: {
  studentId: string;
  customerId: string;
  hoursPerWeek: number;
  transferHours: number;
  paymentMethodId?: string;
}): Promise<SubscriptionResult> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { studentId, customerId, hoursPerWeek, transferHours, paymentMethodId } = params;

    // Calculate weekly payment amount
    const calculation = calculateWeeklyPayment(hoursPerWeek, transferHours);
    const weeklyAmountCents = calculation.weeklyPaymentCents;

    // Get next Friday for billing anchor
    const nextFriday = getNextFriday();
    const billingAnchor = Math.floor(nextFriday.getTime() / 1000);

    // Create or get the weekly payment price
    // Using inline price for flexibility (amount varies per student)
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Barber Apprenticeship - Weekly Tuition',
            metadata: {
              student_id: studentId,
              program: 'barber-apprenticeship',
            },
          },
          unit_amount: weeklyAmountCents,
          recurring: {
            interval: 'week',
            interval_count: 1,
          },
        },
      }],
      billing_cycle_anchor: billingAnchor,
      proration_behavior: 'none',
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        student_id: studentId,
        program: 'barber-apprenticeship',
        hours_per_week: hoursPerWeek.toString(),
        transfer_hours: transferHours.toString(),
        weekly_amount: calculation.weeklyPaymentDollars.toString(),
        total_weeks: calculation.weeksRemaining.toString(),
      },
      // Cancel after all payments are made
      cancel_at: calculateSubscriptionEndDate(calculation.weeksRemaining),
    });

    // Store subscription info in database
    await supabase.from('student_subscriptions').upsert({
      student_id: studentId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      weekly_amount: calculation.weeklyPaymentDollars,
      total_weeks: calculation.weeksRemaining,
      weeks_paid: 0,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      created_at: new Date().toISOString(),
    }, { onConflict: 'student_id' });

    // Update enrollment with subscription info
    await supabase
      .from('student_enrollments')
      .update({
        stripe_subscription_id: subscription.id,
        weekly_payment_amount: calculation.weeklyPaymentDollars,
        payment_status: 'active',
      })
      .eq('student_id', studentId)
      .eq('program_slug', 'barber-apprenticeship');

    return {
      success: true,
      subscriptionId: subscription.id,
      customerId,
      weeklyAmount: calculation.weeklyPaymentDollars,
      nextBillingDate: nextFriday.toISOString(),
    };
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if student's subscription is active (can clock in)
 */
export async function checkSubscriptionStatus(studentId: string): Promise<{
  canClockIn: boolean;
  reason?: string;
  amountDue?: number;
  paymentUrl?: string;
  subscriptionStatus?: string;
}> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get subscription info
  const { data: subscription } = await supabase
    .from('student_subscriptions')
    .select('*')
    .eq('student_id', studentId)
    .single();

  if (!subscription) {
    return { 
      canClockIn: false, 
      reason: 'No active payment plan found. Please contact support.' 
    };
  }

  // Check Stripe subscription status
  try {
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id
    );

    // Update local status
    await supabase
      .from('student_subscriptions')
      .update({ status: stripeSubscription.status })
      .eq('student_id', studentId);

    if (stripeSubscription.status === 'active') {
      return { canClockIn: true, subscriptionStatus: 'active' };
    }

    if (stripeSubscription.status === 'past_due') {
      // Get the latest unpaid invoice
      const invoices = await stripe.invoices.list({
        subscription: subscription.stripe_subscription_id,
        status: 'open',
        limit: 1,
      });

      const unpaidInvoice = invoices.data[0];
      
      return {
        canClockIn: false,
        reason: 'Your weekly payment is past due. Please update your payment method to continue training.',
        amountDue: unpaidInvoice ? unpaidInvoice.amount_due / 100 : subscription.weekly_amount,
        paymentUrl: unpaidInvoice?.hosted_invoice_url || undefined,
        subscriptionStatus: 'past_due',
      };
    }

    if (stripeSubscription.status === 'canceled' || stripeSubscription.status === 'unpaid') {
      return {
        canClockIn: false,
        reason: 'Your payment plan has been suspended. Please contact support to reinstate.',
        subscriptionStatus: stripeSubscription.status,
      };
    }

    // For other statuses (trialing, incomplete, etc.)
    return { 
      canClockIn: true, 
      subscriptionStatus: stripeSubscription.status 
    };
  } catch (error: any) {
    console.error('Error checking subscription:', error);
    // If we can't check Stripe, use local status
    if (subscription.status === 'active') {
      return { canClockIn: true };
    }
    return { 
      canClockIn: false, 
      reason: 'Unable to verify payment status. Please try again.' 
    };
  }
}

/**
 * Handle subscription payment success (from webhook)
 */
export async function handleSubscriptionPaymentSuccess(
  subscriptionId: string,
  invoiceId: string,
  amountPaid: number
): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get subscription
  const { data: subscription } = await supabase
    .from('student_subscriptions')
    .select('*')
    .eq('stripe_subscription_id', subscriptionId)
    .single();

  if (!subscription) return;

  // Update weeks paid
  await supabase
    .from('student_subscriptions')
    .update({
      weeks_paid: subscription.weeks_paid + 1,
      status: 'active',
      last_payment_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId);

  // Record payment
  await supabase.from('student_payments').insert({
    student_id: subscription.student_id,
    stripe_invoice_id: invoiceId,
    stripe_subscription_id: subscriptionId,
    amount: amountPaid,
    type: 'weekly_payment',
    status: 'completed',
    created_at: new Date().toISOString(),
  });

  // Update enrollment payment status
  await supabase
    .from('student_enrollments')
    .update({ payment_status: 'current' })
    .eq('student_id', subscription.student_id);
}

/**
 * Handle subscription payment failure (from webhook)
 */
export async function handleSubscriptionPaymentFailure(
  subscriptionId: string,
  invoiceId: string,
  failureReason: string
): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Update subscription status
  await supabase
    .from('student_subscriptions')
    .update({
      status: 'past_due',
      last_failure_reason: failureReason,
      last_failure_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId);

  // Get student info for notification
  const { data: subscription } = await supabase
    .from('student_subscriptions')
    .select('student_id, profiles!inner(email, full_name)')
    .eq('stripe_subscription_id', subscriptionId)
    .single();

  if (subscription) {
    // Update enrollment payment status
    await supabase
      .from('student_enrollments')
      .update({ payment_status: 'past_due' })
      .eq('student_id', subscription.student_id);

    // Log the failure
    await supabase.from('payment_failures').insert({
      student_id: subscription.student_id,
      stripe_invoice_id: invoiceId,
      stripe_subscription_id: subscriptionId,
      failure_reason: failureReason,
      created_at: new Date().toISOString(),
    });
  }
}

/**
 * Update payment method for subscription
 */
export async function updatePaymentMethod(
  studentId: string,
  paymentMethodId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: subscription } = await supabase
      .from('student_subscriptions')
      .select('stripe_customer_id, stripe_subscription_id')
      .eq('student_id', studentId)
      .single();

    if (!subscription) {
      return { success: false, error: 'No subscription found' };
    }

    // Attach new payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: subscription.stripe_customer_id,
    });

    // Set as default
    await stripe.customers.update(subscription.stripe_customer_id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // Update subscription to use new payment method
    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      default_payment_method: paymentMethodId,
    });

    // Retry any failed invoices
    const invoices = await stripe.invoices.list({
      subscription: subscription.stripe_subscription_id,
      status: 'open',
    });

    for (const invoice of invoices.data) {
      try {
        await stripe.invoices.pay(invoice.id);
      } catch (e) {
        // Invoice might not be payable yet
      }
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Get next Friday at 10 AM Eastern
 */
function getNextFriday(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
  
  // If today is Friday and before 10 AM, use today
  if (dayOfWeek === 5 && now.getHours() < 10) {
    const today = new Date(now);
    today.setHours(10, 0, 0, 0);
    return today;
  }
  
  // Otherwise, next Friday
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + (daysUntilFriday || 7));
  nextFriday.setHours(10, 0, 0, 0);
  return nextFriday;
}

/**
 * Calculate when subscription should end (after all weeks paid)
 */
function calculateSubscriptionEndDate(totalWeeks: number): number {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + (totalWeeks * 7) + 7); // Add buffer week
  return Math.floor(endDate.getTime() / 1000);
}
