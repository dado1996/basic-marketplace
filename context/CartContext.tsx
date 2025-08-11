"use client";

import { useShoppingCart } from "@/hooks/useShoppingCart";
import { CartItem, Product } from "@/interfaces/ProductInterface";
import { createContext, ReactNode, useContext } from "react";

type ShoppingCartContextType = {
  items: CartItem[];
  addItem: (item: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  currentStore: { id: number; name: string };
  setCurrentStore: (store: { id: number; name: string }) => void;
};

const CartContext = createContext<ShoppingCartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cart = useShoppingCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a cart provider");
  }
  return context;
};
