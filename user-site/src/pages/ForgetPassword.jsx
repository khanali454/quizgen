import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import Processor from '../components/Processor';
import {GeneralInfoContext} from '../layouts/GeneralInfoContext';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

   // general settings 
   const general_info = useContext(GeneralInfoContext);
  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = () => {
    try {
      if (!email) {
        toast.error("Please enter your email address");
        return;
      }
      
      setProcessing(true);
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/forgot-password`, { email })
        .then((response) => {
          if (response?.data?.status) {
            toast.success("Password reset link sent to your email!");
            navigate('/login');
          } else {
            toast.error(response?.data?.msg || "Failed to send reset link");
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.msg || "Something went wrong. Please try again later.");
        })
        .finally(() => setProcessing(false));
    } catch (error) {
      toast.error(error.message);
      console.error("Reset password error:", error);
      setProcessing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        {/* Background patterns */}
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute -left-20 -top-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="a" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.6) rotate(0)">
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path 
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5" 
                  strokeWidth="1" 
                  stroke="none" 
                  fill="currentColor" 
                />
              </pattern>
            </defs>
            <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
          </svg>
        </div>
        
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute -right-20 -bottom-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="b" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.5) rotate(0)">
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path 
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5" 
                  strokeWidth="1" 
                  stroke="none" 
                  fill="currentColor" 
                />
              </pattern>
            </defs>
            <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#b)" />
          </svg>
        </div>

        {/* Main Form Container */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* Logo Section */}
            <div className="mb-10 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h1 className="text-indigo-500 text-3xl font-black lowercase">
              {general_info?.website_name||"Tutor Sowlf"}
              </h1>
            </div>

            {/* Form Content */}
            <h4 className="mb-2 font-medium text-gray-700 text-xl text-center">
              Forgot Your Password?
            </h4>
            <p className="mb-6 text-gray-500 text-center">
              Enter your email and we'll send you a link to reset your password
            </p>

            <div className="mb-4">
              <div className="mb-6">
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  autoFocus
                  autoComplete="email"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter your registered email"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full flex items-center justify-center rounded-md border border-indigo-500 bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-5 text-white shadow hover:bg-indigo-600 cursor-pointer disabled:opacity-50 transition-all duration-200"
              >
                {processing ? (
                  <Processor widthValue={4} heightValue={4} borderColorValue={'white'} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                )}
                <span className="ml-2">
                  {processing ? "Sending..." : "Send Reset Link"}
                </span>
              </button>
            </div>

            <p className="text-center text-sm mt-6">
              Remember your password?{" "}
              <Link 
                to="/login" 
                className="text-indigo-500 hover:text-indigo-600 font-medium"
              >
                Return to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;