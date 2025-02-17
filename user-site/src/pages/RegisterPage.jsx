import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles

const Register = () => {
  const [phone, setPhone] = useState(""); // Phone number state

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
       
<div class="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
   <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/></svg>
  </div>
<div class="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
   <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)'/></svg>
  </div>

        {/* Registration Form */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex items-center justify-center">
              <a href="#" className="text-indigo-500 text-3xl font-black">Sowlf Ai.</a>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to Sowlf Ai!</h4>
            <p className="mb-6 text-gray-500">Please sign-up to create your account</p>

            <form className="mb-4">
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Full Name</label>
                <input type="text" className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Enter your full name" />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Email</label>
                <input type="email" className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Enter your email" />
              </div>
                 
     {/* Phone Number Input */}
     <div className="mb-4 ">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">
                  Phone Number
                </label>
                <PhoneInput
                  country={"us"} // Default country
                  value={phone}
                  onChange={setPhone}
                  containerClass="w-full rounded-md border border-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" // Make container full width
                  inputClass="block w-full rounded-md border !border-0 py-2 px-3 text-sm"
                  buttonClass="border-r border-gray-400 bg-gray-100 hover:bg-gray-200 transition"
                  dropdownClass="shadow-lg border border-gray-300"
                />
              </div>

    


              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Password</label>
                <input type="password" className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Enter your password" />
              </div>
              <div className="mb-4 flex items-center">
                <input type="checkbox" className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded" />
                <label className="ml-2 text-sm">Remember Me</label>
              </div>
              <button className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-5 text-white shadow hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500">
                Sign Up
              </button>
            </form>

            <p className="text-center">
              Already have an account?  
              <Link to="/login" className="text-indigo-500 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

