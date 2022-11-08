const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js");
const Cart = require("../models/cartModel.js");

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @desc    Create order using cart
// @route   POST /api/orders/
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.user.cartId);

  if (cart.products.length === 0) {
    res.status(400);

    throw new Error("Cart is empty");
  }

  if (
    !req.body.address ||
    !req.body.city ||
    !req.body.postalCode ||
    !req.body.country ||
    !req.body.paymentMethod ||
    !req.body.shippingPrice ||
    !req.body.totalPrice ||
    !req.body.isPaid ||
    !req.body.isDelivered
  ) {
    res.status(400);

    throw new Error("Please provide all fields");
  }

  const newOrder = await Order.create({
    user: req.user._id,
    orderItems: cart.products,
    shippingAddress: {
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    },
    paymentMethod: req.body.paymentMethod,
    paymentResult: {
      id: req.body.paymentId,
      status: req.body.paymentStatus,
      update_time: req.body.parymentUpdateTime,
      email_address: req.body.paymentEmail,
    },
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    isPaid: req.body.isPaid,
    paidAt: req.body.paidAt,
    isDelivered: req.body.isDelivered,
    deliveredAt: req.body.deliveredAt,
  });

  res.status(201).json(newOrder);
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
