// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import GuestLayout from './layouts/GuestLayout';



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
import Home from './pages/Home';


function App() {

  return (
    <Router>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<UserDashbord />} />
          <Route path="/mcq/new" element={<MultiStepQuizForm />} />
          <Route path="/mcqs" element={<GenratedMcqs />} />
          <Route path="/mcqs/:id" element={<DownloadView />} />
          <Route path="/files" element={<AllFiles />} />
          <Route path="/manage-subscription" element={<PlanManage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Guest Routes -  for the guest user */}
        <Route element={<GuestLayout/>}>
          <Route path="/" element={<Home/>} />
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