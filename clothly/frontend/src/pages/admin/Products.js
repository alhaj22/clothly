import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/api/admin/products");
      setProducts(res.data);
    } catch (err) {
      // handle
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete product?")) return;
    try {
      await api.delete(`/api/admin/products/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error("Delete failed");
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Link to="/admin/products/new" className="btn btn-primary">New Product</Link>
      </div>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p._id}</td>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.countInStock ?? "-"}</td>
              <td>
                <Link to={`/admin/products/${p._id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}