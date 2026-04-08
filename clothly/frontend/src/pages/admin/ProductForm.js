import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    countInStock: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await api.get(`/api/admin/products/${id}`);
        setForm(res.data);
      } catch (err) {}
    })();
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/api/admin/products/${id}`, form);
        toast.success("Updated");
      } else {
        await api.post("/api/admin/products", form);
        toast.success("Created");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error("Save failed");
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Product" : "New Product"}</h2>
      <form onSubmit={submit}>
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="mb-2">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        </div>
        <div className="mb-2">
          <label className="form-label">Category</label>
          <input className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>
        <div className="mb-2">
          <label className="form-label">Count in Stock</label>
          <input type="number" className="form-control" value={form.countInStock} onChange={(e) => setForm({ ...form, countInStock: Number(e.target.value) })} />
        </div>
        <div className="mb-2">
          <label className="form-label">Image URL</label>
          <input className="form-control" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button className="btn btn-primary">{isEdit ? "Save" : "Create"}</button>
      </form>
    </div>
  );
}