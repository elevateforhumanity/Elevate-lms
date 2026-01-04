import { getProgramById } from "@/lms-data/programs";
import { createProgramEnrollment, updateEnrollmentStatus } from "@/lib/db/enrollments";
import type { FundingSource } from "@/types/enrollment";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

export async function provisionEnrollmentFromStripe(args: {
  programId: string;
  studentId: string;
  paymentMode: "full" | "plan";
  stripeRefId?: string; // payment_intent or subscription id
}) {
  const { programId, studentId, paymentMode, stripeRefId } = args;
  const program = getProgramById(programId);
  if (!program) {
    // Error: $1
    return undefined;
  }

  const fundingSource: FundingSource = "SELF_PAY";

  // Create enrollment
  const enrollment = await createProgramEnrollment({
    studentId,
    programId,
    fundingSource,
    status: "AWAITING_SEATS",
    stripeRefId,
    paymentMode,
  });

  // Create partner seat orders for each required partner course
  const seatOrders = program.partnerRequirements
    .filter((req) => req.required)
    .map((req) => ({
      enrollment_id: enrollment.id,
      partner_course_id: req.partnerCourseId,
      quantity: 1,
      status: "PENDING",
    }));

  if (seatOrders.length > 0 && supabase) {
    const { error } = await supabase
      .from("partner_seat_orders")
      .insert(seatOrders);

    if (error) {
      // Error: $1
    }
  }

  // Mark enrollment as ready (in production, this would happen after seats are actually purchased)
  await updateEnrollmentStatus(enrollment.id, "READY_TO_START");

  return enrollment;
}
