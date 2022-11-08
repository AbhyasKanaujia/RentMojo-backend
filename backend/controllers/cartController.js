const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel.js");

// @desc    Get user cart
// @route   GET /api/carts/
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    const newCart = await Cart.create({ user: req.user._id });

    res.status(201).json(newCart);
  } else {
    res.status(200).json(cart);
  }
});

// @desc    Clear user cart
// @route   DELETE /api/carts/
// @access  Private
const clearUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Clear cart for ${req.user.name}` });
});

// @desc    Add item to cart
// @route   POST /api/carts/:productId
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: `Add product for user ${req.user.name} for product id ${req.params.productId}`,
  });
});

// @desc    Update product quantity
// @route   PUT /api/carts/:productId
// @access  Private
const updateProductQuantity = asyncHandler(async (req, res) => {
  res.status(200).json({
    messag: `Update product quantity for user ${req.user.name} for product id ${req.params.productId}`,
  });
});

// @desc    Delete item from cart
// @route   DELETE /api/carts/:productId
// @access  Private
const deleteItemFromCart = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete product for user ${req.user.name} for product id ${req.params.productId}`,
  });
});

module.exports = {
  getUserCart,
  updateProductQuantity,
  clearUserCart,
  addItemToCart,
  deleteItemFromCart,
};
