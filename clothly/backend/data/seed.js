/**
 * Seed script to create an admin user and some sample products.
 *
 * Usage:
 *   npm run seed
 *
 * Make sure .env has MONGO_URI and JWT_SECRET (JWT_SECRET not required for seeding)
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    // create admin user if not exists
    const adminEmail = "admin@example.com";
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashed = await bcrypt.hash("admin123", 10);
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashed,
        isAdmin: true,
      });
      console.log("Admin user created:", adminEmail, "password: admin123");
    } else {
      console.log("Admin already exists:", adminEmail);
    }

    // remove existing products and add sample products
    await Product.deleteMany({});
    const sampleProducts = [
      {
        name: "Classic White Tee",
        price: 19.99,
        description: "Comfortable cotton tee.",
        category: "T-Shirts",
        image: "/uploads/sample1.jpg",
        countInStock: 50,
      },
      {
        name: "Blue Denim Jacket",
        price: 79.99,
        description: "Stylish denim jacket.",
        category: "Jackets",
        image: "/uploads/sample2.jpg",
        countInStock: 20,
      },
      {
        name: "Black Joggers",
        price: 39.99,
        description: "Soft and stretchy joggers.",
        category: "Pants",
        image: "/uploads/sample3.jpg",
        countInStock: 30,
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted.");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();