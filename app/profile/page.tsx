"use client";

import ButtonCreateProduct from "@/components/ButtonCreateProduct";
import ButtonCreateStore from "@/components/ButtonCreateStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.replace("/login");
  }
  return (
    <>
      <h1>{data?.user.name}&apos;s Profile</h1>
      <p>Role: {data?.user.role}</p>
      <ButtonCreateStore />
      <ButtonCreateProduct />
    </>
  );
}
