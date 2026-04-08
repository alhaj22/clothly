import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="cart-empty fade-up">
        <div className="cart-empty-icon">👤</div>
        <h2 style={{ fontSize: "1.2rem" }}>You're not signed in</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Please sign in to view your profile.
        </p>
        <Link to="/login" className="btn-clothly btn-primary-clothly" style={{ padding: "11px 32px", marginTop: "0.5rem" }}>
          Sign in
        </Link>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="fade-up">
      <h1 className="section-title" style={{ marginBottom: "0.25rem" }}>My Account</h1>
      <p className="section-subtitle">Manage your profile and orders</p>

      <div className="profile-card">
        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div className="profile-avatar">{initials}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>{user.name}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{user.email}</div>
          </div>
        </div>

        <hr className="cl-divider" />

        {/* Fields */}
        <div className="profile-field">
          <span className="profile-field-label">Full name</span>
          <span className="profile-field-value">{user.name}</span>
        </div>
        <div className="profile-field">
          <span className="profile-field-label">Email</span>
          <span className="profile-field-value">{user.email}</span>
        </div>
        <div className="profile-field">
          <span className="profile-field-label">Role</span>
          <span className="profile-field-value">
            {user.isAdmin ? (
              <span className="cl-chip" style={{ background: "var(--almond-silk)", fontWeight: 600 }}>Admin</span>
            ) : (
              <span className="cl-chip">Customer</span>
            )}
          </span>
        </div>

        <hr className="cl-divider" />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {user.isAdmin && (
            <Link to="/admin" className="btn-clothly btn-outline-clothly" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>
              Admin Dashboard
            </Link>
          )}
          <button
            className="btn-clothly btn-ghost-clothly"
            style={{ flex: 1, justifyContent: "center", padding: "10px" }}
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}