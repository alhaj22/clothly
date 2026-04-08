```markdown
# Clothing Store Backend (Express + MongoDB)

This backend provides REST APIs for the React frontend (clothing-store-frontend). It includes authentication (JWT), admin-protected product CRUD, order creation, image upload, and a seed script to create an initial admin user + sample products.

Features
- Auth (register + login) -> returns { token, user }
- Public product endpoints:
  - GET /api/products
  - GET /api/products/:id
- Admin product endpoints (require admin JWT):
  - GET /api/admin/products
  - GET /api/admin/products/:id
  - POST /api/admin/products
  - PUT /api/admin/products/:id
  - DELETE /api/admin/products/:id
  - POST /api/admin/upload (image upload)
- Orders:
  - POST /api/orders (authenticated user)
- Seed script: `npm run seed` - creates an admin user (email: admin@example.com, password: admin123) and sample products.

Setup
1. Copy `.env.example` to `.env` and update values (IMPORTANT: set a secure JWT_SECRET).
2. Install dependencies:
   npm install
3. Run the server in development:
   npm run dev
   or production:
   npm start
4. Seed sample data (optional):
   npm run seed

Notes for the frontend
- The frontend expects auth endpoints to return { token, user }.
- Place the backend URL in your frontend `.env` as REACT_APP_API_URL (e.g. http://localhost:5000).
- Admin-protected endpoints require Authorization: Bearer <token>. The frontend already attaches the token automatically.

Image uploads
- Uploaded images are stored in /uploads and served statically at /uploads/<filename>.
- Admin can upload images via POST /api/admin/upload (multipart/form-data, field name `image`).

Security notes
- Frontend checks user.isAdmin to show admin UI, but the backend enforces admin-only access to admin routes.
- Use HTTPS and a strong JWT_SECRET in production.
```