import React, { useState } from "react";
import api from "../api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlace = async () => {
    if (!user) {
      toast.error("Please sign in to place an order");
      navigate("/login");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }
    try {
      setLoading(true);
      await api.post("/api/orders", { items, total, address });
      toast.success("🎉 Order placed successfully!");
      clear();
      navigate("/profile");
    } catch (err) {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrap fade-up">
      <h1 className="section-title" style={{ marginBottom: "0.25rem" }}>Checkout</h1>
      <p className="section-subtitle">Complete your order</p>

      {/* Order Items Preview */}
      <div className="cl-card" style={{ padding: "20px", marginBottom: "1.25rem" }}>
        <h3 style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600, marginBottom: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Order Items
        </h3>
        {items.map((it) => (
          <div key={it._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--powder-petal)" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500 }}>
              {it.name}
              <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: 6 }}>×{it.qty}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>${(it.price * it.qty).toFixed(2)}</div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontWeight: 700, fontSize: "1rem" }}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Address */}
      <div className="cl-card" style={{ padding: "20px", marginBottom: "1.25rem" }}>
        <h3 style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600, marginBottom: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Shipping Address
        </h3>
        <label className="cl-label" htmlFor="checkout-address">Delivery address</label>
        <textarea
          id="checkout-address"
          className="cl-input"
          style={{ minHeight: "100px", resize: "vertical" }}
          placeholder="Enter your full shipping address…"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Place Order */}
      <button
        className="btn-clothly btn-primary-clothly"
        style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "1rem" }}
        onClick={handlePlace}
        disabled={loading || items.length === 0}
      >
        {loading ? "Placing Order…" : `Place Order — $${total.toFixed(2)}`}
      </button>
    </div>
  );
}