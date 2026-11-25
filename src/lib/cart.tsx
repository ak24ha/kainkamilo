import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./store";

export type CartItem = { id: string; size: string; qty: number };
type Ctx = {
  items: CartItem[];
  add: (id: string, size: string, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  count: number;
  total: number;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "kainkita-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(items)); }, [items, loaded]);

  const add = (id: string, size: string, qty = 1) =>
    setItems((prev) => {
      const f = prev.find((i) => i.id === id && i.size === size);
      if (f) return prev.map((i) => (i === f ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, size, qty }];
    });
  const setQty = (id: string, size: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id: string, size: string) => setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + (getProduct(i.id)?.price ?? 0) * i.qty, 0);
  return <CartContext.Provider value={{ items, add, setQty, remove, clear, count, total }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
