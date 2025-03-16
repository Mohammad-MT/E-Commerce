import { useProductStore } from "../../store/useProductStore";
import { useEffect } from "react";
import ProductTR from "./ProductTR";

const AllProductTable = () => {
  const {
    allProducts,
    loading,
    setAllProducts,
    isUpdateingProduct,
    isDeletingProduct,
  } = useProductStore();
  useEffect(() => {
    setAllProducts();

    return () => {};
  }, [isUpdateingProduct, isDeletingProduct]);

  return (
    <div className="flex flex-col w-full m-0 p-0">
      <div className="w-full bg-base-300 p-4 ">All Products :</div>
      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto border border-base-300  bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>name</th>
                <th>price</th>
                <th>stock</th>
                <th>edit</th>
                <th>remove</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((p, index) => (
                <ProductTR
                  productInfo={{
                    id: p._id ?? "",
                    name: p.name,
                    price: p.price,
                    stock: p.stock,
                  }}
                  index={index}
                  key={p._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProductTable;
