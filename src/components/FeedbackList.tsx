import { useEffect } from "react";

import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useFeedbackStore } from "../stores/feedbackStore";

const FeedbackList = () => {
  const feedbackItems = useFeedbackStore((state) => state.feedbackItems);
  const isLoading = useFeedbackStore((state) => state.isLoading);
  const errorMessage = useFeedbackStore((state) => state.errorMessage);
  const fetchFeedbacks = useFeedbackStore((state) => state.fetchFeedbacks);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
};

export default FeedbackList;
