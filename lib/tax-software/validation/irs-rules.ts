/**
 * IRS Validation Rules
 * Validates tax returns before submission
 */

import { TaxReturn, MeFError } from '../types';

export interface ValidationResult {
  valid: boolean;
  errors: MeFError[];
  warnings: MeFError[];
}

export function validateTaxReturn(taxReturn: TaxReturn): ValidationResult {
  const errors: MeFError[] = [];
  const warnings: MeFError[] = [];
  
  // Required field validations
  if (!taxReturn.taxpayer.ssn || taxReturn.taxpayer.ssn.replace(/\D/g, '').length !== 9) {
    errors.push({
      errorCode: 'F1040-001',
      errorCategory: 'reject',
      errorMessage: 'Primary taxpayer SSN is required and must be 9 digits',
      fieldName: 'PrimarySSN'
    });
  }
  
  if (!taxReturn.taxpayer.firstName || !taxReturn.taxpayer.lastName) {
    errors.push({
      errorCode: 'F1040-002',
      errorCategory: 'reject',
      errorMessage: 'Primary taxpayer name is required',
      fieldName: 'TaxpayerName'
    });
  }
  
  if (!taxReturn.address.street || !taxReturn.address.city || !taxReturn.address.state || !taxReturn.address.zip) {
    errors.push({
      errorCode: 'F1040-003',
      errorCategory: 'reject',
      errorMessage: 'Complete address is required',
      fieldName: 'USAddress'
    });
  }
  
  if (!taxReturn.filingStatus) {
    errors.push({
      errorCode: 'F1040-004',
      errorCategory: 'reject',
      errorMessage: 'Filing status is required',
      fieldName: 'FilingStatusCd'
    });
  }
  
  // Spouse validation for joint returns
  if (taxReturn.filingStatus === 'married_filing_jointly') {
    if (!taxReturn.spouse) {
      errors.push({
        errorCode: 'F1040-010',
        errorCategory: 'reject',
        errorMessage: 'Spouse information is required for married filing jointly',
        fieldName: 'SpouseInformation'
      });
    } else {
      if (!taxReturn.spouse.ssn || taxReturn.spouse.ssn.replace(/\D/g, '').length !== 9) {
        errors.push({
          errorCode: 'F1040-011',
          errorCategory: 'reject',
          errorMessage: 'Spouse SSN is required and must be 9 digits',
          fieldName: 'SpouseSSN'
        });
      }
      if (!taxReturn.spouse.firstName || !taxReturn.spouse.lastName) {
        errors.push({
          errorCode: 'F1040-012',
          errorCategory: 'reject',
          errorMessage: 'Spouse name is required',
          fieldName: 'SpouseName'
        });
      }
    }
  }
  
  // Dependent validations
  if (taxReturn.dependents && taxReturn.dependents.length > 0) {
    taxReturn.dependents.forEach((dep, index) => {
      if (!dep.ssn || dep.ssn.replace(/\D/g, '').length !== 9) {
        errors.push({
          errorCode: `F1040-020-${index}`,
          errorCategory: 'reject',
          errorMessage: `Dependent ${index + 1} SSN is required and must be 9 digits`,
          fieldName: `DependentSSN[${index}]`
        });
      }
      if (!dep.firstName || !dep.lastName) {
        errors.push({
          errorCode: `F1040-021-${index}`,
          errorCategory: 'reject',
          errorMessage: `Dependent ${index + 1} name is required`,
          fieldName: `DependentName[${index}]`
        });
      }
      if (!dep.relationship) {
        errors.push({
          errorCode: `F1040-022-${index}`,
          errorCategory: 'reject',
          errorMessage: `Dependent ${index + 1} relationship is required`,
          fieldName: `DependentRelationship[${index}]`
        });
      }
    });
  }
  
  // W2 validations
  if (taxReturn.w2Income && taxReturn.w2Income.length > 0) {
    taxReturn.w2Income.forEach((w2, index) => {
      if (!w2.employerEIN || w2.employerEIN.replace(/\D/g, '').length !== 9) {
        errors.push({
          errorCode: `W2-001-${index}`,
          errorCategory: 'reject',
          errorMessage: `W-2 ${index + 1} employer EIN is required and must be 9 digits`,
          fieldName: `EmployerEIN[${index}]`
        });
      }
      if (!w2.employerName) {
        errors.push({
          errorCode: `W2-002-${index}`,
          errorCategory: 'reject',
          errorMessage: `W-2 ${index + 1} employer name is required`,
          fieldName: `EmployerName[${index}]`
        });
      }
      if (w2.wages < 0) {
        errors.push({
          errorCode: `W2-003-${index}`,
          errorCategory: 'reject',
          errorMessage: `W-2 ${index + 1} wages cannot be negative`,
          fieldName: `Wages[${index}]`
        });
      }
      if (w2.federalWithholding < 0) {
        errors.push({
          errorCode: `W2-004-${index}`,
          errorCategory: 'reject',
          errorMessage: `W-2 ${index + 1} federal withholding cannot be negative`,
          fieldName: `FederalWithholding[${index}]`
        });
      }
      
      // Warning: withholding seems high
      if (w2.federalWithholding > w2.wages * 0.5) {
        warnings.push({
          errorCode: `W2-W001-${index}`,
          errorCategory: 'alert',
          errorMessage: `W-2 ${index + 1} federal withholding exceeds 50% of wages - please verify`,
          fieldName: `FederalWithholding[${index}]`
        });
      }
    });
  }
  
  // Income validation
  if (taxReturn.totalIncome < 0) {
    errors.push({
      errorCode: 'F1040-030',
      errorCategory: 'reject',
      errorMessage: 'Total income cannot be negative',
      fieldName: 'TotalIncomeAmt'
    });
  }
  
  // Signature validation
  if (!taxReturn.taxpayerSignature?.pin || taxReturn.taxpayerSignature.pin.length !== 5) {
    errors.push({
      errorCode: 'F1040-040',
      errorCategory: 'reject',
      errorMessage: 'Taxpayer signature PIN is required and must be 5 digits',
      fieldName: 'PrimarySignaturePIN'
    });
  }
  
  if (taxReturn.filingStatus === 'married_filing_jointly' && 
      (!taxReturn.spouseSignature?.pin || taxReturn.spouseSignature.pin.length !== 5)) {
    errors.push({
      errorCode: 'F1040-041',
      errorCategory: 'reject',
      errorMessage: 'Spouse signature PIN is required for joint returns and must be 5 digits',
      fieldName: 'SpouseSignaturePIN'
    });
  }
  
  // Direct deposit validation
  if (taxReturn.directDeposit) {
    if (!taxReturn.directDeposit.routingNumber || taxReturn.directDeposit.routingNumber.length !== 9) {
      errors.push({
        errorCode: 'F1040-050',
        errorCategory: 'reject',
        errorMessage: 'Bank routing number must be 9 digits',
        fieldName: 'RoutingTransitNum'
      });
    }
    if (!taxReturn.directDeposit.accountNumber || taxReturn.directDeposit.accountNumber.length < 4) {
      errors.push({
        errorCode: 'F1040-051',
        errorCategory: 'reject',
        errorMessage: 'Bank account number is required',
        fieldName: 'BankAccountNum'
      });
    }
  }
  
  // SALT cap warning
  if (taxReturn.itemizedDeductions) {
    const saltTotal = (taxReturn.itemizedDeductions.stateLocalTaxes || 0) +
                      (taxReturn.itemizedDeductions.realEstateTaxes || 0) +
                      (taxReturn.itemizedDeductions.personalPropertyTaxes || 0);
    if (saltTotal > 10000) {
      warnings.push({
        errorCode: 'SCHA-W001',
        errorCategory: 'alert',
        errorMessage: `State and local taxes exceed $10,000 cap. Only $10,000 will be deducted.`,
        fieldName: 'StateAndLocalTaxesAmt'
      });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateSSN(ssn: string): boolean {
  const cleaned = ssn.replace(/\D/g, '');
  if (cleaned.length !== 9) return false;
  
  // Cannot start with 9 (ITIN range)
  if (cleaned.startsWith('9')) return false;
  
  // Cannot be all zeros in any group
  const area = cleaned.substring(0, 3);
  const group = cleaned.substring(3, 5);
  const serial = cleaned.substring(5, 9);
  
  if (area === '000' || group === '00' || serial === '0000') return false;
  
  // Cannot be 666 area
  if (area === '666') return false;
  
  return true;
}

export function validateEIN(ein: string): boolean {
  const cleaned = ein.replace(/\D/g, '');
  if (cleaned.length !== 9) return false;
  
  // First two digits must be valid campus code
  const validPrefixes = [
    '10', '12', '60', '67', '50', '53', '01', '02', '03', '04', '05', '06', '11', '13', '14', '16',
    '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65', '30', '32',
    '35', '36', '37', '38', '61', '15', '24', '40', '44', '94', '95', '80', '90', '33', '39', '41',
    '42', '43', '46', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77',
    '81', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99', '20', '26', '27',
    '45', '46', '47', '81', '82', '83'
  ];
  
  const prefix = cleaned.substring(0, 2);
  return validPrefixes.includes(prefix);
}

export function validateRoutingNumber(routingNumber: string): boolean {
  const cleaned = routingNumber.replace(/\D/g, '');
  if (cleaned.length !== 9) return false;
  
  // Checksum validation
  const digits = cleaned.split('').map(Number);
  const checksum = (
    3 * (digits[0] + digits[3] + digits[6]) +
    7 * (digits[1] + digits[4] + digits[7]) +
    1 * (digits[2] + digits[5] + digits[8])
  ) % 10;
  
  return checksum === 0;
}
