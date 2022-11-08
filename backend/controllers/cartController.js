const asyncHandler = require("express-async-handler");
const Cart = require("../models/userModel.js");

// @desc    Get user cart
// @route   GET /api/carts/:userId
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  res.status(200).json(userCart);
});

// @desc    Update user cart
// @route   PUT /api/carts/:userId
// @access  Private
const updateUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({ messag: `Update cart for user ${req.params.userId}` });
});

// @desc    Clear user cart
// @route   DELETE /api/carts/:userId
// @access  Private
const clearUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Clear cart for user` });
});

// @desc    Clear user cart
// @route   DELETE /api/carts/:userId
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `Add item to cart` });
});

// @desc    Clear user cart
// @route   DELETE /api/carts/:userId
// @access  Private
const deleteItemFromCart = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete item from cart` });
});

module.exports = {
  getUserCart,
  updateUserCart,
  clearUserCart,
  addItemToCart,
  deleteItemFromCart,
};
