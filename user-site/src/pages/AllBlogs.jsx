import React, { useState } from "react";

const AllBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  // Get current blogs for the page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <section className="py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-14">
          Our Popular Blogs
        </h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {currentBlogs.map((blog, index) => (
            <div
              key={index}
              className="group cursor-pointer border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
            >
              <div className="mb-6">
                <img
                  src={blog.image}
                  alt={blog.author + " image"}
                  className="rounded-lg w-full object-cover h-52"
                />
              </div>
              <div>
                <h4 className="text-gray-900 font-medium leading-8 mb-4">
                  {blog.title}
                </h4>
                <div className="flex items-center justify-between font-medium text-sm">
                  <h6 className="text-gray-500">By {blog.author}</h6>
                  <span className="text-indigo-600">{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
            disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ←
          </button>

          {/* Page Number Display */}
          <span className="text-lg font-semibold bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-md">
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
            disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

// Sample Blog Data
const blogData = [
  { image: "https://pagedone.io/asset/uploads/1696244553.png", title: "Fintech 101: Exploring the Basics of Electronic Payments", author: "Harsh C.", date: "2 years ago" },
  { image: "https://pagedone.io/asset/uploads/1696244579.png", title: "From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech", author: "John D.", date: "2 years ago" },
  { image: "https://pagedone.io/asset/uploads/1696244619.png", title: "Fintech Solutions for Student Loans: Easing the Burden of Education Debt", author: "Alexa H.", date: "2 years ago" },
  { image: "https://pagedone.io/asset/uploads/1696244553.png", title: "How AI is Shaping the Future of Financial Services", author: "Emily R.", date: "1 year ago" },
  { image: "https://pagedone.io/asset/uploads/1696244579.png", title: "Cryptocurrency Basics: A Beginner’s Guide", author: "Michael S.", date: "1 year ago" },
  { image: "https://pagedone.io/asset/uploads/1696244619.png", title: "Neobanks: The Digital-Only Banking Revolution", author: "Sarah W.", date: "1 year ago" },
  { image: "https://pagedone.io/asset/uploads/1696244553.png", title: "How Blockchain is Disrupting Traditional Banking", author: "Daniel T.", date: "1 year ago" },
  { image: "https://pagedone.io/asset/uploads/1696244579.png", title: "Robo-Advisors: The Future of Investment Management?", author: "Sophia L.", date: "1 year ago" },
  { image: "https://pagedone.io/asset/uploads/1696244619.png", title: "Digital Payments: Trends and Future Predictions", author: "Chris B.", date: "6 months ago" },
  { image: "https://pagedone.io/asset/uploads/1696244553.png", title: "Open Banking: What It Means for Consumers", author: "Olivia P.", date: "6 months ago" },
  { image: "https://pagedone.io/asset/uploads/1696244579.png", title: "Buy Now, Pay Later: Pros and Cons Explained", author: "James K.", date: "6 months ago" },
  { image: "https://pagedone.io/asset/uploads/1696244619.png", title: "The Rise of Contactless Payments in a Post-Pandemic World", author: "Liam N.", date: "6 months ago" },
  { image: "https://pagedone.io/asset/uploads/1696244553.png", title: "Mobile Wallets: Are They Safe to Use?", author: "Emma D.", date: "3 months ago" },
  { image: "https://pagedone.io/asset/uploads/1696244579.png", title: "The Future of Biometric Authentication in Fintech", author: "Noah W.", date: "3 months ago" },
];

export default AllBlogs;
