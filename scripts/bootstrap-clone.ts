#!/usr/bin/env tsx
/**
 * Clone Bootstrap Script
 *
 * Makes a fresh clone production-ready in under 10 minutes
 *
 * Required env vars:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * - CLONE_ORG_SLUG
 * - CLONE_ORG_NAME
 * - CLONE_ADMIN_EMAIL
 */

import { createClient } from '@supabase/supabase-js';

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'CLONE_ORG_SLUG',
  'CLONE_ORG_NAME',
  'CLONE_ADMIN_EMAIL',
];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach((key) => console.error(`   - ${key}`));
    process.exit(1);
  }
}

async function bootstrap() {
  console.log('🚀 Starting clone bootstrap...\n');

  validateEnv();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const orgSlug = process.env.CLONE_ORG_SLUG!;
  const orgName = process.env.CLONE_ORG_NAME!;
  const adminEmail = process.env.CLONE_ADMIN_EMAIL!;

  try {
    // 1. Create organization
    console.log('📦 Creating organization...');
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        slug: orgSlug,
        name: orgName,
        type: 'training_provider',
        status: 'active',
      })
      .select()
      .single();

    if (orgError) {
      if (orgError.code === '23505') {
        console.error('❌ Organization slug already exists');
        process.exit(1);
      }
      throw orgError;
    }

    console.log(`✅ Organization created: ${org.name} (${org.slug})`);

    // 2. Seed default config
    console.log('⚙️  Seeding configuration...');
    const { error: configError } = await supabase
      .from('organization_settings')
      .insert({
        organization_id: org.id,
      });

    if (configError) throw configError;
    console.log('✅ Configuration seeded');

    // 3. Find or create admin user
    console.log('👤 Setting up admin user...');
    let userId: string;

    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', adminEmail)
      .single();

    if (existingUser) {
      userId = existingUser.id;
      console.log('✅ Found existing user');
    } else {
      console.error('❌ Admin user not found. Required user does not exist.');
      console.error('');
      console.error('Remediation steps:');
      console.error(`  1. Create user account with email: ${adminEmail}`);
      console.error('  2. Verify user can sign in');
      console.error('  3. Re-run this bootstrap script');
      console.error('');
      console.error('To create user via Supabase Dashboard:');
      console.error('  - Go to Authentication > Users');
      console.error(`  - Add user with email: ${adminEmail}`);
      console.error('  - Send invitation or set temporary password');
      process.exit(1);
    }

    // 4. Assign admin role
    console.log('🔐 Assigning admin role...');
    const { error: memberError } = await supabase
      .from('organization_users')
      .insert({
        organization_id: org.id,
        user_id: userId,
        role: 'org_admin',
      });

    if (memberError) {
      if (memberError.code === '23505') {
        console.log('✅ User already assigned to organization');
      } else {
        throw memberError;
      }
    } else {
      console.log('✅ Admin role assigned');
    }

    // 5. Bind user profile to org
    console.log('🔗 Binding user to organization...');
    const { error: bindError } = await supabase
      .from('profiles')
      .update({ organization_id: org.id })
      .eq('id', userId);

    if (bindError) throw bindError;
    console.log('✅ User bound to organization');

    // 6. Create default subscription (trial)
    console.log('💳 Creating trial subscription...');
    const { error: subError } = await supabase
      .from('organization_subscriptions')
      .insert({
        organization_id: org.id,
        stripe_customer_id: `trial_${org.slug}`,
        plan: 'trial',
        status: 'trialing',
      });

    if (subError) throw subError;
    console.log('✅ Trial subscription created');

    console.log('\n🎉 Clone bootstrap complete!\n');
    console.log('Organization Details:');
    console.log(`  Name: ${org.name}`);
    console.log(`  Slug: ${org.slug}`);
    console.log(`  ID: ${org.id}`);
    console.log(`  Admin: ${adminEmail}`);
    console.log('\nNext steps:');
    console.log('  1. Admin user should log in');
    console.log('  2. Configure organization settings');
    console.log('  3. Set up billing (if required)');
    console.log('  4. Start creating programs\n');
  } catch (error: any) {
    console.error('\n❌ Bootstrap failed:', error.message);
    process.exit(1);
  }
}

bootstrap();
