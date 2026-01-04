// scripts/test-supabase-connection.ts
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !anon) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(url, anon);

async function main() {
  
  // Test programs table
  const { data: programs, error } = await supabase
    .from('programs')
    .select('id, slug, title')
    .limit(5);

  if (error) {
    console.error('❌ Error querying programs:', error.message);
  } else {
    console.table(programs);
  }

  // Test courses table
  const { data: courses, error: courseErr } = await supabase
    .from('courses')
    .select('id, slug, title')
    .limit(5);

  if (courseErr) {
    console.error('❌ Error querying courses:', courseErr.message);
  } else {
    console.table(courses);
  }

  // Test products table
  const { data: products, error: productErr } = await supabase
    .from('products')
    .select('id, title, price')
    .limit(5);

  if (productErr) {
    console.error('❌ Error querying products:', productErr.message);
  } else {
    console.table(products);
  }

}

main().catch((e) => {
  console.error('❌ Unexpected error:', e);
  process.exit(1);
});
