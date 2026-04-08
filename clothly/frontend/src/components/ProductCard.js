import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-card-img-wrap">
        <img
          src={product.image || `https://placehold.co/400x460/edede9/9e8e85?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="product-card-body">
        {product.category && (
          <span className="product-card-category">{product.category}</span>
        )}
        <div className="product-card-name">{product.name}</div>

        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <Link to={`/product/${product._id}`} className="product-view-btn">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}