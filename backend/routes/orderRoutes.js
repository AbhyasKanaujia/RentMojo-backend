const express = require("express");
const {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").get(protect, getOrders);

router.route("/create").post(protect, createOrder);

router
  .route("/:id")
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

module.exports = router;
