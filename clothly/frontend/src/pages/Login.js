import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate("/");
  };

  return (
    <div className="auth-page fade-up">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">Clothly</div>
        <p className="auth-tagline">Welcome back</p>

        <h2 className="auth-title" style={{ fontSize: "1.1rem", marginBottom: "1.25rem", fontFamily: "Inter, sans-serif" }}>
          Sign in to your account
        </h2>

        <form onSubmit={submit}>
          <div className="auth-form-group">
            <label className="cl-label" htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              className="cl-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-form-group">
            <label className="cl-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="cl-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn-clothly btn-primary-clothly"
            style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: "0.5rem", fontSize: "0.95rem" }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}