import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Item } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";

const Card = ({
  _id,
  name,
  description,
  price,
  stock,
  finalPrice,
  images,
  discountValue,
  discountType,
}: Item) => {
  const { addCart } = useCartStore();
  return (
    <div>
      <div
        className={`card card-compact border border-base-300 bg-base-100 w-full shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-xl }`}
        id="card"
      >
        <figure className="relative">
          {<img src={images[0]} className=" min-h-72 " />}

          {discountType === "percentage" &&
          discountValue &&
          stock > 0 &&
          discountValue > 0 ? (
            <button className="p-3 px-2 text-white bg-pink-600  rounded-full absolute top-3 start-3">
              {discountValue}%
            </button>
          ) : (
            ""
          )}

          {stock > 0 ? (
            <button
              className="btn opacity-90 border border-base-300 w-1/2 absolute bottom-2  hidden"
              id="showBtnCart"
              onClick={() => {
                addCart({
                  _id,
                  name,
                  price,
                  description,
                  images,
                  stock,
                  finalPrice,
                });
              }}
            >
              <div className="flex justify-center items-center gap-2">
                <span>Add to Cart</span>
                <ShoppingCart />
              </div>
            </button>
          ) : (
            <>
              <div className=" absolute border border-base-200 w-full rounded rotate-45"></div>
              <div className=" absolute border border-base-200 w-full rounded -rotate-45"></div>
              <button
                className="absolute rounded-2xl p-3 border border-base-100 bg-base-300 w-1/2   "
                disabled
              >
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>Out of Stock</span>
                </div>
              </button>
            </>
          )}

          <button
            className=" bg-white rounded-badge p-2 absolute end-3 top-3 hover:text-yellow-400  hidden"
            id="showBtnCart"
          >
            <Star size={24} />
          </button>
        </figure>
        <Link to={`/products/${_id}`}>
          <div className="card-body ">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            {discountType === "percentage" &&
            discountValue &&
            stock > 0 &&
            discountValue > 0 ? (
              <div className="flex gap-2">
                <h3 className=" text-gray-400 text-lg line-through">
                  ${price}
                </h3>
                <h3 className=" text-green-800 text-lg">${finalPrice}</h3>
              </div>
            ) : (
              <h3 className=" text-green-800 text-lg">${price}</h3>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
