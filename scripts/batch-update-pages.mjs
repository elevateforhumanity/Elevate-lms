#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToUpdate = fs.readFileSync('/tmp/pages_to_update.txt', 'utf-8')
  .split('\n')
  .filter(f => f.trim());

let updated = 0;
let skipped = 0;

filesToUpdate.forEach((filePath) => {
  const fullPath = path.join('/workspaces/workspaces', filePath);

  if (!fs.existsSync(fullPath)) {
    skipped++;
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // Skip if already has proper user filtering
  if (content.includes('.eq(\'user_id\'') ||
      content.includes('.eq(\'student_id\'') ||
      content.includes('.eq(\'id\', user.id)')) {
    skipped++;
    return;
  }

  // Skip admin user management pages (they should use profiles)
  if ((filePath.includes('/admin/users') ||
       filePath.includes('/admin/students') ||
       filePath.includes('/admin/staff')) &&
      content.includes('.eq(\'role\'')) {
    skipped++;
    return;
  }

  // Skip if has complex select with joins
  if (content.match(/\.select\([^)]*\([^)]*\)/)) {
    skipped++;
    return;
  }

  // Determine portal and update accordingly
  const isStudent = filePath.includes('/student/');
  const isStaff = filePath.includes('/staff-portal/');
  const isPartner = filePath.includes('/partner/');
  const isEmployer = filePath.includes('/employer/');

  let changed = false;

  // Student portal: calendar, badges, etc
  if (isStudent && filePath.includes('/calendar/')) {
    content = content.replace(
      /\.from\('profiles'\)\s*\.select\('\*', \{ count: 'exact' \}\)/g,
      ".from('calendar_events').select('*', { count: 'exact' }).eq('user_id', user.id)"
    );
    changed = true;
  } else if (isStudent && filePath.includes('/badges/')) {
    content = content.replace(
      /\.from\('profiles'\)\s*\.select\('\*', \{ count: 'exact' \}\)/g,
      ".from('user_badges').select('*, badges(*)', { count: 'exact' }).eq('user_id', user.id)"
    );
    changed = true;
  }

  // Staff portal: tickets, processes
  if (isStaff && filePath.includes('/customer-service/')) {
    content = content.replace(
      /\.from\('service_tickets'\)/g,
      ".from('customer_service_tickets')"
    );
    changed = true;
  } else if (isStaff && filePath.includes('/processes/')) {
    content = content.replace(
      /\.from\('processes'\)/g,
      ".from('staff_processes')"
    );
    changed = true;
  }

  if (changed && content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    updated++;
  } else {
    skipped++;
  }
});

