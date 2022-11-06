const asyncHandler = require("express-async-handler");
const Product = require("../models/productModels.js");

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

  const product = await Product.create(req.body);

  res.status(201).json(product);
});

// @desc    Get a product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get a product with id ${req.params.id}` });
});

// @desc    Update a product
// @route   PUT /api/products/
// @access  Private
const updateProdcut = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Update a product with id ${req.params.id}` });
});

// @desc    Delete a product
// @route   DELETE /api/products/
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a product with id ${req.params.id}` });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProdcut,
  deleteProduct,
};
