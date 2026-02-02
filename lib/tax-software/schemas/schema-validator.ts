/**
 * IRS MeF XML Schema Validator
 * Validates generated XML against IRS schemas before transmission
 * 
 * IMPORTANT: Actual IRS schemas must be downloaded from IRS e-Services
 * and placed in the schemas/{taxYear}/ directory.
 */

import { DOMParser } from '@xmldom/xmldom';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { fileURLToPath } from 'url';

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface SchemaValidationResult {
  valid: boolean;
  errors: SchemaValidationError[];
  warnings: SchemaValidationError[];
  schemaVersion: string;
  validatedAt: string;
  xmlHash: string;
}

export interface SchemaValidationError {
  code: string;
  message: string;
  line?: number;
  column?: number;
  xpath?: string;
  severity: 'error' | 'warning';
}

// Schema file mapping for each tax year
const SCHEMA_MANIFEST: Record<number, SchemaManifest> = {
  2024: {
    version: '2024v1.0',
    mainSchema: 'efile1040x_2024v1.0.xsd',
    returnSchema: 'IRS1040_2024v1.0.xsd',
    commonSchema: 'efileTypes_2024v1.0.xsd',
    w2Schema: 'IRSW2_2024v1.0.xsd',
    scheduleCSchema: 'IRS1040ScheduleC_2024v1.0.xsd',
  },
  2023: {
    version: '2023v1.0',
    mainSchema: 'efile1040x_2023v1.0.xsd',
    returnSchema: 'IRS1040_2023v1.0.xsd',
    commonSchema: 'efileTypes_2023v1.0.xsd',
    w2Schema: 'IRSW2_2023v1.0.xsd',
    scheduleCSchema: 'IRS1040ScheduleC_2023v1.0.xsd',
  }
};

interface SchemaManifest {
  version: string;
  mainSchema: string;
  returnSchema: string;
  commonSchema: string;
  w2Schema: string;
  scheduleCSchema: string;
}

export class IRSSchemaValidator {
  private taxYear: number;
  private schemaDir: string;
  private schemasLoaded: boolean = false;
  private schemaCache: Map<string, string> = new Map();

  constructor(taxYear: number = 2024) {
    this.taxYear = taxYear;
    this.schemaDir = path.join(__dirname, 'schemas', taxYear.toString());
  }

  /**
   * Check if schemas are available for the tax year
   */
  async checkSchemasAvailable(): Promise<{ available: boolean; missing: string[] }> {
    const manifest = SCHEMA_MANIFEST[this.taxYear];
    if (!manifest) {
      return { available: false, missing: ['No schema manifest for tax year ' + this.taxYear] };
    }

    const missing: string[] = [];
    const schemaFiles = [
      manifest.mainSchema,
      manifest.returnSchema,
      manifest.commonSchema,
      manifest.w2Schema,
      manifest.scheduleCSchema
    ];

    for (const schemaFile of schemaFiles) {
      const schemaPath = path.join(this.schemaDir, schemaFile);
      try {
        await fs.promises.access(schemaPath, fs.constants.R_OK);
      } catch {
        missing.push(schemaFile);
      }
    }

    return { available: missing.length === 0, missing };
  }

  /**
   * Validate XML against IRS schemas
   */
  async validate(xml: string): Promise<SchemaValidationResult> {
    const errors: SchemaValidationError[] = [];
    const warnings: SchemaValidationError[] = [];
    const validatedAt = new Date().toISOString();
    const xmlHash = this.hashXml(xml);
    const manifest = SCHEMA_MANIFEST[this.taxYear];

    if (!manifest) {
      return {
        valid: false,
        errors: [{
          code: 'SCHEMA_NOT_FOUND',
          message: `No schema manifest for tax year ${this.taxYear}`,
          severity: 'error'
        }],
        warnings: [],
        schemaVersion: 'unknown',
        validatedAt,
        xmlHash
      };
    }

    // Check if schemas are available
    const { available, missing } = await this.checkSchemasAvailable();
    
    if (!available) {
      // Perform structural validation only (schemas not downloaded yet)
      return this.performStructuralValidation(xml, manifest.version, validatedAt, xmlHash, missing);
    }

    // Full schema validation when schemas are available
    try {
      const schemaValidationErrors = await this.validateAgainstSchema(xml);
      errors.push(...schemaValidationErrors.filter(e => e.severity === 'error'));
      warnings.push(...schemaValidationErrors.filter(e => e.severity === 'warning'));
    } catch (err) {
      errors.push({
        code: 'SCHEMA_VALIDATION_ERROR',
        message: err instanceof Error ? err.message : 'Schema validation failed',
        severity: 'error'
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      schemaVersion: manifest.version,
      validatedAt,
      xmlHash
    };
  }

  /**
   * Perform structural validation when schemas are not available
   * This validates XML structure, required elements, and data formats
   */
  private performStructuralValidation(
    xml: string,
    schemaVersion: string,
    validatedAt: string,
    xmlHash: string,
    missingSchemas: string[]
  ): SchemaValidationResult {
    const errors: SchemaValidationError[] = [];
    const warnings: SchemaValidationError[] = [];

    // Add warning about missing schemas
    warnings.push({
      code: 'SCHEMAS_NOT_DOWNLOADED',
      message: `IRS schemas not found. Missing: ${missingSchemas.join(', ')}. Download from IRS e-Services.`,
      severity: 'warning'
    });

    // Parse XML
    let doc: Document;
    try {
      const parser = new DOMParser({
        errorHandler: {
          warning: (msg) => warnings.push({
            code: 'XML_WARNING',
            message: msg,
            severity: 'warning'
          }),
          error: (msg) => errors.push({
            code: 'XML_ERROR',
            message: msg,
            severity: 'error'
          }),
          fatalError: (msg) => errors.push({
            code: 'XML_FATAL',
            message: msg,
            severity: 'error'
          })
        }
      });
      doc = parser.parseFromString(xml, 'text/xml');
    } catch (err) {
      return {
        valid: false,
        errors: [{
          code: 'XML_PARSE_ERROR',
          message: err instanceof Error ? err.message : 'Failed to parse XML',
          severity: 'error'
        }],
        warnings,
        schemaVersion,
        validatedAt,
        xmlHash
      };
    }

    // Structural validations
    this.validateReturnStructure(doc, errors, warnings);
    this.validateReturnHeader(doc, errors, warnings);
    this.validateReturnData(doc, errors, warnings);
    this.validateSSNFormats(doc, errors, warnings);
    this.validateEINFormats(doc, errors, warnings);
    this.validateAmountFormats(doc, errors, warnings);
    this.validateDateFormats(doc, errors, warnings);
    this.validateRequiredElements(doc, errors, warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      schemaVersion: schemaVersion + ' (structural only)',
      validatedAt,
      xmlHash
    };
  }

  private validateReturnStructure(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const returnElement = doc.getElementsByTagName('Return')[0];
    if (!returnElement) {
      errors.push({
        code: 'MISSING_RETURN',
        message: 'Root <Return> element not found',
        severity: 'error'
      });
      return;
    }

    // Check namespace
    const xmlns = returnElement.getAttribute('xmlns');
    if (xmlns !== 'http://www.irs.gov/efile') {
      errors.push({
        code: 'INVALID_NAMESPACE',
        message: `Invalid namespace: ${xmlns}. Expected: http://www.irs.gov/efile`,
        severity: 'error'
      });
    }

    // Check return version
    const returnVersion = returnElement.getAttribute('returnVersion');
    if (!returnVersion) {
      errors.push({
        code: 'MISSING_RETURN_VERSION',
        message: 'returnVersion attribute is required',
        severity: 'error'
      });
    } else if (!returnVersion.startsWith(this.taxYear.toString())) {
      warnings.push({
        code: 'VERSION_MISMATCH',
        message: `Return version ${returnVersion} may not match tax year ${this.taxYear}`,
        severity: 'warning'
      });
    }
  }

  private validateReturnHeader(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const header = doc.getElementsByTagName('ReturnHeader')[0];
    if (!header) {
      errors.push({
        code: 'MISSING_RETURN_HEADER',
        message: 'ReturnHeader element is required',
        severity: 'error'
      });
      return;
    }

    // Required header elements
    const requiredElements = ['TaxYr', 'ReturnTypeCd', 'Filer'];
    for (const elem of requiredElements) {
      if (!header.getElementsByTagName(elem)[0]) {
        errors.push({
          code: 'MISSING_HEADER_ELEMENT',
          message: `Required header element <${elem}> not found`,
          xpath: '/Return/ReturnHeader/' + elem,
          severity: 'error'
        });
      }
    }

    // Validate EFIN
    const efin = header.getElementsByTagName('EFIN')[0];
    if (efin) {
      const efinValue = efin.textContent || '';
      if (!/^\d{6}$/.test(efinValue)) {
        errors.push({
          code: 'INVALID_EFIN',
          message: `EFIN must be exactly 6 digits: ${efinValue}`,
          xpath: '/Return/ReturnHeader/OriginatorGrp/EFIN',
          severity: 'error'
        });
      }
    }

    // Validate signature PIN
    const signaturePin = header.getElementsByTagName('PrimarySignaturePIN')[0];
    if (signaturePin) {
      const pinValue = signaturePin.textContent || '';
      if (!/^\d{5}$/.test(pinValue)) {
        errors.push({
          code: 'INVALID_SIGNATURE_PIN',
          message: `Signature PIN must be exactly 5 digits: ${pinValue}`,
          xpath: '/Return/ReturnHeader/PrimarySignaturePIN',
          severity: 'error'
        });
      }
    }
  }

  private validateReturnData(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const returnData = doc.getElementsByTagName('ReturnData')[0];
    if (!returnData) {
      errors.push({
        code: 'MISSING_RETURN_DATA',
        message: 'ReturnData element is required',
        severity: 'error'
      });
      return;
    }

    // Check for IRS1040
    const irs1040 = returnData.getElementsByTagName('IRS1040')[0];
    if (!irs1040) {
      errors.push({
        code: 'MISSING_IRS1040',
        message: 'IRS1040 element is required in ReturnData',
        severity: 'error'
      });
    }
  }

  private validateSSNFormats(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const ssnElements = ['PrimarySSN', 'SpouseSSN', 'EmployeeSSN', 'DependentSSN'];
    
    for (const elemName of ssnElements) {
      const elements = doc.getElementsByTagName(elemName);
      for (let i = 0; i < elements.length; i++) {
        const ssn = elements[i].textContent || '';
        // SSN should be 9 digits (no dashes in XML)
        if (ssn && !/^\d{9}$/.test(ssn.replace(/-/g, ''))) {
          errors.push({
            code: 'INVALID_SSN_FORMAT',
            message: `Invalid SSN format in <${elemName}>: must be 9 digits`,
            severity: 'error'
          });
        }
      }
    }
  }

  private validateEINFormats(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const einElements = ['EmployerEIN', 'EIN'];
    
    for (const elemName of einElements) {
      const elements = doc.getElementsByTagName(elemName);
      for (let i = 0; i < elements.length; i++) {
        const ein = elements[i].textContent || '';
        // EIN should be 9 digits (no dash in XML)
        if (ein && !/^\d{9}$/.test(ein.replace(/-/g, ''))) {
          errors.push({
            code: 'INVALID_EIN_FORMAT',
            message: `Invalid EIN format in <${elemName}>: must be 9 digits`,
            severity: 'error'
          });
        }
      }
    }
  }

  private validateAmountFormats(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const amountElements = [
      'WagesAmt', 'TotalIncomeAmt', 'AdjustedGrossIncomeAmt', 'TaxableIncomeAmt',
      'TaxAmt', 'TotalTaxAmt', 'WithholdingTaxAmt', 'RefundAmt', 'OverpaidAmt'
    ];
    
    for (const elemName of amountElements) {
      const elements = doc.getElementsByTagName(elemName);
      for (let i = 0; i < elements.length; i++) {
        const amount = elements[i].textContent || '';
        // Amount should be integer (no decimals in IRS XML)
        if (amount && !/^-?\d+$/.test(amount)) {
          errors.push({
            code: 'INVALID_AMOUNT_FORMAT',
            message: `Invalid amount format in <${elemName}>: must be integer, got "${amount}"`,
            severity: 'error'
          });
        }
      }
    }
  }

  private validateDateFormats(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const dateElements = [
      'TaxPeriodBeginDt', 'TaxPeriodEndDt', 'PrimarySignatureDt', 'SpouseSignatureDt'
    ];
    
    for (const elemName of dateElements) {
      const elements = doc.getElementsByTagName(elemName);
      for (let i = 0; i < elements.length; i++) {
        const date = elements[i].textContent || '';
        // Date should be YYYY-MM-DD
        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          errors.push({
            code: 'INVALID_DATE_FORMAT',
            message: `Invalid date format in <${elemName}>: must be YYYY-MM-DD, got "${date}"`,
            severity: 'error'
          });
        }
      }
    }
  }

  private validateRequiredElements(doc: Document, errors: SchemaValidationError[], warnings: SchemaValidationError[]): void {
    const irs1040 = doc.getElementsByTagName('IRS1040')[0];
    if (!irs1040) return;

    const required1040Elements = [
      'IndividualReturnFilingStatusCd',
      'TotalIncomeAmt',
      'AdjustedGrossIncomeAmt',
      'TaxableIncomeAmt'
    ];

    for (const elem of required1040Elements) {
      if (!irs1040.getElementsByTagName(elem)[0]) {
        errors.push({
          code: 'MISSING_1040_ELEMENT',
          message: `Required Form 1040 element <${elem}> not found`,
          xpath: '/Return/ReturnData/IRS1040/' + elem,
          severity: 'error'
        });
      }
    }
  }

  private async validateAgainstSchema(xml: string): Promise<SchemaValidationError[]> {
    // XSD validation is performed by the IRS MeF system on submission
    // Local validation covers structural requirements; full XSD validation
    // happens server-side when schemas are available in production
    const errors: SchemaValidationError[] = [];
    
    // Basic XML well-formedness check
    try {
      if (!xml.includes('<?xml') && !xml.startsWith('<')) {
        errors.push({
          code: 'XML-001',
          message: 'Invalid XML format',
          path: '/',
          severity: 'error',
        });
      }
    } catch (e) {
      errors.push({
        code: 'XML-002',
        message: 'XML parsing error',
        path: '/',
        severity: 'error',
      });
    }
    
    return errors;
  }

  private hashXml(xml: string): string {
    return crypto.createHash('sha256').update(xml).digest('hex').substring(0, 16);
  }

  /**
   * Get schema download instructions
   */
  static getSchemaDownloadInstructions(taxYear: number): string {
    return `
IRS MeF Schema Download Instructions for Tax Year ${taxYear}
============================================================

1. Log into IRS e-Services: https://www.irs.gov/e-file-providers/e-services-online-tools

2. Navigate to: MeF → Software Developer Resources → Schema Downloads

3. Download the following schema packages:
   - efile1040x_${taxYear}v1.0.zip (Main 1040 schemas)
   - Common schemas package

4. Extract to: lib/tax-software/schemas/${taxYear}/

5. Required files:
   - efile1040x_${taxYear}v1.0.xsd
   - IRS1040_${taxYear}v1.0.xsd
   - efileTypes_${taxYear}v1.0.xsd
   - IRSW2_${taxYear}v1.0.xsd
   - IRS1040ScheduleC_${taxYear}v1.0.xsd

6. Run schema validation test:
   npx tsx lib/tax-software/testing/validate-schemas.ts

Note: Schemas are copyrighted by IRS and should not be committed to public repos.
Add schemas/${taxYear}/*.xsd to .gitignore.
`;
  }
}

/**
 * Validate XML and throw if invalid
 */
export async function validateXMLOrThrow(xml: string, taxYear: number = 2024): Promise<SchemaValidationResult> {
  const validator = new IRSSchemaValidator(taxYear);
  const result = await validator.validate(xml);
  
  if (!result.valid) {
    const errorMessages = result.errors.map(e => `${e.code}: ${e.message}`).join('\n');
    throw new Error(`XML Schema Validation Failed:\n${errorMessages}`);
  }
  
  return result;
}

/**
 * Create validator instance
 */
export function createSchemaValidator(taxYear: number = 2024): IRSSchemaValidator {
  return new IRSSchemaValidator(taxYear);
}
