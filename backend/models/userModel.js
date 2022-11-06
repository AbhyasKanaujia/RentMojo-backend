const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide the user's name"],
  },
  email: {
    type: String,
    require: [true, "Please provide the user's email"],
  },
  password: {
    type: String,
    require: [true, "Please provide the user's password"],
  },
  phone: {
    type: String,
    require: [true, "Please provide the user's phone number"],
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
