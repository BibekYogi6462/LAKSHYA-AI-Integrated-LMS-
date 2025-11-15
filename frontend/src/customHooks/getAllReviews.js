// import axios from "axios";
// import React, { useEffect } from "react";
// import { serverUrl } from "../App";
// import { useDispatch } from "react-redux";
// import { setReviewData } from "../redux/reviewSlice";

// const getAllReviews = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const allReviews = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/review/getreview", {
//           withCredentials: true,
//         });
//         dispatch(setReviewData(result.data));
//         console.log(result.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getAllReviews();
//   }, []);
// };

// export default getAllReviews;
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setReviewData } from "../redux/reviewSlice";

const useReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/review/getreview`, {
          withCredentials: true,
        });
        dispatch(setReviewData(res.data));
        console.log("Reviews Loaded:", res.data);
      } catch (err) {
        console.log("Review Fetch Error:", err);
      }
    };

    fetchReviews();
  }, [dispatch]);
};

export default useReviews;
