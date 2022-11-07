const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

// @desc    Get all products
// @route   GET /api/products/
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.price
  ) {
    res.status(400);

    throw new Error("please specify all required fields");
  }

  const product = await Product.create({ ...req.body, user: req.user.id });

  res.status(201).json(product);
});

// @desc    Get a product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/
// @access  Private
const updateProdcut = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  if (!product.user.equals(req.user.id)) {
    res.status(401);

    throw new Error("Only owner can delete the product");
  }

  const updatedProdcut = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProdcut);
});

// @desc    Delete a product
// @route   DELETE /api/products/
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  if (!product.user.equals(req.user.id)) {
    res.status(401);

    throw new Error("Only owner can delete the product");
  }

  product.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProdcut,
  deleteProduct,
};
