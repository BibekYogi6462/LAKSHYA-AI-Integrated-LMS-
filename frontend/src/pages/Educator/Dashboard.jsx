import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { creatorCourseData } = useSelector((state) => state.course);

  // ADD THESE DEBUG CONSOLE LOGS
  console.log("creatorCourseData:", creatorCourseData);
  console.log("creatorCourseData type:", typeof creatorCourseData);
  console.log("creatorCourseData length:", creatorCourseData?.length);

  const CourseProgressData =
    creatorCourseData?.map((course) => {
      // Debug each course
      console.log("Course:", course.title, "Lectures:", course.lectures);
      return {
        name: course.title?.slice(0, 10) + "...",
        lectures: course.lectures?.length || 0,
      };
    }) || [];

  const EnrollData =
    creatorCourseData?.map((course) => {
      // Debug each course enrollment
      console.log(
        "Course:",
        course.title,
        "Enrolled:",
        course.enrolledStudents
      );
      return {
        name: course.title?.slice(0, 10) + "...",
        enrolled: course.enrolledStudents?.length || 0,
      };
    }) || [];

  // Debug the final data for charts
  console.log("CourseProgressData:", CourseProgressData);
  console.log("EnrollData:", EnrollData);

  // Also add a fallback UI when no data is available
  if (!creatorCourseData || creatorCourseData.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <FaArrowLeftLong
          className="w-[22px] absolute top-[10%] left-[10%] h-[22px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="w-full px-6 py-10 bg-gray-50 flex items-center justify-center">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Courses Found
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first course to see analytics and graphs
            </p>
            <button
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/courses")}
            >
              Create Your First Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeftLong
        className="w-[22px] absolute top-[10%] left-[10%] h-[22px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-full px-6 py-10 bg-gray-50 space-y-10 ">
        {/* Main Section  */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              userData?.photoUrl ||
              `https://ui-avatars.com/api/?name=${
                userData?.name || "Instructor"
              }&background=000&color=fff`
            }
            alt="Instructor"
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
          />

          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800 ">
              Welcome,👋 {userData?.name || "Instructor"}
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
              Total Earning: 0
            </h1>
            <p className="text-gray-600 text-sm">
              {userData?.description || "Start Creating Courses"}
            </p>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Course Progress Graph  */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Course Progress (Lectures){" "}
            </h2>
            {CourseProgressData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={CourseProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="lectures" fill="black" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No lecture data available
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Student Enrollment </h2>
            {EnrollData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={EnrollData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrolled" fill="black" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No enrollment data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
