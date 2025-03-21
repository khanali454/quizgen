import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Processor from "../components/Processor";

const EmailVerify = () => {
  const navigate = useNavigate(); // For page navigation
  const location = useLocation(); // To access location state
  const [otp, setOtp] = useState(""); // OTP state
  const [processing, setProcessing] = useState(false); // Form processing state
  const [resendDisabled, setResendDisabled] = useState(false); // Resend button state
  const [resendLoading, setResendLoading] = useState(false); // Resend loading state

  // Get email from location state
  const email = location?.state?.email;

  // Check if user is logged in, then redirect to dashboard
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null && token != "") {
      navigate("/dashboard");
    }
  }, []);

  // Handle OTP verification
  const handleSubmit = async () => {
    try {
      if (!otp) {
        toast.error("Please enter the OTP");
        return;
      }
      setProcessing(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/email-verification`, {
        email: email,
        otp: otp,
      });
      if (response?.data?.status) {
        localStorage.setItem("token", response?.data?.token);
        toast.success("Email verified successfully!");
        navigate("/dashboard");
      } else {
        toast.error(response?.data?.msg || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setProcessing(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      if (!email) {
        toast.error("Email not found. Please try again.");
        return;
      }
      setResendLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/resend-otp`, {
        email: email,
      });
      if (response?.data?.status) {
        toast.success("OTP sent successfully!");
        setResendDisabled(true); // Disable resend button
        setTimeout(() => setResendDisabled(false), 30000); // Re-enable after 30 seconds
      } else {
        toast.error(response?.data?.msg || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setResendLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="a" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.6) rotate(0)">
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5" strokeWidth="1" stroke="none" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="b" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.5) rotate(0)">
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5" strokeWidth="1" stroke="none" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#b)" />
          </svg>
        </div>

        {/* OTP Verification Form */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* Logo */}
            <div className="mb-10 flex items-center justify-center">
              <a href="#" className="flex items-center gap-2 text-indigo-500 text-3xl font-black lowercase">
                Sowlf Ai.
              </a>
            </div>
            <p className="mb-6 text-gray-500">
              An OTP has been sent to <strong>{email}</strong>. Please enter the OTP to proceed.
            </p>

            {/* OTP form */}
            <div className="mb-4">
              <div className="mb-4">
                <label htmlFor="otp" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter OTP"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full flex items-center justify-center rounded-md border border-indigo-500 bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-5 text-white shadow hover:bg-indigo-600 cursor-pointer mb-4"
              >
                {processing && <Processor widthValue={4} heightValue={4} borderColorValue={"white"} />}
                <span className="ml-2">Verify OTP</span>
              </button>

              <button
                onClick={handleResendOtp}
                disabled={resendDisabled || resendLoading}
                className="w-full flex items-center justify-center rounded-md border border-gray-400 bg-gray-100 py-2 px-5 text-gray-700 shadow hover:bg-gray-200 cursor-pointer"
              >
                {resendLoading && <Processor widthValue={4} heightValue={4} borderColorValue={"gray"} />}
                <span className="ml-2">
                  {resendDisabled ? "Resend OTP in 30s" : "Resend OTP"}
                </span>
              </button>
            </div>

            <p className="text-center">
              New to MCQ AI?
              <Link to="/register" className="text-indigo-500 hover:text-indigo-600">
                Create an account
              </Link>
            </p>
          </div>
        </div>
        {/* End OTP Verification Form */}
      </div>
    </div>
  );
};

export default EmailVerify;