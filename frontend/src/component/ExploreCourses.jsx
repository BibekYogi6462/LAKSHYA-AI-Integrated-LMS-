import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceImacCode } from "react-icons/tb";
import { FaPaintBrush } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaDatabase } from "react-icons/fa6";
import { FaUikit } from "react-icons/fa";
import { BsCameraVideoFill } from "react-icons/bs";
import { RiPresentationFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
      {/* left/top div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px] ">
        <span className="text-[35px] font-semibold ">Explore</span>
        <span className="text-[35px] font-semibold ">Our Courses</span>
        <p className="text-[17px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat id
          facilis necessitatibus, neque quam deleniti ad perspiciatis inventore
          minus consequuntur!\
        </p>
        <button
          className="px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer"
          onClick={() => navigate("/allcourses")}
        >
          Explore Courses <SiViaplay className="w-[30px] h-[30px]" />
        </button>
      </div>

      {/* right div with 4-4 layout */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex flex-col items-center justify-center gap-[30px] mb-[50px] lg:mb-[0px]">
        {/* top 4 */}
        <div className="flex justify-center items-center gap-[50px] flex-wrap">
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center ">
              <TbDeviceImacCode className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Web Development
          </div>
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#e0f7ff] rounded-lg flex items-center justify-center ">
              <FaUikit className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            UI/UX Designing
          </div>
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fff0d9] rounded-lg flex items-center justify-center ">
              <FaDatabase className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Database Management
          </div>
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#e6ffd9] rounded-lg flex items-center justify-center ">
              <MdSecurity className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Cyber Security
          </div>
        </div>

        {/* bottom 4 */}
        <div className="flex justify-center items-center gap-[50px] flex-wrap">
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#f3e9ff] rounded-lg flex items-center justify-center ">
              <GiArtificialIntelligence className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Artificial Intelligence
          </div>
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#ffe6e6] rounded-lg flex items-center justify-center ">
              <FaPaintBrush className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Graphic Design
          </div>
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#e0f0ff] rounded-lg flex items-center justify-center ">
              <BsCameraVideoFill className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Video Editing
          </div>
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#e6ffe8] rounded-lg flex items-center justify-center ">
              <RiPresentationFill className="w-[60px] h-[60px] text-[#6d6c6c]" />
            </div>
            Digital Marketing
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
