import FeedbackItem from "./FeedbackItem";

const FeedbackList = () => {
  const feedbackItems = [
    {
      upvoteCount: 563,
      badgeLetter: "S",
      text: "Please, we want some discount on Japanse courses",
      hashTag: "#CourseFee",
      daysAgo: 5,
    },
  ];
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
};

export default FeedbackList;
