"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Cart } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";

export default function CartLink() {
  const { itemCount } = useCart();
  const { data } = useSession();

  if (data?.user.role === "BUSINESS") return <></>;

  return (
    <Link href={"/checkout"}>
      <Cart color="white" />
      {itemCount > 0 && <Badge bg="danger">{itemCount}</Badge>}
    </Link>
  );
}
