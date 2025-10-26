// import { createSlice } from "@reduxjs/toolkit";

// const courseSlice = createSlice({
//   name: "course",
//   initialState: {
//     creatorCourseData: null,
//     courseData: null,
//   },
//   reducers: {
//     setCreatorCourseData: (state, action) => {
//       state.creatorCourseData = action.payload;
//     },
//     setCourseData: (state, action) => {
//       state.courseData = action.payload;
//     },
//   },
// });

// export const { setCreatorCourseData } = courseSlice.actions;
// export const { setCourseData } = courseSlice.actions;
// export default courseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: null,
    courseData: null,
  },
  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    // ADD THIS MISSING REDUCER:
    updateCourseInCreatorData: (state, action) => {
      const updatedCourse = action.payload;
      if (state.creatorCourseData && Array.isArray(state.creatorCourseData)) {
        const index = state.creatorCourseData.findIndex(
          (course) => course._id === updatedCourse._id
        );
        if (index !== -1) {
          state.creatorCourseData[index] = {
            ...state.creatorCourseData[index],
            ...updatedCourse,
          };
        }
      }
    },
  },
});

// FIX THE EXPORT - SINGLE LINE WITH ALL ACTIONS:
export const {
  setCreatorCourseData,
  setCourseData,
  updateCourseInCreatorData,
} = courseSlice.actions;
export default courseSlice.reducer;
