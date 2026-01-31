import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';
import { BARBER_PRICING, calculateWeeklyPayment } from '@/lib/programs/pricing';

const MILADY_LOGIN_URL = 'https://www.miladytraining.com/users/sign_in';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });
}

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET_BARBER || process.env.STRIPE_WEBHOOK_SECRET || '';
}

/**
 * POST /api/barber/webhook
 * 
 * Handles Stripe webhook events for Barber Apprenticeship subscriptions.
 * 
 * On checkout.session.completed (deposit paid):
 * 1. Store subscription details
 * 2. Create/upsert apprentice record
 * 3. Generate magic link for dashboard access
 * 4. Send welcome email (idempotent)
 * 5. Send Milady email (idempotent)
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();
  const adminClient = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Only process barber enrollments
        if (session.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        const subscriptionId = session.subscription as string;
        const userId = session.metadata?.user_id;
        const enrollmentId = session.metadata?.enrollment_id;
        const customerEmail = session.customer_details?.email || session.customer_email || '';
        const customerName = session.customer_details?.name || '';

        if (!subscriptionId || !userId) {
          console.error('Missing subscription or user ID');
          break;
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Store subscription in database with email tracking fields
        const { data: subscriptionRecord } = await supabase.from('barber_subscriptions').upsert({
          user_id: userId,
          enrollment_id: enrollmentId || null,
          stripe_subscription_id: subscriptionId,
          stripe_customer_id: session.customer as string,
          customer_email: customerEmail,
          customer_name: customerName,
          status: subscription.status,
          setup_fee_paid: true,
          setup_fee_amount: BARBER_PRICING.setupFee,
          weekly_payment_cents: parseInt(subscription.metadata?.weekly_payment_cents || '0'),
          weeks_remaining: parseInt(subscription.metadata?.weeks_remaining || '0'),
          hours_per_week: parseInt(subscription.metadata?.hours_per_week || '40'),
          transferred_hours_verified: parseInt(subscription.metadata?.transferred_hours_verified || '0'),
          billing_cycle_anchor: new Date((subscription.billing_cycle_anchor || 0) * 1000).toISOString(),
          current_period_start: new Date((subscription.current_period_start || 0) * 1000).toISOString(),
          current_period_end: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
          created_at: new Date().toISOString(),
        }, {
          onConflict: 'stripe_subscription_id',
        }).select().single();

        // Update enrollment status if enrollment_id provided
        if (enrollmentId) {
          await supabase
            .from('enrollments')
            .update({ 
              payment_status: 'active',
              stripe_subscription_id: subscriptionId,
            })
            .eq('id', enrollmentId);
        }

        // === NEW: Create/upsert apprentice record ===
        const { data: existingApprentice } = await supabase
          .from('apprentices')
          .select('id, start_date')
          .eq('user_id', userId)
          .single();

        let apprenticeId: string;
        if (existingApprentice) {
          // Update existing - only set start_date if null
          apprenticeId = existingApprentice.id;
          await supabase
            .from('apprentices')
            .update({
              status: 'active',
              barber_subscription_id: subscriptionRecord?.id,
              ...(existingApprentice.start_date ? {} : { start_date: new Date().toISOString() }),
            })
            .eq('id', apprenticeId);
        } else {
          // Create new apprentice record
          const { data: newApprentice } = await supabase
            .from('apprentices')
            .insert({
              user_id: userId,
              status: 'active',
              start_date: new Date().toISOString(),
              barber_subscription_id: subscriptionRecord?.id,
            })
            .select()
            .single();
          apprenticeId = newApprentice?.id;
        }

        // Link apprentice to subscription
        if (apprenticeId && subscriptionRecord?.id) {
          await supabase
            .from('barber_subscriptions')
            .update({ apprentice_id: apprenticeId })
            .eq('id', subscriptionRecord.id);
        }

        // === NEW: Send emails (idempotent - check if already sent) ===
        const { data: subRecord } = await supabase
          .from('barber_subscriptions')
          .select('welcome_email_sent_at, milady_email_sent_at')
          .eq('stripe_subscription_id', subscriptionId)
          .single();

        // Generate login credentials for the student
        let generatedPassword = '';
        let loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/login`;
        let dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/apprentice`;
        
        // Check if user already exists, if not create with generated password
        if (adminClient && customerEmail) {
          try {
            // Generate a secure temporary password
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
            generatedPassword = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
            
            // Check if user exists
            const { data: existingUser } = await adminClient.auth.admin.getUserById(userId);
            
            if (!existingUser?.user) {
              // Create new user with generated password
              await adminClient.auth.admin.createUser({
                email: customerEmail,
                password: generatedPassword,
                email_confirm: true,
                user_metadata: {
                  full_name: customerName,
                  program: 'barber-apprenticeship',
                },
              });
              console.log(`Created new user account for ${customerEmail}`);
            } else {
              // User exists - update their password so they have fresh credentials
              await adminClient.auth.admin.updateUserById(userId, {
                password: generatedPassword,
              });
              console.log(`Updated password for existing user ${customerEmail}`);
            }
          } catch (authErr) {
            console.error('User credential generation failed:', authErr);
            // Continue without credentials - they can use password reset
          }
        }

        // Send Welcome Email with Login Credentials (if not already sent)
        if (!subRecord?.welcome_email_sent_at && customerEmail) {
          try {
            const { sendEmail } = await import('@/lib/email/resend');
            const weeklyPayment = (parseInt(subscription.metadata?.weekly_payment_cents || '0') / 100).toFixed(2);
            const firstBillingDate = subscription.metadata?.first_billing_date || 'the following Friday';
            
            await sendEmail({
              to: customerEmail,
              subject: 'Welcome to Barber Apprenticeship - Your Login Credentials',
              html: `
                <h2>Welcome to the Barber Apprenticeship Program!</h2>
                <p>Hi ${customerName || 'there'},</p>
                <p>Your enrollment is confirmed and your account is ready.</p>
                
                <div style="background:#f3f4f6;padding:20px;border-radius:8px;margin:20px 0;">
                  <h3 style="margin-top:0;">Your Login Credentials</h3>
                  <p><strong>Email:</strong> ${customerEmail}</p>
                  <p><strong>Temporary Password:</strong> ${generatedPassword || '(Use forgot password to set one)'}</p>
                  <p style="font-size:14px;color:#666;">Please change your password after first login.</p>
                </div>
                
                <p><a href="${loginUrl}" style="display:inline-block;padding:12px 24px;background:#7c3aed;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">Log In Now</a></p>
                
                <h3>Next Steps After Login:</h3>
                <ul>
                  <li>Complete your onboarding checklist</li>
                  <li>Sign your Memorandum of Understanding (MOU)</li>
                  <li>Set up your timeclock for tracking hours</li>
                  <li>Review your weekly payment schedule</li>
                </ul>
                
                <h3>Payment Schedule:</h3>
                <ul>
                  <li>Setup fee of $${BARBER_PRICING.setupFee.toLocaleString()} has been paid</li>
                  <li>Weekly payments of $${weeklyPayment} begin ${firstBillingDate}</li>
                  <li>Payments are charged every Friday at 10 AM</li>
                </ul>
                
                <p>Questions? Reply to this email or call (317) 314-3757.</p>
                
                <p>— Elevate for Humanity Team</p>
              `,
            });
            
            // Also send internal notification
            try {
              await sendEmail({
                to: process.env.REPLY_TO_EMAIL || 'info@elevateforhumanity.org',
                subject: `New Barber Enrollment: ${customerName || customerEmail}`,
                html: `
                  <h2>New Barber Apprenticeship Enrollment</h2>
                  <p><strong>Student:</strong> ${customerName || 'N/A'}</p>
                  <p><strong>Email:</strong> ${customerEmail}</p>
                  <p><strong>Setup Fee Paid:</strong> $${BARBER_PRICING.setupFee.toLocaleString()}</p>
                  <p><strong>Weekly Payment:</strong> $${weeklyPayment}</p>
                  <p><strong>First Billing:</strong> ${firstBillingDate}</p>
                  <p><strong>Subscription ID:</strong> ${subscriptionId}</p>
                  <p><strong>Apprentice ID:</strong> ${apprenticeId || 'N/A'}</p>
                `,
              });
            } catch (internalErr) {
              console.error('Internal notification failed:', internalErr);
            }
            
            // Mark welcome email as sent
            await supabase
              .from('barber_subscriptions')
              .update({ 
                welcome_email_sent_at: new Date().toISOString(),
                dashboard_invite_sent_at: new Date().toISOString(),
              })
              .eq('stripe_subscription_id', subscriptionId);
              
            console.log(`Welcome email with credentials sent to ${customerEmail}`);
          } catch (emailErr) {
            console.error('Welcome email failed:', emailErr);
            // Don't fail webhook - email can be retried
          }
        }

        // Send Milady Email (if not already sent)
        if (!subRecord?.milady_email_sent_at && customerEmail) {
          try {
            const { sendEmail } = await import('@/lib/email/resend');
            await sendEmail({
              to: customerEmail,
              subject: 'Your Milady Access - Barber Apprenticeship',
              html: `
                <h2>Milady Training Access</h2>
                <p>Hi ${customerName || 'there'},</p>
                <p>As part of your Barber Apprenticeship enrollment, you have access to Milady training materials.</p>
                
                <h3>What to Expect:</h3>
                <ul>
                  <li>Milady will send you a separate welcome email with login credentials</li>
                  <li>This typically arrives within 24-48 hours</li>
                  <li>Check your spam folder if you don't see it</li>
                </ul>
                
                <p><strong>Access Milady here:</strong></p>
                <p><a href="${MILADY_LOGIN_URL}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">Go to Milady</a></p>
                
                <p>If you don't receive Milady access within 48 hours, contact us at (317) 314-3757 or reply to this email.</p>
                
                <p>— Elevate for Humanity Team</p>
              `,
            });
            
            // Mark Milady email as sent
            await supabase
              .from('barber_subscriptions')
              .update({ milady_email_sent_at: new Date().toISOString() })
              .eq('stripe_subscription_id', subscriptionId);
              
            console.log(`Milady email sent to ${customerEmail}`);
          } catch (emailErr) {
            console.error('Milady email failed:', emailErr);
            // Don't fail webhook - email can be retried
          }
        }

        console.log(`Barber subscription created: ${subscriptionId} for user ${userId}, apprentice ${apprenticeId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Only process barber subscriptions
        if (subscription.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        await supabase
          .from('barber_subscriptions')
          .update({
            status: subscription.status,
            weekly_payment_cents: parseInt(subscription.metadata?.weekly_payment_cents || '0'),
            weeks_remaining: parseInt(subscription.metadata?.weeks_remaining || '0'),
            current_period_start: new Date((subscription.current_period_start || 0) * 1000).toISOString(),
            current_period_end: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log(`Barber subscription updated: ${subscription.id}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        if (subscription.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        await supabase
          .from('barber_subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log(`Barber subscription canceled: ${subscription.id}`);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (!subscriptionId) break;

        // Get subscription to check if it's a barber subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        if (subscription.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        // Record payment
        await supabase.from('barber_payments').insert({
          user_id: subscription.metadata?.user_id,
          stripe_subscription_id: subscriptionId,
          stripe_invoice_id: invoice.id,
          amount_paid: (invoice.amount_paid || 0) / 100,
          payment_date: new Date().toISOString(),
          invoice_url: invoice.hosted_invoice_url,
        }).catch(() => {
          // Table may not exist
        });

        // Decrement weeks remaining
        const currentWeeks = parseInt(subscription.metadata?.weeks_remaining || '0');
        if (currentWeeks > 0) {
          await supabase
            .from('barber_subscriptions')
            .update({
              weeks_remaining: currentWeeks - 1,
              last_payment_date: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId);
        }

        console.log(`Barber payment recorded: ${invoice.id}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

/**
 * PUT /api/barber/webhook
 * 
 * Update subscription when transfer hours are verified
 * Called internally when admin verifies transfer hours
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Verify admin access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      subscription_id,
      transferred_hours_verified,
      hours_per_week,
    } = body;

    if (!subscription_id) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(subscription_id);
    
    if (subscription.metadata?.program !== 'barber-apprenticeship') {
      return NextResponse.json({ error: 'Not a barber subscription' }, { status: 400 });
    }

    // Recalculate weekly payment with new transfer hours
    const hpw = hours_per_week || parseInt(subscription.metadata?.hours_per_week || '40');
    const calculation = calculateWeeklyPayment(hpw, transferred_hours_verified);

    // Update subscription item quantity (weekly payment amount)
    const subscriptionItem = subscription.items.data[0];
    
    await stripe.subscriptionItems.update(subscriptionItem.id, {
      quantity: calculation.weeklyPaymentCents,
      proration_behavior: 'none', // No mid-cycle adjustments
    });

    // Update subscription metadata
    await stripe.subscriptions.update(subscription_id, {
      metadata: {
        ...subscription.metadata,
        transferred_hours_verified: transferred_hours_verified.toString(),
        hours_remaining: calculation.hoursRemaining.toString(),
        weeks_remaining: calculation.weeksRemaining.toString(),
        weekly_payment_cents: calculation.weeklyPaymentCents.toString(),
        weekly_payment_dollars: calculation.weeklyPaymentDollars.toFixed(2),
      },
    });

    // Update database
    await supabase
      .from('barber_subscriptions')
      .update({
        transferred_hours_verified,
        hours_remaining: calculation.hoursRemaining,
        weeks_remaining: calculation.weeksRemaining,
        weekly_payment_cents: calculation.weeklyPaymentCents,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription_id);

    return NextResponse.json({
      success: true,
      updated: {
        transferredHours: transferred_hours_verified,
        hoursRemaining: calculation.hoursRemaining,
        weeksRemaining: calculation.weeksRemaining,
        newWeeklyPayment: calculation.weeklyPaymentDollars,
      },
      message: `Weekly payment updated to $${calculation.weeklyPaymentDollars.toFixed(2)} for ${calculation.weeksRemaining} weeks`,
    });
  } catch (error) {
    console.error('Transfer hours update error:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
