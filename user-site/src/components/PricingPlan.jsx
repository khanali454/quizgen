import axios from "axios";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

const PricingPlan = ({ monthlyPlans, yearlyPlans, setMonthlyPlans, setYearlyPlans }) => {
  const [activeTab, setActiveTab] = useState("yearly");



  const plans = activeTab === "yearly" ? yearlyPlans : monthlyPlans;

  return (
    <section className="py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-manrope text-5xl font-bold text-gray-900 mb-4">
            Our Pricing Plans
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
              className={`w-1/2 text-center rounded-full py-3 px-3 lg:px-11 font-semibold transition-all duration-500 ${activeTab === "monthly" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "text-gray-400 hover:text-indigo-600"}`}
            >
              Bill Monthly
            </button>
          </div>


          {plans.length == 0 && (
            <div className="flex flex-col items-center justify-center w-full p-6 mt-6 rounded-lg ">
              <AlertCircle className="w-10 h-10 text-gray-500" />
              <p className="mt-2 text-sm text-gray-600">No plan was found</p>
            </div>
          )}



          {plans.length > 0 && (
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
                  <a
                    href={`/register`}
                    className="py-2.5 px-5 rounded-full font-semibold text-center w-fit mx-auto transition-all duration-300 bg-white text-indigo-600 hover:bg-gray-200"
                  >
                    {plan?.plan_type == "trial" ? (
                      <>Get Started</>
                    ) : (<>Get Started</>)}
                  </a>
                </div>
              ))}
            </div>
          )}


        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
