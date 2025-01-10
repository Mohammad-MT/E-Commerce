import Breadcrumbs from "../components/Breadcrumbs";
import CartTable from "../components/CartTable";
import CheckOut from "../components/CheckOut";

const ShopCartPage = () => {
  return (
    <div className="min-h-[calc(100vh-24.2rem)] ">
      <div className="flex flex-col items-center  max-w-5xl h-full mx-auto ">
        <Breadcrumbs newDirectory="Cart" />
        <div className= " w-fit flex justify-between flex-col lg:flex-row ">
          <CartTable />
          <CheckOut />
        </div>
      </div>
    </div>
  );
};

export default ShopCartPage;
