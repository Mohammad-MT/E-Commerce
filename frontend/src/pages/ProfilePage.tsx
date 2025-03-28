import { Camera, Mail, Phone, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

import noImgProf from "../assets/noProfile.png";
import Breadcrumbs from "../components/Breadcrumbs";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile, checkAuth } =
    useAuthStore();

  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file || file.length === 0) return;

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      updateProfile({ profilePic: base64Image });
    };
  };

  useEffect(() => {
    checkAuth();
  }, [authUser]);

  return (
    <div className="min-h-[calc(100vh-24.2rem)]">
      <div className="flex flex-col items-center  max-w-5xl h-full mx-auto ">
        <Breadcrumbs paths={[{ name: "Edit Profile", path: "/profile" }]} />
        <div className="bg-base-200 border border-base-300 rounded-xl w-96 p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || noImgProf}
                alt="Profile"
                className="size-32 rounded-full object-cover p-1 border-4 border-pink-700 shadow-lg "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-3">
            <form className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <input
                  className="px-4 py-2.5 bg-base-200 input border border-base-300 shadow-lg w-full"
                  defaultValue={authUser?.fullname}
                  disabled
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-sm  text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Name
                </div>
                <input
                  className="px-4 py-2.5 bg-base-200 input border border-base-300 shadow-lg w-full"
                  defaultValue={authUser?.username}
                  disabled
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-sm  text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <input
                  className="px-4 py-2.5 bg-base-200 input border border-base-300 shadow-lg w-full"
                  defaultValue={authUser?.email}
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <div className="text-sm  text-gray-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </div>
                <input
                  className="px-4 py-2.5 bg-base-200 input border border-base-300 shadow-lg w-full"
                  defaultValue={authUser?.phone}
                  disabled
                />
              </div>
              {/* <button className="btn btn-neutral bg-black mt-4" disabled>
                Update Profile
              </button> */}
            </form>
          </div>

          <div className="mt-6 rounded-xl p-1">
            <h2 className="text-lg font-medium  mb-4 border-b ">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 ">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Role</span>
                <span>{authUser?.role}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
