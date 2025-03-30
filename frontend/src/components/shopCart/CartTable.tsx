import { Trash2 } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router-dom";

const CartTable = () => {
  const { cart, addCart, removeCart, removeItemFromCart } = useCartStore();

  return (
    <table className="table h-16 me-0 sm:me-8">
      <thead>
        <tr className=" border-b border-base-300">
          <th className="px-1"></th>
          <th className="px-1">Product Info</th>
          <th className="px-1">Final Price</th>
          <th className="px-1">Quantity</th>
          <th className="px-1">Subtotal</th>
          <th className="w-8  p-0"></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((c, index) => (
          <tr key={c.productId._id} className="  h-16">
            <td className=" p-0 ">{index + 1}</td>
            <td className="flex items-center justify-center h-full gap-1 px-1 py-2 w-fit  ">
              <Link
                to={`/products/${c.productId._id}`}
                className="flex items-center"
              >
                <img
                  src={c.productId.images[0]}
                  alt="product img"
                  className="  rounded-lg border w-0 sm:w-20"
                />
                <div>{c.productId.name}</div>
              </Link>
            </td>
            <td className=" w-12  px-1 py-2 text-green-700">
              {c.productId.finalPrice && c.productId.finalPrice > 0
                ? c.productId.finalPrice
                : c.productId.price}
              $
            </td>
            <td className=" w-8  px-1 py-2 ">
              <div className="flex flex-row items-center w-fit px-1   border  border-gray-500 rounded-lg text-xs sm:text-lg ">
                <button
                  className="px-1 "
                  onClick={() => removeCart(c.productId._id)}
                >
                  -
                </button>
                <p className="px-1 text-center">{c.quantity}</p>
                <button className="px-1" onClick={() => addCart(c.productId)}>
                  +
                </button>
              </div>
            </td>
            <td className=" w-12  px-1 py-2 text-center">
              {(c.productId.finalPrice
                ? c.productId.finalPrice
                : c.productId.price) * c.quantity}
              $
            </td>
            <td className=" px-1 py-2">
              <button
                onClick={() => {
                  removeItemFromCart(c.productId._id);
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
