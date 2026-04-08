const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    image: { type: String, default: "" }, // URL or /uploads/...
    countInStock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);