import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import HeroSection from './components/HeroSection';
import PricingPlan from './components/PricingPlan';
import NewsletterSection from './components/NewsletterSection';
import ReviewSection from "./components/ReviewSection";
import BlogsSection from "./components/BlogsSection";

// User Dashboard Pages

import SidebarWithBurgerMenu from "./components/SidebarWithBurgerMenu";
import UserDashboardLayout from "./pages/UserDashbord/UserDashboardLayout";
import UserDashbord from "./pages/UserDashbord/UserDashbord";
import MultiStepQuizForm from "./pages/UserDashbord/MultiStepQuizForm";
import GenratedMcqs from "./pages/UserDashbord/GenratedMcqs";
import Settings from "./pages/UserDashbord/Settings";
import AllFiles from "./pages/UserDashbord/AllFiles";
import PlanManage from "./pages/UserDashbord/PlanManage";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllBlogs from "./pages/AllBlogs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail"; // Import the new BlogDetail Page


function Layout() {
  const location = useLocation();
  const isUserDashboard = location.pathname.startsWith("/User-Dashbord");

  return (
    <>
      {!isUserDashboard && <Navbar />}

      <Routes>
        {/* Frontend Pages */}
        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
              <PricingPlan />
              <BlogsSection />
              <ReviewSection />
              <NewsletterSection />
            </>
          } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Terms-Conditions" element={<TermsConditions />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />

        {/* User Dashboard Routes */}
      
        <Route path="/User-Dashbord" element={<UserDashboardLayout />}>
           <Route index element={<UserDashbord />} />
           <Route path="create-quiz" element={<MultiStepQuizForm />} />
           <Route path="genrated-mcqs" element={<GenratedMcqs />} />
           <Route path="all-files" element={<AllFiles />} />
           <Route path="plan-manage" element={<PlanManage />} />
           <Route path="settings" element={<Settings />} />
        </Route>

          <Route path="/blog/:blogId" element={<BlogDetail />} />

      </Routes>

      {!isUserDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
