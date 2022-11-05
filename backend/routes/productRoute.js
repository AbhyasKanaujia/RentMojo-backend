const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProdcut,
  deleteProduct,
} = require("../controllers/productController.js");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProdcut).delete(deleteProduct);

module.exports = router;
