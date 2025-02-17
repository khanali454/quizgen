import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://source.unsplash.com/1000x500/?technology,ai")
      .then((res) => setImageUrl(res.url))
      .catch((err) => console.error("Image Load Error:", err));
  }, []);

  return (
    <section className="py-16 px-6 lg:px-24 max-w-6xl mx-auto text-gray-900">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">About AI MCQs Generator</h1>
        <p className="mt-3 text-lg text-gray-600">
          Revolutionizing learning with AI-powered MCQs.
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-12 flex justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="About AI MCQs Generator"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-2xl"></div>
        )}
      </div>

      {/* About Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            AI MCQs Generator is an innovative platform designed to help students, educators, and professionals create high-quality multiple-choice questions (MCQs) using artificial intelligence.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to provide an AI-driven solution that simplifies the process of generating MCQs, making education more accessible and personalized for learners worldwide.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-300 rounded-2xl shadow-md transition hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🚀 AI-Powered</h3>
            <p className="text-gray-600">
              Generate MCQs instantly using advanced AI algorithms.
            </p>
          </div>
          <div className="p-6 border border-gray-300 rounded-2xl shadow-md transition hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📚 Subject Variety</h3>
            <p className="text-gray-600">
              Create MCQs from any subject, topic, or difficulty level.
            </p>
          </div>
          <div className="p-6 border border-gray-300 rounded-2xl shadow-md transition hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📝 Easy to Use</h3>
            <p className="text-gray-600">
              Simple, user-friendly interface for students & teachers.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Us in Transforming Education</h2>
        <p className="text-gray-700 mb-6">
          Experience AI-powered learning like never before.
        </p>
        <Link
          to="/register"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
