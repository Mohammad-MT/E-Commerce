import { useState } from "react";
import ProductForm from "../components/adminPanel/AddProductForm";
import AdminTable from "../components/adminPanel/AdminOrdersTable";
import AllProductTable from "../components/adminPanel/AdminAllProductTable";
import Discount from "../components/adminPanel/Discount";

const menuItems = [
  { lable: "All Products", direction: <AllProductTable /> },
  { lable: "Orders", direction: <AdminTable /> },
  { lable: "Add New Product", direction: <ProductForm /> },
  { lable: "Discount", direction: <Discount /> },
];

const AdminPanelPage = () => {
  const [selectedItem, setSelectedItem] = useState<string>("All Products");

  return (
    <div className="max-w-6xl min-h-[calc(100vh-24.2rem)] mx-auto  ">
      <div className=" flex  bg-base-100 min-h-[calc(100vh-100px)] border-4 border-base-300 rounded-xl my-4  ">
        <div className="flex flex-col bg-base-200  rounded-lg rounded-e-none border border-base-300 w-1/4 min-w-44    ">
          <h2 className="font-bold text-xl mx-3 py-3 border-b-2 border-pink-600">
            Admin Panel
          </h2>
          <ul className="flex flex-col gap-2 my-1  ">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedItem(item.lable)}
                className={` p-3 mx-2 rounded-md hover:bg-pink-600 cursor-pointer ${
                  item.lable === selectedItem
                    ? "bg-pink-600 me-0 rounded-e-none text-white"
                    : ""
                } `}
              >
                {item.lable}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full">
          {menuItems.map((item, index) => {
            if (item.lable === selectedItem)
              return (
                <div key={index} className="w-full">
                  {item.direction}
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
