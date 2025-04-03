
const Discount = () => {
  return (
    <div className="flex flex-col w-full h-full m-0 p-0">
      <div className="w-full  bg-base-300 p-4 ">Discout :</div>
      <div className="overflow-x-auto h-full border border-base-300  bg-base-100 p-4 relative">
        <div className="absolute bottom-5 right-5 btn btn-circle bg-pink-600 text-white">+</div>
        <div>add discount code</div>
      </div>
    </div>
  );
};

export default Discount;
