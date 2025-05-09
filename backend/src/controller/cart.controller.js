const { Cart, validateCart } = require("../models/cart.model.js");

// Get cart for logged-in user
const getCart = async (req, res) => {
  // Check if user is logged in
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId"
  );

  //if cart dosen't exist return empty array
  if (!cart.items) res.json([]);

  res.json(cart.items);
};

// Update cart (Add or Remove items)
const updateCart = async (req, res) => {
  const { error, value } = validateCart(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: value.items });
  } else {
    cart.items = value.items;
  }

  await cart.save();
  res.json(cart);
};

// Clear cart after checkout
const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ message: "Cart cleared" });
};

module.exports = { getCart, updateCart, clearCart };
