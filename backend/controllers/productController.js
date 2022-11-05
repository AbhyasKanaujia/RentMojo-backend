const getProducts = (req, res) => {
  res.status(200).json({ message: "Get all products" });
};

const createProduct = (req, res) => {
  res.status(201).json({ message: "Craete a product" });
};

const getProduct = (req, res) => {
  res.status(200).json({ message: `Get a product with id ${req.params.id}` });
};

const updateProdcut = (req, res) => {
  res
    .status(200)
    .json({ message: `Update a product with id ${req.params.id}` });
};

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
