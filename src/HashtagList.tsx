import { useFeedbackStore } from "./stores/feedbackStore";

const HashtagList = () => {
  const feedbackItems = useFeedbackStore((state) => state.feedbackItems);

  return (
    <ul className="hashtags">
      {feedbackItems.map((feedbackItem) => (
        <li key={feedbackItem.id}>
          <button>{feedbackItem.hashTag}</button>
        </li>
      ))}
    </ul>
  );
};

export default HashtagList;
