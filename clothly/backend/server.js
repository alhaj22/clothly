const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const adminProductRoutes = require("./routes/adminProducts");
const orderRoutes = require("./routes/orders");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ── CORS ────────────────────────────────────────────────────────────────────
// Allow the deployed frontend URL + localhost during development
const allowedOrigins = [
  process.env.CLIENT_URL,          // e.g. https://clothly.vercel.app
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman / server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
  })
);

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true, env: process.env.NODE_ENV }));

// ── Error Handler ───────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Local Development Server ─────────────────────────────────────────────────
// On Vercel this file is imported as a module; app.listen() is NOT called.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

// Export for Vercel serverless handler
module.exports = app;