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
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithBurgerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const location = useLocation();
  const sidebarRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isDrawerOpen) {
        const clickedOnSidebar = sidebarRef.current?.contains(event.target);
        const clickedOnBurger = burgerRef.current?.contains(event.target);

        if (!clickedOnSidebar && !clickedOnBurger) {
          setIsDrawerOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile, isDrawerOpen]);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeSidebar = () => isMobile && setIsDrawerOpen(false);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-gray-100 shadow-md z-50">
        {isMobile && (
          <IconButton
            ref={burgerRef}
            variant="text"
            size="lg"
            onClick={toggleSidebar}
          >
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
        )}

        <a href="./" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Ai MCQs
          </span>
        </a>

        <div className="flex items-center gap-4">
          {/* Language Selector Dropdown */}
          <Menu as="div" className=" relative">
            <Menu.Button as={IconButton} variant="text" className="text-lg bg-gray-200">
              {selectedLanguage === 'en' ? '🇺🇸' : '🇸🇦'}
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedLanguage('en')}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''
                        }`}
                    >
                      🇺🇸 English
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedLanguage('ar')}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''
                        }`}
                    >
                      🇸🇦 Arabic
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          {/* User Profile Menu */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button as={IconButton} variant="text" className="bg-gray-200">
              <UserCircleIcon className="h-8 w-8" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/settings"
                    className={`flex items-center gap-2 px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                      }`}
                  >
                    <UserCircleIcon className="h-5 w-5" /> Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/settings"
                    className={`flex items-center gap-2 px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                      }`}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-14 h-full w-64 bg-white shadow-lg p-4 z-40 transition-transform duration-300 
        ${isMobile ? (isDrawerOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
      >
        <div className="flex h-[calc(100vh-90px)] flex-col justify-between space-y-4">
          <div>
            <Link
              to="/mcq/new"
              onClick={closeSidebar}
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white gap-3 p-3 text-normal font-normal"
            >
              Generate New Quiz
            </Link>

            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
                ${location.pathname.endsWith("/dashboard") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
            >
              <HomeIcon className="h-6 w-6" /> Dashboard
            </Link>

            <Link
              to="/mcqs"
              onClick={closeSidebar}
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
                ${location.pathname.endsWith("/mcqs") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
            >
              <DocumentIcon className="h-6 w-6" /> Generated MCQs
            </Link>

            <Link
              to="/files"
              onClick={closeSidebar}
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
                ${location.pathname.endsWith("/files") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
            >
              <DocumentDuplicateIcon className="h-6 w-6" /> All Files
            </Link>

            <Link
              to="/settings"
              onClick={closeSidebar}
              className={`flex items-center gap-3 p-3 text-lg font-normal rounded-lg 
                ${location.pathname.endsWith("/settings") ? "text-blue-500 font-semibold" : "text-gray-700"}`}
            >
              <Cog6ToothIcon className="h-6 w-6" /> Settings
            </Link>

            <div className="border-t border-gray-400 border-dotted my-4"></div>

            <Link
              to="#"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 text-sm font-normal text-gray-600"
            >
              <CurrencyDollarIcon className="h-6 w-6" /> Ai Credits: 10 / 100
            </Link>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white shadow-lg">
            <h5 className="mb-2 font-bold">Want More?</h5>
            <p className="mb-4 text-sm opacity-90">
              Get access to exclusive features and premium support.
            </p>
            <Link
              to="/manage-subscription"
              color="white"
              onClick={closeSidebar}
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 text-sm rounded-full"
            >
              <ArrowUpCircleIcon className="h-6 w-6" /> Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarWithBurgerMenu;