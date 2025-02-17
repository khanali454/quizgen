import React from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { blogId } = useParams();
  const blog = blogData[blogId];

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-red-500">Blog not found!</h2>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 lg:px-24 max-w-4xl mx-auto">
      {/* Blog Cover Image */}
      <div className="mb-8">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

      {/* Author & Date */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40" // Dummy author image
            alt={blog.author}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-medium text-gray-700">{blog.author}</span>
        </div>
        <span className="text-gray-500 text-sm">• {blog.date}</span>
      </div>

      {/* Blog Content */}
      <article className="text-lg leading-8 text-gray-700">
        <p className="mb-6">
          {blog.intro}
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
          {blog.section1.title}
        </h2>
        <p className="mb-4">{blog.section1.content}</p>
        <img
          src={blog.section1.image}
          alt="Blog section"
          className="rounded-lg shadow-md mb-6 w-full"
        />

        <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
          {blog.section2.title}
        </h2>
        <p className="mb-4">{blog.section2.content}</p>
        <img
          src={blog.section2.image}
          alt="Blog section"
          className="rounded-lg shadow-md mb-6 w-full"
        />

        <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
          Conclusion
        </h2>
        <p className="mb-4">{blog.conclusion}</p>
      </article>

      {/* Back to All Blogs */}
      <div className="mt-10">
        <Link
          to="/all-blogs"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
          hover:bg-indigo-700 transition-all"
        >
          ← Back to Blogs
        </Link>
      </div>
    </section>
  );
};

// Sample Blog Data
const blogData = [
  {
    image: "https://pagedone.io/asset/uploads/1696244553.png",
    title: "Fintech 101: Exploring the Basics of Electronic Payments",
    author: "Harsh C.",
    date: "2 years ago",
    intro:
      "Financial technology, or Fintech, has revolutionized how we handle money. From digital wallets to cryptocurrency, the landscape of finance is evolving rapidly.",
    section1: {
      title: "The Rise of Digital Payments",
      content:
        "Over the past decade, digital payments have become the norm. Services like PayPal, Apple Pay, and Google Pay have made transactions seamless and secure.",
      image: "https://source.unsplash.com/800x400/?digital-payment",
    },
    section2: {
      title: "How Secure Are Electronic Transactions?",
      content:
        "Security in electronic payments is critical. Encryption, biometric authentication, and blockchain technology help protect users from fraud.",
      image: "https://source.unsplash.com/800x400/?cybersecurity",
    },
    conclusion:
      "The future of Fintech is promising, with AI-driven banking and blockchain advancements leading the way. The key is ensuring security and accessibility for all users.",
  },
  {
    image: "https://pagedone.io/asset/uploads/1696244579.png",
    title: "Cryptocurrency Basics: A Beginner’s Guide",
    author: "John D.",
    date: "1 year ago",
    intro:
      "Cryptocurrency has emerged as a disruptive force in the financial industry. Bitcoin, Ethereum, and thousands of altcoins offer new opportunities and challenges.",
    section1: {
      title: "Understanding Blockchain Technology",
      content:
        "Cryptocurrencies operate on blockchain technology, a decentralized ledger that ensures transparency and security.",
      image: "https://source.unsplash.com/800x400/?blockchain",
    },
    section2: {
      title: "Investing in Crypto: Risks and Rewards",
      content:
        "Crypto investments can yield high returns, but volatility makes them risky. Proper research and risk management are essential.",
      image: "https://source.unsplash.com/800x400/?bitcoin",
    },
    conclusion:
      "While cryptocurrency offers immense potential, understanding the risks and staying informed is crucial for investors and enthusiasts.",
  },
];

export default BlogDetail;
