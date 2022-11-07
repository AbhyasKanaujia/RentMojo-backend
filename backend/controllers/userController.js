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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);

    throw new Error("Invali user data");
  }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);

    throw new Error("User not found");
  }

  if (user.id !== req.user.id) {
    res.status(401);

    throw new Error("Unauthorized");
  }

  const deletedUser = await user.remove();

  res.status(200).json({ id: req.user.id });
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);

    throw new Error("Please provide all the fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);

    throw new Error("Invaid credentials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404);

    throw new Error("User not found");
  }
  const { _id, name, email, phone, address } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    phone,
    address,
  });
});

module.exports = {
  registerUser,
  deleteUser,
  loginUser,
  getMe,
};
