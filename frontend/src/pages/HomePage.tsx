import Breadcrumbs from "../components/Breadcrumbs";

import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import ProductSlider from "../components/ProductSlider";
import SignupNowSection from "../components/SignupNowSection";
import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

const HomePage = () => {
  const {
    limitedOfferProducts,
    setDiscountedProducts,
    getingDiscountedProducts,
  } = useProductStore();

  useEffect(() => {
    setDiscountedProducts();
    return () => {};
  }, [setDiscountedProducts]);

  return (
    <div className=" w-full min-h-[calc(100vh-24.2rem)] flex justify-center px-5 sm:px-4">
      <div className=" h-full w-screen">
        <div className="max-w-5xl mx-auto px-5">
          <Breadcrumbs paths={[{ name: "", path: "" }]} />
          <div className="flex flex-col">
            <HeroSection />
          </div>
        </div>

        <Features />

        <ProductSlider
          products={limitedOfferProducts}
          isLoading={getingDiscountedProducts}
        />

        <SignupNowSection />
      </div>
    </div>
  );
};

export default HomePage;
