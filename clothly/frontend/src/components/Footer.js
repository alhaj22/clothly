import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-footer-inner">
        <div>
          <div className="cl-footer-brand">Clothly</div>
          <div className="cl-footer-copy" style={{ marginTop: 4 }}>
            © {new Date().getFullYear()} Clothly. All rights reserved.
          </div>
        </div>

        <ul className="cl-footer-links">
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/login">Sign in</Link></li>
        </ul>
      </div>
    </footer>
  );
}