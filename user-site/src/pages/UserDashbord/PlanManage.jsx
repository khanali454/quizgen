import axios from "axios";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import HomeLoader from "../../components/HomeLoader";
import Processor from "../../components/Processor";
import { useUser } from "../../layouts/LoggedUserContext";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'

const PlanManage = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [monthlyPlans, setMonthlyPlans] = useState();
  const [yearlyPlans, setYearlyPlans] = useState();

  const { loggedUser, updateUser } = useUser();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const [availing_trial, setAvailingTrial] = useState(false);

  const availFreeTrial = (pid) => {
    setAvailingTrial(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/avail-trial/${pid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response?.data?.status) {
          toast.success(response?.data?.msg);
          window.location.href = "/dashboard";
        } else {
          toast.error(response?.data?.msg || "Error in availing free trial, Please try again");
        }
      })
      .catch((error) => {
        toast.error("Error in availing free trial, Please try again");
      }).finally(() => {
        setAvailingTrial(false);
      });
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/plans/management`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setMonthlyPlans(response?.data?.monthly_plans || []);
        setYearlyPlans(response?.data?.yearly_plans || []);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error)
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const plans = activeTab === "yearly" ? yearlyPlans : monthlyPlans;

  return (
    <>
      {loading ? (<HomeLoader />) : (
        <section className="py-2">
          {/* Subscription Expired Banner */}
          {loggedUser?.subscription?.status === "expired" && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="font-medium">Your subscription has expired. Please choose a plan to continue using our services.</p>
                </div>
                
              </div>
            </div>
          )}

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="plans">
            <div className="mb-12 text-center">
              <h2 className="font-manrope text-5xl font-bold text-gray-900 mb-4">
                Choose a Plan
              </h2>
              <p className="text-gray-500 text-xl leading-6 mb-12">
                No credit card required for trial plans.
              </p>
              <div className="flex justify-center items-center bg-gray-100 rounded-full p-1.5 max-w-sm mx-auto">
                <button
                  onClick={() => setActiveTab("yearly")}
                  className={`w-1/2 text-center rounded-full py-3 px-3 lg:px-11 font-semibold transition-all duration-500 ${activeTab === "yearly" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "text-gray-400 hover:text-indigo-600"}`}
                >
                  Bill Yearly
                </button>
                <button
                  onClick={() => setActiveTab("monthly")}
                  className={`w-1/2 text-center rounded-full py-3 px-3 lg:px-11 font-semibold transition-all duration-500 ${activeTab === "monthly" ? " bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "text-gray-400 hover:text-indigo-600"}`}
                >
                  Bill Monthly
                </button>
              </div>

              {plans?.length == 0 && (
                <div className="flex flex-col items-center justify-center w-full p-6 mt-6 rounded-lg ">
                  <AlertCircle className="w-10 h-10 text-gray-500" />
                  <p className="mt-2 text-sm text-gray-600">No plan was found</p>
                </div>
              )}

              {plans?.length > 0 && (
                <div className="mt-12 grid lg:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="group relative flex flex-col mx-auto w-full max-w-sm rounded-2xl p-6 xl:p-12 transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:bg-indigo-700"
                    >
                      <h3 className="font-manrope text-2xl font-bold mb-6">{plan.plan_name}</h3>
                      <ul className="space-y-4 text-left mb-6">
                        {plan.PlanFeatures.split("|").map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mb-10 flex flex-col">
                        <span className="font-manrope text-6xl font-semibold mb-2">
                          ${plan.price}
                        </span>
                        <span className="text-xl text-white">
                          Per {plan?.billing_interval == "monthly" ? "Month" : "Year"}
                        </span>
                      </div>

                      {(plan?.id == loggedUser?.subscription?.plan?.id && loggedUser?.subscription?.status == "active") ? (
                        <button disabled
                          className="py-2.5 px-5 rounded-full font-semibold text-center w-fit mx-auto transition-all duration-300 bg-white text-gray-400 cursor-not-allowed hover:bg-gray-200"
                        >
                          Current Plan
                        </button>
                      ) : (
                        <>
                          {plan?.plan_type == "trial" ? (
                            <button
                              disabled={availing_trial}
                              onClick={() => { availFreeTrial(plan?.id) }}
                              className="py-2.5 px-5 rounded-full font-semibold text-center w-fit flex items-center justify-center mx-auto transition-all duration-300 bg-white text-indigo-600 hover:bg-gray-200"
                            >
                              {availing_trial ? (<>
                                <Processor widthValue={4} heightValue={4} />
                                <span className="ml-2">Availing</span>
                              </>) : (<>
                                <b className="text-green-400">Avail Free Trial</b>
                              </>)}
                            </button>
                          ) : (
                            <Link
                              to={`/checkout/${plan?.id}`}
                              className="py-2.5 px-5 rounded-full font-semibold text-center w-fit mx-auto transition-all duration-300 bg-white text-indigo-600 hover:bg-gray-200"
                            >
                              Choose Plan
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PlanManage;