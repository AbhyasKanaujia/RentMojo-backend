const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProdcut,
  deleteProduct,
} = require("../controllers/productController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProdcut)
  .delete(protect, deleteProduct);

module.exports = router;
