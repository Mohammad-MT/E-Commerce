import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../store/useProductStore";
import apiClient from "../services/apiClient";
import Breadcrumbs from "../components/Breadcrumbs";
import ReviewBox from "../components/rewiew/ReviewBox";
import Product from "../components/Product";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Item>();

  useEffect(() => {
    apiClient.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  return (
    <div className="max-w-5xl min-h-[calc(100vh-24.2rem)] mx-auto px-2 ">
      <div className=" flex flex-col items-center justify-center bg-base-100  ">
        <Breadcrumbs
          newDirectory="Shop"
          newDirectory2={` ${product ? product.name : ""}`}
        />
        {product ? <Product product={product} /> : <ProductSkeleton />}
        <div className="divider mt-10 "></div>
        <ReviewBox />
      </div>
    </div>
  );
};

export default ProductPage;
