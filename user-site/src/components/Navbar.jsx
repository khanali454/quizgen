import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";

// Navbar for guest User
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsLanguageMenuOpen(false);
  };

  console.log("base url : ",import.meta.env.VITE_API_BASE_URL)

  const isLoggedIn = () => {
    let token = localStorage.getItem('token');
    if (token == undefined || token == "" || token == null) {
      return false
    } else {
      return true;
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center space-x-4">
            <a href="./" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Sowlf Ai
              </span>
            </a>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-700 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="mr-1">
                  {selectedLanguage === "English" ? "🇺🇸" : "🇸🇦"}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-md py-2 dark:bg-gray-700">
                  <button
                    onClick={() => handleLanguageChange("English")}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <span className="mr-2">🇺🇸</span>
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("Arabic")}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <span className="mr-2">🇸🇦</span>
                    العربية
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center lg:order-2">

            {/* if user is not logged in*/}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="hidden md:block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2  lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                >
                  Get started
                </Link>
              </>
            )}


            {/* when user is logged in */}

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
              >
                Dashboard
              </Link>
            )}



            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`bg-white absolute top-full left-0 w-full shadow-md transition-all duration-300 dark:bg-gray-800 ${menuOpen ? "block" : "hidden"
              } lg:static lg:block lg:w-auto lg:shadow-none`}
            id="mobile-menu"
          >
            <ul className="flex flex-col text-white mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {[
                { name: "Home", path: "/" },
                { name: "Company", path: "/About-Us" },
                { name: "Blogs", path: "/blogs" },
                // { name: "Features", path: "/features" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;