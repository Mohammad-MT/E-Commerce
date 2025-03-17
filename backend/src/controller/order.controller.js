import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

import { validateOrders } from "../models/order.model.js";

// Create a New Order
export const createOrder = async (req, res) => {
  try {
    const { value, error } = validateOrders(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    //check is product is available ?
    const product = await Product.findById(value.items[0].productId).select(
      "stock"
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < value.items[0].quantity)
      return res.status(400).json({ message: "Product out of stock" });

    // Update the stock
    product.stock -= value.items[0].quantity;
    await product.save();

    // Create a new order
    const order = await Order.create({
      userId: req.user.id,
      items: value.items,
      totalAmount: value.totalAmount,
      status: value.status,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// // Get Single Order
// export const getOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// Get All Orders (Admin Only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Update Order Status (Admin Only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Order (Admin Only)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};