import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <section className="py-16 px-6 lg:px-24 max-w-4xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <p className="text-lg text-gray-700 mb-6">
        Welcome to AI MCQs Generator. Your privacy is important to us, and we are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
      </p>

      {/* Last Updated */}
      <p className="text-sm text-gray-500 mb-6">Last updated: February 2025</p>

      {/* Sections */}
      <div className="space-y-10">
        {/* 1. Information We Collect */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p className="text-gray-700">
            When you use AI MCQs Generator, we may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and account credentials.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, device information, and interaction with our platform.</li>
            <li><strong>Generated Content:</strong> MCQs created using our AI tool.</li>
          </ul>
        </div>

        {/* 2. How We Use Your Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700">
            Your data helps us improve our services, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
            <li>Providing AI-powered quiz generation services.</li>
            <li>Enhancing user experience and platform functionality.</li>
            <li>Sending updates, newsletters, and promotional emails (only if you opt-in).</li>
          </ul>
        </div>

        {/* 3. Data Security */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Data Security</h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to protect your data against unauthorized access, alteration, or deletion.
          </p>
        </div>

        {/* 4. Third-Party Sharing */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Third-Party Sharing</h2>
          <p className="text-gray-700">
            We do not sell or share your personal information with third parties except:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
            <li>To comply with legal obligations.</li>
            <li>To protect against fraud or security risks.</li>
            <li>With trusted service providers (e.g., cloud hosting, analytics) under strict confidentiality agreements.</li>
          </ul>
        </div>

        {/* 5. Your Rights */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
          <p className="text-gray-700">
            As a user, you have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request deletion of your data.</li>
            <li>Opt-out of marketing communications.</li>
          </ul>
        </div>

        {/* 6. Changes to This Policy */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
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
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
          hover:bg-indigo-700 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
