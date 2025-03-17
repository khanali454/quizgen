import { Outlet, useNavigate } from 'react-router-dom';
import SidebarWithBurgerMenu from '../components/SidebarWithBurgerMenu';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { LoggedUserContext } from './LoggedUserContext'; // Import the context
import { useEffect, useState } from 'react';

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();

  // Check if user is logged in, then redirect to dashboard
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null && token != "") {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setLoggedUser(response?.data);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            toast.error("Session expired, Please log in again");
            localStorage.removeItem('token');
            navigate('/');
          }
        });
    } else {
      navigate('/');
    }
  }, []);

  return (
    <LoggedUserContext.Provider value={loggedUser}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <SidebarWithBurgerMenu />
        <div className="h-[calc(100vh-56px)] relative w-full mt-14 p-4 overflow-y-auto">
          <Outlet />
        </div>
        {/* for toast messages */}
        <Toaster toastOptions={{ position: 'top-right' }} />
      </div>
    </LoggedUserContext.Provider>
  );
};

export default AuthenticatedLayout;