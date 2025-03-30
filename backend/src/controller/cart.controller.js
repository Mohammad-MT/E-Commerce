import { Cart, validateCart } from "../models/cart.model.js";

// Get cart for logged-in user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );

    if (!cart) res.status(404).json({ message: "Cart not found!" });
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update cart (Add or Remove items)
export const updateCart = async (req, res) => {
  try {

    const { error, value } = validateCart(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: value.items });
    } else {
      cart.items = value.items;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

// Clear cart after checkout
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};
