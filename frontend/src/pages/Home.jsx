import React from "react";
import Nav from "../component/Nav";
import home from "../assets/home4.png";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../component/Logos";
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
import Review from "../../../backend/model/reviewModel";
import ReviewPage from "../component/ReviewPage";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          alt="Hero background"
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh] mt-20"
        />

        {/* Sky blue overlay for better text readability */}
        <div className="absolute inset-0 bg-sky-500/10 lg:bg-sky-500/5 mt-20"></div>

        <span className="lg:text-[50px] absolute md:text-[20px] lg:top-[5%] md:top-[5%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] drop-shadow-lg">
          Grow Your Skills to Advance
        </span>

        <div className="absolute lg:top-[15%] md:top-[35%] top-[25%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          <button
            className="px-[20px] py-[10px] border-2 border-white bg-white/20 backdrop-blur-sm text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg"
            onClick={() => navigate("/allcourses")}
          >
            View All Courses
            <SiViaplay className="w-[30px] h-[30px] " />
          </button>
          <button
            className="px-[20px] py-[10px] border-2 border-sky-300 bg-sky-500/80 backdrop-blur-sm text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer hover:bg-sky-600 transition-all duration-300 shadow-lg"
            onClick={() => navigate("/search")}
          >
            Search With AI
            <img
              src={ai}
              alt=""
              className="w-[30px] h-[30px] rounded-full hidden lg:block "
            />
            <img
              src={ai1}
              alt=""
              className="w-[35px] h-[35px] rounded-full lg:hidden"
            />
          </button>
        </div>
      </div>
      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
};

export default Home;
