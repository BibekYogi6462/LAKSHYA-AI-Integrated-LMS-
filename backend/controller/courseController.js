import { response } from "express";
import Course from "../model/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title or Category is required" });
    }
    const course = await Course.create({
      title,
      description,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Create Course Error ${error}` });
  }
};

export const getPublisedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublised: true });
    if (!courses) {
      return res.status(400).json({ message: "Courses Not Found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find publised courses ${error}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({
      creator: userId,
    });
    if (!courses) {
      return res.status(400).json({ message: "Courses Not Found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to Get Creator Courses ${error}` });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subTitle, description, category, level, isPublised, price } =
      req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not Found" });
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublised,
      price,
      thumbnail,
    };

    course -
      (await Course.findByIdAndUpdate(courseId, updateData, { new: true }));
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to  edit Course ${error}` });
  }
};

export const getCoursesById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not Found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get course by ID ${error}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not Found" });
    }
    course = await Course.findByIdAndDelete(courseId, { new: true });
    return res.status(200).json({ message: "Course Removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to remove course ${error}` });
  }
};
