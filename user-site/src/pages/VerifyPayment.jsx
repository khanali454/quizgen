import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function VerifyPayment() {
  const [params,setParams] = useSearchParams(); // Extract the payment ID from the URL
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verify payment on component mount
  useEffect(() => {
    if(!params.get('id')){
        navigate('/manage-subscription');
    }
    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/payment/verify/${params.get('id')}`
        );

        if (response.data.status) {
          setVerificationStatus(response.data); // Set verification status on success
        } else {
          setError("Payment verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setError("An error occurred while verifying your payment.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    verifyPayment();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-700">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed</h2>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => window.location.reload()} // Reload the page to retry
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (verificationStatus) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-700">
            {verificationStatus.msg || "You have successfully subscribed."}
          </p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Plan Details</h3>
            <p className="text-gray-600">{verificationStatus.plan.plan_name}</p>
            <p className="text-gray-600">
              Billing Interval: {verificationStatus.plan.billing_interval}
            </p>
          </div>
          <button
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => (window.location.href = '/')} // Redirect to homepage or dashboard
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default VerifyPayment;