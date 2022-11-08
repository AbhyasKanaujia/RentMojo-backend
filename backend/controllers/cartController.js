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
  const cart = await Cart.findById(req.user.cartId);
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  if (!req.body.quantity) {
    res.status(400);

    throw new Error("Please specify the new quantity");
  }

  if (req.body.quantity <= 0) {
    res.status(400);

    throw new Error(
      "Quantity cannot be 0 or negative. Consider removing item from cart."
    );
  }

  const productExists = cart.products.find((product) =>
    product.productId.equals(req.params.productId)
  );

  if (productExists) {
    const updatedProducts = cart.products.map((product) => {
      if (product.productId.equals(req.params.productId)) {
        return { productId: product.productId, quantity: req.body.quantity };
      } else return product;
    });

    const updatedCart = await Cart.findByIdAndUpdate(
      req.user.cartId,
      {
        products: updatedProducts,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } else {
    res.status(404);

    throw new Error("Product not found in cart");
  }
});

// @desc    Delete item from cart
// @route   DELETE /api/carts/:productId
// @access  Private
const deleteItemFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.user.cartId);
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  const updatedProducts = cart.products.filter(
    (product) => !product.productId.equals(req.params.productId)
  );

  if (
    cart.products.length === 0 ||
    cart.products.length === updatedProducts.length
  ) {
    res.status(404);

    throw new Error("Item not found in cart");
  }

  const updatedCart = await Cart.findByIdAndUpdate(
    req.user.cartId,
    {
      products: updatedProducts,
    },
    { new: true }
  );

  res.status(200).json(updatedCart);
});

module.exports = {
  getUserCart,
  updateProductQuantity,
  clearUserCart,
  addItemToCart,
  deleteItemFromCart,
};
