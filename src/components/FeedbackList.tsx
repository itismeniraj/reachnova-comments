import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import { supabase } from "../lib/supabase";
import type { FeedbackItemT } from "../types";

const FeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemT[]>([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      const { data, error } = await supabase
        .from("reachnova-comments")
        .select("*");

      if (error) {
        console.error("Error fetching feedbacks:", error);
        return;
      }

      const feedbacks: FeedbackItemT[] = data.map((item) => ({
        upvoteCount: item.upvote_count,
        badgeLetter: item.badge_letter,
        text: item.text,
        hashTag: item.hash_tag,
        daysAgo: Math.floor(
          (Date.now() - new Date(item.days_ago).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      }));

      setFeedbackItems(feedbacks);
    };

    getFeedbacks();
  }, []);

  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.text} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
};

export default FeedbackList;
