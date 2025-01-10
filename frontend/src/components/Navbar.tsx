import { ChevronDown, Heart, LogOut, Search, ShoppingCart } from "lucide-react";

import EcommerceLogo from "../assets/Shopping.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import noProfile from "../assets/noProfile.png";
import { useCartStore } from "../store/useCartStore";
import useThemeStore from "../store/useThemeStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  let cartCount = itemCount();

  const { changeTheme, theme } = useThemeStore();

  return (
    <div className="max-w-6xl mx-auto  pt-1">
      <div className=" navbar flex justify-between bg-base-200 rounded-xl border border-base-300 shadow-xl z-20 px-3 ">
        <Link to={"/"}>
          <div className="flex hover:cursor-pointer">
            <div>
              <img src={EcommerceLogo} alt="Logo" className=" max-w-8 me-1" />
            </div>
            <span className=" text-nowrap text-lg font-bold">E-Commerce</span>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-6">
          <Link to={"/"}>
            <div
              className=" flex flex-nowrap h-12  relative items-center hover:text-pink-700 hover:cursor-pointer"
              id="nav-selector"
            >
              <div>Home</div>
              <div
                className=" absolute w-0 h-1 top-[50px] rounded-xl  bg-pink-700 transition-all duration-500 "
                id="nav-selector-underline"
              ></div>
            </div>
          </Link>
          <div className=" dropdown">
            <div
              className="flex items-center h-12 relative hover:text-pink-700 hover:cursor-pointer"
              id="nav-selector"
              tabIndex={0}
              role="button"
            >
              <div>Shop</div>
              <ChevronDown size={16} />
              <div
                className=" absolute w-0 h-1 top-[50px] rounded-xl  bg-pink-700 transition-all duration-500 "
                id="nav-selector-underline"
              ></div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-96 h-52 p-2 mt-2  shadow   "
            >
              <div className="grid-cols-3 grid">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </div>
            </ul>
          </div>
          <div
            className="flex items-center h-12 relative hover:text-pink-700 hover:cursor-pointer"
            id="nav-selector"
          >
            <div>About</div>
            <div
              className=" absolute w-0 h-1 top-[50px] rounded-xl  bg-pink-700 transition-all duration-500 "
              id="nav-selector-underline"
            ></div>
          </div>
          <div
            className="flex items-center h-12 relative hover:text-pink-700 hover:cursor-pointer"
            id="nav-selector"
          >
            <div>Contact</div>
            <div
              className=" absolute w-0 h-1 top-[50px] rounded-xl  bg-pink-700 transition-all duration-500 "
              id="nav-selector-underline"
            ></div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className=" hover:text-pink-700 hover:cursor-pointer">
            <Search />
          </span>
          <span className=" hover:text-pink-700 hover:cursor-pointer">
            <Heart />
          </span>
          <Link to={"/cart"}>
            <span className=" hover:text-pink-700 hover:cursor-pointer relative">
              {cartCount > 0 && (
                <div className=" absolute badge bg-pink-700  text-gray-200 bottom-4 start-2 ">
                  {cartCount}
                </div>
              )}
              <ShoppingCart />
            </span>
          </Link>
          {authUser ? (
            <div className="dropdown dropdown-bottom dropdown-end ms-1">
              <div tabIndex={0} role="button" className="btn ">
                <div className="avatar">
                  <div className="w-11 rounded-full ring-pink-700 ring-offset-base-100 ring ring-offset-2">
                    <img
                      src={
                        authUser.profilePic ? authUser.profilePic : noProfile
                      }
                    />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 mt-2 shadow"
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
          ) : (
            <Link
              to={"/login"}
              className="btn btn-neutral bg-black text-white ms-2 px-5"
            >
              Login
            </Link>
          )}
          {/* <User /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
