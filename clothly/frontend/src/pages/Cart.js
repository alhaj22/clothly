import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, remove, updateQty, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-empty fade-up">
        <div className="cart-empty-icon">🛍</div>
        <h2 style={{ fontSize: "1.3rem" }}>Your cart is empty</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Looks like you haven't added anything yet.
        </p>
        <Link to="/shop" className="btn-clothly btn-primary-clothly" style={{ padding: "11px 32px", marginTop: "0.5rem" }}>
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <h1 className="section-title" style={{ marginBottom: "0.25rem" }}>Your Cart</h1>
      <p className="section-subtitle">{items.length} item{items.length !== 1 ? "s" : ""} in your bag</p>

      <div className="row g-4">
        {/* ── Items ─────────────────────────────────────── */}
        <div className="col-md-8">
          {items.map((it) => (
            <div className="cart-item" key={it._id}>
              <img
                className="cart-item-img"
                src={it.image || `https://placehold.co/80x80/edede9/9e8e85?text=${encodeURIComponent(it.name)}`}
                alt={it.name}
              />

              <div className="cart-item-info">
                <div className="cart-item-name">{it.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 8 }}>
                  ${it.price.toFixed(2)} each
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => updateQty(it._id, Number(e.target.value) || 1)}
                    className="cart-qty-input"
                  />
                  <button
                    className="btn-clothly btn-danger-clothly"
                    style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                    onClick={() => remove(it._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="cart-item-price">
                ${(it.price * it.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Summary ─────────────────────────────────────── */}
        <div className="col-md-4">
          <div className="cart-summary">
            <h3 style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif", fontWeight: 600, marginBottom: "1.25rem" }}>
              Order Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <span>Shipping</span>
                <span style={{ color: "#2e7d32", fontWeight: 500 }}>{total >= 50 ? "Free" : "$5.00"}</span>
              </div>
            </div>

            <hr className="cl-divider" />

            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
              <span>Total</span>
              <span>${(total >= 50 ? total : total + 5).toFixed(2)}</span>
            </div>

            <button
              className="btn-clothly btn-primary-clothly"
              style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: "0.95rem" }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>

            <Link
              to="/shop"
              style={{ display: "block", textAlign: "center", marginTop: "12px", fontSize: "0.82rem", color: "var(--text-muted)" }}
            >
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}