
import { useEffect, useState } from "react";
import HomeLoader from "../../components/HomeLoader";
import Processor from "../../components/Processor";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../../layouts/LoggedUserContext";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const [t, i18n] = useTranslation("global"); // translations handling

  const { loggedUser, updateUser } = useUser();
  const [processingProfile, setProcessingProfile] = useState(false);
  const [processingPic, setProcessingPic] = useState(false);
  const [removing, setRemoving] = useState(false); // for profile removing process - state ...
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [password_type, setPasswordType] = useState("password");
  const [choosen_file, setChoosenFile] = useState(null);


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        updateUser(response?.data);
      })
      .catch((error) => {
        toast.error(t("Error in fetching user"));
      }).finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProcessingProfile(true);

    const formData = new FormData(e.target);
    if (formData.get('password')) {
      formData.append('password_confirmation', formData.get('password'));
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/update/profile?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.msg);
      const updatedUser = { ...loggedUser, ...response.data.user };
      updateUser(updatedUser);
      setPassword('');
    } catch (error) {
      console.log("error :", error);
      toast.error(error.response?.data?.msg || t('Failed to update profile'));
    } finally {
      setProcessingProfile(false);
    }
  };

  const handleProfilePicSubmit = async (e) => {
    e.preventDefault();
    setProcessingPic(true);
    const formData = new FormData();
    const fileInput = e.target.querySelector('input[type="file"]');

    if (!fileInput.files.length) {
      toast.error(t("Please select a profile picture"));
      setProcessingPic(false);
      return;
    }

    formData.append('profile_picture', fileInput.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/update/profile-pic?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success(response.data.msg);
      updateUser({ ...loggedUser, profile_picture: response.data.profile_picture });
    } catch (error) {
      console.log("error : ", error);
      toast.error(error.response?.data?.msg || t("Failed to update profile picture"));
    } finally {
      setProcessingPic(false);
    }
  };

  // remove profile picture

  const removeProfilePicture = () => {
    setRemoving(true);
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/delete/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response?.data?.status) {
        toast.success(response?.data?.msg);
        updateUser({ ...loggedUser, profile_picture: null });
      } else {
        toast.error(response?.data?.msg);
      }
    }).finally(() => {
      setRemoving(false);
      setRefresh(!refresh);
    }).catch((error) => {
      toast.error(error?.response?.data?.msg || t("Unexpected error has occured"));
    });

  }

  return (
    <div className="min-h-fit mt-5 flex justify-center px-2">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <HomeLoader />
        ) : (
          <>
            {/* Left Card: Edit Profile Info */}
            <form onSubmit={handleProfileSubmit} className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">{t("Your Profile")}</h2>
              <div className="space-y-4">
                {/* full name field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("Full Name")}</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={loggedUser?.name}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                {/* phone number field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("Phone Number")}</label>
                  <input
                    type="text"
                    name="phone_number"
                    defaultValue={loggedUser?.phone_number}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"

                  />
                </div>
                {/* email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("Email Address")}</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={loggedUser?.email}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"

                  />
                </div>
                {/* password field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("Password")}</label>
                  <div className="relative border rounded-md border-gray-400 mt-1">
                    <input
                      type={password_type}
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md outline-none py-2 px-3 pr-12 text-sm focus:border-indigo-500 focus:bg-white focus:shadow"
                      placeholder="············"
                    />
                    <button type="button" className="absolute rounded-tr-md rounded-br-md top-0 right-0 h-full px-3 bg-blue-50"
                      onClick={() => {
                        password_type == "password" ? setPasswordType("text") : setPasswordType("password")
                      }}>
                      {password_type == "password" ? (
                        <EyeOff className="w-[20px] h-[20px] text-gray-500" />
                      ) : (
                        <Eye className="w-[20px] h-[20px] text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                {/* address field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("Address")}</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={loggedUser?.address}
                    placeholder="Enter address"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button type="submit" className="px-4 py-2 flex items-center justify-center bg-blue-600 text-white rounded-md cursor-pointer" disabled={processingProfile}>
                  {processingProfile ? (<>
                    <Processor widthValue={4} heightValue={4} borderColorValue="white" /> <span className="ml-2">{t("Saving")}...</span>
                  </>) : (<>{t("Save")}</>)}
                </button>
              </div>
            </form>

            {/* Right Card: Profile Upload */}
            <div className="">
              <div className="rounded-sm bg-white shadow-default">
                <div className="border-b py-4 px-7 border-gray-200">
                  <h3 className="font-medium text-black">
                    {t("Your Photo")}
                  </h3>
                </div>
                <div className="p-7">
                  <form onSubmit={handleProfilePicSubmit}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full overflow-hidden">
                        <img
                          src={(loggedUser?.profile_picture && loggedUser?.profile_picture != null)
                            ? loggedUser?.profile_picture
                            : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/public/default-profile.jpg`}
                          alt="User"
                        />
                      </div>
                      <div>
                        <span className="mb-1.5 text-black ">
                         {t("Edit your photo")}
                        </span>
                        <span className="flex gap-2.5">
                          {(loggedUser?.profile_picture && loggedUser?.profile_picture != null) && (
                            <button type='button' className={`text-sm hover:text-primary flex items-center`} onClick={removeProfilePicture}>
                              {removing ? (<><Processor widthValue={4} heightValue={4} /> <span className='ml-2'>{t("Removing")}..</span></>) : (
                                <>{t("Remove profile")}</>
                              )}
                            </button>
                          )}

                        </span>
                      </div>
                    </div>

                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => { setChoosenFile(e.target.files[0]) }}
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3 h-[240px] relative overflow-hidden">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>

                        {!choosen_file ? (<>
                          <p>
                            <span className="text-primary">{t("Click to upload")}</span>
                          </p>
                          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(<>{t("max 2MB, preferred 100 X 100px")}</>)</p>
                        </>) : (
                          <div className="w-full h-auto absolute top-0 left-0">
                            <img className="object-cover w-full h-auto" src={URL.createObjectURL(choosen_file)} />
                          </div>
                        )}

                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">

                      <button
                        className="px-4 py-2 flex items-center justify-center bg-blue-600 text-white rounded-md cursor-pointer"
                        type="submit"
                        disabled={processingPic}
                      >
                        {processingPic ? (
                          <div className="flex items-center justify-center">
                            <Processor borderColorValue="white" widthValue={4} heightValue={4} />
                            <span className="ml-2">{t("Saving")}...</span>
                          </div>
                        ) : (
                          <>{t("Save")}</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  );
}
