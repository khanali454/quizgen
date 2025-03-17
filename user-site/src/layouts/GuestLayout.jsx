import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import HomeLoader from "../components/HomeLoader";
import axios from "axios";
import { GeneralInfoContext } from "./GeneralInfoContext";
const GuestLayout = () => {

    const [generalInfo, setGeneralInfo] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/guest/website-info`)
            .then((response) => {
                setGeneralInfo(response?.data?.general_info);
            })
            .catch((error) => {

            }).finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <>
            {loading ? (<><HomeLoader /></>) : (
                <GeneralInfoContext.Provider value={generalInfo}>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-1">
                            <Outlet />
                        </main>
                        {/* for toast messages */}
                        <Toaster toastOptions={{ position: 'top-right' }} />
                        <Footer />
                    </div>
                </GeneralInfoContext.Provider>
            )}
        </>
    );
};

export default GuestLayout;
