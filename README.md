<div align="center">

# 👗 Clothly

### A Full-Stack MERN E-Commerce Application for Clothing

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<br/>

> **Clothly** is a modern, full-stack clothing e-commerce platform built with the MERN stack.  
> It features a responsive storefront, shopping cart, secure checkout, user authentication, and a complete admin dashboard for product management.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Deployment on Vercel](#-deployment-on-vercel)
- [📡 API Reference](#-api-reference)
- [🐛 Common Issues](#-common-issues)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

### 🛍️ Customer Features
- Browse products by category
- View detailed product pages
- Add/remove items from the shopping cart
- Checkout with address submission
- User registration & login (JWT-based)
- View order history from profile

### 🔧 Admin Features
- Secure admin dashboard (role-based access)
- Create, Read, Update, Delete products
- Upload product images
- Manage inventory (stock count)

### 🔒 Security
- Password hashing with `bcryptjs`
- JWT authentication with 30-day expiry
- Protected routes (user + admin middleware)
- CORS restricted to allowed origins

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router v7, Bootstrap 5, Axios, React Toastify |
| **Backend** | Node.js 18+, Express 5, Mongoose 9 |
| **Database** | MongoDB Atlas |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **File Uploads** | Multer (memory storage) |
| **Deployment** | Vercel (Frontend + Backend as Serverless) |

---

## 📁 Project Structure

```
clothly/                          ← GitHub repository root
├── .gitignore
├── README.md
└── clothly/
    ├── package.json              ← Root convenience scripts
    │
    ├── backend/                  ← Express REST API
    │   ├── vercel.json           ← Vercel serverless config
    │   ├── .env.example          ← Environment variable template
    │   ├── server.js             ← App entry point
    │   ├── config/
    │   │   └── db.js             ← MongoDB connection
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── productController.js
    │   │   ├── adminProductController.js
    │   │   └── orderController.js
    │   ├── middleware/
    │   │   ├── authMiddleware.js  ← JWT protect + admin guard
    │   │   └── errorHandler.js
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Product.js
    │   │   └── Order.js
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── products.js
    │   │   ├── adminProducts.js
    │   │   └── orders.js
    │   └── utils/
    │       └── generateToken.js
    │
    └── frontend/                 ← React application
        ├── vercel.json           ← Vercel static build config
        ├── .env.example          ← Environment variable template
        ├── public/
        └── src/
            ├── api.js            ← Axios instance
            ├── App.js            ← Routes
            ├── index.js          ← Entry point
            ├── components/
            │   ├── Header.js
            │   ├── Footer.js
            │   └── ProductCard.js
            ├── context/
            │   ├── AuthContext.js
            │   └── CartContext.js
            └── pages/
                ├── Home.js
                ├── Shop.js
                ├── ProductDetail.js
                ├── Cart.js
                ├── Checkout.js
                ├── Login.js
                ├── Register.js
                ├── Profile.js
                └── admin/
                    ├── Dashboard.js
                    ├── Products.js
                    └── ProductForm.js
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://cloud.mongodb.com/) account (free tier works)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/alhaj22/clothly.git
cd clothly
```

### 2. Setup Backend

```bash
cd clothly/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Now open .env and fill in your values (see Environment Variables section)

# Start development server
npm run dev
# API running at http://localhost:5001
```

### 3. Setup Frontend

```bash
# Open a new terminal
cd clothly/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Set REACT_APP_API_URL=http://localhost:5001

# Start development server
npm start
# App running at http://localhost:3000
```

### 4. (Optional) Seed the Database

```bash
cd clothly/backend
npm run seed
```

---

## 🔐 Environment Variables

### Backend — `clothly/backend/.env`

```env
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:3000
```

> 💡 **Tip:** Generate a strong `JWT_SECRET` with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### Frontend — `clothly/frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5001
```

> ⚠️ **Never commit your `.env` files.** They are excluded by `.gitignore`.

---

## 🚀 Deployment on Vercel

Clothly is deployed as **two separate Vercel projects** (backend + frontend) from the same GitHub repo.

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "ready for deployment"
git push origin main
```

### Step 2 — Deploy Backend

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
2. Set **Root Directory** → `clothly/backend`
3. Add **Environment Variables**:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = your MongoDB Atlas URI
   - `JWT_SECRET` = your secret key
   - `CLIENT_URL` = *(your frontend Vercel URL — set after frontend deploys)*
4. Click **Deploy** → Copy the backend URL (e.g. `https://clothly-backend.vercel.app`)

### Step 3 — Deploy Frontend

1. **New Project** → Import the **same** repo
2. Set **Root Directory** → `clothly/frontend`
3. Add **Environment Variables**:
   - `REACT_APP_API_URL` = `https://clothly-backend.vercel.app`
4. Click **Deploy** → Copy the frontend URL (e.g. `https://clothly.vercel.app`)
5. Go back to the **backend project** → Settings → Environment Variables → set `CLIENT_URL` = `https://clothly.vercel.app` → **Redeploy**

### Step 4 — Allow Vercel IPs in MongoDB Atlas

> MongoDB Atlas blocks unknown IPs by default. Since Vercel uses dynamic IPs, you must allow all.

1. [cloud.mongodb.com](https://cloud.mongodb.com) → **Network Access**
2. **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) → **Confirm**

---

## 📡 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login, returns JWT token |
| `GET` | `/api/auth/profile` | ✅ User | Get logged-in user profile |

### Product Routes — `/api/products`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | ❌ | List all products |
| `GET` | `/api/products/:id` | ❌ | Get single product |

### Admin Product Routes — `/api/admin/products`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/admin/products` | ✅ Admin | List all products |
| `POST` | `/api/admin/products` | ✅ Admin | Create product |
| `GET` | `/api/admin/products/:id` | ✅ Admin | Get product by ID |
| `PUT` | `/api/admin/products/:id` | ✅ Admin | Update product |
| `DELETE` | `/api/admin/products/:id` | ✅ Admin | Delete product |
| `POST` | `/api/admin/products/upload` | ✅ Admin | Upload product image |

### Order Routes — `/api/orders`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/orders` | ✅ User | Place a new order |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Returns `{ ok: true }` |

---

### Auth Header (for protected routes)

```
Authorization: Bearer <your_jwt_token>
```

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| `Cannot find module` on Vercel | Check that Root Directory is set correctly in Vercel project settings |
| `MongoServerError: bad auth` | Wrong `MONGO_URI` credentials — reset password in Atlas and update env var |
| CORS blocked in browser | Set `CLIENT_URL` in backend Vercel env to your exact frontend URL (no trailing slash) |
| Page refresh gives 404 | Already handled by `frontend/vercel.json` — redeploy frontend if still occurring |
| Image upload fails | Vercel has a read-only filesystem — use Cloudinary for persistent image storage |
| API returns 500 on all routes | Missing env vars in Vercel — add `MONGO_URI` and `JWT_SECRET` then redeploy |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👨‍💻 Author

**Alhaj Khan**  
GitHub: [@alhaj22](https://github.com/alhaj22)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ using the MERN Stack
</div>
