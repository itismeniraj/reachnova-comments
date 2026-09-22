import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { FeedbackItemT } from "../types";
import { useState } from "react";
import { upvoteFeedback } from "../lib/api";
import toast from "react-hot-toast";

type FeedbackItemProps = {
  feedbackItem: FeedbackItemT;
};

const FeedbackItem = ({ feedbackItem }: FeedbackItemProps) => {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const [isUpvoted, setIsUpvoted] = useState(() => {
    return localStorage.getItem(`upvoted-${feedbackItem.id}`) === "true";
  });

  const handleUpvote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isUpvoted) return;

    try {
      await toast.promise(upvoteFeedback(feedbackItem.id), {
        loading: "Upvoting...",
        success: <p>Upvoted!</p>,
        error: <p>Error upvoting!.</p>,
      });

      localStorage.setItem(`upvoted-${feedbackItem.id}`, "true");

      setIsUpvoted(true);
      setUpvoteCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error upvoting feedback:", error);
    }
  };

  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpvote}>
        {!isUpvoted && <TriangleUpIcon />}
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.hashTag.replace("#", "")}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
};

export default FeedbackItem;
