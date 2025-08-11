import { CartItem, Product } from "@/interfaces/ProductInterface";
import { useMemo, useState } from "react";

export const useShoppingCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentStore, setCurrentStore] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });

  const addItem = (item: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    itemCount,
    currentStore,
    setCurrentStore,
  };
};
