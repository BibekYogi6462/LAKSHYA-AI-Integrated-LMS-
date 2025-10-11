import React, { useState } from "react";
import logo from "../assets/formlogo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

const SignUp = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        action=""
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
      >
        {/* //left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl ">
              Let's Get Started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create Your Account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name:
            </label>
            <input
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              type="text"
              name=""
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              type="email"
              name=""
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              type={show ? "text" : "password"}
              name=""
              id="password"
              placeholder="Enter your password"
            />
            {show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span className="px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black">
              Student
            </span>
            <span className="px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black">
              Instructor
            </span>
          </div>
          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] ">
            Sign Up
          </button>
          <div className="w-[80%] flex flex-col items-center gap-2">
            <div className="flex w-full items-center justify-center gap-2">
              <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
              <div className="text-[15px] text-[#6f6f6f] flex items-center justify-center">
                Or Continue
              </div>
              <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            </div>

            <div className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-[#f7f7f7] transition">
              <img src={google} className="w-[25px]" alt="google" />
              <span className="text-[18px] ml-1">oogle</span>
            </div>
          </div>

          <div className="w-[25%] h-[0.5px]"></div>
        </div>

        {/* Right div  */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="logo" className="w-60 shadow-2xl" />
          <span className="text-2xl text-white mt-2">
            Dream it, learn it, achieve it
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
