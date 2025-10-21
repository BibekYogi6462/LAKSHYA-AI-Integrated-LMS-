import express from "express";
import {
  createCourse,
  editCourse,
  getCoursesById,
  getCreatorCourses,
  getPublisedCourses,
  removeCourse,
} from "../controller/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create", isAuth, createCourse);
courseRouter.get("/getpublised", getPublisedCourses);
courseRouter.get("/getcreator", isAuth, getCreatorCourses);

courseRouter.post(
  "/editcourse/:courseId",
  isAuth,
  upload.single("thumbnail"),
  editCourse
);

courseRouter.get("/getcourse/:courseId", isAuth, getCoursesById);

courseRouter.delete("/remove/:courseId", isAuth, removeCourse);

export default courseRouter;
