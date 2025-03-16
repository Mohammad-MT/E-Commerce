import { CircleCheckBig } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import { useState } from "react";

const ProductForm = () => {
  const { addNewProduct, isAddingProduct } = useProductStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;
    const stock = (document.getElementById("stock") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;
    const categorie = (document.getElementById("category") as HTMLSelectElement)
      .value;
    const image = imgUrl;

    const newProduct = {
      name: title,
      price: parseInt(price),
      stock: parseInt(stock),
      description,
      category: categorie,
      images: [image],
    };

    addNewProduct(newProduct);
  };

  const cloudName = "dzv86ea9r";
  const uploadPreset = "ym2h9jy2";
  const [imgUrl, setImgUrl] = useState("");

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
  };
  return (
    <div className="flex flex-col w-full m-0 p-0">
      <div className="w-full bg-base-300 p-4 ">Add new Product:</div>
      <form className="p-4  h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 font-semibold text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter product title"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="price"
                className="mb-2 font-semibold text-gray-700"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                placeholder="product price"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="stock"
                className="mb-2 font-semibold text-gray-700"
              >
                Stock:
              </label>
              <input
                type="number"
                id="stock"
                placeholder="stock count"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 font-semibold text-gray-700"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="p-2 border border-gray-300 rounded-md h-44"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mb-2 font-semibold text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              defaultValue="Select a Category"
              className="select  border border-gray-300 rounded-md"
            >
              <option disabled={true} hidden={true} value={""}>
                Select a Categorie
              </option>
              <option value={"electronics"}>Electronics</option>
              <option value={"books"}>Books</option>
              <option value={"fashion"}>Fashion</option>
              <option value={"home"}>Home</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
              Upload Image:
            </label>
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setImgUrl}
            />
            {imgUrl && (
              <div className="flex items-center gap-2">
                <p className="text-gray-700">Image uploaded successful</p>
                <CircleCheckBig className="text-green-600" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="self-end px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isAddingProduct ? "Loading ..." : "Add New Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
