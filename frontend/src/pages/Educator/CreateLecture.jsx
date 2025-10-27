import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const CreateLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* header  */}
        <div className="mb-6">
          <h1
            className="text-2xl font-semibold text-gray-800 mb-1"
            onClick={() => navigate("/editcourse")}
          >
            Lets Add a Lecture
          </h1>
          <p className="text-sm text-gray-500">
            Enter the title and add your video lectures to enhance your course
            content
          </p>
        </div>

        {/* input area  */}
        <input
          type="text"
          name=""
          id=""
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4"
          placeholder="e.g. Introduction to Mern Stack"
        />

        {/* button  */}

        <div className="flex gap-4 mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
            onClick={() => navigate(`/editcourse/${courseId}`)}
          >
            <FaArrowLeftLong /> Back to Course
          </button>
          <button className="px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-medium shadow">
            + Create Lecture
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
