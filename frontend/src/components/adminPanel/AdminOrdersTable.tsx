import { useEffect } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import OrderTR from "./OrderTR";

const AdminTable = () => {
  const {
    getAllOrders,
    allOrders,
    isLoadingGetAllOrders: isGettingOrders,
  } = useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="flex flex-col w-full max-h-screen m-0 p-0">
      <div className="w-full bg-base-300 p-4 ">All Orders :</div>
      <div className="overflow-x-scroll overflow-auto  border border-base-300  bg-base-100">
        <table className="table text-center">
          <thead className="bg-base-200">
            <tr>
              <th className="p-0 m-0 w-64">Order Id</th>
              <th>User Name</th>
              <th>Cart Items</th>
              <th>Status</th>
              <th>Date</th>
              <th>TotalPrice</th>
              <th>edit</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {isGettingOrders ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              allOrders.map((order, index) => (
                <OrderTR key={index} order={order} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
