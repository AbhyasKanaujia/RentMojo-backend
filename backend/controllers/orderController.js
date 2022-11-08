const asyncHandler = require("express-async-handler");

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get all orders for ${req.user.name}` });
});

// @desc    Create orders for user using cart
// @route   POST /api/orders/
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: `Create orders for ${req.user.name} using cart with id ${req.user.cartId}`,
  });
});

// @desc    Get an order
// @route   GET /api/orders/:orderId
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Get order for ${req.user.name} with order id ${req.params.id}`,
  });
});

// @desc    Update an order
// @route   GET /api/orders/:orderId
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update an order for ${req.user.name} with order id ${req.params.id}`,
  });
});

// @desc    Delete an order
// @route   GET /api/orders/:orderId
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete an order for ${req.user.name} with order id ${req.params.id}`,
  });
});

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
