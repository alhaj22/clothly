import React, { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p._id === product._id);
      if (found) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p._id !== id));
  const updateQty = (id, qty) =>
    setItems((prev) => prev.map((p) => (p._id === id ? { ...p, qty } : p)));
  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);