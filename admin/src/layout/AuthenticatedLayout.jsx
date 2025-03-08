import { useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function AuthenticatedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // check if user is logged in then redirect to dashboard
  useEffect(() => {
    let token = localStorage.getItem('adminAuthToken');
    if (token != null && token != "") {

      axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          localStorage.setItem("adminUser", JSON.stringify(response?.data));
        })
        .catch((error) => {
          if (error.status == 401) {
            toast.error("Unauthorized User");
            localStorage.removeItem('adminAuthToken');
            localStorage.removeItem('adminUser');
            navigate('/');
          }
        });

    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <Toaster toastOptions={{ position: 'top-right' }} />
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

