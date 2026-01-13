// @ts-nocheck
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { logger } from '@/lib/logger';


function tierFromPrice(priceId?: string | null): 'free' | 'student' | 'career' {
  if (!priceId) return 'free';
  if (priceId === process.env.STRIPE_PRICE_STUDENT) return 'student';
  if (priceId === process.env.STRIPE_PRICE_CAREER) return 'career';
  return 'free';
}

async function upsertAccess(payload: {
  user_id: string;
  tier: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_price_id?: string | null;
  status?: string | null;
  current_period_end?: number | null;
}) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_access`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      tier: payload.tier,
      stripe_customer_id: payload.stripe_customer_id ?? null,
      stripe_subscription_id: payload.stripe_subscription_id ?? null,
      stripe_price_id: payload.stripe_price_id ?? null,
      status: payload.status ?? null,
      current_period_end: payload.current_period_end
        ? new Date(payload.current_period_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase upsert failed: ${res.status} ${text}`);
  }
}

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature' },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    logger.error('Stripe webhook signature verification failed', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    // Handle tax intake DIY service payments
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Check if this is a tax intake payment
      const intakeId = session.client_reference_id || session.metadata?.intake_id;
      if (intakeId && session.metadata?.service_type === 'tax_intake') {
        const { createClient } = await import('@/lib/supabase/server');
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { error } = await supabaseAdmin
          .from('tax_intake')
          .update({
            paid: true,
            stripe_session_id: session.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', intakeId);

        if (error) {
          logger.error('Failed to mark tax intake as paid', error);
        } else {
          logger.info(`✅ Marked tax intake ${intakeId} as paid (session: ${session.id})`);
        }

      }

      // Check if this is a course enrollment payment
      const courseId = session.metadata?.courseId;
      const userId = session.metadata?.userId;
      if (courseId && userId) {
        const { createClient } = await import('@/lib/supabase/server');
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Create enrollment
        const { error: enrollError } = await supabaseAdmin
          .from('enrollments')
          .insert({
            user_id: userId,
            course_id: courseId,
            status: 'active',
            progress: 0,
            started_at: new Date().toISOString(),
          });

        if (enrollError) {
          logger.error('Failed to create course enrollment', enrollError);
        } else {
          logger.info(`✅ Created course enrollment for user ${userId} in course ${courseId}`);
        }
      }
    }

    // Handle funding payment completion - AUTOMATIC ENROLLMENT
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const studentId = session.metadata?.student_id;
      const programId = session.metadata?.program_id;
      const programSlug = session.metadata?.program_slug;
      const fundingSource = session.metadata?.funding_source || 'WIOA';
      const applicationId = session.metadata?.application_id;
      const email = session.metadata?.email || session.customer_email;
      const firstName = session.metadata?.first_name;
      const lastName = session.metadata?.last_name;

      if (!studentId || !programId) {
        logger.info(
          '[Webhook] Missing student/program metadata, skipping auto-enrollment'
        );
      } else {
        logger.info('[Webhook] Processing funding payment - AUTO-ENROLLMENT', {
          sessionId: session.id,
          studentId,
          programId,
          programSlug,
          fundingSource,
          amount: session.amount_total,
        });

        // Import Supabase client
      const { createClient } = await import('@/lib/supabase/server');
      const supabaseClient = await createClient();

      // STEP 1: Update application status if exists
      if (applicationId) {
        await supabaseClient
          .from('applications')
          .update({
            status: 'accepted',
            payment_status: 'paid',
          })
          .eq('id', applicationId);
      }

      // Mark funding payment as paid (audit trail)
      await supabaseClient
        .from('funding_payments')
        .update({
          status: 'paid',
          stripe_payment_intent_id: session.payment_intent as string,
          paid_at: new Date().toISOString(),
        })
        .eq('stripe_checkout_session_id', session.id);

      // Update tenant license if this is a platform subscription
      const tenantId = session.metadata?.tenant_id;
      const planName = session.metadata?.plan_name ?? 'starter';
      if (tenantId && session.customer && session.subscription) {
        const customerId =
          typeof session.customer === 'string'
            ? session.customer
            : (session.customer?.id ?? null);
        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : (session.subscription?.id ?? null);
        const priceId = session.metadata?.stripe_price_id ?? null;

        // Use RPC function for atomic update
        const { error: rpcError } = await supabaseClient.rpc(
          'upsert_license_from_stripe',
          {
            p_tenant_id: tenantId,
            p_stripe_customer_id: customerId,
            p_stripe_subscription_id: subscriptionId,
            p_stripe_price_id: priceId,
            p_status: 'active',
            p_plan_name: planName,
          }
        );

        if (rpcError) {
          logger.error(
            '[Webhook] Failed to update tenant license via RPC',
            rpcError
          );
        } else {
          logger.info('[Webhook] Updated tenant license via RPC', {
            tenantId,
            customerId,
            subscriptionId,
            planName,
          });
        }
      }

      // STEP 2: Create/activate enrollment (AUTO-ENROLL)
      // Idempotency: don't double-enroll if webhook retries
      const { data: existing } = await supabaseClient
        .from('enrollments')
        .select('id, status')
        .eq('student_id', studentId)
        .eq('program_id', programId)
        .maybeSingle();

      let enrollmentId: string | null = null;
      let isNewEnrollment = false;

      if (!existing) {
        // Create new enrollment
        const { data: newEnrollment } = await supabaseClient
          .from('enrollments')
          .insert({
            student_id: studentId,
            program_id: programId,
            status: 'active',
            payment_status: 'paid',
            enrolled_at: new Date().toISOString(),
          })
          .select('id')
          .single();

        enrollmentId = newEnrollment?.id || null;
        isNewEnrollment = true;

        logger.info('[Webhook] ✅ Created new enrollment', {
          studentId,
          programId,
          enrollmentId,
        });
      } else if (existing.status !== 'active') {
        // Activate existing enrollment
        await supabaseClient
          .from('enrollments')
          .update({
            status: 'active',
            payment_status: 'paid',
            enrolled_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        enrollmentId = existing.id;
        isNewEnrollment = true;

        logger.info('[Webhook] ✅ Activated existing enrollment', {
          enrollmentId: existing.id,
        });
      } else {
        enrollmentId = existing.id;
        logger.info('[Webhook] Enrollment already active', {
          enrollmentId: existing.id,
        });
      }

      // Send welcome email for new enrollments
      if (isNewEnrollment && email) {
        try {
          const { data: programDetails } = await supabaseClient
            .from('programs')
            .select('name, slug')
            .eq('id', programId)
            .single();

          // Use barber-specific email for barber apprenticeship
          if (programSlug === 'barber-apprenticeship' || programDetails?.slug === 'barber-apprenticeship') {
            const { getBarberWelcomePaidEmail } = await import('@/lib/email/templates/barber-welcome-paid');
            
            // Get student's transfer hours if any
            const { data: enrollmentData } = await supabaseClient
              .from('student_enrollments')
              .select('transfer_hours, required_hours')
              .eq('student_id', studentId)
              .eq('program_id', programId)
              .maybeSingle();

            const barberEmail = getBarberWelcomePaidEmail({
              studentName: firstName || 'Student',
              studentEmail: email,
              dashboardUrl: 'https://elevateforhumanity.institute/lms/dashboard',
              miladyEnrollmentUrl: 'https://www.miladytraining.com/bundles/barber-apprentice-program',
              requiredHours: enrollmentData?.required_hours || 1500,
              transferHours: enrollmentData?.transfer_hours || 0,
              rapidsPending: true,
            });

            await fetch(
              `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elevateforhumanity.institute'}/api/email/send`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: email,
                  subject: barberEmail.subject,
                  html: barberEmail.html,
                }),
              }
            );
            logger.info('[Webhook] Sent barber welcome email with Milady enrollment link', { email });
          } else {
            // Generic welcome email for other programs
            await fetch(
              `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elevateforhumanity.institute'}/api/email/send`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: email,
                  subject: `Welcome to ${programDetails?.name || 'Your Program'}!`,
                  html: `
                  <h2>Welcome to Elevate for Humanity!</h2>
                  <p>Hi ${firstName || 'there'},</p>
                  <p>Congratulations! Your enrollment in <strong>${programDetails?.name || 'your program'}</strong> is now active.</p>
                  <h3>Next Steps:</h3>
                  <ol>
                    <li>Log in to your student portal: <a href="https://elevateforhumanity.institute/login">Login Here</a></li>
                    <li>Complete your student profile</li>
                    <li>Access your course materials</li>
                    <li>Meet your instructor</li>
                  </ol>
                  <p>Questions? Call us at <a href="tel:3173143757">317-314-3757</a></p>
                  <p>Best regards,<br>Elevate for Humanity Team</p>
                `,
                }),
              }
            );
          }
        } catch (emailError) {
          logger.warn('[Webhook] Failed to send welcome email', emailError);
        }
      }

      // STEP 3: Assign AI Instructor
      if (programSlug) {
        try {
          const { assignAIInstructorForProgram } =
            await import('@/lib/ai/assign');
          const assignResult = await assignAIInstructorForProgram({
            studentId,
            programSlug,
          });

          if (assignResult.ok) {
            logger.info(
              '[Webhook] ✅ AI instructor assigned:',
              assignResult.instructorSlug
            );
          } else {
            logger.warn(
              '[Webhook] ⚠️ AI instructor assignment failed:',
              assignResult.reason
            );
          }
        } catch (aiError) {
          logger.warn('[Webhook] ⚠️ AI instructor assignment error', aiError);
        }
      }

      // STEP 4: Barber Apprenticeship specific setup (Indiana IPLA)
      if (programSlug === 'barber-apprenticeship') {
        try {
          // 4a: Create student_enrollments record with Indiana requirements
          const { data: studentEnrollment, error: seError } = await supabaseClient
            .from('student_enrollments')
            .upsert({
              student_id: studentId,
              program_id: programId,
              status: 'active',
              required_hours: 1500, // Indiana IPLA requirement
              transfer_hours: 0,
              rapids_status: 'pending',
              milady_enrolled: false,
              started_at: new Date().toISOString(),
            }, {
              onConflict: 'student_id,program_id',
            })
            .select('id')
            .single();

          if (seError) {
            logger.warn('[Webhook] Failed to create student_enrollment', seError);
          } else {
            logger.info('[Webhook] ✅ Created student_enrollment for barber apprenticeship', {
              enrollmentId: studentEnrollment?.id,
            });
          }

          // 4b: Create RAPIDS registration record
          const { error: rapidsError } = await supabaseClient
            .from('rapids_registrations')
            .insert({
              student_id: studentId,
              enrollment_id: studentEnrollment?.id || enrollmentId,
              occupation_code: '39-5011.00', // Barbers
              status: 'pending',
              submitted_at: new Date().toISOString(),
            });

          if (rapidsError) {
            logger.warn('[Webhook] Failed to create RAPIDS registration', rapidsError);
          } else {
            logger.info('[Webhook] ✅ Created RAPIDS registration record');
          }

          // 4c: Create state board readiness record
          const { error: sbError } = await supabaseClient
            .from('state_board_readiness')
            .insert({
              student_id: studentId,
              enrollment_id: studentEnrollment?.id || enrollmentId,
              total_hours_completed: 0,
              rti_hours_completed: 0,
              ojt_hours_completed: 0,
              milady_completed: false,
              ready_for_exam: false,
            });

          if (sbError) {
            logger.warn('[Webhook] Failed to create state board readiness record', sbError);
          }

          logger.info('[Webhook] ✅ Barber apprenticeship setup complete', {
            studentId,
            programId,
            enrollmentId: studentEnrollment?.id,
          });

          // 4d: Purchase Milady course and provision student access
          // Elevate pays Milady $295 per student (included in $4,980 flat fee)
          try {
            const { purchaseMiladyCourse } = await import('@/lib/vendors/milady-purchase');
            
            const miladyResult = await purchaseMiladyCourse(
              {
                id: studentId,
                email: email,
                firstName: firstName || 'Student',
                lastName: lastName || '',
              },
              'barber-apprenticeship',
              paymentIntentId || session.id
            );

            if (miladyResult.success) {
              logger.info('[Webhook] ✅ Milady course purchased', {
                hasCredentials: !!miladyResult.studentCredentials,
                hasLicenseCode: !!miladyResult.licenseCode,
                paymentId: miladyResult.paymentId,
              });

              // Update enrollment to mark Milady as enrolled
              await supabaseClient
                .from('student_enrollments')
                .update({ 
                  milady_enrolled: true,
                  milady_access_url: miladyResult.studentCredentials?.loginUrl,
                })
                .eq('student_id', studentId)
                .eq('program_id', programId);

            } else {
              logger.warn('[Webhook] ⚠️ Milady purchase failed', { error: miladyResult.error });
            }
          } catch (miladyError) {
            logger.warn('[Webhook] ⚠️ Milady purchase error', miladyError);
            // Don't fail - student access will be provisioned manually
          }

        } catch (barberSetupError) {
          logger.warn('[Webhook] ⚠️ Barber apprenticeship setup error', barberSetupError);
          // Don't fail the whole webhook - enrollment is still active
        }
      }

      // Handle other beauty apprenticeship programs (cosmetology, esthetician, nail tech)
      const beautyPrograms = ['cosmetology-apprenticeship', 'esthetician-apprenticeship', 'nail-technician-apprenticeship'];
      const programHours: Record<string, number> = {
        'cosmetology-apprenticeship': 1500,
        'esthetician-apprenticeship': 700,
        'nail-technician-apprenticeship': 450,
      };

      if (beautyPrograms.includes(programSlug)) {
        try {
          // Create student_enrollments record
          const { data: studentEnrollment, error: seError } = await supabaseClient
            .from('student_enrollments')
            .upsert({
              student_id: studentId,
              program_id: programId,
              status: 'active',
              required_hours: programHours[programSlug] || 1500,
              transfer_hours: 0,
              rapids_status: 'pending',
              milady_enrolled: false,
              started_at: new Date().toISOString(),
            }, {
              onConflict: 'student_id,program_id',
            })
            .select('id')
            .single();

          if (seError) {
            logger.warn(`[Webhook] Failed to create student_enrollment for ${programSlug}`, seError);
          }

          // Process Milady payment and auto-enrollment
          try {
            const { processMiladyPayment } = await import('@/lib/vendors/milady-payment');
            const miladyResult = await processMiladyPayment({
              enrollmentId: studentEnrollment?.id || enrollmentId,
              studentId,
              programId,
            });

            if (miladyResult.success) {
              logger.info(`[Webhook] ✅ Milady payment processed for ${programSlug}`, {
                amount: miladyResult.amount,
              });

              await supabaseClient
                .from('student_enrollments')
                .update({ milady_enrolled: true })
                .eq('student_id', studentId)
                .eq('program_id', programId);
            }
          } catch (miladyError) {
            logger.warn(`[Webhook] ⚠️ Milady payment error for ${programSlug}`, miladyError);
          }

          logger.info(`[Webhook] ✅ ${programSlug} setup complete`, { studentId, programId });
        } catch (beautySetupError) {
          logger.warn(`[Webhook] ⚠️ ${programSlug} setup error`, beautySetupError);
        }
      }
      } // Close else block for studentId/programId check
    }

    // Handle subscription lifecycle (created/updated/deleted)
    if (event.type.startsWith('customer.subscription.')) {
      const sub = event.data.object as Stripe.Subscription;
      const userId = (sub.metadata?.user_id || '') as string;

      // If user_id isn't stamped, we can't activate (safe no-op)
      if (!userId) {
        return NextResponse.json({
          ok: true,
          skipped: 'missing user_id metadata',
        });
      }

      const customerId =
        typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
      const priceId = sub.items.data[0]?.price?.id ?? null;
      const tier = tierFromPrice(priceId);
      const status = sub.status;
      const periodEnd = sub.current_period_end ?? null;

      // If deleted, downgrade to free
      const finalTier =
        event.type === 'customer.subscription.deleted' ? 'free' : tier;
      const finalStatus =
        event.type === 'customer.subscription.deleted' ? 'canceled' : status;

      await upsertAccess({
        user_id: userId,
        tier: finalTier,
        stripe_customer_id: customerId,
        stripe_subscription_id: sub.id,
        stripe_price_id: priceId,
        status: finalStatus,
        current_period_end: periodEnd,
      });

      // Update tenant license if this is a platform subscription
      const tenantId = sub.metadata?.tenant_id;
      const planName = sub.metadata?.plan_name ?? 'starter';
      if (tenantId) {
        const { createClient } = await import('@/lib/supabase/server');
        const supabaseClient = await createClient();
        const priceId = sub.metadata?.stripe_price_id ?? null;

        // Use RPC function for atomic update
        const { error: rpcError } = await supabaseClient.rpc(
          'upsert_license_from_stripe',
          {
            p_tenant_id: tenantId,
            p_stripe_customer_id: customerId,
            p_stripe_subscription_id: sub.id,
            p_stripe_price_id: priceId,
            p_status: finalStatus,
            p_plan_name: planName,
          }
        );

        if (rpcError) {
          logger.error(
            '[Webhook] Failed to update tenant license from subscription via RPC',
            rpcError
          );
        } else {
          logger.info(
            '[Webhook] Updated tenant license from subscription event via RPC',
            {
              tenantId,
              subscriptionId: sub.id,
              status: finalStatus,
              planName,
            }
          );
        }
      }

      logger.info(
        `[Webhook] ${event.type}: user=${userId}, tier=${finalTier}, status=${finalStatus}`
      );
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
