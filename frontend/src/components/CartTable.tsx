import { Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";

const CartTable = () => {
  const { Cart, addCart, removeCart, removeItemCart } = useCartStore();

  return (
    <table className="table h-16">
      <thead>
        <tr className=" border-b border-base-300 ">
          <th className="px-1"></th>
          <th className="px-1">Product</th>
          <th className="px-1">Price</th>
          <th className="px-1">Quantity</th>
          <th className="px-1">Subtotal</th>
          <th className="w-8  p-0"></th>
        </tr>
      </thead>
      <tbody>
        {Cart.map((c, index) => (
          <tr key={c.Item._id} className="">
            <th className=" p-0 ">{index + 1}</th>
            <td className="flex items-center  gap-1 px-1 py-2 w-fit ">
              <img
                src={c.Item.images[0]}
                alt="product img"
                className=" w-20 rounded-lg border"
              />
              <div>{c.Item.name}</div>
            </td>
            <td className=" w-12  px-1 py-2">{c.Item.price}$</td>
            <td className=" w-8  px-1 py-2 ">
              <div className="flex flex-row items-center w-fit px-1   border  border-gray-500 rounded-lg text-xs sm:text-lg ">
                <button className="px-1 " onClick={() => removeCart(c.Item)}>
                  -
                </button>
                <p className="px-1 text-center">{c.count}</p>
                <button className="px-1" onClick={() => addCart(c.Item)}>
                  +
                </button>
              </div>
            </td>
            <td className=" w-12  px-1 py-2 text-center">
              {c.Item.price * c.count}$
            </td>
            <td className=" px-1 py-2">
              <button
                onClick={() => {
                  removeItemCart(c.Item);
                  toast.success("Remove from ShopCart Successfully");
                }}
              >
                <Trash2 className="text-red-700 " />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CartTable;
