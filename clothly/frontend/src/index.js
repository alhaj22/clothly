import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";   // global design system (variables, typography, utilities)
import "./App.css";     // component-specific styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            toastStyle={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              borderRadius: "12px",
              background: "#fff",
              color: "#2d2926",
              border: "1px solid #d6ccc2",
              boxShadow: "0 4px 20px rgba(100,80,60,0.12)",
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);