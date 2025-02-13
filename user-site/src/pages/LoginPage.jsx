import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate =  useNavigate();
  return (
    <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">

        <div class="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
        </div>
        <div class="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
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

            <form className="mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Email or Username
                </label>
                <input
                  type="text"
                  id="email"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="Enter your email or username"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <label htmlFor="password" className="mb-2 text-xs font-medium uppercase text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-indigo-500 hover:text-indigo-600 text-sm">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                  placeholder="············"
                />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-5 w-5 rounded border border-gray-300 checked:bg-indigo-500 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-700">
                  Remember Me
                </label>
              </div>

              <button onClick={()=>{navigate('/User-Dashbord')}} className="w-full rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-white shadow hover:bg-indigo-600">
                Sign in
              </button>
            </form>

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

export default Login;
