import { useContext } from "react";
import { GeneralInfoContext } from "../layouts/GeneralInfoContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const general_info = useContext(GeneralInfoContext);

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
          {/* Company Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Company
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/About-Us"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/Contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Social
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={general_info?.website_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href={general_info?.website_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={general_info?.website_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              
              <li>
                <Link
                  to="/Terms-Conditions"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for better spacing on larger screens */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                © {new Date().getFullYear()}{" "}
                <a
                  href="/"
                  className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {general_info?.website_name || "Tutor Sowlf"}™
                </a>
                . All Rights Reserved.
              </span>
            </div>

            <div className="flex space-x-6">
              <a
                href={general_info?.website_facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={general_info?.website_twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href={general_info?.website_linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;