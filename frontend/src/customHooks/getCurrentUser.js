// import axios from "axios";
// import { useEffect } from "react";
// import { serverUrl } from "../App.jsx";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// const getCurrentUser = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/user/getcurrentUser", {
//           withCredentials: true,
//         });
//         dispatch(setUserData(result.data));
//       } catch (error) {
//         console.log(error);
//         dispatch(setUserData(null));
//       }
//     };
//     fetchUser();
//   }, []);
// };

// export default getCurrentUser;

import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/getcurrentUser", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("Error fetching user:", error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, [dispatch]); // Added dispatch to dependency array
};

export default useGetCurrentUser;
