const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").get(protect, (req, res) => {
  res.status(200).json({ message: `Get all orders for ${req.user.name}` });
});

router.route("/create").post(protect, (req, res) => {
  res.status(201).json({
    message: `Create orders for ${req.user.name} using cart with id ${req.user.cartId}`,
  });
});

router
  .route("/:id")
  .get(protect, (req, res) => {
    res.status(200).json({
      message: `Get order for ${req.user.name} with order id ${req.params.id}`,
    });
  })
  .put(protect, (req, res) => {
    res.status(200).json({
      message: `Update order for ${req.user.name} with order id ${req.params.id}`,
    });
  })
  .delete(protect, (req, res) => {
    res.status(200).json({
      message: `Delete order for ${req.user.name} with order id ${req.params.id}`,
    });
  });
module.exports = router;
