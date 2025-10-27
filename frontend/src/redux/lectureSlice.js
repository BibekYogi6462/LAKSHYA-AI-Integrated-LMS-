import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    lectureData: [],
  },
  reducers: {
    setLectureData: (state, action) => {
      state.lectureData = action.payload;
    },
  },
});

// FIX THE EXPORT - SINGLE LINE WITH ALL ACTIONS:
export const { setLectureData } = lectureSlice.actions;
export default lectureSlice.reducer;
