"use client";
import AutopilotButton from "./AutopilotButton";

export default function AutopilotPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      <AutopilotButton
        label="AI → Build Course Structure"
        endpoint="/api/autopilots/build-course"
      />

      <AutopilotButton
        label="Optimize Course Images"
        endpoint="/api/autopilots/optimize-images"
      />

      <AutopilotButton
        label="Run LMS Tests"
        endpoint="/api/autopilots/run-tests"
      />

      <AutopilotButton
        label="Deploy to Vercel"
        endpoint="/api/autopilots/deploy"
      />

    </div>
  );
}
