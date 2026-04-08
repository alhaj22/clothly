import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/api/products?limit=8");
        setProducts(res.data);
      } catch (err) {
        // no-op
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="fade-up">
      
<div className="hero-section">

<span className="hero-eyebrow">
New Collection 2026
</span>

<h1 className="hero-title">
Dress for the <br /> moment.
</h1>

<p className="hero-subtitle">
Thoughtfully curated clothing for every style and occasion.
Quality that feels as good as it looks.
</p>

<div className="hero-actions">

<Link to="/shop" className="btn-clothly btn-primary-clothly">
Shop Now
</Link>

<Link to="/shop" className="btn-clothly btn-outline-clothly">
Explore All
</Link>

</div>

</div>

      {/* ── Featured Products ─────────────────────────── */}
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 className="section-title">Featured</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>Handpicked for you this season</p>
        </div>
        <Link to="/shop" className="btn-clothly btn-outline-clothly" style={{ padding: "8px 20px" }}>
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="row g-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3">
              <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                <div className="cl-skeleton" style={{ height: 240 }} />
                <div style={{ padding: "16px", background: "rgba(255,255,255,0.85)", border: "1px solid var(--dust-grey)", borderTop: "none", borderRadius: "0 0 var(--radius-lg) var(--radius-lg)" }}>
                  <div className="cl-skeleton" style={{ height: 12, width: "40%", marginBottom: 8 }} />
                  <div className="cl-skeleton" style={{ height: 16, width: "70%", marginBottom: 12 }} />
                  <div className="cl-skeleton" style={{ height: 12, width: "30%" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>👗</div>
          <p>No products yet. Check back soon!</p>
        </div>
      ) : (
        <div className="row g-3">
          {products.map((p) => (
            <div key={p._id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}

      {/* ── Value Props ───────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "4rem" }}>
        {[
          { icon: "", title: "Free Shipping", desc: "On all orders over $50" },
          { icon: "", title: "Easy Returns", desc: "30-day hassle-free returns" },
          { icon: "", title: "Secure Payment", desc: "SSL encrypted checkout" },
          { icon: "", title: "Support 24/7", desc: "Here whenever you need us" },
        ].map((item) => (
          <div key={item.title} className="cl-card" style={{ padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}