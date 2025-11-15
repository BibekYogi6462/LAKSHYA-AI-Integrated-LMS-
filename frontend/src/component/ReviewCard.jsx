import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const ReviewCard = ({
  comment,
  rating,
  photoUrl,
  name,
  description,
  courseTitle,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full">
      {/* Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span key={index}>{star <= rating ? <FaStar /> : <FaRegStar />}</span>
        ))}
      </div>

      {/* Course Title */}
      <p className="text-gray-700 text-sm">
        Review for <span className="font-semibold">{courseTitle}</span>{" "}
      </p>

      {/* Comment */}
      <p className="text-gray-700 text-sm mb-5">
        Review: <span className="font-semibold">{comment}</span>
      </p>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <img
          src={photoUrl}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-800 text-sm">{name}</h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
