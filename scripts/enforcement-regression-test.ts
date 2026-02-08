/**
 * Enforcement Regression Tests
 * 
 * Tests the 4 critical denial scenarios to prove enforcement works.
 * Run with: npx ts-node scripts/enforcement-regression-test.ts
 */

import { 
  checkEnrollmentPermission, 
  EnrollmentAction,
  DenialReason,
} from '../lib/enrollment';

// Mock user IDs for testing (these would be real test users in production)
const TEST_SCENARIOS = {
  // Scenario 1: Paid but no orientation
  paidNoOrientation: {
    userId: 'test-user-no-orientation',
    description: 'Paid user with no orientation tries timeclock',
    expectedCode: 'ORIENTATION_REQUIRED',
  },
  // Scenario 2: Compliant but unapproved shop
  unapprovedShop: {
    userId: 'test-user-compliant',
    shopId: 'test-shop-unapproved',
    description: 'Fully compliant user at unapproved shop',
    expectedCode: 'SHOP_NOT_APPROVED',
  },
  // Scenario 3: Before start date
  beforeStartDate: {
    userId: 'test-user-future-start',
    description: 'Fully compliant user before start date',
    expectedCode: 'START_DATE_NOT_REACHED',
  },
  // Scenario 4: Start date null
  startDateMissing: {
    userId: 'test-user-no-start-date',
    description: 'User with null start date',
    expectedCode: 'START_DATE_MISSING',
  },
};

interface TestResult {
  scenario: string;
  description: string;
  expectedCode: string;
  actualCode: string | null;
  passed: boolean;
  response: any;
  timestamp: string;
}

async function runTest(
  scenario: string,
  userId: string,
  action: EnrollmentAction,
  context: any,
  expectedCode: string,
  description: string
): Promise<TestResult> {
  const timestamp = new Date().toISOString();
  
  try {
    const result = await checkEnrollmentPermission(userId, action, context);
    
    const actualCode = result.reason || null;
    const passed = !result.allowed && actualCode === expectedCode;
    
    return {
      scenario,
      description,
      expectedCode,
      actualCode,
      passed,
      response: {
        allowed: result.allowed,
        reason: result.reason,
        message: result.message,
        state: result.state,
      },
      timestamp,
    };
  } catch (error) {
    return {
      scenario,
      description,
      expectedCode,
      actualCode: 'ERROR',
      passed: false,
      response: { error: String(error) },
      timestamp,
    };
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           ENFORCEMENT REGRESSION TESTS                         ');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  const results: TestResult[] = [];

  // Test 1: Paid but no orientation
  console.log('Test 1: Paid user with no orientation tries timeclock...');
  results.push(await runTest(
    'paidNoOrientation',
    TEST_SCENARIOS.paidNoOrientation.userId,
    EnrollmentAction.CLOCK_IN,
    {},
    TEST_SCENARIOS.paidNoOrientation.expectedCode,
    TEST_SCENARIOS.paidNoOrientation.description
  ));

  // Test 2: Unapproved shop
  console.log('Test 2: Compliant user at unapproved shop...');
  results.push(await runTest(
    'unapprovedShop',
    TEST_SCENARIOS.unapprovedShop.userId,
    EnrollmentAction.CLOCK_IN,
    { shopId: TEST_SCENARIOS.unapprovedShop.shopId },
    TEST_SCENARIOS.unapprovedShop.expectedCode,
    TEST_SCENARIOS.unapprovedShop.description
  ));

  // Test 3: Before start date
  console.log('Test 3: Compliant user before start date...');
  results.push(await runTest(
    'beforeStartDate',
    TEST_SCENARIOS.beforeStartDate.userId,
    EnrollmentAction.CLOCK_IN,
    {},
    TEST_SCENARIOS.beforeStartDate.expectedCode,
    TEST_SCENARIOS.beforeStartDate.description
  ));

  // Test 4: Start date missing
  console.log('Test 4: User with null start date...');
  results.push(await runTest(
    'startDateMissing',
    TEST_SCENARIOS.startDateMissing.userId,
    EnrollmentAction.CLOCK_IN,
    {},
    TEST_SCENARIOS.startDateMissing.expectedCode,
    TEST_SCENARIOS.startDateMissing.description
  ));

  // Print results
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         RESULTS                                ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  let passCount = 0;
  let failCount = 0;

  for (const result of results) {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}: ${result.description}`);
    console.log(`  Expected: ${result.expectedCode}`);
    console.log(`  Actual:   ${result.actualCode}`);
    console.log(`  Response: ${JSON.stringify(result.response, null, 2)}`);
    console.log('');
    
    if (result.passed) passCount++;
    else failCount++;
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`SUMMARY: ${passCount} passed, ${failCount} failed`);
  console.log('═══════════════════════════════════════════════════════════════');

  // Output JSON for audit packet
  console.log('\n\n--- JSON OUTPUT FOR AUDIT PACKET ---\n');
  console.log(JSON.stringify(results, null, 2));

  process.exit(failCount > 0 ? 1 : 0);
}

main().catch(console.error);
