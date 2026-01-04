export const runtime = 'edge';
export const maxDuration = 60;

// app/api/admin/programs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClients';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';

// Admin auth guard should be implemented via middleware
// Protected by /admin route middleware in production

export const GET = withAuth(
  async (req, context) => {
    const user = context.user;
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      );
    }

    const { data, error }: any = await supabaseAdmin
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Error loading programs:', error);
      return NextResponse.json(
        { error: 'Failed to load programs' },
        { status: 500 }
      );
    }

    return NextResponse.json({ programs: data ?? [] });
  },
  { roles: ['admin', 'super_admin'] }
);

export const POST = withAuth(
  async (req: NextRequest, user) => {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      );
    }

    try {
      const body = await req.json();
      const { id, ...payload } = body;

      if (!payload.title) {
        return NextResponse.json(
          { error: 'Title is required' },
          { status: 400 }
        );
      }

      // auto-generate slug if missing
      if (!payload.slug && payload.title) {
        payload.slug = payload.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      let result;
      if (id) {
        result = await supabaseAdmin
          .from('programs')
          .update(payload)
          .eq('id', id)
          .select('*')
          .maybeSingle();
      } else {
        result = await supabaseAdmin
          .from('programs')
          .insert(payload)
          .select('*')
          .maybeSingle();
      }

      const { data, error } = result;

      if (error || !data) {
        logger.error('Program save error:', error);
        return NextResponse.json(
          { error: 'Failed to save program' },
          { status: 500 }
        );
      }

      return NextResponse.json({ program: data });
    } catch (err) {
      logger.error('Program save error:', err);
      return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
  },
  { roles: ['admin', 'super_admin'] }
);
