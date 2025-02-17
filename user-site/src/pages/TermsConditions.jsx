import React from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <section className="py-16 px-6 lg:px-24 max-w-4xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>

      <p className="text-lg text-gray-700 mb-6">
        Welcome to AI MCQs Generator! By using our website, you agree to the following Terms & Conditions. Please read them carefully.
      </p>

      {/* Last Updated */}
      <p className="text-sm text-gray-500 mb-6">Last updated: February 2025</p>

      {/* Sections */}
      <div className="space-y-10">
        
        {/* 1. Acceptance of Terms */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using our platform, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </div>

        {/* 2. Use of Services */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Use of Services</h2>
          <p className="text-gray-700">
            You may use AI MCQs Generator for personal or educational purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
            <li>Violate any laws or regulations.</li>
            <li>Use the platform for unauthorized commercial activities.</li>
            <li>Reverse-engineer, modify, or distribute our content without permission.</li>
          </ul>
        </div>

        {/* 3. User Accounts */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
          <p className="text-gray-700">
            If you create an account, you are responsible for keeping your login credentials secure. AI MCQs Generator is not liable for unauthorized account activity.
          </p>
        </div>

        {/* 4. Intellectual Property */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Intellectual Property</h2>
          <p className="text-gray-700">
            All content, including AI-generated quizzes, trademarks, logos, and text, is the property of AI MCQs Generator. Unauthorized use or reproduction is strictly prohibited.
          </p>
        </div>

        {/* 5. Termination of Service */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Termination of Service</h2>
          <p className="text-gray-700">
            We reserve the right to terminate or restrict your access if you violate these Terms & Conditions.
          </p>
        </div>

        {/* 6. Limitation of Liability */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
          <p className="text-gray-700">
            AI MCQs Generator is provided "as is" without warranties of any kind. We are not responsible for any losses, errors, or damages resulting from your use of our platform.
          </p>
        </div>

        {/* 7. Changes to Terms */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms & Conditions at any time. Changes will be posted on this page with a new effective date.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">📩 Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions, feel free to contact us at:{" "}
            <a href="mailto:support@aimcqs.com" className="text-indigo-600 hover:underline">support@aimcqs.com</a>
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-10">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md 
          hover:bg-indigo-700 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default TermsConditions;
