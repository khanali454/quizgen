import toast, { Toaster } from 'react-hot-toast';
export default function GuestLayout({ children }) {
    return (
        <div className="flex w-full min-h-screen flex-col items-center bg-white justify-center">
             <Toaster toastOptions={{position:'top-right'}}/>
            <div className="w-full py-4 px-4">
                {children}
            </div>
        </div>
    );
}
