import React, { useEffect } from "react";
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useState } from "react";
import Card from "../component/Card";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

// PayPal SDK Script
// Update your PayPal script loading
const loadPayPalScript = () => {
  return new Promise((resolve) => {
    if (window.paypal) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${
      import.meta.env.VITE_PAYPAL_CLIENT_ID
    }&currency=USD&intent=capture`;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Check if user is enrolled in the course
  const checkEnrollment = async () => {
    if (!userData?._id || !courseId) return;

    try {
      const response = await axios.get(
        `${serverUrl}/api/order/check-purchase/${courseId}`,
        { withCredentials: true }
      );
      setIsEnrolled(response.data.purchased);
    } catch (error) {
      console.log("Error checking enrollment:", error);
    }
  };

  // Load PayPal SDK
  useEffect(() => {
    loadPayPalScript().then((success) => {
      setPaypalLoaded(success);
    });
  }, []);

  // Check enrollment when user data or course changes
  useEffect(() => {
    if (userData && courseId) {
      checkEnrollment();
    }
  }, [userData, courseId]);

  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
        return null;
      }
    });
  };

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            {
              userId: selectedCourse?.creator,
            },
            { withCredentials: true }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  useEffect(() => {
    fetchCourseData();
  }, [courseData, courseId]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData?._id && course._id !== courseId
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

  // PayPal Payment Handler
  // PayPal Payment Handler - FIXED VERSION
  const handlePayment = async () => {
    if (!userData) {
      alert("Please login to purchase this course");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Create PayPal order
      const { data } = await axios.post(
        `${serverUrl}/api/order/create-paypal-order`,
        { courseId },
        { withCredentials: true }
      );

      console.log("PayPal order response:", data);

      if (data.orderID && window.paypal) {
        // Clear any existing buttons
        const container = document.getElementById("paypal-button-container");
        if (container) {
          container.innerHTML = "";
        }

        // Store the order ID in a variable that the PayPal button can access
        const paypalOrderID = data.orderID;

        // Render PayPal buttons with CORRECT configuration
        window.paypal
          .Buttons({
            createOrder: function (data, actions) {
              console.log("Using PayPal order ID:", paypalOrderID);
              // Return the order ID from our backend
              return paypalOrderID;
            },
            onApprove: async function (data, actions) {
              console.log("Payment approved:", data);
              try {
                // Capture payment
                const response = await axios.post(
                  `${serverUrl}/api/order/capture-paypal-order`,
                  { orderID: data.orderID },
                  { withCredentials: true }
                );

                console.log("Capture response:", response);

                if (
                  response.data.message === "Payment completed successfully"
                ) {
                  setIsEnrolled(true);
                  alert(
                    "Payment successful! You are now enrolled in this course."
                  );
                  // You can redirect to course content or refresh the page
                }
              } catch (error) {
                console.error("Payment capture error:", error);
                alert("Payment failed. Please try again.");
              }
            },
            onError: (err) => {
              console.error("PayPal error:", err);
              alert("Payment failed. Please try again.");
              setLoading(false);
            },
            onCancel: () => {
              console.log("Payment cancelled by user");
              setLoading(false);
            },
          })
          .render("#paypal-button-container")
          .then(() => {
            console.log("PayPal buttons rendered successfully");
            setLoading(false);
          })
          .catch((error) => {
            console.error("PayPal button render error:", error);
            setLoading(false);
          });
      } else {
        console.error("No orderID in response or PayPal not loaded");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  };
  // Handle Watch Now - redirect to course content
  const handleWatchNow = () => {
    navigate(`/view-lectures/${courseId}`);
  };

  const handleReview = async () => {
    setLoading1(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/review/createreview",
        {
          rating,
          comment,
          courseId,
        },
        { withCredentials: true }
      );
      setLoading1(false);
      toast.success("Review Added");
      console.log(result.data);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
      setRating(0);
      setComment("");
    }
  };

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(selectedCourse?.reviews);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* top section  */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail  */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="text-[black] w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                alt=""
                className="rounded-xl w-full object-cover "
              />
            ) : (
              <img
                src={img}
                alt=""
                className="rounded-xl w-full object-cover "
              />
            )}
          </div>

          {/* course info  */}
          <div className="flex-1 space-y-2 mt-[20px] ">
            <h2 className="text-2xl font-bold ">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>
            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-center gap-1">
                  <FaStar />
                  {avgRating}
                </span>
                <span className="text-gray-400">(1200 Reviews)</span>
              </div>
              <div className="text-lg font-semibold text-black">
                <span>${selectedCourse?.price}</span>{" "}
                <span className="line-through text-sm text-gray-400">$599</span>
              </div>

              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>
                <li>✅ Certificate of completion</li>
              </ul>

              {/* Enrollment/Payment Section */}
              <div className="mt-4 w-full">
                {!isEnrolled ? (
                  <div className="space-y-3">
                    <button
                      className="bg-[black] text-white px-6 py-3 rounded hover:bg-gray-700 w-full font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handlePayment}
                      disabled={loading || !paypalLoaded}
                    >
                      {loading
                        ? "Processing..."
                        : `Enroll Now - $${selectedCourse?.price}`}
                    </button>

                    {/* PayPal Button Container */}
                    {paypalLoaded && (
                      <div
                        id="paypal-button-container"
                        className="w-full"
                      ></div>
                    )}

                    {!paypalLoaded && (
                      <p className="text-sm text-gray-500">
                        Loading payment options...
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 w-full font-semibold cursor-pointer"
                    onClick={handleWatchNow}
                  >
                    Watch Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 ">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from Beginning</li>
            <li>Build real-world projects</li>
            <li>Master industry best practices</li>
          </ul>
        </div>

        <div className="text-xl font-semibold mb-2">
          <h2>This Course is for</h2>
          <p className="text-gray-700 list-disc pl-6 space-y-1 text-0.5">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 ">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800 ">
              Course Curriculum
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length} Lectures
            </p>

            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  disabled={!lecture.isPreviewFree && !isEnrolled}
                  onClick={() => {
                    if (lecture.isPreviewFree || isEnrolled) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                    lecture.isPreviewFree || isEnrolled
                      ? "hover:bg-gray-100 cursor-pointer border-gray-300 "
                      : "cursor-not-allowed opacity-60 border-gray-200"
                  }${
                    selectedLecture?.lectureTitle === lecture?.lectureTitle
                      ? "bg-gray-100 border-gray-400"
                      : ""
                  }`}
                >
                  <span className="text-lg text-gray-700">
                    {lecture.isPreviewFree || isEnrolled ? (
                      <FaPlayCircle />
                    ) : (
                      <FaLock />
                    )}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {lecture?.lectureTitle}
                    {!lecture.isPreviewFree && !isEnrolled && (
                      <span className="text-xs text-gray-500 ml-2">
                        (Premium)
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectedLecture?.videoUrl}
                  controls
                />
              ) : (
                <span className="text-white text-sm ">
                  {isEnrolled
                    ? "Select a lecture to watch"
                    : "Select a preview lecture to watch"}
                </span>
              )}
            </div>

            {/* Show message for locked content */}
            {selectedLecture &&
              !selectedLecture.isPreviewFree &&
              !isEnrolled && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <FaLock className="mx-auto text-yellow-500 mb-2" />
                  <p className="text-yellow-700 font-medium">Premium Content</p>
                  <p className="text-yellow-600 text-sm">
                    Enroll in the course to access all lectures
                  </p>
                  <button
                    onClick={handlePayment}
                    className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div className="mb-4 ">
            <div className="flex gap-1 mb-2 ">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating ? "fill-amber-300" : "fill-gray-300"
                  }
                />
              ))}
            </div>

            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Please write your review here"
              rows={3}
            />
            <button
              className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
              disabled={loading1}
              onClick={handleReview}
            >
              {loading1 ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>

        {/* For Instructor/creator info */}
        <div className="flex items-center gap-4 pt-4 border-t">
          {creatorData?.photoUrl ? (
            <img
              src={creatorData?.photoUrl}
              className="w-16 h-16 rounded-full object-cover border-1 border-gray-200"
            />
          ) : (
            <img
              src={img}
              alt=""
              className="w-16 h-16 rounded-full object-cover border-1 border-gray-200"
            />
          )}

          <div>
            <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
            <p className="md:text-sm text-gray-600 text-[10px] ">
              {creatorData?.description}
            </p>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.email}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">
            Other Published Courses by the Educator -
          </p>
        </div>
        <div className="w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px] ">
          {creatorCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
