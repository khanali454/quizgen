import { Outlet, useNavigate } from 'react-router-dom';
import SidebarWithBurgerMenu from '../components/SidebarWithBurgerMenu';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { LoggedUserContext } from './LoggedUserContext'; // user loggedin context
import { GeneralInfoContext } from "./GeneralInfoContext"; // general settings context
import { useEffect, useState } from 'react';
import HomeLoader from '../components/HomeLoader';

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();
  const [generalInfo, setGeneralInfo] = useState();
  const [loading, setLoading] = useState(true);


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
          if(!response?.data?.subscription || response?.data?.subscription?.status !="active"){
            navigate('/manage-subscription');
          }
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

    // general info like logo & name of website etc
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/guest/website-info`)
      .then((response) => {
        setGeneralInfo(response?.data?.general_info);
      })
      .catch((error) => {

      }).finally(() => {
        setLoading(false);
      });
  }, []);



  // Function to update the user data
  const updateUser = (updatedData) => {
    setLoggedUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  return (
    <>
      {loading ? (<><HomeLoader /></>) : (
        <GeneralInfoContext.Provider value={generalInfo}>
          <LoggedUserContext.Provider value={{loggedUser,updateUser}}>
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
              <SidebarWithBurgerMenu />
              <div className="h-[calc(100vh-56px)] relative w-full mt-14 py-4 px-2 overflow-y-auto">
                <Outlet />
              </div>
              {/* for toast messages */}
              <Toaster toastOptions={{ position: 'top-right' }} />
            </div>
          </LoggedUserContext.Provider>
        </GeneralInfoContext.Provider>
      )}
    </>

  );
};

export default AuthenticatedLayout;