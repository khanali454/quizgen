import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    websiteName: '',
    websiteLogo: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg",
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
    },
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    openAIKey: '',
  });

  // Handle input changes for form fields
  const handleInputChange = (e, field, section = '') => {
    const { name, value } = e.target;
    if (section) {
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [name]: value,
        },
      });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };

  // Handle file upload for website logo
  const handleFileChange = (e) => {
    setSettings({ ...settings, websiteLogo: e.target.files[0] });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('System Settings Submitted:', settings);
    // Handle the submission logic here
  };

  return (
    <>
      <Breadcrumb pageName="System Settings" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* General Settings Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-xl">System Settings</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                {/* Website Details Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-black dark:text-white text-lg mb-3">Website Details</h4>
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">Website Name</label>
                      <input
                        type="text"
                        name="websiteName"
                        value={settings.websiteName}
                        onChange={handleInputChange}
                        placeholder="Enter website name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">Website Logo</label>
                      {settings.websiteLogo ? (
                        <div className="mb-4">
                          <img
                            src={settings.websiteLogo} // For local file preview
                            alt="Website Logo"
                            className="w-24 h-24 object-contain mb-2"
                          />
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, websiteLogo: null })}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Remove Logo
                          </button>
                        </div>
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Info Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-black dark:text-white text-lg mb-3">Contact Information</h4>
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        placeholder="Enter contact email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={settings.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter contact phone number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-black dark:text-white text-lg mb-3">Address</h4>
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Social Links Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-black dark:text-white text-lg mb-3">Social Links</h4>
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/3">
                      <label className="mb-2.5 block text-black dark:text-white">Facebook</label>
                      <input
                        type="url"
                        name="facebook"
                        value={settings.socialLinks.facebook}
                        onChange={(e) => handleInputChange(e, 'facebook', 'socialLinks')}
                        placeholder="Enter Facebook URL"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/3">
                      <label className="mb-2.5 block text-black dark:text-white">Twitter</label>
                      <input
                        type="url"
                        name="twitter"
                        value={settings.socialLinks.twitter}
                        onChange={(e) => handleInputChange(e, 'twitter', 'socialLinks')}
                        placeholder="Enter Twitter URL"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/3">
                      <label className="mb-2.5 block text-black dark:text-white">LinkedIn</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={settings.socialLinks.linkedin}
                        onChange={(e) => handleInputChange(e, 'linkedin', 'socialLinks')}
                        placeholder="Enter LinkedIn URL"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* SMTP Settings Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-black dark:text-white text-lg mb-3">SMTP Settings</h4>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">SMTP Host</label>
                      <input
                        type="text"
                        name="smtpHost"
                        value={settings.smtpHost}
                        onChange={handleInputChange}
                        placeholder="Enter SMTP Host"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">SMTP Port</label>
                      <input
                        type="number"
                        name="smtpPort"
                        value={settings.smtpPort}
                        onChange={handleInputChange}
                        placeholder="Enter SMTP Port"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">SMTP Username</label>
                      <input
                        type="text"
                        name="smtpUser"
                        value={settings.smtpUser}
                        onChange={handleInputChange}
                        placeholder="Enter SMTP Username"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">SMTP Password</label>
                      <input
                        type="password"
                        name="smtpPassword"
                        value={settings.smtpPassword}
                        onChange={handleInputChange}
                        placeholder="Enter SMTP Password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* OpenAI API Key Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-black dark:text-white text-lg mb-3">OpenAI API Key</h4>
                  <input
                    type="text"
                    name="openAIKey"
                    value={settings.openAIKey}
                    onChange={handleInputChange}
                    placeholder="Enter OpenAI API Key"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Submit Button */}
                <button className="w-full p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemSettings;
