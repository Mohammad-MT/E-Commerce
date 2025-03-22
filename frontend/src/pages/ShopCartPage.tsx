import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import CartTable from "../components/CartTable";
import CheckOut from "../components/CheckOut";
import { useCartStore } from "../store/useCartStore";

const ShopCartPage = () => {
  const { Cart } = useCartStore();

  return (
    <div className="min-h-[calc(100vh-24.2rem)]   px-5 ">
      <div className=" flex flex-col items-center justify-center">
        <div className="max-w-5xl h-full w-full ">
          <Breadcrumbs newDirectory="Cart" />
          {Cart.length > 0 ? (
            <div className=" w-full flex justify-between  flex-col lg:flex-row ">
              <CartTable />
              <div className="flex justify-end">
                <CheckOut />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <h2 className="text-2xl font-semibold mb-4">
                Your cart is currently empty.
              </h2>
              <p className="text-center mb-6">
                Browse our categories and discover our best deals!
              </p>
              <Link to="/" className="text-blue-500 hover:underline">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopCartPage;
