import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { useOrderStore } from "../../store/useOrderStore";

const CheckOut = () => {
  const { cart } = useCartStore();
  const { authUser } = useAuthStore();
  const { addNewOrder } = useOrderStore();

  const TotalPrice = () => {
    let total = 0;
    cart.map((c) => {
      total +=
        c.quantity *
        (c.productId.finalPrice !== undefined
          ? c.productId.finalPrice
          : c.productId.price);
    });
    return Math.ceil(total * 100) / 100;
  };

  if (!authUser) {
    return (
      <div className="border border-base-300 rounded-lg flex flex-col gap-2 p-5 m-0 h-fit w-72 bg-base-200 ">
        <h2 className="text-center">Please Login to Proceed</h2>
      </div>
    );
  }

  return (
    <div className="border border-base-300 rounded-lg flex flex-col gap-2 p-5 m-0 h-fit w-72 bg-base-200 ">
      <div className="font-bold text-xl flex justify-between  ">
        <h2>Total:</h2>
        <h2>${TotalPrice()}</h2>
      </div>
      <div className="flex justify-between ">
        <p>Delivery Charge:</p>
        <p> +5.00$</p>
      </div>
      <div className=" divider"></div>
      <div className="">
        <div className=" join my-2 ">
          <input
            type="text"
            className=" input border border-base-300 rounded-e-none rounded-s-3xl w-full  "
            placeholder="Enter Discount Code"
          />
          <button className="btn btn-neutral  bg-black border border-base-300 rounded-s-none rounded-e-3xl">
            Apply
          </button>
        </div>
      </div>
      <div className=" divider"></div>
      <div className="font-bold text-xl flex justify-between">
        <h2>Grand Total:</h2>
        <h2>${TotalPrice() + 5}</h2>
      </div>
      <button
        className="btn btn-neutral bg-black w-full"
        onClick={() =>
          addNewOrder({
            totalAmount: TotalPrice() + 5,
            items: cart.map((item) => ({
              productId: item.productId._id,
              name: item.productId.name,
              quantity: item.quantity,
              price: item.productId.price,
              finalPrice:
                item.productId.finalPrice ??
                item.productId.price * item.quantity,
            })),
            userInfo: {
              _id: authUser!._id,
              name: authUser!.username,
              email: authUser!.email,
            },
          })
        }
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckOut;
