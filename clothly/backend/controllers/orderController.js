const Order = require("../models/Order");
const Product = require("../models/Product");

// POST /api/orders (protected user)
exports.createOrder = async (req, res, next) => {
  try {
    const { items, total, address } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: "No items" });
    // Basic validation: ensure each product exists and price
    const preparedItems = [];
    for (const it of items) {
      const prod = await Product.findById(it._id || it.product);
      if (!prod) return res.status(400).json({ message: `Product not found: ${it._id || it.product}` });
      preparedItems.push({
        product: prod._id,
        name: prod.name,
        qty: it.qty,
        price: prod.price,
        image: prod.image,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: preparedItems,
      total,
      address,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};