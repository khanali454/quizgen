import { Link } from "react-router-dom";
import SidebarWithBurgerMenu from "../../components/SidebarWithBurgerMenu";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw, FileText, Trash2 } from "lucide-react"; 
import { CameraIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  const [profile, setProfile] = useState({
    fullName: "Devid Jhon",
    phone: "+990 3343 7865",
    email: "devidjond45@gmail.com",
    password: "",
    profileImage: null,
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-fit mt-5 bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card: Profile Info */}
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={profile.email}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password to update"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">Cancel</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
          </div>
        </div>

        {/* Right Card: Profile Upload */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Profile Picture</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <CameraIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              className="hidden"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="profile-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Choose File</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
