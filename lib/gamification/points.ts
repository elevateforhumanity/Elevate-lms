// lib/gamification/points.ts
import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

export async function addPoints(
  userId: string,
  courseId: string | null,
  points: number
) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("leaderboard_scores")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();

  if (existing) {
    await supabase
      .from("leaderboard_scores")
      .update({
        points: existing.points + points,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("leaderboard_scores").insert({
      user_id: userId,
      course_id: courseId,
      points,
    });
  }
}

export async function getCourseLeaderboard(courseId: string, limit = 10) {
  const supabase = await createClient();

  const { data }: any = await supabase
    .from("leaderboard_scores")
    .select(
      `
      *,
      profiles:user_id (
        id,
        full_name,
        email
      )
    `
    )
    .eq("course_id", courseId)
    .order("points", { ascending: false })
    .limit(limit);

  return data || [];
}

export async function awardBadge(userId: string, badgeKey: string) {
  const supabase = await createClient();

  const { data: badge } = await supabase
    .from("badges")
    .select("id")
    .eq("key", badgeKey)
    .single();

  if (!badge) {
    logger.warn(`Badge ${badgeKey} not found`, { badgeKey, userId });
    return;
  }

  // Use upsert to avoid duplicate badge awards
  await supabase
    .from("user_badges")
    .upsert({
      user_id: userId,
      badge_id: badge.id,
    }, {
      onConflict: 'user_id,badge_id',
      ignoreDuplicates: true
    });
}
