import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";
import toast from "react-hot-toast";
import { useFeedbackStore } from "../stores/feedbackStore";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const createFeedback = useFeedbackStore((state) => state.createFeedback);

  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;

    setText(newText);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) return;

    const hashtagMatch = trimmedText.match(/#[a-zA-Z0-9_]+/);

    if (!hashtagMatch) {
      toast.error("Please #hashtag your feedbacks.");
      return;
    }

    const hashTag = hashtagMatch[0];

    try {
      await toast.promise(createFeedback(trimmedText, hashTag), {
        loading: "Submitting...",
        success: <p>Feedback Submitted!</p>,
        error: <p>Error submitting feedback.</p>,
      });

      setText("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => handleChange(e)}
        spellCheck={false}
        id="feedback-textarea"
        placeholder=""
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the feedback
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
