import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "./site-data";

export type CartItem = {
  /** Унікальний ключ позиції: slug + варіант обкладинки */
  key: string;
  slug: string;
  title: string;
  variant?: string;
  price: string;
  priceValue: number;
  cover: string;
  qty: number;
};

export type CartVariant = { label: string; priceValue: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (book: Book, qty?: number, variant?: CartVariant) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ingigerda_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add: CartCtx["add"] = (book, qty = 1) => {
    setItems((curr) => {
      const existing = curr.find((i) => i.slug === book.slug);
      if (existing) {
        return curr.map((i) =>
          i.slug === book.slug ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [
        ...curr,
        {
          slug: book.slug,
          title: book.title,
          price: book.price,
          priceValue: book.priceValue,
          cover: book.cover,
          qty,
        },
      ];
    });
  };

  const remove: CartCtx["remove"] = (slug) =>
    setItems((c) => c.filter((i) => i.slug !== slug));

  const setQty: CartCtx["setQty"] = (slug, qty) =>
    setItems((c) =>
      c
        .map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0),
    );

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.priceValue, 0);

  return (
    <Ctx.Provider value={{ items, count, total, add, remove, setQty, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
