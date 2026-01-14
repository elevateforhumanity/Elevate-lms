export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { DOT_CODES } from '@/lib/compliance/rapids-integration';

const barberApplicationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string(),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  hasHostShop: z.string(),
  hostShopName: z.string().optional(),
  hostShopAddress: z.string().optional(),
  hostShopContact: z.string().optional(),
  enrolledInBarberSchool: z.string(),
  barberSchoolName: z.string().optional(),
  priorExperience: z.string().optional(),
  program: z.string(),
  programType: z.string(),
  fundingSource: z.string(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = barberApplicationSchema.parse(data);

    const supabase = createAdminClient();

    // Insert into applications table
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        first_name: validated.firstName,
        last_name: validated.lastName,
        email: validated.email,
        phone: validated.phone,
        date_of_birth: validated.dateOfBirth,
        address: validated.address,
        city: validated.city,
        state: validated.state,
        zip: validated.zipCode,
        program_interest: 'Barber Apprenticeship',
        status: 'pending_payment',
        support_notes: JSON.stringify({
          programType: 'apprenticeship',
          fundingSource: 'self-pay',
          hasHostShop: validated.hasHostShop,
          hostShopName: validated.hostShopName,
          hostShopAddress: validated.hostShopAddress,
          hostShopContact: validated.hostShopContact,
          enrolledInBarberSchool: validated.enrolledInBarberSchool,
          barberSchoolName: validated.barberSchoolName,
          priorExperience: validated.priorExperience,
        }),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application. Please call 317-314-3757.' },
        { status: 500 }
      );
    }

    // Create RAPIDS pre-registration record (will be finalized after payment)
    const rapidsPreRegistration = {
      application_id: application.id,
      program_number: process.env.NEXT_PUBLIC_RAPIDS_PROGRAM_NUMBER || '2025-IN-132301',
      sponsor_name: process.env.NEXT_PUBLIC_RAPIDS_SPONSOR_NAME || '2Exclusive llc',
      occupation_code: DOT_CODES.BARBER,
      occupation_title: 'Barber',
      status: 'pending_payment',
      created_at: new Date().toISOString(),
    };

    // Store RAPIDS pre-registration
    await supabase.from('rapids_registrations').insert(rapidsPreRegistration).single();

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      rapidsPreRegistration: rapidsPreRegistration.program_number,
      message: 'Application submitted. Proceed to payment.',
    });
  } catch (err: any) {
    console.error('Barber application error:', err);
    return NextResponse.json(
      { error: err.message || 'Application failed. Please try again.' },
      { status: 500 }
    );
  }
}
