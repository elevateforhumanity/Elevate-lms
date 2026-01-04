#!/usr/bin/env node
/**
 * Database Connection Diagnostic Tool
 * Helps identify what's wrong with DATABASE_URL
 */

console.log('🔍 Database Connection Diagnostic\n');
console.log('='.repeat(60));

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dbUrl = process.env.DATABASE_URL;

console.log('\n📋 Environment Variables Check:\n');

// 1. Check NEXT_PUBLIC_SUPABASE_URL
console.log('1. NEXT_PUBLIC_SUPABASE_URL:');
if (!supabaseUrl) {
  console.log('   ❌ NOT SET');
} else {
  console.log(`   ✅ SET: ${supabaseUrl}`);
  
  // Extract project ref
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (projectRef) {
    console.log(`   📌 Project Ref: ${projectRef}`);
  } else {
    console.log('   ⚠️  Could not extract project ref from URL');
  }
}

// 2. Check SUPABASE_SERVICE_ROLE_KEY
console.log('\n2. SUPABASE_SERVICE_ROLE_KEY:');
if (!supabaseKey) {
  console.log('   ❌ NOT SET');
} else {
  console.log(`   ✅ SET: ${supabaseKey.substring(0, 20)}...`);
  console.log(`   📏 Length: ${supabaseKey.length} characters`);
  
  if (supabaseKey.startsWith('eyJ')) {
    console.log('   ✅ Format looks correct (starts with eyJ)');
  } else {
    console.log('   ⚠️  Format may be incorrect (should start with eyJ)');
  }
}

// 3. Check DATABASE_URL
console.log('\n3. DATABASE_URL:');
if (!dbUrl) {
  console.log('   ❌ NOT SET');
} else {
  console.log(`   ✅ SET`);
  
  // Parse the connection string
  try {
    const url = new URL(dbUrl.replace('postgresql://', 'http://'));
    
    console.log('\n   📊 Parsed Connection Details:');
    console.log(`   - Protocol: postgresql://`);
    console.log(`   - Username: ${url.username}`);
    console.log(`   - Password: ${url.password ? '[HIDDEN - ' + url.password.length + ' chars]' : 'NOT SET'}`);
    console.log(`   - Host: ${url.hostname}`);
    console.log(`   - Port: ${url.port}`);
    console.log(`   - Database: ${url.pathname.substring(1)}`);
    
    // Check username format
    console.log('\n   🔍 Username Analysis:');
    if (url.username === 'postgres') {
      console.log('   ⚠️  Using basic "postgres" username');
      console.log('   💡 For pooler, should be "postgres.[project-ref]"');
    } else if (url.username.startsWith('postgres.')) {
      const userProjectRef = url.username.split('.')[1];
      console.log(`   ✅ Using pooler format: postgres.${userProjectRef}`);
      
      // Compare with SUPABASE_URL project ref
      if (supabaseUrl) {
        const urlProjectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
        if (urlProjectRef && userProjectRef === urlProjectRef) {
          console.log(`   ✅ Project ref matches SUPABASE_URL: ${urlProjectRef}`);
        } else if (urlProjectRef) {
          console.log(`   ❌ MISMATCH!`);
          console.log(`      DATABASE_URL project ref: ${userProjectRef}`);
          console.log(`      SUPABASE_URL project ref: ${urlProjectRef}`);
          console.log(`   🚨 THIS IS THE PROBLEM!`);
        }
      }
    } else {
      console.log(`   ⚠️  Unexpected username format: ${url.username}`);
    }
    
    // Check host format
    console.log('\n   🔍 Host Analysis:');
    if (url.hostname.includes('pooler.supabase.com')) {
      console.log('   ✅ Using connection pooler (recommended)');
      
      if (url.port === '6543') {
        console.log('   ✅ Correct pooler port: 6543');
      } else {
        console.log(`   ⚠️  Wrong port: ${url.port} (should be 6543 for pooler)`);
      }
    } else if (url.hostname.includes('supabase.co')) {
      console.log('   ⚠️  Using direct connection');
      
      if (url.port === '5432') {
        console.log('   ✅ Correct direct port: 5432');
      } else {
        console.log(`   ⚠️  Wrong port: ${url.port} (should be 5432 for direct)`);
      }
      
      console.log('   💡 Consider switching to pooler for better compatibility');
    } else {
      console.log(`   ⚠️  Unexpected host: ${url.hostname}`);
    }
    
    // Check password
    console.log('\n   🔍 Password Analysis:');
    if (!url.password) {
      console.log('   ❌ NO PASSWORD SET');
      console.log('   🚨 THIS IS THE PROBLEM!');
    } else if (url.password.length < 10) {
      console.log(`   ⚠️  Password seems short (${url.password.length} chars)`);
      console.log('   💡 Supabase passwords are usually longer');
    } else {
      console.log(`   ✅ Password is set (${url.password.length} characters)`);
    }
    
  } catch (error) {
    console.log(`   ❌ Failed to parse DATABASE_URL: ${error.message}`);
    console.log('   🚨 DATABASE_URL format is invalid!');
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 DIAGNOSTIC SUMMARY:\n');

let issues = [];

if (!supabaseUrl) {
  issues.push('❌ NEXT_PUBLIC_SUPABASE_URL is not set');
}

if (!supabaseKey) {
  issues.push('❌ SUPABASE_SERVICE_ROLE_KEY is not set');
}

if (!dbUrl) {
  issues.push('❌ DATABASE_URL is not set');
} else {
  try {
    const url = new URL(dbUrl.replace('postgresql://', 'http://'));
    
    // Check for project ref mismatch
    if (supabaseUrl && url.username.startsWith('postgres.')) {
      const dbProjectRef = url.username.split('.')[1];
      const urlProjectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
      
      if (dbProjectRef !== urlProjectRef) {
        issues.push(`❌ PROJECT REF MISMATCH: DATABASE_URL uses "${dbProjectRef}" but SUPABASE_URL uses "${urlProjectRef}"`);
      }
    }
    
    // Check for missing password
    if (!url.password) {
      issues.push('❌ DATABASE_URL has no password');
    }
    
    // Check for wrong port
    if (url.hostname.includes('pooler') && url.port !== '6543') {
      issues.push(`❌ Wrong pooler port: ${url.port} (should be 6543)`);
    }
    
  } catch (error) {
    issues.push('❌ DATABASE_URL format is invalid');
  }
}

if (issues.length === 0) {
  console.log('✅ All checks passed!');
  console.log('\nIf you\'re still seeing "Tenant or user not found", the issue is likely:');
  console.log('1. Wrong password in DATABASE_URL');
  console.log('2. Database user doesn\'t exist');
  console.log('3. Database is from a different/deleted Supabase project');
} else {
  console.log('🚨 ISSUES FOUND:\n');
  issues.forEach(issue => console.log(`   ${issue}`));
  
  console.log('\n💡 RECOMMENDED ACTIONS:\n');
  
  if (!supabaseUrl || !supabaseKey || !dbUrl) {
    console.log('1. Go to Supabase Dashboard → Settings → API');
    console.log('2. Copy Project URL and Service Role Key');
    console.log('3. Go to Settings → Database');
    console.log('4. Copy Connection String (Transaction mode / Pooler)');
    console.log('5. Add all three to Vercel environment variables');
  } else {
    console.log('1. Go to Supabase Dashboard');
    console.log('2. Verify you\'re in the CORRECT project');
    console.log('3. Go to Settings → Database');
    console.log('4. Get a fresh Connection String (Transaction mode)');
    console.log('5. Update DATABASE_URL in Vercel');
    console.log('6. Make sure the project ref matches your SUPABASE_URL');
  }
}

console.log('\n' + '='.repeat(60));
console.log('\n✅ Diagnostic complete!\n');
