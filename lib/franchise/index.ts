/**
 * Franchise Tax Preparation System
 * 
 * This module provides services for managing a multi-office tax preparation franchise:
 * - Office management (create, update, activate, suspend)
 * - Preparer management with PTIN tracking
 * - Client management with SSN encryption
 * - Tax return creation with preparer/ERO assignment
 * - ERO signature flow
 * - Fee schedule management
 * - Preparer payout tracking
 */

// Services
export { officeService, OfficeService } from './office-service';
export { preparerService, PreparerService } from './preparer-service';
export { clientService, ClientService } from './client-service';
export { returnService, ReturnService } from './return-service';
export { eroService } from './ero-service';
export { feeService } from './fee-service';
export { payoutService } from './payout-service';

// Types
export type {
  TaxOffice,
  TaxPreparer,
  TaxClient,
  TaxFeeSchedule,
  PreparerPayout,
  FranchiseRoyalty,
  TaxAuditLog,
  CreateOfficeInput,
  CreatePreparerInput,
  CreateClientInput,
  FranchiseStats,
  OfficeStats,
  PreparerStats,
  Certification
} from './types';

// ERO types
export type {
  EROSignature,
  EROConfig,
  CreateEROConfigInput
} from './ero-service';

// Fee types
export type {
  CreateFeeScheduleInput,
  FeeCalculation
} from './fee-service';

// Payout types
export type {
  CreatePayoutInput,
  PayoutSummary
} from './payout-service';

// Return types
export type {
  CreateReturnInput,
  ReturnWithAssignment
} from './return-service';
