import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createServerSupabaseClient } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import { withAuth } from '@/lib/with-auth';
import { toError, toErrorMessage } from '@/lib/safe';

export const dynamic = 'force-dynamic';


export const POST = withAuth(
  async (request: Request, user) => {
    try {
      const supabase = await createServerSupabaseClient();

      // Read all migration files
      const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
      const migrationFiles = [
        '20240116_add_cip_soc_codes.sql',
        '20240116_seed_cip_soc_codes.sql',
        '20241115_add_all_etpl_programs.sql',
        '20241116_add_jri_courses.sql',
        '20241116_add_nrf_rise_up_courses.sql',
        '20241116_create_lms_courses_part1.sql',
        '20241116_create_lms_courses_part2.sql',
        '20241116_create_lms_courses_part3.sql',
        '20241116_create_lms_courses_part4.sql',
        '20241116_create_medical_assistant_course.sql',
      ];

      const results = [];

      for (const file of migrationFiles) {
        const filePath = path.join(migrationsDir, file);
        if (fs.existsSync(filePath)) {
          const sql = fs.readFileSync(filePath, 'utf8');

          try {
            const { error } = await supabase.rpc('exec_sql', {
              sql_query: sql,
            });

            if (error) {
              results.push({
                file,
                status: 'error',
                error: toErrorMessage(error),
              });
            } else {
              results.push({ file, status: 'success' });
            }
          } catch (err: unknown) {
            results.push({ file, status: 'error', error: (err as Error).message });
          }
        } else {
          results.push({ file, status: 'not_found' });
        }
      }

      return NextResponse.json({ results });
    } catch (error: unknown) {
      return NextResponse.json(
        { error: toErrorMessage(error) },
        { status: 500 }
      );
    }
  },
  { roles: ['admin', 'super_admin'] }
);
