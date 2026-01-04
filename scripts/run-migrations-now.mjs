#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE';


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// Check if tables exist
async function checkTables() {

  try {
    const { data: programs, error: progError } = await supabase
      .from('programs')
      .select('count', { count: 'exact', head: true });

    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .select('count', { count: 'exact', head: true });

    if (progError) {
      return false;
    }

    if (courseError) {
      return false;
    }


    return true;
  } catch (error) {
    console.error('❌ Error checking tables:', error.message);
    return false;
  }
}

async function main() {
  const tablesExist = await checkTables();

  if (!tablesExist) {
    process.exit(1);
  }


}

main();
