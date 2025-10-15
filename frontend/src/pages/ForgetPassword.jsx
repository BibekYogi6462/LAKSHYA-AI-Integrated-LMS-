import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const [step, setStep] = useState(3);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //  For Step 1
  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  //   step 2
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );

      console.log(result.data);
      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  //   step 3
  const resetPassword = async () => {
    setLoading(true);
    try {
      if (newpassword == conpassword) {
        return toast.error("Password not matched");
      }
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newpassword },
        { withCredentials: true }
      );

      console.log(result.data);
      setLoading(false);
      navigate("/login");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step1  */}
      {step == 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">
            Forgot Your Password ?
          </h2>
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 "
              >
                Enter your Email Address
              </label>
              <input
                type="email"
                name=""
                id=""
                className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="example@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* Step2  */}
      {step == 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">
            Please enter your OTP
          </h2>
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 "
              >
                Please enter the 4-digit code sent to your email
              </label>
              <input
                type="email"
                name=""
                id=""
                className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="* * * * "
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onChange={verifyOTP}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* Step3  */}
      {step == 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter a new password
          </p>
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 "
              >
                New Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="*******"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                value={newpassword}
              />
            </div>
            <div>
              <label
                htmlFor="conpassword"
                className="block text-sm font-medium text-gray-700 "
              >
                Confirm Password
              </label>
              <input
                type="password"
                name=""
                id="conpassword"
                className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="*******"
                required
                onChange={(e) => setConPassword(e.target.value)}
                value={conpassword}
              />
            </div>
            <button
              className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onClick={resetPassword}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Your Password"
              )}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
