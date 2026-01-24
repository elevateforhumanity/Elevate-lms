# Elevate Tax Software - IRS Direct E-File System

## Overview

This module implements direct IRS e-file capabilities for Form 1040 individual tax returns. The system is designed to meet IRS Modernized e-File (MeF) specifications and supports the IRS Software Developer program requirements.

## Architecture

```
lib/tax-software/
├── types.ts                    # TypeScript interfaces for tax data
├── forms/
│   └── form-1040.ts           # Form 1040 calculations (2024 tax year)
├── validation/
│   └── irs-rules.ts           # IRS business rule validation
├── mef/
│   ├── xml-generator.ts       # MeF XML generation
│   ├── transmission.ts        # IRS transmission module
│   └── acknowledgment.ts      # Accept/reject handling
└── testing/
    └── irs-certification.ts   # ATS test scenarios
```

## IRS Software Developer Requirements

### Application Prerequisites

1. **EFIN (Electronic Filing Identification Number)**
   - Apply via IRS e-Services
   - Required for all e-file transmissions
   - Set via `IRS_EFIN` environment variable

2. **Software ID**
   - Assigned by IRS after application approval
   - Set via `IRS_SOFTWARE_ID` environment variable

3. **Assurance Testing System (ATS)**
   - Must pass all IRS test scenarios
   - Run `runCertificationTests()` to validate

### Security Requirements

- SSN encryption at rest (AES-256)
- TLS 1.2+ for all IRS communications
- Mutual TLS with IRS-issued certificates
- Audit logging for all submissions

## Environment Variables

```env
IRS_EFIN=000000                    # 6-digit EFIN
IRS_SOFTWARE_ID=PENDING            # IRS-assigned software ID
IRS_ENVIRONMENT=test               # test | assurance | production
SSN_ENCRYPTION_KEY=<32-byte-hex>   # Encryption key for SSN storage
```

## Usage

### Calculate Form 1040

```typescript
import { calculateForm1040 } from './forms/form-1040';
import { TaxReturn } from './types';

const taxReturn: TaxReturn = {
  taxYear: 2024,
  filingStatus: 'single',
  taxpayer: { /* ... */ },
  w2Income: [{ /* ... */ }],
  deductionType: 'standard'
};

const result = calculateForm1040(taxReturn);
console.log(`Refund: $${result.line35}`);
```

### Validate Return

```typescript
import { validateTaxReturn } from './validation/irs-rules';

const validation = validateTaxReturn(taxReturn);
if (!validation.isValid) {
  console.log('Errors:', validation.errors);
}
```

### Generate MeF XML

```typescript
import { createMeFSubmission } from './mef/xml-generator';

const submission = createMeFSubmission(taxReturn);
console.log(submission.xml);
```

### Transmit to IRS

```typescript
import { createTransmitter } from './mef/transmission';

const transmitter = createTransmitter();
const result = await transmitter.transmit(submission);
```

### Run Certification Tests

```typescript
import { runCertificationTests, formatCertificationReport } from './testing/irs-certification';

const report = runCertificationTests();
console.log(formatCertificationReport(report));
```

## Supported Forms (2024)

- Form 1040 (Individual Income Tax Return)
- Schedule 1 (Additional Income and Adjustments)
- Schedule C (Profit or Loss from Business) - basic support

## Tax Calculations

### 2024 Tax Brackets (Single)

| Income Range | Rate | Base Tax |
|-------------|------|----------|
| $0 - $11,600 | 10% | $0 |
| $11,600 - $47,150 | 12% | $1,160 |
| $47,150 - $100,525 | 22% | $5,426 |
| $100,525 - $191,950 | 24% | $17,168.50 |
| $191,950 - $243,725 | 32% | $39,110.50 |
| $243,725 - $609,350 | 35% | $55,678.50 |
| $609,350+ | 37% | $183,647.25 |

### 2024 Standard Deductions

| Filing Status | Deduction |
|--------------|-----------|
| Single | $14,600 |
| Married Filing Jointly | $29,200 |
| Married Filing Separately | $14,600 |
| Head of Household | $21,900 |
| Qualifying Surviving Spouse | $29,200 |

## IRS Rejection Codes

Common rejection codes and resolutions are documented in `mef/acknowledgment.ts`. Key codes:

- **IND-031/032**: SSN already used (identity verification needed)
- **IND-181**: Dependent claimed elsewhere
- **IND-510/511**: Prior year AGI mismatch
- **R0000-500**: XML schema error
- **R0000-902**: Business rule failure

## Testing

The certification module includes IRS ATS test scenarios:

1. **ATS-001**: Single filer with W-2 income
2. **ATS-002**: MFJ with dependents and child tax credit
3. **ATS-003**: Self-employment income (Schedule C)
4. **ATS-004**: EITC eligibility

## Compliance Notes

- All calculations follow IRS Publication 17
- XML schema follows IRS MeF specifications
- EITC due diligence requirements apply
- Paid preparer requirements (if applicable)

## Future Enhancements

- State tax return support
- Schedule A (Itemized Deductions) full support
- Schedule D (Capital Gains)
- Form 8949 (Sales of Capital Assets)
- Form 1099-K integration
- Direct Pay integration for amounts owed
