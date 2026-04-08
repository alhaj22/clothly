const Product = require("../models/Product");

// GET /api/admin/products
exports.adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/products/:id
exports.adminGetProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/products
exports.adminCreateProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, image, countInStock } = req.body;
    if (!name || price == null) return res.status(400).json({ message: "Missing fields" });
    const product = await Product.create({
      name,
      price,
      description: description || "",
      category: category || "",
      image: image || "",
      countInStock: countInStock || 0,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/products/:id
exports.adminUpdateProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });

    const updates = ["name", "price", "description", "category", "image", "countInStock"];
    updates.forEach((k) => {
      if (req.body[k] !== undefined) p[k] = req.body[k];
    });

    await p.save();
    res.json(p);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/products/:id
exports.adminDeleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    await p.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/products/upload
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // ── For production: integrate Cloudinary or AWS S3 here ─────────────────
    // Example with Cloudinary (install cloudinary package first):
    //
    // const cloudinary = require("cloudinary").v2;
    // const result = await new Promise((resolve, reject) => {
    //   const stream = cloudinary.uploader.upload_stream({ folder: "clothly" },
    //     (err, result) => (err ? reject(err) : resolve(result))
    //   );
    //   stream.end(req.file.buffer);
    // });
    // return res.json({ url: result.secure_url });
    // ────────────────────────────────────────────────────────────────────────

    // Fallback: return as base64 data URL (works on Vercel, not for large images)
    const base64 = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
    res.json({ url: dataUrl });
  } catch (err) {
    next(err);
  }
};