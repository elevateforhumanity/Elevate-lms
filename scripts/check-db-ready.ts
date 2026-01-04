// scripts/check-db-ready.ts
// Quick health-check to confirm migrations + seeds ran

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !key) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {

  // Check programs table
  const { data: programs, error: programsError } = await supabase
    .from('programs')
    .select('id, slug, title')
    .limit(5);

  if (programsError) {
    console.error('❌ Programs table not ready:', programsError.message);
  } else {
    console.table(programs);
  }

  // Check courses table
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, slug, title')
    .limit(5);

  if (coursesError) {
    console.error('❌ Courses table not ready:', coursesError.message);
  } else {
    console.table(courses);
  }

  // Check products table
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, title, price')
    .limit(5);

  if (productsError) {
    console.error('❌ Products table not ready:', productsError.message);
  } else {
    console.table(products);
  }

  // Summary
  const errors = [programsError, coursesError, productsError].filter(Boolean);
  
  if (errors.length > 0) {
    console.error('\n❌ Database not fully ready. Run migrations and seeds:');
    console.error('   npm run db:setup');
    process.exit(1);
  }

}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
