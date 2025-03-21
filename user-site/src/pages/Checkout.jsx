import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import HomeLoader from '../components/HomeLoader';

function Checkout() {
  const { plan_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  // Fetch plan details
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/checkout/${plan_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          setPlan(response.data);
        } else {
          setError(response?.data?.msg ||"Failed to load plan details.");
          if (response?.data?.action == "redirect") {
            navigate('/manage-subscription');
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching plan:", error);
        setError("An error occurred while fetching plan details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [plan_id, token]);

  // Add Moyasar CSS and JS to the <head>
  useEffect(() => {
    // Add Moyasar CSS
    const moyasarCSS = document.createElement('link');
    moyasarCSS.rel = 'stylesheet';
    moyasarCSS.href = 'https://cdn.moyasar.com/mpf/1.15.0/moyasar.css';
    document.head.appendChild(moyasarCSS);

    // Add Polyfill Script
    const polyfillScript = document.createElement('script');
    polyfillScript.src =
      'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&features=fetch';
    document.head.appendChild(polyfillScript);

    // Add Moyasar Script
    const moyasarScript = document.createElement('script');
    moyasarScript.src = 'https://cdn.moyasar.com/mpf/1.15.0/moyasar.js';
    moyasarScript.onload = () => {
      // Initialize Moyasar Payment Form after the script is loaded
      Moyasar.init({
        element: '.moyasar-form',
        amount: plan ? plan.payment * 100 : 0,
        currency: 'USD',
        description: plan ? plan.plan.plan_name : 'Subscription Plan',
        publishable_api_key: plan?.configuration?.publishable_api_key,
        callback_url: `${window.location.origin}/callback`,
        methods: ['creditcard', 'applepay'],
        apple_pay: {
          country: 'SA',
          label: 'Sowlf ',
          validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate',
        },
        on_completed: function (payment) {
          return new Promise(function (resolve, reject) {
            // saving
            // Data to be sent in the request
            let requestData = {
              plan_id: plan?.plan?.id,
              payment_id: payment?.id,
              amount: payment?.amount,
            };

            // save request

            axios
              .post(`${import.meta.env.VITE_API_BASE_URL}/checkout/save-payment`, requestData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response?.data?.status) {
                  resolve({});
                } else {
                  toast.error(response?.data?.msg || "Payment failed please try again later");
                  if (response?.data?.action == "redirect") {
                    navigate('/manage-subscription');
                  }
                  reject();
                }
              }).catch(() => {
                toast.error("Payment failed please try again later");
                reject();
              });
            // saving
          });
        },
      });
    };
    document.head.appendChild(moyasarScript);

    // Cleanup function to remove added elements
    return () => {
      document.head.removeChild(moyasarCSS);
      document.head.removeChild(polyfillScript);
      document.head.removeChild(moyasarScript);
    };
  }, [plan]);

  if (loading) {
    return (
      <HomeLoader/>
    );
  }

  if (error) {
    return (
      <div className="py-7 px-4 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="py-7 px-4 flex items-center justify-center">
        <div className="text-gray-700">No plan details found.</div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Details */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{plan.plan.plan_name}</h3>
                <p className="text-gray-600">Billing Interval: {plan.plan.billing_interval}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-700">Features</h4>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {plan.plan.PlanFeatures.split(" | ").map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Price</span>
                <span className="text-gray-800">${plan.plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">$0.00</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-gray-900 font-semibold">${plan.payment}</span>
              </div>
            </div>

            {/* Moyasar Payment Form */}
            <div className="moyasar-form mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;