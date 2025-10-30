// import { useEffect } from "react";
// import { serverUrl } from "../App";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCourseData } from "../redux/courseSlice";

// const getPublishedCourse = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getCourseData = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/course/getpublished", {
//           withCredentials: true,
//         });
//         dispatch(setCourseData(result.data));
//         console.log(result.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCourseData();
//   }, [dispatch]);
// };

// import { useEffect } from "react";
// import { serverUrl } from "../App";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux"; // ADD useSelector
// import { setCourseData } from "../redux/courseSlice";

// const getPublishedCourse = () => {
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user); // ADD this

//   useEffect(() => {
//     // Only fetch if user is authenticated
//     if (!userData) return;

//     const getCourseData = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/course/getpublished", {
//           withCredentials: true,
//         });

//         console.log("🟢 FRONTEND - API Response received");
//         console.log(
//           "🟢 FRONTEND - First course lectures:",
//           result.data[0]?.lectures
//         );

//         dispatch(setCourseData(result.data));
//         console.log("🟢 FRONTEND - Data dispatched to Redux");
//       } catch (error) {
//         console.log("🔴 FRONTEND - API Error:", error);
//       }
//     };
//     getCourseData();
//   }, [dispatch, userData]); // ADD userData as dependency
// };

// export default getPublishedCourse;
import { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const getPublishedCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    const getCourseData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getpublished", {
          withCredentials: true,
        });

        dispatch(setCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseData();
  }, [dispatch, userData]);
};

export default getPublishedCourse;
