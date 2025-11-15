import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewData: [],
  },
  reducers: {
    setReviewData: (state, action) => {
      state.reviewData = action.payload;
    },
  },
});

// FIX THE EXPORT - SINGLE LINE WITH ALL ACTIONS:
export const { setReviewData } = reviewSlice.actions;
export default reviewSlice.reducer;
