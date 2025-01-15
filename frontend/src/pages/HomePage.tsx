import { Loader } from "lucide-react";

import Card from "../components/Card";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";

import { useProductStore } from "../store/useProductStore";
import SortOrder from "../components/SortOrder";
import SortProductSidebar from "../components/SortProductSidebar";
import { useState } from "react";

const HomePage = () => {
  const { products, loading } = useProductStore();
  const [showFilterOp, setShowFilterOp] = useState(false);

  return (
    <div className="min-h-[calc(100vh-24.2rem)]  flex justify-center px-2 sm:px-0">
      <div className="max-w-5xl h-full w-full">
        <Breadcrumbs newDirectory="Shop" />
        <div className=" flex justify-between gap-2">
          {showFilterOp && <SortProductSidebar />}
          <div className="flex-2 flex flex-col items-center justify-center ">
            <SortOrder
              showFilterOp={showFilterOp}
              setShowFilterOp={setShowFilterOp}
            />
            <div className="flex w-full ">
              <div
                className={` grid mx-auto grid-cols-1 gap-8 md:grid-cols-${
                  showFilterOp ? "1" : "2"
                } lg:grid-cols-${
                  showFilterOp ? "2" : "3"
                }`}
              >
                {loading && (
                  <div className="flex items-center justify-center h-screen">
                    <Loader className="size-10 animate-spin" />
                  </div>
                )}
                {products?.map((p) => (
                  <Card
                    key={p._id}
                    _id={p._id}
                    name={p.name}
                    price={p.price}
                    description={p.description}
                    images={p.images}
                    stock={p.stock}
                  />
                ))}
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
