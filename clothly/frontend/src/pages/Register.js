import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await register(form);
    setLoading(false);
    if (ok) navigate("/");
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="auth-page fade-up">
      <div className="auth-card">
        <div className="auth-logo">Clothly</div>
        <p className="auth-tagline">Join us today</p>

        <h2 className="auth-title" style={{ fontSize: "1.1rem", marginBottom: "1.25rem", fontFamily: "Inter, sans-serif" }}>
          Create your account
        </h2>

        <form onSubmit={submit}>
          <div className="auth-form-group">
            <label className="cl-label" htmlFor="reg-name">Full name</label>
            <input
              id="reg-name"
              type="text"
              className="cl-input"
              placeholder="John Doe"
              value={form.name}
              onChange={set("name")}
              required
              autoComplete="name"
            />
          </div>

          <div className="auth-form-group">
            <label className="cl-label" htmlFor="reg-email">Email address</label>
            <input
              id="reg-email"
              type="email"
              className="cl-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-form-group">
            <label className="cl-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              className="cl-input"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set("password")}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn-clothly btn-primary-clothly"
            style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: "0.5rem", fontSize: "0.95rem" }}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}