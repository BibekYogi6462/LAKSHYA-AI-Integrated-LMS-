import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const MyEnrolledCourses = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Debugging: Log the userData to console
  console.log("User Data:", userData);
  console.log("Enrolled Courses:", userData?.enrolledCourses);

  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
      <FaArrowLeftLong
        className="absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
        My Enrolled Courses
      </h1>

      {/* Better debugging in UI */}
      {!userData ? (
        <p className="text-gray-500 text-center w-full">
          User data not found. Please log in.
        </p>
      ) : !userData.enrolledCourses ? (
        <p className="text-gray-500 text-center w-full">
          No enrolled courses data found in user profile.
        </p>
      ) : userData.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          You haven't enrolled in any courses yet.
        </p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-[30px]">
          {userData.enrolledCourses.map((course, index) => (
            <div
              key={course._id || index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border w-80"
            >
              <img
                src={course?.thumbnail}
                alt={course?.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {course?.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{course?.category}</p>
                <p className="text-sm text-gray-600 mb-2">{course?.level}</p>
                <button
                  className="px-4 py-2 w-full bg-black border-2 border-black text-white rounded-lg text-sm font-light cursor-pointer mt-2 hover:bg-gray-800 transition-colors"
                  onClick={() => navigate(`/view-lectures/${course._id}`)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
