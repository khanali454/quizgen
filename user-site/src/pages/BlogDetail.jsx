import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import HomeLoader from "../components/HomeLoader";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/guest/blogs/${id}`)
      .then((response) => {
        if (response.data?.status) {
          setBlog(response.data.blog);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <HomeLoader />;
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-6 mt-6 rounded-lg">
        <AlertCircle className="w-10 h-10 text-gray-500" />
        <p className="mt-2 text-sm text-gray-600">No blog was found</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 lg:px-24 max-w-4xl mx-auto">
      {/* Blog Cover Image */}
      <div className="mb-8">
        <img
          src={blog.feature_image}
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
            src="https://i.pravatar.cc/40"
            alt={blog.author.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-medium text-gray-700">
            {blog.author.name}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          • {new Date(blog.created_at).toDateString()}
        </span>
      </div>

      {/* Blog Content (Render HTML) */}
      <article
        className="text-lg leading-8 text-gray-700 blog prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></article>

      {/* Back to All Blogs */}
      <div className="mt-10">
        <Link
          to="/blogs"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md 
          hover:bg-indigo-700 transition-all"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default BlogDetail;
