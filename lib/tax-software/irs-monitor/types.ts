/**
 * IRS Monitor Types
 * Shared types for the IRS monitoring system
 */

export interface ScrapedContent {
  url: string;
  timestamp: string;
  contentHash: string;
  content: string;
  title?: string;
  lastModified?: string;
}

export interface ChangeDetection {
  source: string;
  url: string;
  detected: boolean;
  previousHash?: string;
  currentHash: string;
  timestamp: string;
  changes?: string[];
}

export interface TaxParameterUpdate {
  taxYear: number;
  parameter: string;
  oldValue: any;
  newValue: any;
  source: string;
  sourceUrl: string;
  detectedAt: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface AlertConfig {
  email?: {
    enabled: boolean;
    recipients: string[];
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPass?: string;
  };
  
  webhook?: {
    enabled: boolean;
    url: string;
    type: 'slack' | 'discord' | 'generic';
  };
  
  sms?: {
    enabled: boolean;
    phoneNumbers: string[];
    twilioSid?: string;
    twilioToken?: string;
    twilioFrom?: string;
  };
  
  inApp?: {
    enabled: boolean;
    supabaseUrl?: string;
    supabaseKey?: string;
  };
}

export interface Alert {
  id: string;
  type: 'change_detected' | 'update_available' | 'action_required';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  source: string;
  sourceUrl?: string;
  detectedAt: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  data?: Record<string, any>;
}

export interface MonitorConfig {
  taxYear: number;
  autoGenerateConfig: boolean;
  requireApproval: boolean;
  sources: string[];
}

export interface PendingUpdate {
  id: string;
  taxYear: number;
  parameter: string;
  currentValue: any;
  newValue: any;
  source: string;
  sourceUrl: string;
  confidence: 'high' | 'medium' | 'low';
  detectedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
}

export interface MonitorReport {
  runId: string;
  timestamp: string;
  sourcesChecked: number;
  changesDetected: number;
  updatesFound: number;
  alertsSent: number;
  changes: ChangeDetection[];
  updates: TaxParameterUpdate[];
}
