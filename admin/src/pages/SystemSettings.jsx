import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
import Processor from '../common/Processor';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    website_name: '',
    website_logo: '',
    website_email: '',
    website_phone: '',
    website_address: '',
    website_facebook: '',
    website_twitter: '',
    website_linkedin: '',
    website_smtp_host: '',
    website_smtp_port: '',
    website_smtp_username: '',
    website_smtp_password: '',
    website_openai_api_key: '',
    website_moyassar_publishible_key: '',
    website_moyassar_secret_key: '',
  });

  const [loading, setLoading] = useState(true);
  const [logoFile, setLogoFile] = useState();
  const [processing, setProcessing] = useState(false);
  const token = localStorage.getItem('adminAuthToken');

  // Load general settings
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/general-settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response?.data?.status) {
          setSettings(response?.data.general_settings);
        } else {
          toast.error(response?.data?.msg);
        }
      })
      .catch((error) => {
        toast.error('Oops! Got an error: ' + error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload for website logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setSettings((prev) => ({ ...prev, website_logo: URL.createObjectURL(file) }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData();
    Object.keys(settings).forEach((key) => {
      formData.append(key, settings[key]);
    });

if (logoFile) {
  formData.append('logo', logoFile);
}else{
  formData.delete('logo');
}


    try {
      // Update general settings
      const updateResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/general-settings?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (updateResponse.data?.status) {
        toast.success('Settings updated successfully!');
      } else {
        toast.error(updateResponse.data?.msg || 'Failed to update settings.');
      }
    } catch (error) {
      toast.error('Error updating settings: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="System Settings" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {loading ? (
            <Loader />
          ) : (
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
                          name="website_name"
                          defaultValue={settings.website_name}
                          onChange={handleInputChange}
                          placeholder="Enter website name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">Website Logo</label>
                        {settings.website_logo ? (
                          <div className="mb-4">
                            <img
                              src={settings.website_logo}
                              alt="Website Logo"
                              className="w-24 h-24 object-contain mb-2"
                            />
                            <input
                              type="file"
                              name='logo'
                              accept="image/*"
                              onChange={handleFileChange}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        ) : (
                          <input
                            type="file"
                            name='logo'
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
                          name="website_email"
                          defaultValue={settings.website_email}
                          onChange={handleInputChange}
                          placeholder="Enter contact email"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">Phone Number</label>
                        <input
                          type="text"
                          name="website_phone"
                          defaultValue={settings.website_phone}
                          onChange={handleInputChange}
                          placeholder="Enter contact phone number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="mb-6">
                    <h4 className="font-medium text-black dark:text-white text-lg mb-3">Address</h4>
                    <input
                      type="text"
                      name="website_address"
                      defaultValue={settings.website_address}
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
                          name="website_facebook"
                          defaultValue={settings.website_facebook}
                          onChange={handleInputChange}
                          placeholder="Enter Facebook URL"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">Twitter</label>
                        <input
                          type="url"
                          name="website_twitter"
                          defaultValue={settings.website_twitter}
                          onChange={handleInputChange}
                          placeholder="Enter Twitter URL"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">LinkedIn</label>
                        <input
                          type="url"
                          name="website_linkedin"
                          defaultValue={settings.website_linkedin}
                          onChange={handleInputChange}
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
                          name="website_smtp_host"
                          defaultValue={settings.website_smtp_host}
                          onChange={handleInputChange}
                          placeholder="Enter SMTP Host"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">SMTP Port</label>
                        <input
                          type="number"
                          name="website_smtp_port"
                          defaultValue={settings.website_smtp_port}
                          onChange={handleInputChange}
                          placeholder="Enter SMTP Port"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">SMTP Username</label>
                        <input
                          type="text"
                          name="website_smtp_username"
                          defaultValue={settings.website_smtp_username}
                          onChange={handleInputChange}
                          placeholder="Enter SMTP Username"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">SMTP Password</label>
                        <input
                          type="password"
                          name="website_smtp_password"
                          defaultValue={settings.website_smtp_password}
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
                      name="website_openai_api_key"
                      defaultValue={settings.website_openai_api_key}
                      onChange={handleInputChange}
                      placeholder="Enter OpenAI API Key"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Payment Gateway Keys Section */}
                  <div className="mb-6">
                    <h4 className="font-medium text-black dark:text-white text-lg mb-3">Payment Gateway Keys</h4>
                    <div className="flex flex-col gap-6 xl:flex-row p-3 py-6">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">Moyassar Publishable Key</label>
                        <input
                          type="text"
                          name="website_moyassar_publishible_key"
                          defaultValue={settings.website_moyassar_publishible_key}
                          onChange={handleInputChange}
                          placeholder="Enter Moyassar Publishable Key"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">Moyassar Secret Key</label>
                        <input
                          type="text"
                          name="website_moyassar_secret_key"
                          defaultValue={settings.website_moyassar_secret_key}
                          onChange={handleInputChange}
                          placeholder="Enter Moyassar Secret Key"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={processing}
                  >
                    {processing ? (
                      <div className="flex items-center justify-center">
                        <Processor borderColorValue="white" widthValue={4} heightValue={4} />
                        <span className="ml-2">Saving...</span>
                      </div>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SystemSettings;