const asyncHandler = require("express-async-handler");

// @desc    Get user cart
// @route   GET /api/carts/:userId
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get cart for user ${req.params.userId}` });
});

// @desc    Update user cart
// @route   PUT /api/carts/:userId
// @access  Private
const updateUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({ messag: `Update cart for user ${req.params.userId}` });
});

// @desc    Clear user cart
// @route   DELETE /api/carts/:userId
// @access  Private
const clearUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Clear cart for user` });
});

module.exports = {
  getUserCart,
  updateUserCart,
  clearUserCart,
};
