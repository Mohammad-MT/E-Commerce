import "../../node_modules/swiper/swiper-bundle.css";
import "../../node_modules/swiper/modules/pagination.css";
import "../../node_modules/swiper/modules/navigation.css";

import { Pagination, Navigation, Keyboard } from "swiper/modules";
import CardSkeleton from "../components/skeletons/CardSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Item } from "../store/useProductStore";
import Card from "./Card";

interface Prop {
  products: Item[];
  isLoading?: boolean;
}

const ProductSlider = ({ products, isLoading }: Prop) => {
  return (
    <div>
      <div className="my-12 max-w-6xl px-4 mx-auto ">
        <div className="my-4 bg-base-300 px-6 pt-4 rounded-2xl h-fit">
          <h2 className="text-3xl font-bold ">Limited Offers</h2>
          <Swiper
            navigation={true}
            pagination={true}
            mousewheel={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation, Pagination, Keyboard]}
            className=""
          >
            {isLoading ? (
              <div>
                <SwiperSlide>
                  <CardSkeleton />
                </SwiperSlide>
                <SwiperSlide>
                  <CardSkeleton />
                </SwiperSlide>
                <SwiperSlide>
                  <CardSkeleton />
                </SwiperSlide>
                <SwiperSlide>
                  <CardSkeleton />
                </SwiperSlide>
              </div>
            ) : (
              <div>
                {products.map((p) => (
                  <SwiperSlide key={p._id}>
                    <div className="text-start">
                      <Card
                        _id={p._id}
                        name={p.name}
                        price={p.price}
                        stock={p.stock}
                        discountValue={p.discountValue}
                        discountType={p.discountType}
                        finalPrice={p.finalPrice}
                        images={p.images}
                        description={p.description}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
