const FeedbackForm = () => {
  return (
    <form className="form">
      <textarea spellCheck={false} id="feedback-textarea" placeholder="" />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the feedback
      </label>
      <div>
        <p className="u-italic">150</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
