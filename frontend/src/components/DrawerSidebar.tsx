import UserProfileDropdown from "./UserProfileDropdown";
import { Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const DrawerSidebar = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-circle swap swap-rotate"
        >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-fit p-2">
          {/* Sidebar content here */}
          <div className="flex flex-row-reverse mb-4">
            {authUser ? (
              <UserProfileDropdown />
            ) : (
              <Link
                to={"/login"}
                className="btn btn-neutral bg-black text-white  ms-1 me-3 w-fit"
              >
                Login
              </Link>
            )}
            <label className="input input-bordered rounded-3xl flex items-center gap-1">
              <input type="text" className="grow w-full" placeholder="Search" />
              <Search className=" hover:cursor-pointer hover:text-blue-400" />
            </label>
          </div>
          <li>
            <Link to={"/cart"}>ShopCart</Link>
          </li>
          <li>
            <Link to={"/favorite"}>Favorite</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerSidebar;
