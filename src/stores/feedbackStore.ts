import { create } from "zustand";
import type { FeedbackItemT } from "../types";
import { createFeedback, getFeedbacks, upvoteFeedback } from "../lib/api";

type FeedbackStore = {
  feedbackItems: FeedbackItemT[];
  isLoading: boolean;
  errorMessage: string;
  fetchFeedbacks: () => Promise<void>;
  createFeedback: (text: string, hashTag: string) => Promise<void>;
  upvoteFeedback: (id: number) => Promise<void>;
};

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",

  fetchFeedbacks: async () => {
    set({ isLoading: true, errorMessage: "" });

    try {
      const feedbacks = await getFeedbacks();

      set({
        feedbackItems: feedbacks,
      });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);

      set({
        errorMessage: "Failed to load feedbacks.",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

createFeedback: async (text, hashTag) => {
  await createFeedback(text, hashTag);

  await getFeedbacks().then((feedbacks) => {
    set({
      feedbackItems: feedbacks,
    });
  });
},

upvoteFeedback: async (id) => {
  await upvoteFeedback(id);

  set((state) => ({
    feedbackItems: state.feedbackItems.map((feedbackItem) =>
      feedbackItem.id === id
        ? {
            ...feedbackItem,
            upvoteCount: feedbackItem.upvoteCount + 1,
          }
        : feedbackItem
    ),
  }));
},

}));
