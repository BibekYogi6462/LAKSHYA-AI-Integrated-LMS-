import { response } from "express";
import Course from "../model/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title or Category is required" });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Create Course Error ${error}` });
  }
};

// export const getPublishedCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({ isPublished: true }).populate(
//       "lectures"
//     );
//     if (!courses) {
//       return res.status(400).json({ message: "Courses Not Found" });
//     }
//     return res.status(200).json(courses);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to find publised courses ${error}` });
//   }
// };
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate({
        path: "lectures",
        model: "Lecture",
      })
      .exec();

    console.log(
      "AFTER POPULATE - First course lectures:",
      courses[0]?.lectures
    );

    if (!courses) {
      return res.status(400).json({ message: "Courses Not Found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find published courses ${error}` });
  }
};
// export const getCreatorCourses = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const courses = await Course.find({
//       creator: userId,
//     });
//     if (!courses) {
//       return res.status(400).json({ message: "Courses Not Found" });
//     }
//     return res.status(200).json(courses);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to Get Creator Courses ${error}` });
//   }
// };

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({
      creator: userId,
    })
      .populate("lectures") // ✅ Add this
      .populate("enrolledStudents"); // ✅ Add this

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
    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
    } = req.body;

    console.log(
      "Received isPublished:",
      isPublished,
      "Type:",
      typeof isPublished
    );

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not Found" });
    }

    // Build update object
    const updateData = {
      title: title || course.title,
      subTitle: subTitle || course.subTitle,
      description: description || course.description,
      category: category || course.category,
      level: level || course.level,
      price: price || course.price,
      isPublished: isPublished === "true" || isPublished === true, // Handle both string and boolean
    };

    // Only update thumbnail if a new one was uploaded
    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }

    console.log("Updating with data:", updateData);

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    console.log("Updated course:", course);
    return res.status(200).json(course);
  } catch (error) {
    console.log("Edit course error:", error);
    return res.status(500).json({ message: `Failed to edit Course ${error}` });
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

// For Lctures

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture Title is required",
      });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
    }
    await course.populate("lectures");
    await course.save();
    return res.status(201).json({ lecture, course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create lecture ${error}` });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course is not found",
      });
    }
    await course.populate("lectures");
    await course.save();
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get course lecture ${error}` });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture is not found",
      });
    }
    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();
    return res.status(200).json(lecture);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add lecture",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture is not found" });
    }
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res.status(200).json({ message: "Lecture Removed" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

//get creator

export const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "USer is not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get instructor",
    });
  }
};
