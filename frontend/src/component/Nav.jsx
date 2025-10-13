import React, { useState } from "react";
import logo from "../assets/logo2.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
// import { FiSplitCross } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { serverUrl } from "../App";

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false); // Fixed initialization

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-between px-6 lg:px-16 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="logo"
          className="w-[50px] h-[50px] rounded-lg border border-gray-300 shadow-sm cursor-pointer object-cover"
        />
        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
          Lakshya
        </h1>
      </div>

      {/* Right Section - Hidden on mobile */}
      <div className="hidden lg:flex items-center gap-5 relative">
        {!userData && (
          <IoPersonCircleSharp
            className="w-[38px] h-[38px] text-gray-700 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
        {userData && (
          <div
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold text-lg cursor-pointer shadow-md hover:scale-105 transition-transform"
            onClick={() => setShow((prev) => !prev)}
          >
            {userData?.name.slice(0, 1).toUpperCase()}
          </div>
        )}

        {userData?.role === "instructor" && (
          <button className="px-4 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors">
            Dashboard
          </button>
        )}

        {!userData ? (
          <button
            className="px-4 py-2 bg-white text-black border border-black rounded-xl font-medium hover:bg-black hover:text-white transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-white text-black rounded-xl font-medium shadow hover:bg-gray-100 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

        {/* Dropdown Menu */}
        {show && (
          <div className="absolute top-[150%] right-[0] flex flex-col gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black cursor-pointer">
            <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
              My Profile
            </span>
            <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
              My Courses
            </span>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="flex lg:hidden items-center gap-4">
        {/* Show user avatar on mobile when logged in */}
        {userData && (
          <div
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold text-lg cursor-pointer shadow-md hover:scale-105 transition-transform"
            onClick={() => setShowHam((prev) => !prev)}
          >
            {userData?.name.slice(0, 1).toUpperCase()}
          </div>
        )}

        <RxHamburgerMenu
          className="w-6 h-6 cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-60 left-0 w-full h-full flex flex-col items-center justify-center gap-5 z-50 lg:hidden transform transition-transform duration-500 ${
          showHam ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ImCross
          className="w-6 h-6 text-black absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowHam(false)}
        />

        {userData && (
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold text-lg cursor-pointer shadow-md hover:scale-105 transition-transform">
            {userData?.name.slice(0, 1).toUpperCase()}
          </div>
        )}

        <div
          className="px-4 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
          onClick={() => setShowHam(false)}
        >
          My Profile
        </div>

        <div
          className="px-4 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
          onClick={() => setShowHam(false)}
        >
          My Courses
        </div>

        {userData?.role === "instructor" && (
          <button
            className="px-4 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
            onClick={() => setShowHam(false)}
          >
            Dashboard
          </button>
        )}

        {!userData ? (
          <button
            className="px-4 py-2 bg-white text-black border border-black rounded-xl font-medium hover:bg-black hover:text-white transition-colors"
            onClick={() => {
              navigate("/login");
              setShowHam(false);
            }}
          >
            Login
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-white text-black rounded-xl font-medium shadow hover:bg-gray-100 transition-colors"
            onClick={() => {
              handleLogout();
              setShowHam(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
