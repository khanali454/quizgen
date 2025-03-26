import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Processor from '../../common/Processor';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [processing, setProcessing] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('adminAuthToken');
        if (token) navigate('/dashboard');
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
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
                        navigate('/');
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
        if (e.key === 'Enter') handleSubmit(e);
    };

    return (
        <div className="rounded-lg bg-white dark:bg-gray-800">
            <div className="flex justify-center items-center min-h-[50vh] py-6 sm:py-10">
                <div className="w-full max-w-md rounded-lg py-6">
                    <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
                        Forgot Password
                    </h2>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
                        Enter your email, and we'll send you a link to create a new password.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    autoComplete="username"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <span className="absolute right-4 top-4">
                                    <svg
                                        className="fill-current"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.5">
                                            <path
                                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                fill=""
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-dark disabled:opacity-50 flex items-center justify-center"
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
                                    {processing ? "Sending..." : "Email Password Reset Link"}
                                </span>
                            </button>
                        </div>
                    </form>
                    
                    <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
                        Remember your password?{" "}
                        <Link 
                            to="/" 
                            className="text-primary hover:text-primary-dark font-medium"
                        >
                            Return to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}