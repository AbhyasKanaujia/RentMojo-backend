const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400);

    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);

    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  } else {
    res.status(400);

    throw new Error("Invali user data");
  }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Login User" });
});

// @desc    Get user data
// @route   POST /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get user data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
