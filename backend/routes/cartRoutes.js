const express = require("express");
const {
  getUserCart,
  updateUserCart,
  clearUserCart,
  addItemToCart,
  deleteItemFromCart,
} = require("../controllers/cartController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").get(protect, getUserCart).delete(protect, clearUserCart);
router
  .route("/:productId")
  .post(protect, addItemToCart)
  .put(protect, updateUserCart)
  .delete(protect, deleteItemFromCart);

module.exports = router;
