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
          <div className=" w-full flex justify-between  flex-col lg:flex-row ">
            {Cart.length > 0 && <CartTable />}
            <div className="flex justify-end">
              <CheckOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCartPage;
