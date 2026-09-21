import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const charCount = MAX_CHARACTERS - text.length;
  return (
    <form className="form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        id="feedback-textarea"
        placeholder=""
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the feedback
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
