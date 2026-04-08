const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  adminGetProducts,
  adminGetProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  uploadImage,
} = require("../controllers/adminProductController");
const { protect, admin } = require("../middleware/authMiddleware");

// ── Multer: memory storage (Vercel has a read-only filesystem) ──────────────
// Files are kept in memory as Buffer (req.file.buffer).
// For production you MUST upload to a cloud storage (e.g. Cloudinary, AWS S3).
// The uploadImage controller handles forwarding to the cloud provider.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
});

// ── All routes below require authentication + admin role ────────────────────
router.use(protect, admin);

router.get("/", adminGetProducts);
router.post("/", adminCreateProduct);
router.get("/:id", adminGetProduct);
router.put("/:id", adminUpdateProduct);
router.delete("/:id", adminDeleteProduct);

// Image upload — returns a URL string
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;