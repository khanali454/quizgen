import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import Processor from '../components/Processor';

const LoginPage = () => {
  const navigate = useNavigate(); // for page navigations
  const [email, setEmail] = useState(); // email state
  const [password, setPassword] = useState(); // password sate
  const [processing, setProcessing] = useState(false); // processing - login processing

  // check if user is logged in then redirect to dashboard
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null && token != "") {
      navigate('/dashboard');
    }
  }, []);

  // on submitting the login form
  const handleSubmit = () => {
    try {
      if (!email) {
        toast.error("Please enter email");
        return false;
      }
      if (!password) {
        toast.error("Please enter password");
        return false;
      }
      setProcessing(true);
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/auth`,
        {
          email: email,
          password: password
        })
        .then((response) => {
          if (response?.data?.status) {
            if (response?.data?.action == "redirect") {
              // verify email otp
              navigate(`/verify-email`,{state:{email:email}});
            } else {
              localStorage.setItem("token", response?.data?.token);
              navigate('/dashboard');
            }
          } else {
            toast.error(response?.data?.msg)
          }
        })
        .catch((error) => {
          toast.error("Something went wrong, Please try again later")
        }).finally(() => {
          setProcessing(false);
        });
    } catch (error) {
      toast.error(error?.message);
      console.log("Some error : ", error);
      setProcessing(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
        </div>

        {/* Login Form */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* Logo */}
            <div className="mb-10 flex items-center justify-center">
              <a href="#" className="flex items-center gap-2 text-indigo-500 text-3xl font-black lowercase">
                Sowlf Ai.
              </a>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 text-xl">Welcome to Sowlf Ai!</h4>
            <p className="mb-6 text-gray-500">Please sign in to access your account</p>

            {/* login form */}
            <div className="mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={email}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => { setEmail(e.target.value) }}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <label htmlFor="password" className="mb-2 text-xs font-medium uppercase text-gray-700">
                    Password
                  </label>
                  <Link to="/forget-password" className="text-indigo-500 hover:text-indigo-600 text-sm">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="············"
                />
              </div>


              <button
                onClick={() => { handleSubmit() }}
                disabled={processing}
                className="w-full flex items-center justify-center rounded-md border border-indigo-500 bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-5 text-white shadow hover:bg-indigo-600 cursor-pointer">
                {processing &&
                  (<Processor widthValue={4} heightValue={4} borderColorValue={'white'} />)}
                <span className="ml-2">Sign In</span>
              </button>
            </div>

            <p className="text-center">
              New to  MCQ AI?
              <Link to="/register" className="text-indigo-500 hover:text-indigo-600">Create an account</Link>
            </p>
          </div>
        </div>
        {/* End Login Form */}
      </div>
    </div>
  );
};

export default LoginPage;
