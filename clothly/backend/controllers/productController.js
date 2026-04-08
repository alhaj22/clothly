const Product = require("../models/Product");

// GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const products = await Product.find({}).limit(limit);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};