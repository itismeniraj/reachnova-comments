import { TriangleUpIcon } from "@radix-ui/react-icons";

type FeedbackItem = {
  upvoteCount: number;
  badgeLetter: string;
  text: string;
  hashTag: string;
  daysAgo: number;
};

type FeedbackItemProps = {
  feedbackItem: FeedbackItem;
};

const FeedbackItem = ({ feedbackItem }: FeedbackItemProps) => {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.hashTag}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
};

export default FeedbackItem;
