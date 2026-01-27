/**
 * Tax Configuration Loader
 * Loads tax parameters from JSON config files by year
 * Enables auto-updating without code changes
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  base: number;
}

export interface EITCParams {
  maxCredit: number;
  phaseInRate: number;
  phaseOutStart: number;
  phaseOutStartMFJ: number;
  phaseOutRate: number;
  maxIncome: number;
  maxIncomeMFJ: number;
}

export interface TaxConfig {
  taxYear: number;
  effectiveDate: string;
  lastUpdated: string;
  source: string;
  
  brackets: Record<string, TaxBracket[]>;
  standardDeductions: Record<string, number> & {
    additionalBlindOrElderly: { single: number; married: number };
  };
  
  eitc: Record<string, EITCParams> & {
    investmentIncomeLimit: number;
    minimumAge: number;
    maximumAge: number;
  };
  
  childTaxCredit: {
    creditPerChild: number;
    refundableMax: number;
    otherDependentCredit: number;
    phaseOutThreshold: Record<string, number>;
    phaseOutRate: number;
    phaseOutPer: number;
    qualifyingAge: number;
    earnedIncomeThreshold: number;
    refundableRate: number;
  };
  
  socialSecurity: {
    wageBase: number;
    taxRate: number;
    employerRate: number;
    selfEmployedRate: number;
  };
  
  medicare: {
    taxRate: number;
    employerRate: number;
    selfEmployedRate: number;
    additionalTaxRate: number;
    additionalTaxThreshold: Record<string, number>;
  };
  
  selfEmployment: {
    taxablePercentage: number;
    deductiblePercentage: number;
  };
  
  saltCap: number;
  
  amt: {
    exemption: Record<string, number>;
    phaseOutThreshold: Record<string, number>;
    rate1: number;
    rate2: number;
    rate2Threshold: number;
  };
  
  niit: {
    rate: number;
    threshold: Record<string, number>;
  };
  
  capitalGains: {
    rate0Threshold: Record<string, number>;
    rate15Threshold: Record<string, number>;
    rates: number[];
  };
  
  qbi: {
    deductionRate: number;
    wageLimit: number;
    wageAndBasisLimit: number;
    basisPercentage: number;
    thresholdStart: Record<string, number>;
    thresholdEnd: Record<string, number>;
  };
  
  retirementContributions: {
    '401k': { limit: number; catchUpAge: number; catchUpLimit: number };
    ira: { limit: number; catchUpAge: number; catchUpLimit: number };
    sep: { maxPercentage: number; maxDollar: number };
    simple: { limit: number; catchUpAge: number; catchUpLimit: number };
  };
  
  hsa: {
    selfOnly: number;
    family: number;
    catchUpAge: number;
    catchUpLimit: number;
  };
  
  studentLoanInterest: {
    maxDeduction: number;
    phaseOutStart: Record<string, number>;
    phaseOutEnd: Record<string, number>;
  };
  
  educatorExpense: {
    maxDeduction: number;
  };
  
  foreignEarnedIncome: {
    exclusion: number;
    housingExclusionBase: number;
  };
  
  estateAndGift: {
    annualExclusion: number;
    lifetimeExemption: number;
  };
  
  mileageRates: {
    business: number;
    medical: number;
    charity: number;
  };
  
  perDiem: {
    highCost: number;
    lowCost: number;
    incidentals: number;
  };
}

// Cache loaded configs
const configCache: Map<number, TaxConfig> = new Map();

/**
 * Load tax configuration for a specific year
 */
export function loadTaxConfig(taxYear: number): TaxConfig {
  // Check cache first
  if (configCache.has(taxYear)) {
    return configCache.get(taxYear)!;
  }
  
  const configPath = path.join(__dirname, `${taxYear}.json`);
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Tax configuration not found for year ${taxYear}. Expected file: ${configPath}`);
  }
  
  const configData = fs.readFileSync(configPath, 'utf-8');
  const config: TaxConfig = JSON.parse(configData);
  
  // Validate config
  validateConfig(config, taxYear);
  
  // Cache it
  configCache.set(taxYear, config);
  
  return config;
}

/**
 * Get available tax years
 */
export function getAvailableTaxYears(): number[] {
  const files = fs.readdirSync(__dirname);
  return files
    .filter(f => f.match(/^\d{4}\.json$/))
    .map(f => parseInt(f.replace('.json', '')))
    .sort((a, b) => b - a); // Newest first
}

/**
 * Check if config exists for a year
 */
export function hasConfigForYear(taxYear: number): boolean {
  const configPath = path.join(__dirname, `${taxYear}.json`);
  return fs.existsSync(configPath);
}

/**
 * Validate config has required fields
 */
function validateConfig(config: TaxConfig, expectedYear: number): void {
  if (config.taxYear !== expectedYear) {
    throw new Error(`Config year mismatch: expected ${expectedYear}, got ${config.taxYear}`);
  }
  
  const requiredFields = [
    'brackets',
    'standardDeductions',
    'eitc',
    'childTaxCredit',
    'socialSecurity',
    'medicare',
    'selfEmployment',
    'saltCap'
  ];
  
  for (const field of requiredFields) {
    if (!(field in config)) {
      throw new Error(`Missing required field in tax config: ${field}`);
    }
  }
  
  // Validate brackets exist for all filing statuses
  const filingStatuses = [
    'single',
    'married_filing_jointly',
    'married_filing_separately',
    'head_of_household',
    'qualifying_surviving_spouse'
  ];
  
  for (const status of filingStatuses) {
    if (!config.brackets[status]) {
      throw new Error(`Missing tax brackets for filing status: ${status}`);
    }
    if (!config.standardDeductions[status]) {
      throw new Error(`Missing standard deduction for filing status: ${status}`);
    }
  }
}

/**
 * Clear config cache (useful for testing or after updates)
 */
export function clearConfigCache(): void {
  configCache.clear();
}

/**
 * Get config metadata without loading full config
 */
export function getConfigMetadata(taxYear: number): { lastUpdated: string; source: string } | null {
  const configPath = path.join(__dirname, `${taxYear}.json`);
  
  if (!fs.existsSync(configPath)) {
    return null;
  }
  
  const configData = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(configData);
  
  return {
    lastUpdated: config.lastUpdated,
    source: config.source
  };
}

// Export default config for current tax year
export const currentTaxYear = 2024;
export const currentConfig = loadTaxConfig(currentTaxYear);
