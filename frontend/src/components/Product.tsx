import { useCartStore } from "../store/useCartStore";
import { Item } from "../store/useProductStore";

interface Prop {
  product: Item;
}

const Product = ({ product }: Prop) => {
  const { addCart, removeCart, cart } = useCartStore();

  const productCount = cart.find((c) => {
    return c.productId._id === product._id;
  });

  return (
    <div className="bg-base-100 shadow-xl rounded-lg p-5 max-w-4xl w-full border border-base-300 my-2 ">
      <div className="flex flex-col md:flex-row justify-between w-full gap-8 relative">
        {product.discountType === "percentage" &&
        product.discountValue &&
        product.discountValue > 0 ? (
          <button className="p-3 px-2 text-white bg-pink-600  rounded-full absolute top-2 start-2">
            {product.discountValue}%
          </button>
        ) : (
          ""
        )}
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
              {product.discountType === "percentage" &&
              product.discountValue &&
              product.discountValue > 0 ? (
                <div className="flex gap-2">
                  <h3 className=" text-gray-400 text-lg line-through">
                    ${product.price}
                  </h3>
                  <h3 className=" text-green-800 text-lg">
                    ${product.finalPrice}
                  </h3>
                </div>
              ) : (
                <h3 className=" text-green-800 text-lg">${product.price}</h3>
              )}
            </span>
            <p className="text-lg">{product.description}</p>
          </div>
          <div className=" space-y-4">
            <div>
              <div className=" font-semibold">Stock : {product.stock}</div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center border border-gray-300 rounded-lg text-xl">
                <button
                  className="px-4 py-2"
                  onClick={() => product._id && removeCart(product._id)}
                >
                  -
                </button>
                <p className="px-4 py-2 text-center">
                  {productCount ? productCount.quantity : 0}
                </p>
                <button
                  className="px-4 py-2"
                  onClick={() => {
                    addCart(product);
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-neutral flex-1"
                onClick={() => {
                  addCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
