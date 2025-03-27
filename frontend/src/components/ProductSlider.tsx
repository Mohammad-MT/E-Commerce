import "../../node_modules/swiper/swiper-bundle.css";
import "../../node_modules/swiper/modules/pagination.css";
import "../../node_modules/swiper/modules/navigation.css";

import { Pagination, Navigation, Keyboard } from "swiper/modules";
import CardSkeleton from "../components/skeletons/CardSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";

const ProductSlider = () => {
  return (
    <div>
      <div className="my-12 max-w-6xl px-4 mx-auto ">
        <div className="my-4 bg-base-300 px-6 pt-4 rounded-2xl h-fit">
          <h2 className="text-3xl font-bold ">Limited Offer</h2>
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
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
