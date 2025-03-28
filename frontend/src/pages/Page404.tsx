import page404 from "../assets/404Page.svg";

const Page404 = () => {
  return (
    <div className="min-h-[calc(100vh-24.2rem)]">
      <div className="flex flex-col-reverse md:flex-row gap-5  items-center  justify-around max-w-5xl h-full mx-auto px-8 ">
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6 text-gray-600">
            Sorry, the page you are looking for does not exist.
          </p>
          <a href="/" className="btn btn-neutral btn-wide">
            Go Back to Home
          </a>
        </div>
        <div className="max-w-xl w-full">
          <img src={page404} alt="404 page" />
        </div>
      </div>
    </div>
  );
};

export default Page404;
