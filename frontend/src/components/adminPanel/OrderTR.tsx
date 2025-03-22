import { Check, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { order, useOrderStore } from "../../store/useOrderStore";

const OrderTR = ({ order }: { order: order }) => {
  const [editMode, setEditMode] = useState(false);

  const { updateStatus, removeOrder } = useOrderStore();

  return (
    <tr>
      <td>{order._id}</td>
      <th>{order.userInfo?.name || " "}</th>
      <th>
        {order.items?.map((i) => (
          <p className="py-1">
            <Link
              className="underline text-purple-700"
              to={`/products/${i.productId}`}
            >
              {i.name}
            </Link>
            * {i.quantity}
          </p>
        ))}
      </th>
      {editMode ? (
        <td>
          <select
            className="border border-base-300 select select-bordered"
            onChange={(e) => {
              order.status = e.currentTarget.value;
            }}
          >
            <option value={order.status}>{order.status}</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Delivered">Delivered</option>
          </select>
        </td>
      ) : (
        <td>{order.status}</td>
      )}

      <td>
        {order.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="text-green-800 drop-shadow-sm text-center">
        {order.totalAmount}$
      </td>
      <td>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? (
            <Check
              className="text-green-500"
              onClick={() => {
                updateStatus(order);
                setEditMode(!editMode);
              }}
            />
          ) : (
            <Edit
              className="text-yellow-500"
              onClick={() => {
                setEditMode(!editMode);
              }}
            />
          )}
        </button>
      </td>
      <td>
        <button className="text-red-500">
          <Trash2
            onClick={() => {
              removeOrder(order);
            }}
          />
        </button>
      </td>
    </tr>
  );
};

export default OrderTR;
