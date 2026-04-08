import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Accessories"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        // no-op
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = products.filter((p) => {
    const matchQ =
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category?.toLowerCase().includes(q.toLowerCase());
    const matchCat =
      category === "All" || p.category?.toLowerCase() === category.toLowerCase();
    return matchQ && matchCat;
  });

  return (
    <div className="fade-up">
      {/* ── Top Bar ───────────────────────────────────── */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="section-title">Shop</h1>
        <p className="section-subtitle">Discover our full collection</p>

        {/* Filters */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "1rem" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: "220px", maxWidth: "360px" }}>
            <svg
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
              width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
            <input
              className="cl-input"
              style={{ paddingLeft: "38px" }}
              placeholder="Search products or categories…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "7px 18px",
                  borderRadius: "999px",
                  border: "1.5px solid",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  borderColor: category === cat ? "var(--text-primary)" : "var(--dust-grey)",
                  background: category === cat ? "var(--text-primary)" : "transparent",
                  color: category === cat ? "#fff" : "var(--text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      {/* ── Grid ──────────────────────────────────────── */}
      {loading ? (
        <div className="row g-3">
          {[...Array(8)].map((_, i) => (
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
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
            No products found
          </h3>
          <p style={{ fontSize: "0.9rem" }}>Try a different search or category.</p>
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map((p) => (
            <div key={p._id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}