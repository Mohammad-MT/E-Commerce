import { Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartTable = () => {
  const { Cart, addCart, removeCart, removeItemCart } = useCartStore();

  return (
    <table className="table h-16">
      <thead>
        <tr className=" border-b border-base-300">
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th className="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {Cart.map((c, index) => (
          <tr key={c.Item._id} className="">
            <th className="w-8 ">{index + 1}</th>
            <td className="flex items-center  gap-3 ">
              <img
                src={c.Item.images[0]}
                alt="product img"
                className=" w-24 rounded-lg border"
              />
              <div>{c.Item.name}</div>
            </td>
            <td className=" w-12">{c.Item.price}$</td>
            <td className=" w-12">
              <div className="flex items-center p-1   border  border-gray-500 rounded-lg text-xl ">
                <button className="px-2 " onClick={() => removeCart(c.Item)}>
                  -
                </button>
                <p className="px-2 text-center">{c.count}</p>
                <button className="px-2" onClick={() => addCart(c.Item)}>
                  +
                </button>
              </div>
            </td>
            <td className=" w-12">{c.Item.price * c.count}$</td>
            <td>
              <button onClick={() => removeItemCart(c.Item)}>
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
