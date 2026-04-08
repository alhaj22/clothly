import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { add } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch {
        navigate("/shop");
      }
    }
    load();
  }, [id, navigate]);

  const handleAdd = () => {
    setAdding(true);
    add(product, qty);
    toast.success(`Added ${qty}× ${product.name} to cart`);
    setTimeout(() => setAdding(false), 800);
  };

  if (!product) {
    return (
      <div className="cl-loading">
        <div className="cl-spinner" />
        Loading…
      </div>
    );
  }

  return (
    <div className="row g-4 fade-up" style={{ paddingTop: "1rem" }}>
      {/* Image */}
      <div className="col-md-6">
        <div className="detail-img-wrap">
          <img
            src={product.image || `https://placehold.co/600x600/edede9/9e8e85?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
          />
        </div>
      </div>

      {/* Info */}
      <div className="col-md-6">
        <div className="detail-info">
          {product.category && (
            <span className="cl-chip" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
              {product.category}
            </span>
          )}

          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>{product.name}</h1>

          <div className="detail-price">${product.price.toFixed(2)}</div>

          {product.countInStock > 0 ? (
            <span className="detail-stock">✓ In Stock · {product.countInStock} left</span>
          ) : (
            <span className="detail-stock" style={{ background: "#fdecea", color: "#b71c1c" }}>
              ✕ Out of Stock
            </span>
          )}

          <hr className="cl-divider" style={{ margin: "1.25rem 0" }} />

          {product.description && (
            <p style={{ marginBottom: "1.5rem", lineHeight: 1.8, fontSize: "0.95rem" }}>
              {product.description}
            </p>
          )}

          {/* Qty Selector */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="cl-label" style={{ marginBottom: "10px" }}>Quantity</label>
            <div className="qty-selector">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <input
                type="number"
                className="qty-display"
                min="1"
                max={product.countInStock || 99}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                readOnly
              />
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <button
            className="btn-clothly btn-primary-clothly"
            style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.95rem" }}
            onClick={handleAdd}
            disabled={adding || product.countInStock === 0}
          >
            {adding ? "Added! ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}