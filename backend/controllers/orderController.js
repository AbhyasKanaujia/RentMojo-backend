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

  console.log(`new order id: ${newOrder._id}`);

  res.status(201).json(newOrder);
});

// @desc    Get an order
// @route   GET /api/orders/:orderId
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);

    throw new Error("Order not found");
  }

  if (!order.user.equals(req.user._id)) {
    res.status(401);

    throw new Error("You are not authoried to access this resource");
  }

  res.status(200).json(order);
});

// @desc    Update an order
// @route   GET /api/orders/:orderId
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);

    throw new Error("Order not found");
  }

  if (!order.user.equals(req.user._id)) {
    res.status(401);

    throw new Error("You are not authoried to access this resource");
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedOrder);
});

// @desc    Delete an order
// @route   GET /api/orders/:orderId
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);

    throw new Error("Order not found");
  }

  if (!order.user.equals(req.user._id)) {
    res.status(401);

    throw new Error("You are not authoried to access this resource");
  }

  order.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
