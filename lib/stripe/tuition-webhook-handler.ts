/**
 * TUITION WEBHOOK HANDLER
 * 
 * Handles Stripe webhook events for tuition payments:
 * - checkout.session.completed: Grant access, create subscription if installment plan
 * - invoice.paid: Track installment progress, check for completion
 * - invoice.payment_failed: Suspend access, send notification
 * - customer.subscription.deleted: Handle subscription end
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { 
  createInstallmentSubscription, 
  checkAndCancelCompletedSubscription,
  handleFailedPayment 
} from './tuition-checkout';
import { INSTALLMENT_RULES } from './tuition-config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function handleTuitionWebhook(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
      
    case 'invoice.paid':
      await handleInvoicePaid(event.data.object as Stripe.Invoice);
      break;
      
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;
      
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
  }
}

/**
 * CHECKOUT COMPLETED
 * - Grant course access
 * - Create subscription if installment plan
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const { metadata } = session;
  
  if (!metadata?.student_id || !metadata?.program_id) {
    console.error('Missing metadata in checkout session');
    return;
  }
  
  const studentId = metadata.student_id;
  const programId = metadata.program_id;
  const paymentOption = metadata.payment_option;
  
  console.log(`Checkout completed: ${paymentOption} for student ${studentId}`);
  
  // Record payment in database
  await supabase.from('tuition_payments').insert({
    student_id: studentId,
    program_id: programId,
    stripe_session_id: session.id,
    payment_option: paymentOption,
    amount_paid: session.amount_total ? session.amount_total / 100 : 0,
    status: 'completed',
    created_at: new Date().toISOString(),
  });
  
  // Handle based on payment option
  if (paymentOption === 'pay_in_full' || paymentOption === 'bnpl') {
    // Full payment received - grant full access
    await grantCourseAccess(studentId, programId, 'full');
    await updateEnrollmentStatus(studentId, programId, 'active', 'paid_in_full');
    
  } else if (paymentOption === 'installment_plan' && metadata.create_subscription === 'true') {
    // Deposit paid - create subscription for remaining balance
    const customerId = session.customer as string;
    const paymentIntentId = session.payment_intent as string;
    
    // Get the payment method from the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const paymentMethodId = paymentIntent.payment_method as string;
    
    // Create subscription for monthly payments
    const result = await createInstallmentSubscription(customerId, paymentMethodId, {
      student_id: studentId,
      program_id: programId,
      monthly_amount: metadata.monthly_amount!,
      number_of_months: metadata.number_of_months!,
    });
    
    if (result.success) {
      // Grant access after deposit
      await grantCourseAccess(studentId, programId, 'active');
      await updateEnrollmentStatus(studentId, programId, 'active', 'installment_plan');
      
      // Store subscription ID
      await supabase.from('tuition_subscriptions').insert({
        student_id: studentId,
        program_id: programId,
        stripe_subscription_id: result.subscriptionId,
        monthly_amount: parseInt(metadata.monthly_amount!),
        total_installments: parseInt(metadata.number_of_months!),
        installments_paid: 0,
        status: 'active',
        created_at: new Date().toISOString(),
      });
    } else {
      console.error('Failed to create subscription:', result.error);
      // Still grant access since deposit was paid, but flag for manual review
      await grantCourseAccess(studentId, programId, 'active');
      await updateEnrollmentStatus(studentId, programId, 'active', 'subscription_failed');
    }
  }
}

/**
 * INVOICE PAID (Subscription payment)
 * - Track installment progress
 * - Cancel subscription when complete
 */
async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  if (!invoice.subscription) return;
  
  const subscriptionId = invoice.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  // Only handle tuition installments
  if (subscription.metadata.payment_type !== 'tuition_installment') return;
  
  const studentId = subscription.metadata.student_id;
  const programId = subscription.metadata.program_id;
  
  console.log(`Installment paid for student ${studentId}`);
  
  // Record payment
  await supabase.from('tuition_payments').insert({
    student_id: studentId,
    program_id: programId,
    stripe_invoice_id: invoice.id,
    stripe_subscription_id: subscriptionId,
    payment_option: 'installment',
    amount_paid: invoice.amount_paid / 100,
    status: 'completed',
    created_at: new Date().toISOString(),
  });
  
  // Update installment count in database
  const { data: sub } = await supabase
    .from('tuition_subscriptions')
    .select('installments_paid, total_installments')
    .eq('stripe_subscription_id', subscriptionId)
    .single();
  
  if (sub) {
    const newCount = (sub.installments_paid || 0) + 1;
    
    await supabase
      .from('tuition_subscriptions')
      .update({ 
        installments_paid: newCount,
        last_payment_date: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscriptionId);
    
    // Check if all installments paid
    if (newCount >= sub.total_installments) {
      await supabase
        .from('tuition_subscriptions')
        .update({ status: 'completed' })
        .eq('stripe_subscription_id', subscriptionId);
      
      await updateEnrollmentStatus(studentId, programId, 'active', 'paid_in_full');
    }
  }
  
  // Check and cancel subscription if complete
  await checkAndCancelCompletedSubscription(subscriptionId);
  
  // Ensure access is active (in case it was suspended)
  await grantCourseAccess(studentId, programId, 'active');
}

/**
 * INVOICE PAYMENT FAILED
 * - Suspend course access
 * - Send notification
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  if (!invoice.subscription) return;
  
  const subscriptionId = invoice.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  // Only handle tuition installments
  if (subscription.metadata.payment_type !== 'tuition_installment') return;
  
  const studentId = subscription.metadata.student_id;
  const programId = subscription.metadata.program_id;
  
  console.log(`Payment failed for student ${studentId}`);
  
  // Record failed payment
  await supabase.from('tuition_payments').insert({
    student_id: studentId,
    program_id: programId,
    stripe_invoice_id: invoice.id,
    stripe_subscription_id: subscriptionId,
    payment_option: 'installment',
    amount_paid: 0,
    status: 'failed',
    created_at: new Date().toISOString(),
  });
  
  // Suspend access per INSTALLMENT_RULES
  if (INSTALLMENT_RULES.suspendOnFailure) {
    await suspendCourseAccess(studentId, programId, 'payment_failed');
    await updateEnrollmentStatus(studentId, programId, 'suspended', 'payment_failed');
  }
  
  // Update subscription status
  await supabase
    .from('tuition_subscriptions')
    .update({ 
      status: 'past_due',
      last_failed_date: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId);
  
  // TODO: Send notification email to student
  // await sendPaymentFailedEmail(studentId, programId);
}

/**
 * SUBSCRIPTION DELETED
 * - Handle cancellation or completion
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  if (subscription.metadata.payment_type !== 'tuition_installment') return;
  
  const studentId = subscription.metadata.student_id;
  const programId = subscription.metadata.program_id;
  
  const { data: sub } = await supabase
    .from('tuition_subscriptions')
    .select('installments_paid, total_installments, status')
    .eq('stripe_subscription_id', subscription.id)
    .single();
  
  if (sub) {
    const isComplete = sub.installments_paid >= sub.total_installments;
    
    if (isComplete) {
      // Subscription completed successfully
      console.log(`Subscription completed for student ${studentId}`);
      await supabase
        .from('tuition_subscriptions')
        .update({ status: 'completed' })
        .eq('stripe_subscription_id', subscription.id);
    } else {
      // Subscription cancelled before completion
      console.log(`Subscription cancelled early for student ${studentId}`);
      await supabase
        .from('tuition_subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', subscription.id);
      
      // Suspend access if not paid in full
      await suspendCourseAccess(studentId, programId, 'subscription_cancelled');
      await updateEnrollmentStatus(studentId, programId, 'suspended', 'subscription_cancelled');
    }
  }
}

/**
 * Helper: Grant course access
 */
async function grantCourseAccess(
  studentId: string, 
  programId: string, 
  accessLevel: 'full' | 'active'
): Promise<void> {
  await supabase
    .from('enrollments')
    .update({ 
      access_status: accessLevel,
      access_granted_at: new Date().toISOString(),
    })
    .eq('student_id', studentId)
    .eq('program_id', programId);
}

/**
 * Helper: Suspend course access
 */
async function suspendCourseAccess(
  studentId: string, 
  programId: string, 
  reason: string
): Promise<void> {
  await supabase
    .from('enrollments')
    .update({ 
      access_status: 'suspended',
      suspension_reason: reason,
      suspended_at: new Date().toISOString(),
    })
    .eq('student_id', studentId)
    .eq('program_id', programId);
}

/**
 * Helper: Update enrollment status
 */
async function updateEnrollmentStatus(
  studentId: string, 
  programId: string, 
  status: string,
  paymentStatus: string
): Promise<void> {
  await supabase
    .from('enrollments')
    .update({ 
      status,
      payment_status: paymentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('student_id', studentId)
    .eq('program_id', programId);
}
