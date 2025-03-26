import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles
import toast from "react-hot-toast";
import axios from "axios";
import Processor from "../components/Processor";
import { GeneralInfoContext } from '../layouts/GeneralInfoContext';
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { plan_id } = useParams();
  const navigate = useNavigate(); // For navigation
  const [name, setName] = useState(""); // Name state
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [phone, setPhone] = useState(""); // Phone number state
  const [processing, setProcessing] = useState(false); // Processing state
  const [loading, setLoading] = useState(false); // Loading state
  const [plan, setPlan] = useState(false); // Loading state

  const [password_type, setPasswordType] = useState("password");
  // general settings 
  const general_info = useContext(GeneralInfoContext);

  // Check if user is logged in, then redirect to dashboard
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null && token != "") {
      navigate('/dashboard');
    }
  }, []);


  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate inputs
      if (!name || !email || !password || !phone) {
        toast.error("Please fill all fields");
        return;
      }

      setProcessing(true);

      // Call the registration API
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, {
        name,
        email,
        password,
        phone_number: phone,
      });

      if (response?.data?.status) {
        // toast.success("Registration successful! Please verify your email.");
        // Redirect to the email verification page with the email as a query parameter
        navigate(`/verify-email`, { state: { email: email } });
      } else {
        toast.error(response?.data?.msg || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setProcessing(false);
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

        {/* Registration Form */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex items-center justify-center">
              <a href="" className="text-indigo-500 text-3xl font-black">
                {general_info?.website_name || "Tutor Sowlf"}
              </a>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to  {general_info?.website_name || "Tutor Sowlf"}</h4>
            <p className="mb-6 text-gray-500">Please sign-up to create your account</p>

            <form className="mb-4">
              {/* Full Name Input */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number Input */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Phone Number</label>
                <PhoneInput
                  country={"us"} // Default country
                  value={phone}
                  onChange={setPhone}
                  containerClass="w-full rounded-md border border-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  inputClass="block w-full rounded-md border !border-0 py-2 px-3 text-sm"
                  buttonClass="border-r border-gray-400 bg-gray-100 hover:bg-gray-200 transition"
                  dropdownClass="shadow-lg border border-gray-300"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase text-gray-700">Password</label>

                <div className="relative border rounded-md border-gray-400">
                  <input
                    type={password_type}
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md outline-none py-2 px-3 pr-12 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                    placeholder="············"
                  />
                  <button type="button" className="absolute rounded-tr-md rounded-br-md top-0 right-0 h-full px-3 bg-blue-50"
                    onClick={() => {
                      password_type == "password" ? setPasswordType("text") : setPasswordType("password")
                    }}>
                    {password_type == "password" ? (
                      <EyeOff className="w-[20px] h-[20px] text-gray-500" />
                    ) : (
                      <Eye className="w-[20px] h-[20px] text-gray-500" />
                    )}
                  </button>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={processing}
                className="w-full flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-5 text-white shadow hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500"
              >
                {processing && <Processor widthValue={4} heightValue={4} borderColorValue={"white"} />}
                <span className="ml-2">Sign Up</span>
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