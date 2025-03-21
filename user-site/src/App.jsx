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
import EmailVerify from './pages/EmailVerify';
import Pricing from './pages/Pricing';
import Page404 from './pages/Page404';
import PageTitle from './components/PageTitle';
import Checkout from './pages/Checkout';
import VerifyPayment from './pages/VerifyPayment';
import DefaultLayout from './layouts/DefaultLayout';
import Invoices from './pages/UserDashbord/Invoices';
import ResetPassword from './pages/ForgetPassword';
import ForgetPassword from './pages/ForgetPassword';



function App() {

  return (
    <Router>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={
            <>
              <PageTitle title={"Dashboard"} />
              <UserDashbord />
            </>
          }
          />
          <Route path="/mcq/new/:id?" element={
            <>
              <PageTitle title={"Generate Quiz"} />
              <MultiStepQuizForm />
            </>
          } />
          <Route path="/mcqs" element={
            <>
              <PageTitle title={"Generated MCQs"} />
              <GenratedMcqs />
            </>
          } />
          <Route path="/mcqs/:id" element={
            <>
              <PageTitle title={"View & Download MCQ"} />
              <DownloadView />
            </>
          } />
          <Route path="/files" element={
            <>
              <PageTitle title={"All Files"} />
              <AllFiles />
            </>
          } />
          <Route path="/transactions" element={
            <>
              <PageTitle title={"All Transaction"} />
              <Invoices />
            </>
          } />
          <Route path="/manage-subscription" element={
            <>
              <PageTitle title={"Manage Subscription"} />
              <PlanManage />
            </>

          } />
          <Route path="/checkout/:plan_id" element={
            <>
              <PageTitle title={"Checkout"} />
              <Checkout />
            </>
          } />
          <Route path="/settings" element={
            <>
              <PageTitle title={"Profile Settings"} />
              <Settings />
            </>
          } />
        </Route>

        {/* Guest Routes -  for the guest user */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={
            <><PageTitle title={"Home page"} /><Home /></>
          } />
          <Route path="/forget-password" element={
            <><PageTitle title={"Forgot Password"} /><ForgetPassword /></>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        {/* Guest Routes -  for the guest user */}
        <Route element={<DefaultLayout />}>
          <Route path="/callback" element={
            <>
              <PageTitle title={"Callback"} />
              <VerifyPayment />
            </>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;