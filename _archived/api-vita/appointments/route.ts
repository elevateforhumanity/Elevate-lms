export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from('vita_appointments')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        location: body.location,
        preferred_date: body.date,
        preferred_time: body.time,
        annual_income: body.income,
        dependents: body.dependents ? parseInt(body.dependents, 10) : 0,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) { /* Error handled silently */ 
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = supabaseServer();
    
    const { data, error } = await supabase
      .from('vita_appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) { /* Error handled silently */ 
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
