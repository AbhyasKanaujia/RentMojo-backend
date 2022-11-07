// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  res.status(201).json({ message: "Register User" });
};

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
  res.status(200).json({ message: "Login User" });
};

// @desc    Get user data
// @route   POST /api/users/me
// @access  Public
const getMe = (req, res) => {
  res.status(200).json({ message: "Get user data" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
