// lib/tax-calculator.ts - Custom Tax Calculation Engine
// Based on IRS tax tables and formulas

export interface TaxReturn {
  // Personal Info
  filing_status: 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_widow';
  dependents_count: number;

  // Income
  w2_income: number;
  self_employment_income: number;
  interest_income: number;
  dividend_income: number;
  other_income: number;

  // Deductions
  standard_deduction: boolean;
  itemized_deductions: number;
  student_loan_interest: number;

  // Tax Year
  tax_year: number;
}

export interface TaxCalculation {
  total_income: number;
  adjusted_gross_income: number;
  deductions: number;
  taxable_income: number;
  federal_tax: number;
  self_employment_tax: number;
  total_tax: number;
  effective_tax_rate: number;
}

// 2024 Standard Deduction Amounts
const STANDARD_DEDUCTIONS_2024: Record<string, number> = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
  qualifying_widow: 29200,
};

// 2024 Federal Tax Brackets (Single)
const TAX_BRACKETS_2024_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

// 2024 Federal Tax Brackets (Married Filing Jointly)
const TAX_BRACKETS_2024_MARRIED_JOINT = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

// 2024 Federal Tax Brackets (Head of Household)
const TAX_BRACKETS_2024_HEAD_OF_HOUSEHOLD = [
  { min: 0, max: 16550, rate: 0.10 },
  { min: 16550, max: 63100, rate: 0.12 },
  { min: 63100, max: 100500, rate: 0.22 },
  { min: 100500, max: 191950, rate: 0.24 },
  { min: 191950, max: 243700, rate: 0.32 },
  { min: 243700, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

function getTaxBrackets(filing_status: string) {
  switch (filing_status) {
    case 'single':
    case 'married_separate':
      return TAX_BRACKETS_2024_SINGLE;
    case 'married_joint':
    case 'qualifying_widow':
      return TAX_BRACKETS_2024_MARRIED_JOINT;
    case 'head_of_household':
      return TAX_BRACKETS_2024_HEAD_OF_HOUSEHOLD;
    default:
      return TAX_BRACKETS_2024_SINGLE;
  }
}

function calculateFederalTax(taxable_income: number, filing_status: string): number {
  if (taxable_income <= 0) return 0;

  const brackets = getTaxBrackets(filing_status);
  let tax = 0;
  const previous_max = 0;

  for (const bracket of brackets) {
    if (taxable_income <= bracket.min) break;

    const taxable_in_bracket = Math.min(taxable_income, bracket.max) - bracket.min;
    tax += taxable_in_bracket * bracket.rate;

    if (taxable_income <= bracket.max) break;
  }

  return Math.round(tax * 100) / 100;
}

function calculateSelfEmploymentTax(self_employment_income: number): number {
  if (self_employment_income <= 0) return 0;

  // Self-employment tax is 15.3% (12.4% Social Security + 2.9% Medicare)
  // Only 92.35% of net earnings is subject to SE tax
  const net_earnings = self_employment_income * 0.9235;

  // Social Security tax (12.4%) up to wage base limit ($168,600 for 2024)
  const ss_wage_base = 168600;
  const ss_taxable = Math.min(net_earnings, ss_wage_base);
  const ss_tax = ss_taxable * 0.124;

  // Medicare tax (2.9%) on all earnings
  const medicare_tax = net_earnings * 0.029;

  // Additional Medicare tax (0.9%) on earnings over $200,000 (single) or $250,000 (married)
  const additional_medicare_threshold = 200000;
  const additional_medicare_tax = Math.max(0, net_earnings - additional_medicare_threshold) * 0.009;

  return Math.round((ss_tax + medicare_tax + additional_medicare_tax) * 100) / 100;
}

export function calculateTax(taxReturn: TaxReturn): TaxCalculation {
  // Calculate total income
  const total_income =
    taxReturn.w2_income +
    taxReturn.self_employment_income +
    taxReturn.interest_income +
    taxReturn.dividend_income +
    taxReturn.other_income;

  // Calculate self-employment tax deduction (50% of SE tax)
  const self_employment_tax = calculateSelfEmploymentTax(taxReturn.self_employment_income);
  const se_tax_deduction = self_employment_tax / 2;

  // Calculate student loan interest deduction (max $2,500)
  const student_loan_deduction = Math.min(taxReturn.student_loan_interest, 2500);

  // Calculate Adjusted Gross Income (AGI)
  const adjusted_gross_income = total_income - se_tax_deduction - student_loan_deduction;

  // Calculate deductions
  const standard_deduction = STANDARD_DEDUCTIONS_2024[taxReturn.filing_status] || STANDARD_DEDUCTIONS_2024.single;
  const deductions = taxReturn.standard_deduction
    ? standard_deduction
    : Math.max(taxReturn.itemized_deductions, standard_deduction);

  // Calculate taxable income
  const taxable_income = Math.max(0, adjusted_gross_income - deductions);

  // Calculate federal income tax
  const federal_tax = calculateFederalTax(taxable_income, taxReturn.filing_status);

  // Calculate total tax
  const total_tax = federal_tax + self_employment_tax;

  // Calculate effective tax rate
  const effective_tax_rate = total_income > 0 ? (total_tax / total_income) * 100 : 0;

  return {
    total_income: Math.round(total_income * 100) / 100,
    adjusted_gross_income: Math.round(adjusted_gross_income * 100) / 100,
    deductions: Math.round(deductions * 100) / 100,
    taxable_income: Math.round(taxable_income * 100) / 100,
    federal_tax: Math.round(federal_tax * 100) / 100,
    self_employment_tax: Math.round(self_employment_tax * 100) / 100,
    total_tax: Math.round(total_tax * 100) / 100,
    effective_tax_rate: Math.round(effective_tax_rate * 100) / 100,
  };
}

// Calculate estimated refund or amount owed
export function calculateRefund(
  taxCalculation: TaxCalculation,
  federal_withholding: number = 0,
  estimated_tax_payments: number = 0
): {
  total_payments: number;
  refund_or_owed: number;
  is_refund: boolean;
} {
  const total_payments = federal_withholding + estimated_tax_payments;
  const refund_or_owed = total_payments - taxCalculation.total_tax;

  return {
    total_payments: Math.round(total_payments * 100) / 100,
    refund_or_owed: Math.round(Math.abs(refund_or_owed) * 100) / 100,
    is_refund: refund_or_owed > 0,
  };
}

// Generate Form 1040 data
export function generateForm1040(
  taxReturn: TaxReturn,
  taxCalculation: TaxCalculation
): Record<string, any> {
  return {
    form: '1040',
    tax_year: taxReturn.tax_year,
    filing_status: taxReturn.filing_status,

    // Lines 1-9: Income
    line_1: taxReturn.w2_income, // Wages, salaries, tips
    line_2: taxReturn.interest_income, // Tax-exempt interest
    line_3: taxReturn.dividend_income, // Qualified dividends
    line_4: taxReturn.self_employment_income, // Business income
    line_5: 0, // Capital gain or loss
    line_6: taxReturn.other_income, // Other income
    line_7: 0, // IRA distributions
    line_8: 0, // Pensions and annuities
    line_9: taxCalculation.total_income, // Total income

    // Lines 10-11: Adjustments
    line_10: taxCalculation.self_employment_tax / 2, // SE tax deduction
    line_11: taxCalculation.adjusted_gross_income, // Adjusted gross income

    // Lines 12-15: Deductions
    line_12: taxCalculation.deductions, // Standard or itemized deductions
    line_13: 0, // Qualified business income deduction
    line_14: taxCalculation.deductions, // Total deductions
    line_15: taxCalculation.taxable_income, // Taxable income

    // Lines 16-24: Tax and Credits
    line_16: taxCalculation.federal_tax, // Tax
    line_17: 0, // Additional taxes
    line_18: 0, // Child tax credit
    line_19: 0, // Other credits
    line_20: 0, // Total credits
    line_21: taxCalculation.federal_tax, // Tax after credits
    line_22: taxCalculation.self_employment_tax, // Self-employment tax
    line_23: 0, // Other taxes
    line_24: taxCalculation.total_tax, // Total tax

    // Calculated fields
    effective_tax_rate: taxCalculation.effective_tax_rate,
    dependents_count: taxReturn.dependents_count,
  };
}
