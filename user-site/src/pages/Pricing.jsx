import React, { useEffect, useState } from "react";
import HomeLoader from "../components/HomeLoader";
import axios from "axios";
import PricingPlan from "../components/PricingPlan";

const Pricing = () => {
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/guest-page`)
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


  return (
    <section className="w-full">
      {loading ? (<HomeLoader />) : (
        <PricingPlan monthlyPlans={monthlyPlans} yearlyPlans={yearlyPlans} setMonthlyPlans={setMonthlyPlans} setYearlyPlans={setYearlyPlans} />
      )}
    </section>
  );
};

export default Pricing;
