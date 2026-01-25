/**
 * Franchise Management Types
 * All types for multi-office tax preparation business
 */

export interface TaxOffice {
  id: string;
  office_code: string;
  office_name: string;
  owner_id: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string | null;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  business_ein: string | null;
  state_license: string | null;
  parent_efin: string;
  status: 'pending' | 'active' | 'suspended' | 'terminated';
  activated_at: string | null;
  suspended_at: string | null;
  suspension_reason: string | null;
  franchise_fee: number;
  per_return_fee: number;
  revenue_share_percent: number;
  contract_start_date: string | null;
  contract_end_date: string | null;
  max_preparers: number;
  max_returns_per_season: number | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  notes: string | null;
}

export interface TaxPreparer {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  ptin: string;
  ptin_expiration: string | null;
  office_id: string;
  certification_level: 'basic' | 'intermediate' | 'advanced' | 'supervisor' | null;
  certifications: Certification[];
  training_completed_at: string | null;
  annual_refresher_due: string | null;
  efin_authorized: boolean;
  ero_authorized: boolean;
  status: 'pending' | 'active' | 'suspended' | 'terminated';
  activated_at: string | null;
  suspended_at: string | null;
  suspension_reason: string | null;
  returns_prepared_lifetime: number;
  returns_prepared_current_season: number;
  rejection_rate: number;
  average_refund: number | null;
  compensation_type: 'per_return' | 'hourly' | 'salary' | 'commission';
  per_return_rate: number | null;
  hourly_rate: number | null;
  commission_percent: number | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  notes: string | null;
}

export interface Certification {
  name: string;
  issued_date: string;
  expiration_date: string | null;
  issuer: string;
}

export interface TaxClient {
  id: string;
  office_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  address_street: string | null;
  address_city: string | null;
  address_state: string | null;
  address_zip: string | null;
  filing_status: string | null;
  dependents_count: number;
  ssn_encrypted: string | null;
  ssn_last_four: string | null;
  spouse_first_name: string | null;
  spouse_last_name: string | null;
  spouse_ssn_encrypted: string | null;
  spouse_ssn_last_four: string | null;
  preferred_preparer_id: string | null;
  client_since: string;
  returns_filed: number;
  total_fees_paid: number;
  last_return_date: string | null;
  last_return_id: string | null;
  status: 'active' | 'inactive' | 'do_not_serve';
  created_at: string;
  updated_at: string;
  notes: string | null;
}

export interface TaxFeeSchedule {
  id: string;
  office_id: string;
  name: string;
  is_default: boolean;
  base_fee_1040: number;
  base_fee_1040_ez: number;
  fee_schedule_a: number;
  fee_schedule_c: number;
  fee_schedule_d: number;
  fee_schedule_e: number;
  fee_schedule_se: number;
  fee_per_w2: number;
  fee_per_1099: number;
  fee_per_dependent: number;
  fee_state_return: number;
  fee_eitc: number;
  fee_ctc: number;
  fee_refund_transfer: number;
  fee_refund_advance: number;
  returning_client_discount_percent: number;
  referral_discount: number;
  senior_discount_percent: number;
  military_discount_percent: number;
  effective_from: string;
  effective_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface PreparerPayout {
  id: string;
  preparer_id: string;
  office_id: string;
  period_start: string;
  period_end: string;
  returns_count: number;
  gross_earnings: number;
  deductions: number;
  net_earnings: number;
  status: 'pending' | 'approved' | 'paid' | 'disputed';
  paid_at: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  notes: string | null;
}

export interface FranchiseRoyalty {
  id: string;
  office_id: string;
  period_start: string;
  period_end: string;
  returns_count: number;
  gross_revenue: number;
  per_return_fees: number;
  revenue_share: number;
  software_fees: number;
  other_fees: number;
  total_owed: number;
  status: 'pending' | 'invoiced' | 'paid' | 'overdue';
  invoiced_at: string | null;
  invoice_number: string | null;
  due_date: string | null;
  paid_at: string | null;
  payment_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaxAuditLog {
  id: string;
  event_type: string;
  event_description: string | null;
  user_id: string | null;
  preparer_id: string | null;
  office_id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

// Form types for creating/updating
export interface CreateOfficeInput {
  office_code: string;
  office_name: string;
  owner_name: string;
  owner_email: string;
  owner_phone?: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  business_ein?: string;
  state_license?: string;
  franchise_fee?: number;
  per_return_fee?: number;
  revenue_share_percent?: number;
  contract_start_date?: string;
  contract_end_date?: string;
  max_preparers?: number;
  max_returns_per_season?: number;
  notes?: string;
}

export interface CreatePreparerInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  ptin: string;
  ptin_expiration?: string;
  office_id: string;
  certification_level?: 'basic' | 'intermediate' | 'advanced' | 'supervisor';
  efin_authorized?: boolean;
  ero_authorized?: boolean;
  compensation_type?: 'per_return' | 'hourly' | 'salary' | 'commission';
  per_return_rate?: number;
  hourly_rate?: number;
  commission_percent?: number;
  notes?: string;
}

export interface CreateClientInput {
  office_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  filing_status?: string;
  dependents_count?: number;
  ssn: string; // Will be encrypted
  spouse_first_name?: string;
  spouse_last_name?: string;
  spouse_ssn?: string; // Will be encrypted
  preferred_preparer_id?: string;
  notes?: string;
}

// Dashboard stats
export interface FranchiseStats {
  total_offices: number;
  active_offices: number;
  total_preparers: number;
  active_preparers: number;
  total_returns_season: number;
  total_revenue_season: number;
  total_royalties_owed: number;
  total_royalties_paid: number;
}

export interface OfficeStats {
  office_id: string;
  returns_count: number;
  revenue: number;
  average_fee: number;
  rejection_rate: number;
  top_preparer_id: string | null;
  top_preparer_name: string | null;
}

export interface PreparerStats {
  preparer_id: string;
  returns_count: number;
  revenue_generated: number;
  average_fee: number;
  rejection_rate: number;
  earnings: number;
}
