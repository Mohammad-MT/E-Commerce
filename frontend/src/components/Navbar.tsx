import { Heart, ShoppingCart } from "lucide-react";

import EcommerceLogo from "../assets/Shopping2.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import { useCartStore } from "../store/useCartStore";
import UserProfileDropdown from "./UserProfileDropdown";
import DrawerSidebar from "./DrawerSidebar";
import SearchNav from "./SearchNav";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { itemCount } = useCartStore();
  const cartCount = itemCount();

  return (
    <div className="  flex justify-center  pt-4 mx-1 ">
      <div className=" navbar max-w-6xl flex justify-between transition-all bg-base-200 rounded-xl border border-base-300 shadow-md hover:shadow-xl duration-700 z-20 px-3  ">
        <Link to={"/"}>
          <div className="flex cursor-pointer">
            <div>
              <img src={EcommerceLogo} alt="Logo" className=" max-w-8 me-1" />
            </div>
            <span className=" text-nowrap text-lg font-bold">E-Commerce</span>
          </div>
        </Link>
        <div className=" justify-center items-center hidden md:flex gap-6">
          <Link to={"/"}>
            <div className=" flex flex-nowrap h-12  relative items-center hover:text-pink-700 hover:scale-105 cursor-pointer  duration-300">
              <div>Home</div>
            </div>
          </Link>
          <Link to={"/Products"}>
            <div className="flex items-center h-12 relative hover:text-pink-700 hover:scale-105 cursor-pointer duration-300">
              <div>Products</div>
            </div>
          </Link>

          {/* <div className=" dropdown">
            <div
              className="flex items-center h-12 relative hover:text-pink-700 hover:scale-105 cursor-pointer transition-all duration-300"
              tabIndex={0}
              role="button"
            >
              <div>Categories </div>
              <ChevronDown size={16} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 border border-base-300 rounded-box z-[1] w-96 h-52 p-2 mt-2  shadow   "
            >
              <li>
                <Link to={"/category/electronics"}>Electronics</Link>
              </li>
              <li>
                <Link to={"/category/fashion"}>Fashion</Link>
              </li>
              <li>
                <Link to={"/category/home-appliances"}>Home Appliances</Link>
              </li>
              <li>
                <Link to={"/category/books"}>Books</Link>
              </li>
              <li>
                <Link to={"/category/toys"}>Toys</Link>
              </li>
            </ul>
          </div> */}
          <Link to={"/about"}>
            <div className="flex items-center h-12 relative hover:text-pink-700 hover:scale-105 cursor-pointer  duration-300">
              <div>About</div>
            </div>
          </Link>
          <Link to={"/contact"}>
            <div className="flex items-center h-12 relative hover:text-pink-700 hover:scale-105 cursor-pointer  duration-300">
              <div>Contact</div>
            </div>
          </Link>
        </div>
        <div className="justify-center items-center gap-3 hidden sm:flex">
          <SearchNav />
          <span className=" hover:text-pink-700  cursor-pointer">
            <Heart />
          </span>
          <Link to={"/cart"}>
            <span className=" hover:text-pink-700  cursor-pointer relative">
              {cartCount > 0 && (
                <div className=" absolute badge bg-pink-700  text-gray-200 bottom-4 start-2 ">
                  {cartCount}
                </div>
              )}
              <ShoppingCart />
            </span>
          </Link>
          {authUser ? (
            <UserProfileDropdown />
          ) : (
            <Link
              to={"/login"}
              className="btn btn-neutral bg-black text-white ms-2 px-5"
            >
              Login
            </Link>
          )}
        </div>
        <div className="flex sm:hidden ">
          <DrawerSidebar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
