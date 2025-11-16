import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import ai from "../assets/ai.png";
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";

const SearchWithAi = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };

    recognition.onerror = () => {
      toast.error("Voice recognition failed");
    };
  };

  const handleRecommendation = async (query) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/course/search",
        { input: query },
        { withCredentials: true }
      );
      console.log(result.data);
      setRecommendations(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br form-black to-gray-900 text-white flex flex-col items-center px-4 py-16">
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">
        {/* Back Button */}
        <FaArrowLeftLong
          className="text-[black] w-[22px] h-[22px] cursor-pointer absolute left-4 top-6"
          onClick={() => navigate(-1)}
        />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          <img src={ai} alt="" className="w-8 h-8 sm:w-[30px] sm:h-[30px]" />
          Search With <span className="text-[#da6ed1]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
          <input
            type="text"
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          {/* AI Search Button */}
          <button className="absolute right-14 sm:right-16 bg-white rounded-full">
            <img src={ai} alt="" className="w-10 h-10 p-2 rounded-full" />
          </button>

          {/* Voice Search Button */}
          <button
            className="absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleVoiceSearch}
          >
            <RiMicAiFill className="w-5 h-5 text-[#cb87c5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchWithAi;
