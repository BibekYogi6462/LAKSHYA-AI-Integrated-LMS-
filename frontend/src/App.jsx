// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import { ToastContainer } from "react-toastify";
// // import getCurrentUser from "./customHooks/getCurrentUser";
// import useGetCurrentUser from "./customHooks/getCurrentUser";
// import { useSelector } from "react-redux";
// import Profile from "./pages/Profile";
// import ForgetPassword from "./pages/ForgetPassword";
// import EditProfile from "./pages/EditProfile";
// import Dashboard from "./pages/Educator/Dashboard";
// import Courses from "./pages/Educator/Courses";
// import CreateCourses from "./pages/Educator/CreateCourses";
// import getCreatorCourse from "./customHooks/getCreatorCOurse";
// import EditCourse from "./pages/Educator/EditCourse";
// // import { getPublisedCourses } from "../../backend/controller/courseController";
// import getPublishedCourse from "./customHooks/getPublishedCourse";

// export const serverUrl = "http://localhost:8000";

// const App = () => {
//   // getCurrentUser();
//   useGetCurrentUser();
//   getCreatorCourse();
//   getPublishedCourse();

//   const { userData } = useSelector((state) => state.user);
//   return (
//     <>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/signup"
//           element={!userData ? <SignUp /> : <Navigate to={"/"} />}
//         />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/profile"
//           element={userData ? <Profile /> : <Navigate to={"/signup"} />}
//         />
//         <Route
//           path="/forget"
//           element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />}
//         />

//         <Route
//           path="/dashboard"
//           element={
//             userData?.role === "instructor" ? (
//               <Dashboard />
//             ) : (
//               <Navigate to={"/signup"} />
//             )
//           }
//         />
//         <Route
//           path="/courses"
//           element={
//             userData?.role === "instructor" ? (
//               <Courses />
//             ) : (
//               <Navigate to={"/signup"} />
//             )
//           }
//         />
//         <Route
//           path="/createcourse"
//           element={
//             userData?.role === "instructor" ? (
//               <CreateCourses />
//             ) : (
//               <Navigate to={"/signup"} />
//             )
//           }
//         />
//         <Route
//           path="/editcourse/:courseId"
//           element={
//             userData?.role === "instructor" ? (
//               <EditCourse />
//             ) : (
//               <Navigate to={"/signup"} />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import useGetCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import CreateCourses from "./pages/Educator/CreateCourses";
import getCreatorCourse from "./customHooks/getCreatorCOurse";
import EditCourse from "./pages/Educator/EditCourse";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Educator/CreateLecture";

export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  getCreatorCourse();

  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/forget"
          element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/dashboard"
          element={
            userData?.role === "instructor" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "instructor" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourse"
          element={
            userData?.role === "instructor" ? (
              <CreateCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userData?.role === "instructor" ? (
              <EditCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "instructor" ? (
              <CreateLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
