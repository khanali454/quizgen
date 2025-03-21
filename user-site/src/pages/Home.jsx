import React, { useEffect, useState } from 'react'
// Components for homepage
import HeroSection from '../components/HeroSection';
import PricingPlan from '../components/PricingPlan';
import NewsletterSection from '../components/NewsletterSection';
import ReviewSection from "../components/ReviewSection";
import BlogsSection from "../components/BlogsSection";
import HomeLoader from '../components/HomeLoader';
import axios from 'axios';
function Home() {
    const [loading, setLoading] = useState(true);
    const [recent_blogs, setRecentBlogs] = useState([]);
    const [monthlyPlans, setMonthlyPlans] = useState([]);
    const [yearlyPlans, setYearlyPlans] = useState([]);
  
  
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/guest-page`)
            .then((response) => {
                setMonthlyPlans(response?.data?.monthly_plans || []);
                setYearlyPlans(response?.data?.yearly_plans || []);
                setRecentBlogs(response?.data?.recent_blogs || []);
            })
            .catch((error) => {
                console.error("Error fetching plans:", error)
            }).finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <>
            {loading ? (
                <div className="fixed z-100 top-0 left-0 flex items-center justify-center w-full bg-white h-screen">
                    <HomeLoader />
                </div>
            ) : (
                <>
                    <HeroSection />
                    <PricingPlan monthlyPlans={monthlyPlans} yearlyPlans={yearlyPlans} setMonthlyPlans={setMonthlyPlans} setYearlyPlans={setYearlyPlans}/>
                    <BlogsSection recent_blogs={recent_blogs} setRecentBlogs={setRecentBlogs}/>
                    <ReviewSection />
                    {/* <NewsletterSection /> */}
                </>
            )}



        </>
    )
}

export default Home