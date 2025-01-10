import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductPage = () => {
  return (
    <div>
      <div className="min-h-screen ">
        <Navbar />
        <div className="flex flex-col items-center  max-w-5xl h-full mx-auto  ">
          <Breadcrumbs newDirectory="Product name" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
