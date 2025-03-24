const ReviewSkeleton = () => {
  return (
    <div className=" p-8 m-12 py-0 mt-4 ">
      <h2 className="text-center text-2xl font-bold text-gray-700 mb-8">
        Reviews
      </h2>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 gap-4 w-full md:w-2/3 sm:grid-cols-2">
          {[1, 2, 3].map(() => (
            <div className="rounded-lg bg-base-100 p-4 border border-base-200 shadow-md">
              <div className="flex justify-between items-center  gap-4">
                <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-3">
                  <div className="skeleton h-3 w-24"></div>
                  <div className="skeleton h-3 w-20"></div>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
