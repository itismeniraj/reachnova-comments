import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import type { FeedbackItemT } from "../types";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { getFeedbacks } from "../lib/api";

const FeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadFeedbacks = async () => {
      setIsLoading(true);

      try {
        const feedbacks = await getFeedbacks();

        setFeedbackItems(feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setErrorMessage("Failed to load feedbacks.");
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.text} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
};

export default FeedbackList;
