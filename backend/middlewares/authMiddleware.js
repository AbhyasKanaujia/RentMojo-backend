const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);

        throw new Error("Invalid token");
      }

      next();
    } catch (error) {
      res.status(401);

      throw new Error("You are not authorized to access this resource");
    }
  }

  if (!token) {
    res.status(401);

    throw new Error("You are not authorized to access this resource, no token");
  }
});

module.exports = { protect };
