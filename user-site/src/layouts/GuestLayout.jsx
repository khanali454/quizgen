import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GuestLayout = () => {

    return (
        <div className="flex flex-col min-h-screen">
            {/* guest navbar */}
            <Navbar />
            <div className="flex flex-1">
                <main className={`flex-1`}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default GuestLayout;