import React from "react";
import logo from "../assets/logo2.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
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
      toast.error(error.response.data.message);
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

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {!userData && (
          <IoPersonCircleSharp className="w-[38px] h-[38px] text-gray-700 cursor-pointer hover:scale-105 transition-transform" />
        )}
        {userData && (
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold text-lg cursor-pointer shadow-md hover:scale-105 transition-transform">
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
      </div>
    </nav>
  );
};

export default Nav;
