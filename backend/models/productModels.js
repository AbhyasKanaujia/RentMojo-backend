const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
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
      required: [trur, "Please add the product price"],
    },
    stockQuantitry: {
      type: Number,
      required: [trur, "Please add the product price"],
      default: 0,
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
