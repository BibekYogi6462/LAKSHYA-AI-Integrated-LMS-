import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/getcurrentUser", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, []);
};

export default getCurrentUser;

// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";

// const useCurrentUser = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const result = await axios.get(`${serverUrl}/api/user/getcurrentUser`, {
//           withCredentials: true,
//         });
//         dispatch(setUserData(result.data));
//       } catch (error) {
//         console.error(error);
//         dispatch(setUserData(null));
//       }
//     };

//     fetchUser();
//   }, [dispatch]);
// };

// export default useCurrentUser;
