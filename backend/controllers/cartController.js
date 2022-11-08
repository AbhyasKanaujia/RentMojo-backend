const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel.js");
const Product = require("../models/productModel.js");

// @desc    Get user cart
// @route   GET /api/carts/
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.user.cartId);

  res.status(200).json(cart);
});

// @desc    Clear user cart
// @route   DELETE /api/carts/
// @access  Private
const clearUserCart = asyncHandler(async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.user.cartId,
    {
      products: [],
    },
    { new: true }
  );

  res.status(200).json(updatedCart);
});

// @desc    Add item to cart
// @route   POST /api/carts/:productId
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.user.cartId);
  const product = await Product.findById(req.params.productId);
  const quantity = req.body.quantity ? req.body.quantity : 1;

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  // Item already in cart
  const productExists = cart.products.find((product) =>
    product.productId.equals(req.params.productId)
  );

  if (productExists) {
    res.status(400);

    throw new Error("Item already in cart");
  } else {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.user.cartId,
      {
        $push: { products: { productId: req.params.productId, quantity } },
      },
      { new: true }
    );
    res.status(201).json(updatedCart);
  }
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
