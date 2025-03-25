import { useProductStore } from "../../store/useProductStore";
import UploadImage from "../UploadImage";

const ProductForm = () => {
  const { addNewProduct, isAddingProduct, imageUrl } = useProductStore();

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

    const newProduct = {
      name: title,
      price: parseInt(price),
      stock: parseInt(stock),
      description,
      category: categorie,
      images: [imageUrl],
    };

    addNewProduct(newProduct);
  };

  return (
    <div className="flex flex-col w-full m-0 p-0">
      <div className="w-full bg-base-300 p-4 ">Add new Product:</div>
      <form className="p-4 h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text font-semibold">Title:</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter product title"
              className="input input-bordered"
            />
          </div>
          <div className="flex gap-4">
            <div className="form-control w-full">
              <label htmlFor="price" className="label">
                <span className="label-text font-semibold">Price:</span>
              </label>
              <input
                type="number"
                id="price"
                placeholder="Product price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="stock" className="label">
                <span className="label-text font-semibold">Stock:</span>
              </label>
              <input
                type="number"
                id="stock"
                placeholder="Stock count"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text font-semibold">Description:</span>
            </label>
            <textarea
              name="description"
              id="description"
              className="textarea textarea-bordered h-44"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="category" className="label">
              <span className="label-text font-semibold">Category:</span>
            </label>
            <select
              id="category"
              defaultValue="Select a Category"
              className="select select-bordered"
            >
              <option disabled={true} hidden={true} value={""}>
                Select a Category
              </option>
              <option value={"electronics"}>Electronics</option>
              <option value={"books"}>Books</option>
              <option value={"fashion"}>Fashion</option>
              <option value={"home"}>Home</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="image" className="label">
              <span className="label-text font-semibold">Upload Image:</span>
            </label>
            <UploadImage />
          </div>
          <button
            type="submit"
            className={`btn btn-neutral self-end px-4 py-2 mt-4 font-semibold ${
              isAddingProduct ? "loading" : ""
            }`}
          >
            {isAddingProduct ? "Loading ..." : "Add New Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
