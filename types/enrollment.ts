export type FundingSource =
  | "SELF_PAY"
  | "EMPLOYER"
  | "WRG"
  | "WIOA"
  | "SCHOLARSHIP";

export type EnrollmentStatus =
  | "INTAKE"
  | "AWAITING_FUNDING"
  | "AWAITING_SEATS"
  | "READY_TO_START"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "SUSPENDED";

export interface ProgramEnrollment {
  id: string;
  studentId: string;
  programId: string;
  fundingSource: FundingSource;
  status: EnrollmentStatus;
  stripeRefId?: string;       // payment_intent or subscription id
  paymentMode?: "full" | "plan";
  createdAt: string;
}
