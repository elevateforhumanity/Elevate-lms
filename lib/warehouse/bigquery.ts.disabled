// lib/warehouse/bigquery.ts
import { BigQuery } from "@google-cloud/bigquery";
import { createClient } from "@/lib/supabase/server";

const BIGQUERY_PROJECT_ID = process.env.BIGQUERY_PROJECT_ID;
const BIGQUERY_DATASET = process.env.BIGQUERY_DATASET;

let client: BigQuery | null = null;

function getClient() {
  if (!client && BIGQUERY_PROJECT_ID) {
    client = new BigQuery({
      projectId: BIGQUERY_PROJECT_ID,
    });
  }
  return client;
}

export async function exportEnrollmentsToBigQuery() {
  const bq = getClient();
  if (!bq || !BIGQUERY_DATASET) {
    console.warn("BigQuery not configured");
    return;
  }

  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      user_id,
      course_id,
      status,
      progress,
      created_at,
      completed_at
    `
    )
    .limit(1000);

  if (!enrollments || enrollments.length === 0) {
    console.log("No enrollments to export");
    return;
  }

  const dataset = bq.dataset(BIGQUERY_DATASET);
  const table = dataset.table("enrollments");

  const rows = enrollments.map((e) => ({
    enrollment_id: e.id,
    user_id: e.user_id,
    course_id: e.course_id,
    status: e.status,
    progress: e.progress,
    created_at: e.created_at,
    completed_at: e.completed_at,
  }));

  await table.insert(rows);
  console.log(`Exported ${rows.length} enrollments to BigQuery`);
}

export async function exportCourseCompletionsToBigQuery() {
  const bq = getClient();
  if (!bq || !BIGQUERY_DATASET) {
    console.warn("BigQuery not configured");
    return;
  }

  const supabase = await createClient();

  const { data: completions } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      user_id,
      course_id,
      completed_at,
      final_score
    `
    )
    .not("completed_at", "is", null)
    .limit(1000);

  if (!completions || completions.length === 0) {
    console.log("No completions to export");
    return;
  }

  const dataset = bq.dataset(BIGQUERY_DATASET);
  const table = dataset.table("course_completions");

  const rows = completions.map((c) => ({
    enrollment_id: c.id,
    user_id: c.user_id,
    course_id: c.course_id,
    completed_at: c.completed_at,
    final_score: c.final_score,
  }));

  await table.insert(rows);
  console.log(`Exported ${rows.length} completions to BigQuery`);
}
