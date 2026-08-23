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

export const ABETKA_BOOK_SLUG = "smachnenka-abetka";
export const ABETKA_CARDS_SLUG = "abetka-kartky";
export const ABETKA_BUNDLE_CARD_PRICE = 250;
export const ABETKA_BUNDLE_DISCOUNT = 100;

const PROMO_END = new Date("2026-10-02T00:00:00+03:00");

export function isAbetkaBundlePromoActive() {
  return new Date() < PROMO_END;
}

export type CartVariant = { label: string; priceValue: number };

type CartCtx = {
  items: CartItem[];
  discountedItems: CartItem[];
  count: number;
  total: number;
  payableTotal: number;
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
    } catch {
      // localStorage may be unavailable in private browsing.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // Ignore persistence failures; the in-memory cart remains usable.
    }
  }, [items]);

  const add: CartCtx["add"] = (book, qty = 1, variant) => {
    const key = variant ? `${book.slug}::${variant.label}` : book.slug;
    setItems((curr) => {
      const existing = curr.find((i) => (i.key ?? i.slug) === key);
      if (existing) {
        return curr.map((i) => ((i.key ?? i.slug) === key ? { ...i, qty: i.qty + qty } : i));
      }
      const priceValue = variant ? variant.priceValue : book.priceValue;
      return [
        ...curr,
        {
          key,
          slug: book.slug,
          title: book.title,
          variant: variant?.label,
          price: `${priceValue} грн`,
          priceValue,
          cover: book.cover,
          qty,
        },
      ];
    });
  };

  const remove: CartCtx["remove"] = (key) =>
    setItems((c) => c.filter((i) => (i.key ?? i.slug) !== key));

  const setQty: CartCtx["setQty"] = (key, qty) =>
    setItems((c) =>
      c
        .map((i) => ((i.key ?? i.slug) === key ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0),
    );

  const clear = () => setItems([]);

  const hasAbetkaBook = items.some((item) => item.slug === ABETKA_BOOK_SLUG);
  const hasAbetkaCards = items.some((item) => item.slug === ABETKA_CARDS_SLUG);
  const promoActive = isAbetkaBundlePromoActive() && hasAbetkaBook && hasAbetkaCards;
  const discountedItems = promoActive
    ? items.map((item) =>
        item.slug === ABETKA_CARDS_SLUG
          ? {
              ...item,
              price: `${ABETKA_BUNDLE_CARD_PRICE} грн`,
              priceValue: ABETKA_BUNDLE_CARD_PRICE,
            }
          : item,
      )
    : items;

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.priceValue, 0);
  const bundleQuantity = promoActive
    ? Math.min(
        items.find((item) => item.slug === ABETKA_BOOK_SLUG)?.qty ?? 0,
        items.find((item) => item.slug === ABETKA_CARDS_SLUG)?.qty ?? 0,
      )
    : 0;
  const payableTotal = total - bundleQuantity * ABETKA_BUNDLE_DISCOUNT;

  return (
    <Ctx.Provider
      value={{ items, discountedItems, count, total, payableTotal, add, remove, setQty, clear }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
