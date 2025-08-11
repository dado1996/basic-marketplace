"use client";

import ProductList from "@/components/ProductList";
import { useCart } from "@/context/CartContext";
import { Product } from "@/interfaces/ProductInterface";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { currentStore } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getStoreProducts();

    async function getStoreProducts() {
      try {
        const result = await fetch(`/api/product?store=${currentStore.id}`);
        if (!result.ok) {
          setProducts([]);
          return;
        }
        setProducts(await result.json());
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    }
  }, [currentStore]);

  return (
    <>
      <h1>{currentStore.name || "Home"}</h1>
      {currentStore.id ? (
        <ProductList products={products} />
      ) : (
        <p>Select a store to proceed</p>
      )}
    </>
  );
}
