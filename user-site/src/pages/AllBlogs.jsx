import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeLoader from "../components/HomeLoader";
import { AlertCircle } from "lucide-react"; // icon for no data

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = (page) => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/guest/blogs?page=${page}`)
      .then((response) => {
        if (response.data.status) {
          setBlogs(response.data.blogs.data || []);
          setCurrentPage(response.data.blogs.current_page || 1);
          setTotalPages(response.data.blogs.last_page || 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <section className="py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-14">
          Our Popular Blogs
        </h2>

        {loading ? (
          <HomeLoader />
        ) : blogs.length === 0 ? (
          // if there is no blog ,then show this message
          <div className="flex flex-col items-center justify-center w-full p-6 mt-6 rounded-lg">
            <AlertCircle className="w-10 h-10 text-gray-500" />
            <p className="mt-2 text-sm text-gray-600">No blog was found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group cursor-pointer border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
                >
                  <div className="mb-6">
                    <img
                      src={blog.feature_image}
                      alt={blog.title}
                      className="rounded-lg w-full object-cover h-52"
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-medium leading-8 mb-4">
                      {blog.title}
                    </h4>
                    <div className="flex items-center justify-between font-medium text-sm">
                      <h6 className="text-gray-500">By {blog.author.name}</h6>
                      <span className="text-indigo-600">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-4">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ←
              </button>

              <span className="text-lg font-semibold bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-md">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;