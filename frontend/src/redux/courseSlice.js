import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: null,
    courseData: null,
    selectedCourse: null,
  },
  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    // updateCourseInCreatorData: (state, action) => {
    //   const updatedCourse = action.payload;
    //   if (state.creatorCourseData && Array.isArray(state.creatorCourseData)) {
    //     const index = state.creatorCourseData.findIndex(
    //       (course) => course._id === updatedCourse._id
    //     );
    //     if (index !== -1) {
    //       state.creatorCourseData[index] = {
    //         ...state.creatorCourseData[index],
    //         ...updatedCourse,
    //       };
    //     }
    //   }
    // },
  },
});

// ✅ Clean, single export line for all actions
export const {
  setCreatorCourseData,
  setCourseData,
  setSelectedCourse,
  // updateCourseInCreatorData,
} = courseSlice.actions;

export default courseSlice.reducer;
