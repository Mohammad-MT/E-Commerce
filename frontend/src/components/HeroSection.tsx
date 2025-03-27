import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div >
      <div className="hero bg-base-200 transition-all rounded-lg shadow-xl hover:shadow-2xl duration-500 px-5 py-0 md:p-10 border border-base-300 ">
        <div className="hero-content w-full flex flex-col-reverse lg:flex-row">
          <div className="flex flex-col justify-center gap-5 h-full min-h-96">
            <h1 className="text-5xl font-bold tracking-tighter">
              Welcome to Our Shop!
            </h1>
            <p className="py-6">
              Discover the best products at unbeatable prices. Shop now and
              enjoy exclusive deals and offers.
            </p>
            <Link to={"/products"}>
              <button className="btn  self-start text-white  bg-pink-600 hover:bg-pink-500">
                Shop Now
              </button>
            </Link>
          </div>

          <img
            src="https://res.cloudinary.com/dzv86ea9r/image/upload/v1742946677/uploads/lelzqjphycx6f7xuxtsl.svg"
            className="max-w-md"
            alt="Product showcase"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
