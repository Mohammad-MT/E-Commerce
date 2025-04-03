import { Check, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../../store/useProductStore";

type productInfo = {
  id: string;
  name: string;
  price: number;
  stock: number;
  discountValue: number;
};
const ProductTR = ({
  productInfo,
  index,
}: {
  productInfo: productInfo;
  index: number;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(productInfo);

  const { updateProduct, deleteProduct } = useProductStore();

  let productContent;
  if (editMode) {
    productContent = (
      <tr key={productInfo.id}>
        <td>{index + 1}</td>
        <td>
          <input
            className="input border-base-300"
            type="text"
            defaultValue={editProduct.name}
            onChange={(e) => {
              setEditProduct({ ...productInfo, name: e.currentTarget.value });
            }}
          />
        </td>

        <td className="text-green-800 drop-shadow-sm">
          <input
            className="input border-base-300 max-w-28"
            type="number"
            defaultValue={editProduct.price}
            onChange={(e) => {
              setEditProduct({
                ...productInfo,
                price: parseInt(e.currentTarget.value),
              });
            }}
          />
        </td>
        <td>
          <input
            className="input border-base-300 max-w-28"
            type="number"
            defaultValue={editProduct.stock}
            onChange={(e) => {
              setEditProduct({
                ...productInfo,
                stock: parseInt(e.currentTarget.value),
              });
            }}
          />
        </td>
        <td>
          <input
            className="input border-base-300 max-w-28"
            type="number"
            defaultValue={editProduct.discountValue}
            onChange={(e) => {
              setEditProduct({
                ...productInfo,
                discountValue: parseInt(e.currentTarget.value),
              });
            }}
          />
        </td>
        <td>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? (
              <Check
                className="text-green-500"
                onClick={() =>
                  updateProduct(
                    editProduct.id,
                    editProduct.name,
                    editProduct.price,
                    editProduct.stock,
                    editProduct.discountValue
                  )
                }
              />
            ) : (
              <Edit className="text-yellow-500" />
            )}
          </button>
        </td>
        <td>
          <button className="text-red-500">
            <Trash2 />
          </button>
        </td>
      </tr>
    );
  } else {
    productContent = (
      <tr>
        <td>{index + 1}</td>
        <td>{productInfo.name}</td>

        <td className="text-green-800 drop-shadow-sm">{productInfo.price}$</td>
        <td>{productInfo.stock}</td>
        <td>{productInfo.discountValue}%</td>
        <td>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? (
              <Check className="text-green-500" />
            ) : (
              <Edit className="text-yellow-500" />
            )}
          </button>
        </td>
        <td>
          <button className="text-red-500">
            <Trash2 onClick={() => deleteProduct(productInfo.id)} />
          </button>
        </td>
      </tr>
    );
  }

  return productContent;
};

export default ProductTR;
