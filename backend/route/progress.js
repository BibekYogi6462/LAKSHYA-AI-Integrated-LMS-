import express from "express";
import Progress from "../model/Progress.js"; // Fixed path - model not models
import Course from "../model/courseModel.js"; // Fixed path
import isAuth from "../middleware/isAuth.js"; // Fixed filename

const router = express.Router();

// Get user progress for a course
router.get("/course/:courseId", isAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    console.log("Fetching progress for:", { userId, courseId });

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      // Create new progress record if doesn't exist
      progress = new Progress({
        userId,
        courseId,
        completedLectures: [],
        progressPercentage: 0,
      });
      await progress.save();
      console.log("Created new progress record");
    }

    console.log("Progress found:", progress);
    res.json(progress);
  } catch (error) {
    console.error("Progress fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Mark lecture as completed
router.post("/mark-completed", isAuth, async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.userId;

    console.log("Marking as completed:", { userId, courseId, lectureId });

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        completedLectures: [lectureId],
        progressPercentage: 0,
      });
      console.log("Created new progress with completed lecture");
    } else {
      // Add lecture to completed if not already there
      if (!progress.completedLectures.includes(lectureId)) {
        progress.completedLectures.push(lectureId);
        console.log("Added lecture to completed");
      } else {
        console.log("Lecture already completed");
      }
    }

    // Calculate progress percentage
    const course = await Course.findById(courseId);
    const totalLectures = course.lectures.length;
    const completedCount = progress.completedLectures.length;
    progress.progressPercentage =
      totalLectures > 0 ? (completedCount / totalLectures) * 100 : 0;

    console.log("Progress calculated:", {
      totalLectures,
      completedCount,
      percentage: progress.progressPercentage,
    });

    await progress.save();
    res.json({ success: true, progress });
  } catch (error) {
    console.error("Mark completed error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
