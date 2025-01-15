import { useCartStore } from "../store/useCartStore";

const CheckOut = () => {
  const { calcTotalPrice } = useCartStore();

  let TotalPrice = calcTotalPrice();

  return (
    <div className="border border-base-300 rounded-lg flex flex-col gap-2 p-5 m-0 h-fit w-72 bg-base-200 ">
      <div className="font-bold text-xl flex justify-between  ">
        <h2>Total:</h2>
        <h2>${TotalPrice}</h2>
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
        <h2>${TotalPrice + 5}</h2>
      </div>
      <button className="btn btn-neutral bg-black w-full">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckOut;
