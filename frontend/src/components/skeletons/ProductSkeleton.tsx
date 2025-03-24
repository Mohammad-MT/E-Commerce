const ProductSkeleton = () => {
  return (
    <div className="max-w-4xl  w-full min-h-[calc(100vh-24.2rem)] mx-auto  ">
      <div className="p-5 border border-base-300 rounded-lg shadow-xl bg-base-100">
        <div className="w-full flex flex-col md:flex-row gap-8 items-center">
          <div className=" w-full h-96 rounded-lg skeleton bg-base-200"></div>
          <div className="w-full h-96 p-3 flex flex-col justify-start gap-3">
            <div className="w-1/3 h-10 skeleton bg-base-200"></div>
            <div className="divider mt-0"></div>
            <div className="w-5/6 h-8 skeleton bg-base-200"></div>
            <div className="w-5/6 h-8 skeleton bg-base-200"></div>
            <div className="w-5/6 h-8 skeleton bg-base-200"></div>
            <div className="w-1/3 h-8 skeleton bg-base-200"></div>

            <div className="mt-auto flex gap-4 items-center">
              <div className="w-1/3 h-12 skeleton bg-base-200"></div>
              <div className="w-2/3 h-12 skeleton bg-base-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
