import React from "react";
import logo from "../assets/logo2.jpg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* First Column - Brand */}
          <div className="lg:w-full">
            <img
              src={logo}
              alt="Lakshya Logo"
              className="h-10 mb-3 border-1 rounded-[5px]"
            />
            <h2 className="text-xl font-semibold mb-2">Lakshya</h2>
            <p className="text-sm">
              AI-powered learning platform to help you grow smarter. Learn
              anything, anytime, and anywhere
            </p>
          </div>

          {/* Second Column - Quick Links */}
          <div className="lg:w-full">
            <div className="font-semibold mb-4">Quick Links</div>
            <ul className="text-sm space-y-2">
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/allcourses")}
              >
                All Courses
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </li>
            </ul>
          </div>

          {/* Third Column - Categories */}
          <div className="lg:w-full">
            <div className="font-semibold mb-4">Categories</div>
            <ul className="text-sm space-y-2">
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/courses/technology")}
              >
                Technology
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/courses/business")}
              >
                Business
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/courses/design")}
              >
                Design
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/courses/development")}
              >
                Development
              </li>
              <li
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => navigate("/courses/marketing")}
              >
                Marketing
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 py-6 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lakshya. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
