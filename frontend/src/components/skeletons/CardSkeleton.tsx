const CardSkeleton = () => {
  return (
    <div className="card card-compact border border-base-300 bg-base-100 w-full shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-xl">
      <div className="flex flex-col items-center p-4">
        <div className="skeleton h-80 w-full"></div>
        <div className="flex flex-col justify-end gap-2  w-full mt-4 ">
          <div className="skeleton h-8 w-2/5 mb-2 "></div>
          <div className="skeleton h-4 w-full "></div>
          <div className="skeleton h-4 w-full "></div>
          <div className="skeleton h-4 w-full "></div>
          <div className="skeleton h-4 w-1/3 "></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
