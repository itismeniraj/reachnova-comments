import { useEffect, useState } from "react";
import { getFeedbacks } from "./lib/api";
import type { FeedbackItemT } from "./types";

const HashtagList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemT[]>([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const feedbacks = await getFeedbacks();

        setFeedbackItems(feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    loadFeedbacks();
  }, []);

  return (
    <ul className="hashtags">
      {feedbackItems.map((feedbackItem) => {
        return (
          <li key={feedbackItem.text}>
            <button>{feedbackItem.hashTag}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default HashtagList;
