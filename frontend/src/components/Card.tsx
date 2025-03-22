import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Item } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";

const Card = ({ name, description, price, images, _id, stock }: Item) => {
  const { addCart } = useCartStore();
  return (
    <div>
      <div
        className="card card-compact border border-base-300 bg-base-100 w-full shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-xl"
        id="card"
      >
        <figure className="relative">
          {!images[0] ? (
            <div className="skeleton h-32 w-full flex items-center justify-center"></div>
          ) : (
            <img src={images[0]} alt={name} className=" min-h-72 " />
          )}
          <button
            className="btn opacity-90 border border-base-300 w-1/2 absolute bottom-2  hidden"
            id="showBtnCart"
            onClick={() => {
              addCart({ _id, name, price, description, images, stock });
              toast.success("New Item Added to ShopCart");
            }}
          >
          <div className="flex justify-center items-center gap-2">
            <span>Add to Cart</span>
            <ShoppingCart />
          </div>
          </button>
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
            <h3 className=" text-green-800 text-lg">${price}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
