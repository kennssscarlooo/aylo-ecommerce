const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: Array },
    size: { type: Array },
    brand: { type: String, required: true },
    img: { type: String, required: true },
    logo: { type: String, required: true },
    stocks: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    credit: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
