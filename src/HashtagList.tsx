import { useFeedbackStore } from "./stores/feedbackStore";

const HashtagList = () => {
  const feedbackItems = useFeedbackStore((state) => state.feedbackItems);
  const setSelectedHashTag = useFeedbackStore(
    (state) => state.setSelectedHashTag,
  );

  return (
    <ul className="hashtags">
      <li>
        <button onClick={() => setSelectedHashTag(null)}>#All</button>
      </li>

      {feedbackItems.map((feedbackItem) => (
        <li key={feedbackItem.id}>
          <button onClick={() => setSelectedHashTag(feedbackItem.hashTag)}>
            {feedbackItem.hashTag}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HashtagList;
