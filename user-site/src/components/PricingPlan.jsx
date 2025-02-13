import { useState } from "react";

const PricingPlan = () => {
  const [activeTab, setActiveTab] = useState("yearly");

  const features = [
    "Individual configuration",
    "No setup, or hidden fees",
    "Team size: 1 developer",
    "Premium support: 6 months",
    "Free updates: 6 months",
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-manrope text-5xl font-bold text-gray-900 mb-4">
            Our Pricing Plans
          </h2>
          <p className="text-gray-500 text-xl leading-6 mb-12">
            7 Days free trial. No credit card required.
          </p>
          <div className="mb-10 flex justify-center">
            <span className="flex items-center">
              <svg
                className="w-16 h-11"
                viewBox="0 0 65 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.0964 4.02732C39.5251 4.74637 37.1135 5.87152 34.9795 7.36979C34.0529 8.02188 33.2561 8.68389 32.5982 9.38799C32.5386 9.38153 32.482 9.38579 32.4118 9.38233C30.1332 9.37225 27.711 10.2114 25.0194 11.9465C20.4292 14.906 16.7212 19.2023 14.2904 24.3897C12.0636 29.1502 11.0911 34.265 11.4596 39.2591L7.6368 36.04L6.83225 37.0047L12.587 41.8449L16.9956 35.7576L15.9819 35.024L13.1146 38.9812C12.4253 28.9566 17.4523 18.8014 25.9225 13.3583C27.861 12.1112 29.6087 11.3798 31.2299 11.146C30.6487 12.083 30.2872 13.0624 30.1426 14.0738C29.9087 15.7573 30.5083 17.6123 31.7101 18.8943C32.6977 19.9474 33.9541 20.4744 35.2551 20.3764C36.5669 20.2755 37.7738 19.5103 38.5629 18.2841C39.4661 16.8873 39.6838 15.1043 39.1492 13.6472C38.4686 11.7917 36.7603 10.3508 34.6701 9.73325C35.0524 9.40674 35.4806 9.07896 35.9331 8.75591C42.0235 4.51004 50.3771 3.60724 57.2293 6.46459L57.8719 4.92101C54.237 3.40628 50.175 2.84314 46.1137 3.2738C44.7513 3.40049 43.4035 3.6618 42.0964 4.02732ZM37.5828 14.2008C37.9503 15.1845 37.7787 16.3883 37.1605 17.3586C36.9123 17.7517 36.3954 18.3817 35.5811 18.6094C35.4419 18.6483 35.2889 18.6795 35.1406 18.6863C34.3594 18.743 33.5726 18.4082 32.933 17.7318C32.0791 16.8263 31.6418 15.4691 31.8087 14.2898C31.9645 13.1944 32.4639 12.1301 33.2993 11.1106C35.286 11.3987 36.9819 12.5889 37.5828 14.2008Z"
                  fill="#9CA3AF"
                />
              </svg>

              <span
                className="inline-block whitespace-nowrap text-xs leading-4 font-semibold tracking-wide bg-indigo-50 text-indigo-600 rounded-full py-2 px-4"
                >Save 20%</span>
            </span>
          </div>
          <div className="flex justify-center items-center bg-gray-100 rounded-full p-1.5 max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab("yearly")}
              className={`w-1/2 text-center rounded-full py-3 px-3 lg:px-11 font-semibold transition-all duration-500 ${
                activeTab === "yearly" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-indigo-600"
              }`}
            >
              Bill Yearly
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`w-1/2 text-center rounded-full py-3 px-3 lg:px-11 font-semibold transition-all duration-500 ${
                activeTab === "monthly" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-indigo-600"
              }`}
            >
              Bill Monthly
            </button>
          </div>

          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {["Free", "Advanced", "Team"].map((plan, index) => (
              <div
                key={plan}
                className={`group relative flex flex-col mx-auto w-full max-w-sm rounded-2xl p-6 xl:p-12 transition-all duration-300 ${
                  plan === "Advanced" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-gray-300 text-gray-900 hover:border-indigo-600"
                }`}
              >
                <h3 className="font-manrope text-2xl font-bold mb-6">{plan}</h3>
                <div className="mb-6">
                  <ul className="space-y-4 text-left">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <svg
                          className="w-5 h-5 text-green-500"
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
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-10 flex flex-col">
                  <span className="font-manrope text-6xl font-semibold mb-2">
                    {plan === "Free" ? "$0" : activeTab === "yearly" ? `$${index === 1 ? "150" : "180"}` : `$${index === 1 ? "39" : "49"}`}
                  </span>
                  <span className="text-xl text-gray-400">
                    {plan === "Free" ? "Lifetime" : activeTab === "yearly" ? "Per Year" : "Per Month"}
                  </span>
                </div>
                <a
                  href="#"
                  className={`py-2.5 px-5 rounded-full font-semibold text-center w-fit mx-auto transition-all duration-300 ${
                    plan === "Advanced" ? "bg-white text-indigo-600 hover:bg-gray-200" : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                  }`}
                >
                  Purchase Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
