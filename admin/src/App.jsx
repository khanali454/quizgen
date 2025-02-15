import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import User from './pages/User';
import Settings from './pages/Settings';
import AuthenticatedLayout from './layout/AuthenticatedLayout';
import Plans from './pages/Plans';
import Blog from './pages/Blog';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import NewUser from './pages/NewUser';
import NewPlan from './pages/NewPlan';
import SystemSettings from './pages/SystemSettings';
import Login from './pages/Auth/Login';
import GuestLayout from './layout/GuestLayout';
import Page404 from './pages/Page404';
import ForgotPassword from './pages/Auth/ForgotPassword';
import CreateBlog from './pages/CreateBlog';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
         path="/dashboard"
        element={
          <AuthenticatedLayout>
            <PageTitle title="Dashboard - Mcq AI Admin" />
            <AdminDashboard />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/users"
        element={
          <AuthenticatedLayout>
            <PageTitle title="Users - Mcq Ai Admin" />
            <User />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/user/new"
        element={
          <AuthenticatedLayout>
            <PageTitle title="New User - Mcq Ai Admin" />
            <NewUser />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/plans"
        element={
          <AuthenticatedLayout>
            <PageTitle title="Plans - Mcq Ai Admin" />
            <Plans />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/plans/new"
        element={
          <AuthenticatedLayout>
            <PageTitle title="New Plan - Mcq Ai Admin" />
            <NewPlan />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/blogs"
        element={
          <AuthenticatedLayout>
            <PageTitle title="Blogs - Mcq Ai Admin" />
            <Blog />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/blog/new"
        element={
          <AuthenticatedLayout>
            <PageTitle title="New Blog - Mcq Ai Admin" />
            <CreateBlog />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/system-settings"
        element={
          <AuthenticatedLayout>
            <PageTitle title="System settings - Mcq Ai Admin" />
            <SystemSettings />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <AuthenticatedLayout>
            <PageTitle title="Edit Profile | Mcq AI Admin" />
            <Settings />
          </AuthenticatedLayout>
        }
      />

      <Route
        path="/"
        element={
          <GuestLayout>
            <PageTitle title="Login | Mcq AI Admin" />
            <Login />
          </GuestLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestLayout>
            <PageTitle title="Forgot Password | Mcq AI Admin" />
            <ForgotPassword/>
          </GuestLayout>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Page404 />
          </>
        }
      />


    </Routes>
  );
}

export default App;
