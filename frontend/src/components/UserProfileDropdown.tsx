import { useAuthStore } from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { UserRoundCog, LogOut, Moon, Settings, Sun, Truck } from "lucide-react";
import noProfile from "../assets/noProfile.png";
import { useEffect } from "react";

const UserProfileDropdown = () => {
  const { authUser, logout, checkAuth, login, signup } = useAuthStore();
  const { theme, changeTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth, login, signup]);

  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end ms-1 ">
        <div tabIndex={0} role="button" className="btn ">
          <div className="avatar">
            <div className="w-11 rounded-full ring-pink-700 ring-offset-base-100 ring ring-offset-2">
              <img
                src={authUser?.profilePic ? authUser?.profilePic : noProfile}
                className=" bg"
              />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 border border-base-300 rounded-box z-[1] w-48 p-2 mt-2 shadow "
        >
          {authUser?.role === "admin" && (
            <li>
              <label className=" cursor-pointer ">
                <UserRoundCog /> <Link to={"/admin"}>Admin Panel</Link>
              </label>
            </li>
          )}
          <li>
            <label className=" cursor-pointer ">
              <Truck />
              <Link to={"/history"}>My Orders</Link>
            </label>
          </li>

          <li>
            <label className=" cursor-pointer ">
              <Settings />
              <Link to={"/profile"}>Settings</Link>
            </label>
          </li>
          <li>
            <label className=" cursor-pointer ">
              {theme === true ? (
                <Moon className=" text-blue-600" />
              ) : (
                <Sun className=" text-yellow-500" />
              )}
              <span className="label-text">Theme</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={changeTheme}
                checked={theme}
              />
            </label>
          </li>
          <li>
            <label
              className=" cursor-pointer hover:text-red-600 "
              onClick={logout}
            >
              <LogOut />
              <span>Sign out</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
