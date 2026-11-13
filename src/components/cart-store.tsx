"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { products } from "@/lib/products";
import { getPriceQuote } from "@/lib/pricing";

interface CartLine {
  id: string;
  quantity: number;
}

const storageKey = "kimia-cart-v1";
export const maxQuantity = 99;
const emptyCart: CartLine[] = [];
const productById = new Map(products.map((product) => [product.id, product]));
const listeners = new Set<() => void>();
let current = emptyCart;
let cachedRaw: string | null | undefined;

function parseCart(raw: string | null): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(parsed)) return emptyCart;

    const quantities = new Map<string, number>();
    for (const line of parsed) {
      if (typeof line?.id !== "string" || !productById.has(line.id) || !Number.isInteger(line.quantity) || line.quantity < 1) continue;
      quantities.set(line.id, Math.min(maxQuantity, line.quantity + (quantities.get(line.id) ?? 0)));
    }
    return Array.from(quantities, ([id, quantity]) => ({ id, quantity }));
  } catch {
    return emptyCart;
  }
}

function readCart() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (cachedRaw !== raw) {
      cachedRaw = raw;
      current = parseCart(raw);
    }
  } catch {
    // Keep the current tab usable when browser storage is unavailable.
  }
  return current;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function handleStorage(event: StorageEvent) {
  if (event.key === storageKey || event.key === null) notify();
}

function subscribe(listener: () => void) {
  if (!listeners.size) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", handleStorage);
  };
}

function updateCart(update: (lines: CartLine[]) => CartLine[]) {
  current = update(readCart());
  try {
    const raw = JSON.stringify(current);
    window.localStorage.setItem(storageKey, raw);
    cachedRaw = raw;
  } catch {
    // The in-memory cart still supports interactions.
  }
  notify();
}

function add(id: string) {
  if (!productById.has(id)) return;
  updateCart((lines) => {
    const existing = lines.find((line) => line.id === id);
    return existing
      ? lines.map((line) => line.id === id ? { ...line, quantity: Math.min(maxQuantity, line.quantity + 1) } : line)
      : [...lines, { id, quantity: 1 }];
  });
}

function setQuantity(id: string, quantity: number) {
  if (!Number.isInteger(quantity)) return;
  updateCart((lines) => quantity <= 0
    ? lines.filter((line) => line.id !== id)
    : lines.map((line) => line.id === id ? { ...line, quantity: Math.min(maxQuantity, quantity) } : line));
}

function remove(id: string) {
  setQuantity(id, 0);
}

const CartContext = createContext(emptyCart);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readCart, () => emptyCart);
  return <CartContext.Provider value={lines}>{children}</CartContext.Provider>;
}

export function useCart() {
  const lines = useContext(CartContext);
  const items = lines.flatMap(({ id, quantity }) => {
    const product = productById.get(id);
    return product ? [{ product, quantity, quote: getPriceQuote(product) }] : [];
  });
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const pendingCount = items.reduce((sum, item) => sum + (item.quote.status === "pending" ? item.quantity : 0), 0);
  const sampleSubtotal = items.reduce((sum, item) => sum + (item.quote.status === "sample" ? item.quote.amountToman * item.quantity : 0), 0);
  return { items, count, pendingCount, sampleSubtotal, add, setQuantity, remove };
}

export type CartEntry = ReturnType<typeof useCart>["items"][number];
