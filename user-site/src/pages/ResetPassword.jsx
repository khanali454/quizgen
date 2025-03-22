import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import Processor from '../components/Processor';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = () => {
    try {
      if (!token) {
        toast.error("Please enter your reset token");
        return;
      }
      if (!email) {
        toast.error("Please enter your email address");
        return;
      }
      if (!password) {
        toast.error("Please enter a new password");
        return;
      }
      if (!confirmPassword) {
        toast.error("Please confirm your new password");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      setProcessing(true);
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/reset-password`, { 
        token,
        email,
        password,
        password_confirmation: confirmPassword 
      })
        .then((response) => {
          if (response?.data?.status) {
            toast.success("Password reset successfully!");
            navigate('/login');
          } else {
            toast.error(response?.data?.msg || "Failed to reset password");
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
        {/* Background patterns (same as before) */}
        
        {/* Main Form Container */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* Logo Section (same as before) */}

            {/* Form Content */}
            <h4 className="mb-2 font-medium text-gray-700 text-xl text-center">
              Reset Your Password
            </h4>
            <p className="mb-6 text-gray-500 text-center">
              Enter your new password and reset token
            </p>

            <div className="mb-4">
              <div className="mb-6">
                <label htmlFor="token" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Reset Token
                </label>
                <input
                  type="text"
                  id="token"
                  value={token}
                  readOnly={!!searchParams.get('token')}
                  onChange={(e) => setToken(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter reset token from email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  readOnly={!!searchParams.get('email')}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter your registered email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter new password"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Confirm new password"
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
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="ml-2">
                  {processing ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;