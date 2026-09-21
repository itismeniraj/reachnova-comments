import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import { supabase } from "../lib/supabase";
import type { FeedbackItemT } from "../types";
import Spinner from "./Spinner";

const FeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFeedbacks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("reachnova-comments")
        .select("*");

      if (error) {
        console.error("Error fetching feedbacks:", error);
        setIsLoading(false);
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

      setIsLoading(false);
      setFeedbackItems(feedbacks);
    };

    getFeedbacks();
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.text} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
};

export default FeedbackList;
