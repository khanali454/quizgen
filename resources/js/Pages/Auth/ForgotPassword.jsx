import GuestLayout from '@/Layouts/admin/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'), {
            // if there is any error after submitting the login form
            onError: function (errors_list) {
                let all_errors = Object.values(errors_list);
                if (all_errors.length > 0) {
                    toast.error(all_errors[0]);
                }
            }
        });
    };

    // to print the session variable "status" if that exists in sessions 
    useEffect(() => {
        if (status != null && status != "") {
            toast.success(status);
        }
    }, [status]);

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="rounded-lg bg-white dark:bg-gray-800">
                <div className="flex justify-center items-center min-h-[50vh] py-6 sm:py-10">
                    <div className="w-full max-w-md rounded-lg py-6">
                        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
                        Forgot Password
                        </h2>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
                        Enter your email, and we’ll send you a link to create a new password.
                        </p>
                        {/* Forgot password */}
                        <form onSubmit={submit}>
                            <div className="mb-5">

                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) => setData("email", e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:ring-primary"
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
                                    className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-dark disabled:opacity-50"
                                >
                                    Email Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
