import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const program = data.get("program") as string;
    const funding = data.get("funding") as string;

    // WIOA-style prescreen
    const eligible = funding !== "Self Pay" && program !== "Not Sure";

    const supabase = createAdminClient();

    const { error } = await supabase.from("applications").insert({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      program,
      funding,
      eligible,
      notes: eligible ? "Prescreen passed" : "Needs review",
    });

    if (error) throw error;

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag("event", "apply_complete", {
        program,
        funding,
        eligible,
      });
    }

    return NextResponse.redirect(
      new URL("/apply/confirmation", req.url),
      { status: 303 }
    );
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
