const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
      ref: "User",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please specify the product owner id"],
    },
    description: {
      type: String,
      required: [true, "Please add product description"],
    },
    category: {
      type: String,
      required: [true, "Please add the product cateogry"],
    },
    price: {
      type: Number,
      required: [true, "Please add the product price"],
    },
    isCustomerVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
