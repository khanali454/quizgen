// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import GuestLayout from './layouts/GuestLayout';

// Components for homepage
import HeroSection from './components/HeroSection';
import PricingPlan from './components/PricingPlan';
import NewsletterSection from './components/NewsletterSection';
import ReviewSection from "./components/ReviewSection";
import BlogsSection from "./components/BlogsSection";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllBlogs from "./pages/AllBlogs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";

// Dashboard Components
import UserDashbord from "./pages/UserDashbord/UserDashbord";
import MultiStepQuizForm from "./pages/UserDashbord/MultiStepQuizForm";
import GenratedMcqs from "./pages/UserDashbord/GenratedMcqs";
import Settings from "./pages/UserDashbord/Settings";
import AllFiles from "./pages/UserDashbord/AllFiles";
import PlanManage from "./pages/UserDashbord/PlanManage";
import DownloadView from "./pages/UserDashbord/DownloadView";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<UserDashbord />} />
          <Route path="/dashboard/quiz/new" element={<MultiStepQuizForm />} />
          <Route path="/dashboard/mcqs" element={<GenratedMcqs />} />
          <Route path="/dashboard/files" element={<AllFiles />} />
          <Route path="/dashboard/mcq/:id" element={<DownloadView />} />
          <Route path="/dashboard/manage-subscription" element={<PlanManage />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>

        {/* Guest Routes -  for the guest user */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={
            <>
              <HeroSection />
              <PricingPlan />
              <BlogsSection />
              <ReviewSection />
              <NewsletterSection />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;