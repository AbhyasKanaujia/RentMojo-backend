const express = require("express");
const {
  getUserCart,
  updateUserCart,
  clearUserCart,
} = require("../controllers/cartController.js");

const router = express.Router();

router
  .route("/:userId")
  .get(getUserCart)
  .put(updateUserCart)
  .delete(clearUserCart);

module.exports = router;
