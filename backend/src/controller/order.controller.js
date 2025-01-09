import { Order } from "../models/order.model.js";

// Create a New Order
export const createOrder = async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  try {
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Orders (Admin Only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
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
