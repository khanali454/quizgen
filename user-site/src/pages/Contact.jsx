import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GeneralInfoContext } from "../layouts/GeneralInfoContext";
import Processor from '../components/Processor';

const Contact = () => {
  const generalInfo = useContext(GeneralInfoContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const toastId = toast.loading('Sending your message...');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/guest/contact`,
        formData
      );

      if (response.data.status) {
        toast.success(response.data.msg || 'Message sent successfully!', { id: toastId });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.msg || 'Failed to send message', { id: toastId });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 
                      error.message || 
                      'Failed to send message. Please try again.';
      
      toast.error(errorMsg, { id: toastId });

      // Handle validation errors
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(errors => {
          errors.forEach(err => toast.error(err));
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-16 px-6 lg:px-24 max-w-6xl mx-auto text-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-lg text-gray-600">
          We'd love to hear from you! Feel free to reach out with any questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any queries or want to learn more about our services, don't hesitate to reach out. We're here to help!
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">
                {generalInfo?.website_address || "Makkah, Saudi Arabia"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">
                {generalInfo?.website_email || "owner@website.com"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">
                {generalInfo?.website_phone || "+123 456 7890"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Send Us a Message</h2>
          
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all relative"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <Processor widthValue={4} heightValue={4} />
                    <span className="ml-2">Sending...</span>
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
         
        </div>
      </div>
    </section>
  );
};

export default Contact;