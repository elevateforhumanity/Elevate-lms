#!/usr/bin/env node
/**
 * Complete Barber Apprenticeship Program Seeder
 * 
 * Seeds:
 * - Funding programs (WIOA, WRG, JRI, Apprenticeship)
 * - Barber Apprenticeship program
 * - 4 modules (JRI SCORM, Milady external, Shop OJT, State Board SCORM)
 * - SCORM packages
 * - Program funding options
 * 
 * Usage:
 *   pnpm tsx scripts/seed-barber-program-complete.ts
 * 
 * Requirements:
 *   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { supabaseAdmin } from '../lib/supabaseAdmin.js';

// ============================================================================
// CONFIGURATION
// ============================================================================

const FUNDING_PROGRAMS = [
  {
    code: 'WIOA-ADULT',
    name: 'WIOA Adult',
    description: 'WIOA Adult funding for eligible participants',
    funding_type: 'wioa',
    pays_tuition: true,
    pays_wages: false,
    pays_stipend: false,
    is_active: true
  },
  {
    code: 'WRG',
    name: 'Workforce Ready Grant',
    description: 'Indiana Workforce Ready Grant (Next Level Jobs)',
    funding_type: 'wrg',
    pays_tuition: true,
    pays_wages: false,
    pays_stipend: false,
    is_active: true
  },
  {
    code: 'JRI',
    name: 'Job Ready Indy',
    description: 'Job Ready Indy employability/badge program',
    funding_type: 'jri',
    pays_tuition: false,
    pays_wages: false,
    pays_stipend: true,
    is_active: true
  },
  {
    code: 'APPRENTICESHIP',
    name: 'Registered Apprenticeship',
    description: 'RAPIDS-registered apprenticeship wage/RI support',
    funding_type: 'apprenticeship',
    pays_tuition: false,
    pays_wages: true,
    pays_stipend: false,
    is_active: true
  }
];

const BARBER_PROGRAM = {
  slug: 'barber-apprenticeship',
  name: 'Barber Apprenticeship',
  category: 'Beauty & Barbering',
  description: 'State of Indiana Registered Barber Apprenticeship combining JRI employability skills, Milady theory, shop-based practical training, and State Board preparation.',
  delivery_mode: 'hybrid',
  is_apprenticeship: true,
  is_on_etpl: true,
  etpl_program_code: 'IN-BARBER-XXXX', // TODO: Replace with real ETPL code
  rapids_program_id: 'RAPIDS-PROG-ID-XXXX', // TODO: Replace with real RAPIDS ID
  rapids_occupation_code: '39-5011', // SOC code for barbers
  active: true
};

const BARBER_MODULES = [
  {
    order_index: 0,
    title: 'Module 0 – Job Ready Indy Employability Skills',
    description: 'Complete all Job Ready Indy badges to build core employability skills required by Marion County employers.',
    content_type: 'scorm',
    partner_name: 'JRI',
    required_hours: 20.0,
    requires_proof: true,
    is_required: true,
    scorm_package: {
      title: 'Job Ready Indy – Full Badge Set',
      provider: 'JRI',
      scorm_version: '1.2',
      storage_path: 'scorm/jri/jri-barber-full.zip', // TODO: Update with real path
      launch_url: '/scorm-player/jri-barber-full', // TODO: Update with real route
      estimated_hours: 20.0
    }
  },
  {
    order_index: 1,
    title: 'Module 1 – Barber Theory (Milady)',
    description: 'Complete Milady barbering theory curriculum including sanitation, anatomy, chemistry, tools, and professional practices.',
    content_type: 'external_link',
    partner_name: 'Milady',
    external_url: 'https://cima.milady.com', // TODO: Update with real Milady link
    required_hours: 120.0,
    requires_proof: true,
    is_required: true
  },
  {
    order_index: 2,
    title: 'Module 2 – Shop Hours & Practical Training',
    description: 'On-the-job training in a licensed barbershop, including haircuts, shaves, fades, sanitation, client consultation, and business skills.',
    content_type: 'other',
    partner_name: 'EFH / Shop Partner',
    required_hours: 1500.0,
    requires_proof: true,
    is_required: true
  },
  {
    order_index: 3,
    title: 'Module 3 – State Board Prep (EFH SCORM)',
    description: 'Prepare for the Indiana State Barber Licensing Exam with EFH practice tests, review modules, and mock exams.',
    content_type: 'scorm',
    partner_name: 'EFH',
    required_hours: 40.0,
    requires_proof: true,
    is_required: true,
    scorm_package: {
      title: 'Barber State Board Prep',
      provider: 'EFH',
      scorm_version: '1.2',
      storage_path: 'scorm/efh/barber-state-board-prep.zip', // TODO: Update with real path
      launch_url: '/scorm-player/barber-state-board-prep', // TODO: Update with real route
      estimated_hours: 40.0
    }
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function log(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  if (data) {
  }
}

function logError(message: string, error: any) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ❌ ${message}`);
  console.error(error);
}

function logSuccess(message: string) {
  const timestamp = new Date().toISOString();
}

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function seedFundingPrograms() {
  log('📦 Seeding funding programs...');

  for (const funding of FUNDING_PROGRAMS) {
    try {
      const { data, error } = await supabaseAdmin
        .from('funding_programs')
        .upsert(funding, { onConflict: 'code' })
        .select()
        .single();

      if (error) {
        logError(`Failed to seed funding program: ${funding.code}`, error);
        throw error;
      }

      logSuccess(`Seeded funding program: ${funding.name} (${funding.code})`);
    } catch (error) {
      logError(`Error seeding funding program: ${funding.code}`, error);
      throw error;
    }
  }

  logSuccess('All funding programs seeded');
}

async function seedBarberProgram() {
  log('🎓 Seeding Barber Apprenticeship program...');

  try {
    const { data, error } = await supabaseAdmin
      .from('programs')
      .upsert(BARBER_PROGRAM, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      logError('Failed to seed Barber program', error);
      throw error;
    }

    logSuccess(`Seeded program: ${data.name} (${data.slug})`);
    return data;
  } catch (error) {
    logError('Error seeding Barber program', error);
    throw error;
  }
}

async function seedBarberModules(programId: string) {
  log('📚 Seeding Barber modules...');

  const moduleIds: string[] = [];

  for (const module of BARBER_MODULES) {
    try {
      // Create module
      const { data: moduleData, error: moduleError } = await supabaseAdmin
        .from('course_modules')
        .insert({
          program_id: programId,
          title: module.title,
          description: module.description,
          order_index: module.order_index,
          content_type: module.content_type,
          partner_name: module.partner_name,
          external_url: module.external_url || null,
          required_hours: module.required_hours,
          requires_proof: module.requires_proof,
          is_required: module.is_required
        })
        .select()
        .single();

      if (moduleError) {
        logError(`Failed to seed module: ${module.title}`, moduleError);
        throw moduleError;
      }

      logSuccess(`Seeded module: ${module.title}`);
      moduleIds.push(moduleData.id);

      // Create SCORM package if applicable
      if (module.scorm_package && moduleData.id) {
        const { error: scormError } = await supabaseAdmin
          .from('scorm_packages')
          .insert({
            module_id: moduleData.id,
            title: module.scorm_package.title,
            provider: module.scorm_package.provider,
            scorm_version: module.scorm_package.scorm_version,
            storage_path: module.scorm_package.storage_path,
            launch_url: module.scorm_package.launch_url,
            estimated_hours: module.scorm_package.estimated_hours
          });

        if (scormError) {
          logError(`Failed to seed SCORM package: ${module.scorm_package.title}`, scormError);
          throw scormError;
        }

        logSuccess(`  └─ Seeded SCORM package: ${module.scorm_package.title}`);
      }
    } catch (error) {
      logError(`Error seeding module: ${module.title}`, error);
      throw error;
    }
  }

  logSuccess(`All ${moduleIds.length} modules seeded`);
  return moduleIds;
}

async function linkFundingOptions(programId: string) {
  log('🔗 Linking funding options to Barber program...');

  try {
    // Get all funding program IDs
    const { data: fundingPrograms, error: fetchError } = await supabaseAdmin
      .from('funding_programs')
      .select('id, code, name')
      .in('code', ['WIOA-ADULT', 'WRG', 'JRI', 'APPRENTICESHIP']);

    if (fetchError) {
      logError('Failed to fetch funding programs', fetchError);
      throw fetchError;
    }

    if (!fundingPrograms || fundingPrograms.length === 0) {
      throw new Error('No funding programs found. Run seedFundingPrograms first.');
    }

    // Link each funding program to the Barber program
    for (const funding of fundingPrograms) {
      const { error: linkError } = await supabaseAdmin
        .from('program_funding_options')
        .upsert(
          {
            program_id: programId,
            funding_program_id: funding.id,
            is_default: funding.code === 'WIOA-ADULT' // Set WIOA-ADULT as default
          },
          { onConflict: 'program_id,funding_program_id' }
        );

      if (linkError) {
        logError(`Failed to link funding: ${funding.name}`, linkError);
        throw linkError;
      }

      logSuccess(`Linked funding option: ${funding.name} (${funding.code})`);
    }

    logSuccess('All funding options linked');
  } catch (error) {
    logError('Error linking funding options', error);
    throw error;
  }
}

async function verifySeeding() {
  log('🔍 Verifying seeded data...');

  try {
    // Verify program
    const { data: program, error: programError } = await supabaseAdmin
      .from('programs')
      .select('*')
      .eq('slug', 'barber-apprenticeship')
      .single();

    if (programError || !program) {
      throw new Error('Barber program not found');
    }
    logSuccess(`✓ Program verified: ${program.name}`);

    // Verify modules
    const { data: modules, error: modulesError } = await supabaseAdmin
      .from('course_modules')
      .select('*, scorm_packages(*)')
      .eq('program_id', program.id)
      .order('order_index');

    if (modulesError || !modules || modules.length !== 4) {
      throw new Error(`Expected 4 modules, found ${modules?.length || 0}`);
    }
    logSuccess(`✓ Modules verified: ${modules.length} modules found`);

    // Verify SCORM packages
    const scormCount = modules.filter(m => m.scorm_packages && m.scorm_packages.length > 0).length;
    logSuccess(`✓ SCORM packages verified: ${scormCount} packages found`);

    // Verify funding options
    const { data: fundingOptions, error: fundingError } = await supabaseAdmin
      .from('program_funding_options')
      .select('*, funding_programs(*)')
      .eq('program_id', program.id);

    if (fundingError || !fundingOptions || fundingOptions.length !== 4) {
      throw new Error(`Expected 4 funding options, found ${fundingOptions?.length || 0}`);
    }
    logSuccess(`✓ Funding options verified: ${fundingOptions.length} options linked`);

    return true;
  } catch (error) {
    logError('Verification failed', error);
    return false;
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {

  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables'
      );
    }

    log('Environment variables verified');
    log(`Supabase URL: ${supabaseUrl}`);

    // Step 1: Seed funding programs
    await seedFundingPrograms();

    // Step 2: Seed Barber program
    const program = await seedBarberProgram();

    // Step 3: Seed modules and SCORM packages
    await seedBarberModules(program.id);

    // Step 4: Link funding options
    await linkFundingOptions(program.id);

    // Step 5: Verify everything
    const verified = await verifySeeding();

    if (verified) {
      process.exit(0);
    } else {
      throw new Error('Verification failed');
    }
  } catch (error) {
    logError('Seeding failed', error);
    process.exit(1);
  }
}

// Run the seeder
main();
