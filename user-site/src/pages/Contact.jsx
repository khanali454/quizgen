import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just showing confirmation
    setIsSubmitted(true);
    // In a real-world scenario, form data would be sent to an API or email service.
    console.log(formData);
  };

  return (
    <section className="py-16 px-6 lg:px-24 max-w-6xl mx-auto text-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-lg text-gray-600">
          We'd love to hear from you! Feel free to reach out with any questions.
        </p>
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any queries or want to learn more about our services, don't hesitate to reach out. We're here to help!
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">123 AI Street, Tech City, AI World</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">contact@aiexample.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Send Us a Message</h2>
          {isSubmitted ? (
            <div className="p-6 border border-gray-300 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600">Thank you!</h3>
              <p className="text-gray-600">Your message has been sent successfully. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  rows="6"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Link
          to="/"
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-all"
        >
          Go Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Contact;
