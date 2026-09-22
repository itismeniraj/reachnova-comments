import type { FeedbackItemT } from "../types";
import { supabase } from "./supabase";

export const getFeedbacks = async (): Promise<FeedbackItemT[]> => {
  const { data, error } = await supabase
    .from("reachnova-comments")
    .select("*")
    .order("days_ago", { ascending: false });

if (error) {
    throw error;
  }

  const feedbacks: FeedbackItemT[] = data.map((item) => ({
    id: item.id,
    upvoteCount: item.upvote_count,
    badgeLetter: item.hash_tag.trim().charAt(1).toUpperCase(),
    text: item.text,
    hashTag: item.hash_tag,
    daysAgo: Math.floor(
      (Date.now() - new Date(item.days_ago).getTime()) /
        (1000 * 60 * 60 * 24)
    ),
  }));

  return feedbacks;
};

export const createFeedback = async (text: string, hashTag: string) => {
  const { error } = await supabase
    .from("reachnova-comments")
    .insert({
      upvote_count: 0,
      text,
      hash_tag: hashTag,
    });

  if (error) {
    throw error;
  }
};

export const upvoteFeedback = async (id: number) => {
  const { error } = await supabase.rpc("upvote_feedback", {
    feedback_id: id,
  });

  if (error) {
    throw error;
  }
};
