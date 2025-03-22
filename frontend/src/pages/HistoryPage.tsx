import { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useOrderStore } from "../store/useOrderStore";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  useEffect(() => {
    getMyOrders();
  }, []);
  const { getMyOrders, myorders } = useOrderStore();
  return (
    <div className="min-h-[calc(100vh-24.2rem)]  flex justify-center px-2 sm:px-0">
      <div className="max-w-5xl h-full w-screen">
        <Breadcrumbs newDirectory="My Orders" />

        <div className="overflow-x-scroll rounded-box border border-base-300  bg-base-100">
          <table className="table">
            <thead className="bg-base-200">
              <tr className="text-center">
                <th className="p-0 m-0 w-64">OrderId</th>
                <th>Items Order</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {myorders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                myorders.map((order, index) => (
                  <tr key={index} className="hover:bg-base-200 ">
                    <td>{order._id}</td>
                    <td>
                      {order.items?.map((i) => (
                        <p className="py-1">
                          <Link
                            className="underline text-purple-700"
                            to={`/products/${i.productId}`}
                          >
                            {i.name}
                          </Link>{" "}
                          * {i.quantity}
                        </p>
                      ))}
                    </td>
                    <td
                      className={` ${
                        order.status === "Pending" && "text-yellow-500"
                      } ${
                        order.status === "Accepted" && "text-green-700"
                      } drop-shadow`}
                    >
                      {order.status}
                    </td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="text-green-800 drop-shadow-sm ">
                      {order.totalAmount}$
                    </td>
                  </tr>
                ))
              )}
              {/* <tr className="hover:bg-base-200 ">
                <th>1</th>
                <td>15156484348994</td>
                <td className={`text-yellow-500 drop-shadow`}>Pending</td>
                <td>2025/1/2</td>
                <td className="text-green-800 drop-shadow-sm">1200$</td>
              </tr>
              <tr className="hover:bg-base-200 ">
                <th>2</th>
                <td>15156484348994</td>
                <td className={`text-green-400 drop-shadow`}>Success</td>
                <td>2025/1/2</td>
                <td className="text-green-800 drop-shadow-sm">1200$</td>
              </tr>
              <tr className="hover:bg-base-200 ">
                <th>3</th>
                <td>15156484348994</td>
                <td className={`text-red-700 drop-shadow`}>Faild</td>
                <td>2025/1/2</td>
                <td className="text-green-800 drop-shadow-sm">1200$</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
