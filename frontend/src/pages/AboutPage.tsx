import Breadcrumbs from "../components/Breadcrumbs";

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-24.2rem)] flex flex-col items-center justify-center bg-base-100 ">
      <div className="max-w-5xl h-full w-full">
        <Breadcrumbs newDirectory="About" />
        <div className="flex justify-center">
          <div className="bg-base-200 shadow-lg rounded-lg p-8 max-w-2xl w-full border border-base-300">
            <h1 className="text-3xl font-bold text-center mb-5">About Us</h1>
            <p className="text-lg mb-4">
              Welcome to our E-Commerce platform. We are dedicated to providing
              you with the best online shopping experience.
            </p>
            <p className="text-lg mb-4">
              Our mission is to offer a wide variety of products at competitive
              prices, ensuring quality and customer satisfaction.
            </p>
            <p className="text-lg mb-4">
              We believe in the power of technology to make shopping easier and
              more convenient for everyone. Our team is constantly working to
              improve our platform and bring you the latest and greatest
              products.
            </p>
            <p className="text-lg mb-4">
              Thank you for choosing us for your shopping needs. We look forward
              to serving you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
