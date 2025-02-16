import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { IconButton, Button } from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  ArrowUpCircleIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithBurgerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    const handleClickOutside = (event) => {
      if (
        isDrawerOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* ✅ Navbar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-gray-100 shadow-md z-50">
        {isMobile && (
          <IconButton
            ref={menuButtonRef}
            variant="text"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsDrawerOpen(!isDrawerOpen);
            }}
          >
            {isDrawerOpen ? <XMarkIcon className="h-8 w-8 stroke-2" /> : <Bars3Icon className="h-8 w-8 stroke-2" />}
          </IconButton>
        )}

        <a href="./" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap">Ai MCQs</span>
        </a>
      </div>

      {/* ✅ Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-14 h-full w-64 bg-white shadow-lg p-4 z-40 transition-transform duration-300 
        ${isMobile ? (isDrawerOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
        onClick={(e) => e.stopPropagation()} // Prevents sidebar clicks from closing it
      >
        <div className="flex h-[calc(100vh-90px)] flex-col justify-between space-y-4">
          <div>
            <Link
              to="create-quiz"
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white gap-3 p-3 text-normal font-normal"
              onClick={() => setIsDrawerOpen(false)} // 🔴 Closes sidebar on click
            >
              Generate New Quiz
            </Link>

            {/* Sidebar Links */}
            <Link
              to="/User-Dashbord"
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
              ${location.pathname === "/User-Dashbord" ? "text-blue-500 font-semibold" : "text-gray-700"}`}
              onClick={() => setIsDrawerOpen(false)} // ✅ Closes sidebar on click
            >
              <HomeIcon className="h-6 w-6" /> Dashboard
            </Link>

            <Link
              to="genrated-mcqs"
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
              ${location.pathname.endsWith("genrated-mcqs") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              <DocumentIcon className="h-6 w-6" /> Generated MCQs
            </Link>

            <Link
              to="all-files"
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
              ${location.pathname.endsWith("all-files") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              <DocumentDuplicateIcon className="h-6 w-6" /> All Files
            </Link>

            <Link
              to="settings"
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
              ${location.pathname.endsWith("settings") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              <Cog6ToothIcon className="h-6 w-6" /> Settings
            </Link>
            <div className="border-t border-gray-400 border-dotted my-4"></div>

<Link to="/settings" className="flex items-center gap-3 p-3 text-sm font-normal text-gray-600">
  <CurrencyDollarIcon className="h-6 w-6" /> Ai Credits: 10 / 100
</Link>
</div>

          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white shadow-lg">
            <h5 className="mb-2 font-bold">Want More?</h5>
            <p className="mb-4 text-sm opacity-90">Get access to exclusive features and premium support.</p>
            <Button color="white" className="flex items-center gap-2 px-4 py-2 text-blue-700 text-sm rounded-full">
              <ArrowUpCircleIcon className="h-6 w-6" /> Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarWithBurgerMenu;
