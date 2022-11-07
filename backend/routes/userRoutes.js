const express = require("express");
const router = express.Router();
const {
  registerUser,
  deleteUser,
  loginUser,
  getMe,
} = require("../controllers/userController.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/", registerUser);
router.delete("/:id", protect, deleteUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
