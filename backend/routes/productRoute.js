const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProdcut,
  deleteProduct,
} = require("../controllers/productController.js");

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:id", getProduct);

router.put("/:id", updateProdcut);

router.delete("/:id", deleteProduct);

module.exports = router;
