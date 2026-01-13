import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  try {
    // Intentionally throw an error to test Sentry
    throw new Error("Sentry API Test Error - Server Side");
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "Error captured and sent to Sentry" },
      { status: 500 }
    );
  }
}
