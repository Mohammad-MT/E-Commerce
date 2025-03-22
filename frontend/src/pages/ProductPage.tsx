import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../store/useProductStore";
import apiClient from "../services/apiClient";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCartStore } from "../store/useCartStore";
import { Loader } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Item>();

  const { addCart, removeCart, Cart } = useCartStore();

  useEffect(() => {
    apiClient.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-5xl min-h-[calc(100vh-24.2rem)] mx-auto px-2 ">
        <div className=" flex flex-col items-center justify-center bg-base-100  ">
          <div className="flex  w-full justify-center mx-auto mt-5">
            <Loader className="size-10 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  const productCount = Cart.find((c) => {
    return c.Item._id === product._id;
  });

  return (
    <div className="max-w-5xl min-h-[calc(100vh-24.2rem)] mx-auto px-2 ">
      <div className=" flex flex-col items-center justify-center bg-base-100  ">
        <Breadcrumbs newDirectory="Shop" newDirectory2={`${product.name}`} />
        <div className="bg-base-100 shadow-xl rounded-lg p-5 max-w-4xl w-full border border-base-300 my-2 ">
          <div className="flex flex-col md:flex-row justify-between w-full gap-8">
            <div className="flex-1">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className=" space-y-4">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <div className=" divider"></div>
                <span className="text-2xl font-semibold text-green-800">
                  ${product.price.toFixed(2)}
                </span>
                <p className="text-lg">{product.description}</p>
              </div>
              <div className=" space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center border border-gray-300 rounded-lg text-xl">
                    <button
                      className="px-4 py-2"
                      onClick={() => removeCart(product)}
                    >
                      -
                    </button>
                    <p className="px-4 py-2 text-center">
                      {productCount ? productCount.count : 0}
                    </p>
                    <button
                      className="px-4 py-2"
                      onClick={() => addCart(product)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-neutral flex-1"
                    onClick={() => addCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
