// @desc    Get all products
// @route   GET /api/products/
// @access  Public
const getProducts = (req, res) => {
  res.status(200).json({ message: "Get all products" });
};

// @desc    Create a product
// @route   POST /api/products/
// @access  Private
const createProduct = (req, res) => {
  res.status(201).json({ message: "Craete a product" });
};

// @desc    Get a product
// @route   GET /api/products/:id
// @access  Public
const getProduct = (req, res) => {
  res.status(200).json({ message: `Get a product with id ${req.params.id}` });
};

// @desc    Update a product
// @route   PUT /api/products/
// @access  Private
const updateProdcut = (req, res) => {
  res
    .status(200)
    .json({ message: `Update a product with id ${req.params.id}` });
};

// @desc    Delete a product
// @route   DELETE /api/products/
// @access  Private
const deleteProduct = (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a product with id ${req.params.id}` });
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProdcut,
  deleteProduct,
};
