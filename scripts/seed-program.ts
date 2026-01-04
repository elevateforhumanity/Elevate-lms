#!/usr/bin/env node
/**
 * Universal Program Seeder for Elevate For Humanity
 * 
 * Seeds ANY program from JSON config files into Supabase
 * 
 * Usage:
 *   pnpm tsx scripts/seed-program.ts barber-apprenticeship-indiana.json
 *   pnpm tsx scripts/seed-program.ts cna-certification.json
 *   pnpm tsx scripts/seed-program.ts hvac-technician.json
 * 
 * Requirements:
 *   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - JSON file exists in data/programs/
 */

import { supabaseAdmin as supabase } from '../lib/supabaseAdmin.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Verify environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || SUPABASE_URL.includes('placeholder')) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.error('   Set these in .env.local or environment variables');
  process.exit(1);
}

interface AIInstructor {
  id: string;
  name: string;
  title: string;
  avatar_image_url: string;
  cloned_from_user: string;
  bio: string;
}

interface ProgramModule {
  id: string;
  short_code: string;
  title: string;
  type: 'internal' | 'external_partner';
  order_index: number;
  required_hours: number;
  requires_proof: boolean;
  ai_instructor_id: string;
  partner_name?: string;
  external_url?: string;
  is_capstone?: boolean;
  implementation_notes?: string;
}

interface ProgramConfig {
  program: {
    id: string;
    slug: string;
    name: string;
    category: string;
    delivery_mode: string;
    location_state?: string;
    description: string;
  };
  ai_instructors: AIInstructor[];
  modules: ProgramModule[];
}

async function seedProgram(fileName: string) {

  try {
    // Load program data
    const filePath = join(process.cwd(), 'data/programs', fileName);
    const programData: ProgramConfig = JSON.parse(readFileSync(filePath, 'utf-8'));


    // 1. Seed AI Instructors
    for (const instructor of programData.ai_instructors) {
      const { error } = await supabase
        .from('ai_instructors')
        .upsert(instructor, { onConflict: 'id' });

      if (error) {
        console.error(`   ❌ Failed to seed ${instructor.name}:`, error.message);
      } else {
      }
    }

    // 2. Seed Program
    const { error: programError } = await supabase
      .from('programs')
      .upsert(programData.program, { onConflict: 'id' });

    if (programError) {
      console.error('   ❌ Failed to seed program:', programError.message);
      throw programError;
    }

    // 3. Delete existing modules for clean slate
    const { error: deleteError } = await supabase
      .from('course_modules')
      .delete()
      .eq('program_id', programData.program.id);

    if (deleteError) {
    } else {
    }

    // 4. Seed Modules
    for (const module of programData.modules) {
      const moduleRecord = {
        id: module.id,
        program_id: programData.program.id,
        title: module.title,
        short_code: module.short_code,
        description: module.implementation_notes || module.title,
        order_index: module.order_index,
        type: module.type,
        partner_name: module.partner_name || null,
        external_url: module.external_url || null,
        required_hours: module.required_hours,
        requires_proof: module.requires_proof,
        ai_instructor_id: module.ai_instructor_id,
        is_capstone: module.is_capstone || false,
        implementation_notes: module.implementation_notes || null
      };

      const { error } = await supabase
        .from('course_modules')
        .insert(moduleRecord);

      if (error) {
        console.error(`   ❌ Failed to seed ${module.short_code}:`, error.message);
      } else {
      }
    }

    // 5. Verify Seeding

    const { data: program, error: verifyProgramError } = await supabase
      .from('programs')
      .select('*')
      .eq('id', programData.program.id)
      .single();

    if (verifyProgramError || !program) {
      console.error('   ❌ Program not found');
      return false;
    }

    const { data: modules, error: verifyModulesError } = await supabase
      .from('course_modules')
      .select('*')
      .eq('program_id', programData.program.id)
      .order('order_index');

    if (verifyModulesError || !modules) {
      console.error('   ❌ Modules not found');
      return false;
    }

    const { data: instructors, error: verifyInstructorsError } = await supabase
      .from('ai_instructors')
      .select('*')
      .in('id', programData.ai_instructors.map(i => i.id));

    if (verifyInstructorsError || !instructors || instructors.length !== programData.ai_instructors.length) {
      console.error('   ❌ AI Instructors not found');
      return false;
    }


    return true;
  } catch (error) {
    console.error('\n❌ Seed script failed:', error);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ ERROR: You must specify a program JSON file.');
    console.error('\nUsage:');
    console.error('  pnpm tsx scripts/seed-program.ts barber-apprenticeship-indiana.json');
    console.error('  pnpm tsx scripts/seed-program.ts cna-certification.json');
    console.error('  pnpm tsx scripts/seed-program.ts hvac-technician.json');
    console.error('\nAvailable programs in data/programs/:');
    
    try {
      const fs = await import('fs');
      const files = fs.readdirSync(join(process.cwd(), 'data/programs'));
      files.filter(f => f.endsWith('.json')).forEach(f => {
        console.error(`  - ${f}`);
      });
    } catch (e) {
      console.error('  (Could not list files)');
    }
    
    process.exit(1);
  }

  const fileName = args[0];
  const success = await seedProgram(fileName);
  process.exit(success ? 0 : 1);
}

main();
