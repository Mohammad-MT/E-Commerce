import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Item, useProductStore } from "../store/useProductStore";
import apiClient from "../services/apiClient";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCartStore } from "../store/useCartStore";

const ProductPage = () => {
  const { selectedProduct } = useProductStore();
  const { id } = useParams();
  const [product, setProduct] = useState<Item>();

  useEffect(() => {
    apiClient.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  // const { addCart, removeCart } = useCartStore();
  return (
    <div>
      <div className="min-h-[calc(100vh-24.2rem)] ">
        <div className="flex flex-col items-center max-w-5xl h-full mx-auto">
          <Breadcrumbs newDirectory="Shop" newDirectory2={`${product.name}`} />
          <div className="flex justify-between w-full">
            <div className="flex-1">
              <img
                src={product.images[0]}
                alt=""
                className=" w-96 rounded-lg "
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <h2 className=" text-2xl font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <span className=" text-xl">${product.price}</span>
              <div className="flex gap-2 w-full">
                <div className="flex items-center flex-2   border  border-gray-500 rounded-lg text-xl ">
                  <button className="px-2 ">-</button>
                  <p className="px-2 text-center">1</p>
                  <button className="px-2">+</button>
                </div>
                <button className="btn btn-neutral bg-black flex-1 ">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
