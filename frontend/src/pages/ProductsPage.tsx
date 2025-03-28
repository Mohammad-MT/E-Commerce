import { useEffect, useState } from "react";

import Card from "../components/Card";
import CardSkeleton from "../components/skeletons/CardSkeleton";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";

import { useProductStore } from "../store/useProductStore";
import SortOrder from "../components/SortOrder";
import SortProductSidebar from "../components/SortProductSidebar";

const ProductsPage = () => {
  const { products, loading, setFilter } = useProductStore();
  const [showFilterOp, setShowFilterOp] = useState(false);

  useEffect(() => {
    setFilter({
      sortBy: "createdAt",
      order: "desc",
      maxPrice: "",
      minPrice: "",
      category: "",
      search: "",
    });
  }, [showFilterOp, setFilter]);

  return (
    <div className="min-h-[calc(100vh-24.2rem)]  flex justify-center px-2 sm:px-4">
      <div className="max-w-5xl h-full w-screen">
        <Breadcrumbs paths={[{ name: "Products", path: "/products" }]} />
        <div className=" flex flex-col justify-center gap-2 sm:flex-row">
          {showFilterOp && (
            <div className="flex justify-center">
              <SortProductSidebar />
            </div>
          )}

          <div className="flex-2 flex flex-col items-center w-full ">
            <SortOrder setShowFilter={() => setShowFilterOp(!showFilterOp)} />
            {/* {showFilterOp && (
              <div className="me-auto p-2">{totalProducts} result founded</div>
            )} */}
            <div className=" w-full ">
              {loading ? (
                <div
                  className={`grid grid-cols-1 gap-4 ${
                    showFilterOp
                      ? "md:grid-cols-1 lg:grid-cols-2"
                      : "md:grid-cols-2 lg:grid-cols-3"
                  } `}
                >
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 gap-4 ${
                    showFilterOp
                      ? "md:grid-cols-1 lg:grid-cols-2"
                      : "md:grid-cols-2 lg:grid-cols-3"
                  } `}
                >
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
              )}
            </div>
            {products.length === 0 && !loading && (
              <div className="w-full text-center">Nothing Found</div>
            )}
            {products.length >= 1 && <Pagination />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
