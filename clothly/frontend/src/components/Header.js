import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="cl-navbar">
      <div className="cl-navbar-inner">
        {/* Brand */}
        <Link className="cl-brand" to="/" onClick={() => setMenuOpen(false)}>
          Cloth<span>ly</span>
        </Link>

        {/* Nav links — desktop */}
        <ul className="cl-nav-links" style={{ margin: 0 }}>
          <li>
            <NavLink className={({ isActive }) => `cl-nav-link ${isActive ? "active" : ""}`} to="/shop">
              Shop
            </NavLink>
          </li>
        </ul>

        {/* Actions — desktop */}
        <div className="cl-nav-actions">
          {/* Cart */}
          <Link to="/cart" className="cl-cart-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
            </svg>
            Cart
            {totalItems > 0 && <span className="cl-badge">{totalItems}</span>}
          </Link>

          {user ? (
            <>
              <span className="cl-greeting">Hi, <strong>{user.name.split(" ")[0]}</strong></span>
              <button
                className="btn-clothly btn-outline-clothly"
                style={{ padding: "8px 16px" }}
                onClick={() => { navigate(user.isAdmin ? "/admin" : "/profile"); }}
              >
                {user.isAdmin ? "Dashboard" : "Account"}
              </button>
              <button className="btn-clothly btn-ghost-clothly" style={{ padding: "8px 16px" }} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn-clothly btn-primary-clothly" to="/login">
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="cl-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`cl-nav-links-wrap ${menuOpen ? "open" : ""}`}>
        <ul className="cl-nav-links" style={{ margin: 0 }}>
          <li>
            <NavLink className={({ isActive }) => `cl-nav-link ${isActive ? "active" : ""}`} to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </NavLink>
          </li>
        </ul>
        <div className="cl-nav-actions" style={{ paddingTop: 8 }}>
          <Link to="/cart" className="cl-cart-btn" onClick={() => setMenuOpen(false)}>
            🛍 Cart {totalItems > 0 && <span className="cl-badge">{totalItems}</span>}
          </Link>
          {user ? (
            <>
              <button
                className="btn-clothly btn-outline-clothly"
                style={{ padding: "8px 16px" }}
                onClick={() => { navigate(user.isAdmin ? "/admin" : "/profile"); setMenuOpen(false); }}
              >
                {user.isAdmin ? "Dashboard" : "Account"}
              </button>
              <button className="btn-clothly btn-ghost-clothly" style={{ padding: "8px 16px" }} onClick={() => { logout(); setMenuOpen(false); }}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn-clothly btn-primary-clothly" to="/login" onClick={() => setMenuOpen(false)}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}