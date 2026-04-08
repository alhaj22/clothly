import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      toast.success("Logged in");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (payload) => {
    try {
      const res = await api.post("/api/auth/register", payload);
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      toast.success("Registered");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);