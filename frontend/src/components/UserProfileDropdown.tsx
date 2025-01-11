import { useAuthStore } from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import noProfile from "../assets/noProfile.png";

const UserProfileDropdown = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, changeTheme } = useThemeStore();

  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end ms-1">
        <div tabIndex={0} role="button" className="btn ">
          <div className="avatar">
            <div className="w-11 rounded-full ring-pink-700 ring-offset-base-100 ring ring-offset-2">
              <img
                src={authUser?.profilePic ? authUser.profilePic : noProfile}
              />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 border border-base-300 rounded-box z-[1] w-48 p-2 mt-2 shadow"
        >
          <li>
            <label className="label cursor-pointer ">
              <span className="label-text">Dark Mode</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={changeTheme}
                checked={theme}
              />
            </label>
          </li>
          <li>
            <Link to={"/profile"}>Edit Profile</Link>
          </li>
          <li>
            <a>History</a>
          </li>
          <li>
            <label
              className="label cursor-pointer hover:text-red-600 "
              onClick={logout}
            >
              <span>Log out</span>
              <LogOut />
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
