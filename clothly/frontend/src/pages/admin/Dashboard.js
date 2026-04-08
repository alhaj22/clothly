import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="list-group">
        <Link className="list-group-item list-group-item-action" to="/admin/products">Manage Products</Link>
        <Link className="list-group-item list-group-item-action" to="/admin/orders">Manage Orders (stub)</Link>
      </div>
    </div>
  );
}