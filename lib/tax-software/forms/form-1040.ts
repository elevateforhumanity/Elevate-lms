/**
 * Form 1040 Calculator
 * 2024 Tax Year
 */

import { TaxReturn } from '../types';

// 2024 Tax Brackets
const TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10, base: 0 },
    { min: 11600, max: 47150, rate: 0.12, base: 1160 },
    { min: 47150, max: 100525, rate: 0.22, base: 5426 },
    { min: 100525, max: 191950, rate: 0.24, base: 17168.50 },
    { min: 191950, max: 243725, rate: 0.32, base: 39110.50 },
    { min: 243725, max: 609350, rate: 0.35, base: 55678.50 },
    { min: 609350, max: Infinity, rate: 0.37, base: 183647.25 }
  ],
  married_filing_jointly: [
    { min: 0, max: 23200, rate: 0.10, base: 0 },
    { min: 23200, max: 94300, rate: 0.12, base: 2320 },
    { min: 94300, max: 201050, rate: 0.22, base: 10852 },
    { min: 201050, max: 383900, rate: 0.24, base: 34337 },
    { min: 383900, max: 487450, rate: 0.32, base: 78221 },
    { min: 487450, max: 731200, rate: 0.35, base: 111357 },
    { min: 731200, max: Infinity, rate: 0.37, base: 196669.50 }
  ],
  married_filing_separately: [
    { min: 0, max: 11600, rate: 0.10, base: 0 },
    { min: 11600, max: 47150, rate: 0.12, base: 1160 },
    { min: 47150, max: 100525, rate: 0.22, base: 5426 },
    { min: 100525, max: 191950, rate: 0.24, base: 17168.50 },
    { min: 191950, max: 243725, rate: 0.32, base: 39110.50 },
    { min: 243725, max: 365600, rate: 0.35, base: 55678.50 },
    { min: 365600, max: Infinity, rate: 0.37, base: 98334.75 }
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.10, base: 0 },
    { min: 16550, max: 63100, rate: 0.12, base: 1655 },
    { min: 63100, max: 100500, rate: 0.22, base: 7241 },
    { min: 100500, max: 191950, rate: 0.24, base: 15469 },
    { min: 191950, max: 243700, rate: 0.32, base: 37417 },
    { min: 243700, max: 609350, rate: 0.35, base: 53977 },
    { min: 609350, max: Infinity, rate: 0.37, base: 181954.50 }
  ],
  qualifying_surviving_spouse: [
    { min: 0, max: 23200, rate: 0.10, base: 0 },
    { min: 23200, max: 94300, rate: 0.12, base: 2320 },
    { min: 94300, max: 201050, rate: 0.22, base: 10852 },
    { min: 201050, max: 383900, rate: 0.24, base: 34337 },
    { min: 383900, max: 487450, rate: 0.32, base: 78221 },
    { min: 487450, max: 731200, rate: 0.35, base: 111357 },
    { min: 731200, max: Infinity, rate: 0.37, base: 196669.50 }
  ]
};

// 2024 Standard Deductions
const STANDARD_DEDUCTIONS_2024: Record<string, number> = {
  single: 14600,
  married_filing_jointly: 29200,
  married_filing_separately: 14600,
  head_of_household: 21900,
  qualifying_surviving_spouse: 29200
};

// 2024 EITC Parameters
const EITC_2024 = {
  0: { maxCredit: 632, phaseInRate: 0.0765, phaseOutStart: 9800, phaseOutRate: 0.0765, maxIncome: 18591 },
  1: { maxCredit: 4213, phaseInRate: 0.34, phaseOutStart: 22720, phaseOutRate: 0.1598, maxIncome: 49084 },
  2: { maxCredit: 6960, phaseInRate: 0.40, phaseOutStart: 22720, phaseOutRate: 0.2106, maxIncome: 55768 },
  3: { maxCredit: 7830, phaseInRate: 0.45, phaseOutStart: 22720, phaseOutRate: 0.2106, maxIncome: 59899 }
};

export interface Form1040Result {
  // Income
  line1: number; // Wages
  line2a: number; // Tax-exempt interest
  line2b: number; // Taxable interest
  line3a: number; // Qualified dividends
  line3b: number; // Ordinary dividends
  line4a: number; // IRA distributions
  line4b: number; // Taxable IRA
  line5a: number; // Pensions
  line5b: number; // Taxable pensions
  line6a: number; // Social Security
  line6b: number; // Taxable SS
  line7: number; // Capital gain/loss
  line8: number; // Other income (Schedule 1)
  line9: number; // Total income
  line10: number; // Adjustments (Schedule 1)
  line11: number; // AGI
  
  // Deductions
  line12: number; // Standard or itemized
  line13: number; // QBI deduction
  line14: number; // Total deductions
  line15: number; // Taxable income
  
  // Tax and Credits
  line16: number; // Tax
  line17: number; // Schedule 2 taxes
  line18: number; // Total tax before credits
  line19: number; // Child tax credit
  line20: number; // Schedule 3 credits
  line21: number; // Other credits
  line22: number; // Total credits
  line23: number; // Tax after credits
  line24: number; // Other taxes (Schedule 2)
  line25: number; // Total tax
  
  // Payments
  line26: number; // Federal withholding
  line27: number; // Estimated payments
  line28: number; // EITC
  line29: number; // Additional CTC
  line30: number; // American Opportunity Credit
  line31: number; // Schedule 3 payments
  line32: number; // Total other payments
  line33: number; // Total payments
  
  // Refund or Amount Owed
  line34: number; // Overpaid
  line35: number; // Refund
  line36: number; // Applied to next year
  line37: number; // Amount owed
  line38: number; // Estimated tax penalty
}

export function calculateForm1040(taxReturn: TaxReturn): Form1040Result {
  // Line 1: Wages
  const line1 = taxReturn.w2Income?.reduce((sum, w2) => sum + w2.wages, 0) || 0;
  
  // Line 2: Interest
  const line2a = 0; // Tax-exempt interest
  const line2b = taxReturn.form1099INT?.reduce((sum, f) => sum + f.interestIncome, 0) || 0;
  
  // Line 3: Dividends
  const line3a = taxReturn.form1099DIV?.reduce((sum, f) => sum + f.qualifiedDividends, 0) || 0;
  const line3b = taxReturn.form1099DIV?.reduce((sum, f) => sum + f.ordinaryDividends, 0) || 0;
  
  // Lines 4-6: IRA, Pensions, Social Security (simplified)
  const line4a = 0;
  const line4b = 0;
  const line5a = 0;
  const line5b = 0;
  const line6a = 0;
  const line6b = 0;
  
  // Line 7: Capital gains
  const line7 = 0;
  
  // Line 8: Other income (Schedule C, etc.)
  const scheduleC = taxReturn.scheduleCBusiness?.reduce((sum, b) => sum + b.netProfit, 0) || 0;
  const other1099 = (taxReturn.form1099MISC?.reduce((sum, f) => sum + (f.otherIncome || 0), 0) || 0) +
                    (taxReturn.form1099NEC?.reduce((sum, f) => sum + f.nonemployeeCompensation, 0) || 0);
  const line8 = scheduleC + other1099 + (taxReturn.otherIncome || 0);
  
  // Line 9: Total income
  const line9 = line1 + line2b + line3b + line4b + line5b + line6b + line7 + line8;
  
  // Line 10: Adjustments
  const line10 = taxReturn.adjustments ? (
    (taxReturn.adjustments.educatorExpenses || 0) +
    (taxReturn.adjustments.hsaDeduction || 0) +
    (taxReturn.adjustments.selfEmploymentTax || 0) +
    (taxReturn.adjustments.selfEmployedHealthInsurance || 0) +
    (taxReturn.adjustments.iraDeduction || 0) +
    (taxReturn.adjustments.studentLoanInterest || 0) +
    (taxReturn.adjustments.alimonyPaid || 0)
  ) : 0;
  
  // Line 11: AGI
  const line11 = line9 - line10;
  
  // Line 12: Standard or itemized deduction
  let line12 = STANDARD_DEDUCTIONS_2024[taxReturn.filingStatus] || 14600;
  if (taxReturn.deductionType === 'itemized' && taxReturn.itemizedDeductions) {
    const itemized = calculateItemizedDeductions(taxReturn);
    if (itemized > line12) {
      line12 = itemized;
    }
  }
  
  // Line 13: QBI deduction
  const line13 = taxReturn.qualifiedBusinessIncomeDeduction || 0;
  
  // Line 14: Total deductions
  const line14 = line12 + line13;
  
  // Line 15: Taxable income
  const line15 = Math.max(0, line11 - line14);
  
  // Line 16: Tax
  const line16 = calculateTax(line15, taxReturn.filingStatus);
  
  // Line 17: Schedule 2 taxes (AMT, etc.)
  const line17 = 0;
  
  // Line 18: Total tax before credits
  const line18 = line16 + line17;
  
  // Line 19: Child tax credit and credit for other dependents
  const { childTaxCredit, otherDependentCredit } = calculateChildTaxCredit(taxReturn, line11);
  const line19 = Math.min(childTaxCredit + otherDependentCredit, line18);
  
  // Lines 20-21: Other credits
  const line20 = 0;
  const line21 = 0;
  
  // Line 22: Total credits
  const line22 = line19 + line20 + line21;
  
  // Line 23: Tax after credits
  const line23 = Math.max(0, line18 - line22);
  
  // Line 24: Other taxes
  const line24 = scheduleC > 0 ? calculateSelfEmploymentTax(scheduleC) : 0;
  
  // Line 25: Total tax
  const line25 = line23 + line24;
  
  // Line 26: Federal withholding
  const line26 = taxReturn.w2Income?.reduce((sum, w2) => sum + w2.federalWithholding, 0) || 0;
  
  // Line 27: Estimated payments
  const line27 = taxReturn.estimatedTaxPayments || 0;
  
  // Line 28: EITC
  const line28 = calculateEITC(taxReturn, line1, line11);
  
  // Line 29: Additional Child Tax Credit
  const line29 = calculateAdditionalChildTaxCredit(taxReturn, childTaxCredit, line18);
  
  // Line 30: American Opportunity Credit (refundable portion)
  const line30 = 0;
  
  // Line 31: Schedule 3 payments
  const line31 = 0;
  
  // Line 32: Total other payments
  const line32 = line28 + line29 + line30 + line31;
  
  // Line 33: Total payments
  const line33 = line26 + line27 + line32;
  
  // Line 34: Overpaid
  const line34 = Math.max(0, line33 - line25);
  
  // Line 35: Refund
  const line35 = line34;
  
  // Line 36: Applied to next year
  const line36 = 0;
  
  // Line 37: Amount owed
  const line37 = Math.max(0, line25 - line33);
  
  // Line 38: Estimated tax penalty
  const line38 = 0;
  
  return {
    line1, line2a, line2b, line3a, line3b, line4a, line4b, line5a, line5b, line6a, line6b,
    line7, line8, line9, line10, line11, line12, line13, line14, line15, line16, line17,
    line18, line19, line20, line21, line22, line23, line24, line25, line26, line27, line28,
    line29, line30, line31, line32, line33, line34, line35, line36, line37, line38
  };
}

function calculateTax(taxableIncome: number, filingStatus: string): number {
  const brackets = TAX_BRACKETS_2024[filingStatus as keyof typeof TAX_BRACKETS_2024] || TAX_BRACKETS_2024.single;
  
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.max) {
      return bracket.base + (taxableIncome - bracket.min) * bracket.rate;
    }
  }
  
  return 0;
}

function calculateItemizedDeductions(taxReturn: TaxReturn): number {
  if (!taxReturn.itemizedDeductions) return 0;
  
  const d = taxReturn.itemizedDeductions;
  
  // SALT cap at $10,000
  const saltTotal = Math.min(
    (d.stateLocalTaxes || 0) + (d.realEstateTaxes || 0) + (d.personalPropertyTaxes || 0),
    10000
  );
  
  return (
    (d.medicalExpenses || 0) +
    saltTotal +
    (d.mortgageInterest || 0) +
    (d.mortgageInsurancePremiums || 0) +
    (d.charitableCash || 0) +
    (d.charitableNoncash || 0) +
    (d.casualtyLosses || 0) +
    (d.otherDeductions || 0)
  );
}

function calculateChildTaxCredit(taxReturn: TaxReturn, agi: number): { childTaxCredit: number; otherDependentCredit: number } {
  const childrenUnder17 = taxReturn.dependents?.filter(d => d.childTaxCredit).length || 0;
  const otherDependents = taxReturn.dependents?.filter(d => d.otherDependentCredit).length || 0;
  
  let childTaxCredit = childrenUnder17 * 2000;
  let otherDependentCredit = otherDependents * 500;
  
  // Phase out for high income
  const threshold = taxReturn.filingStatus === 'married_filing_jointly' ? 400000 : 200000;
  if (agi > threshold) {
    const reduction = Math.ceil((agi - threshold) / 1000) * 50;
    childTaxCredit = Math.max(0, childTaxCredit - reduction);
    otherDependentCredit = Math.max(0, otherDependentCredit - reduction);
  }
  
  return { childTaxCredit, otherDependentCredit };
}

function calculateAdditionalChildTaxCredit(taxReturn: TaxReturn, childTaxCredit: number, taxLiability: number): number {
  // Additional CTC is the refundable portion
  const nonrefundableCTC = Math.min(childTaxCredit, taxLiability);
  const potentialRefundable = childTaxCredit - nonrefundableCTC;
  
  if (potentialRefundable <= 0) return 0;
  
  // Calculate based on earned income
  const earnedIncome = taxReturn.w2Income?.reduce((sum, w2) => sum + w2.wages, 0) || 0;
  const scheduleC = taxReturn.scheduleCBusiness?.reduce((sum, b) => sum + Math.max(0, b.netProfit), 0) || 0;
  const totalEarned = earnedIncome + scheduleC;
  
  if (totalEarned <= 2500) return 0;
  
  const refundableAmount = (totalEarned - 2500) * 0.15;
  return Math.min(potentialRefundable, refundableAmount);
}

function calculateEITC(taxReturn: TaxReturn, earnedIncome: number, agi: number): number {
  // EITC not available for MFS
  if (taxReturn.filingStatus === 'married_filing_separately') return 0;
  
  const numChildren = Math.min(taxReturn.dependents?.length || 0, 3);
  const params = EITC_2024[numChildren as keyof typeof EITC_2024];
  
  // Check income limits
  const maxIncome = taxReturn.filingStatus === 'married_filing_jointly' 
    ? params.maxIncome + 7430 
    : params.maxIncome;
  
  if (agi > maxIncome || earnedIncome > maxIncome) return 0;
  
  // Calculate credit
  const phaseInCredit = earnedIncome * params.phaseInRate;
  const credit = Math.min(phaseInCredit, params.maxCredit);
  
  // Phase out
  const phaseOutStart = taxReturn.filingStatus === 'married_filing_jointly'
    ? params.phaseOutStart + 7430
    : params.phaseOutStart;
  
  if (agi > phaseOutStart) {
    const reduction = (agi - phaseOutStart) * params.phaseOutRate;
    return Math.max(0, credit - reduction);
  }
  
  return credit;
}

function calculateSelfEmploymentTax(netSelfEmployment: number): number {
  if (netSelfEmployment <= 0) return 0;
  
  const taxableAmount = netSelfEmployment * 0.9235;
  
  // Social Security portion (up to wage base)
  const ssWageBase = 168600; // 2024
  const ssTax = Math.min(taxableAmount, ssWageBase) * 0.124;
  
  // Medicare portion (no limit)
  const medicareTax = taxableAmount * 0.029;
  
  // Additional Medicare tax for high earners
  const additionalMedicare = taxableAmount > 200000 ? (taxableAmount - 200000) * 0.009 : 0;
  
  return ssTax + medicareTax + additionalMedicare;
}

export function getStandardDeduction(filingStatus: string): number {
  return STANDARD_DEDUCTIONS_2024[filingStatus] || 14600;
}

export function getTaxBrackets(filingStatus: string) {
  return TAX_BRACKETS_2024[filingStatus as keyof typeof TAX_BRACKETS_2024] || TAX_BRACKETS_2024.single;
}
