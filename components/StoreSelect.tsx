"use client";

import { useCart } from "@/context/CartContext";
import { Store } from "@/interfaces/StoreIntarface";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function StoreSelect() {
  const [stores, setStores] = useState<Store[]>([]);
  useEffect(() => {
    getAllStores();

    async function getAllStores() {
      const result = await fetch("/api/store");
      setStores(await result.json());
    }
  }, []);

  const { currentStore, setCurrentStore } = useCart();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentStore(stores.find((s) => s.id === parseInt(event.target.value))!);
  }

  return (
    <Form.Select value={currentStore.id ?? ""} onChange={handleChange}>
      <option>Select a store...</option>
      {stores.map((store) => (
        <option key={store.id} value={store.id}>
          {store.name}
        </option>
      ))}
    </Form.Select>
  );
}
